/**
 * STEP 2: Firebase Cloud Function (v2 onRequest)
 * Name: authInstagramCallback
 * 
 * Handles Meta OAuth authorization code exchange, upgrades to a 60-day
 * long-lived access token, extracts the Instagram Business account, and saves
 * the multi-tenant record into Firestore at /instagram_accounts/{instagramAccountId}.
 */

const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Meta App Credentials (configured via environment variables or secret manager)
const META_APP_ID = process.env.META_APP_ID || process.env.INSTAGRAM_APP_ID || "YOUR_META_APP_ID";
const META_APP_SECRET = process.env.META_APP_SECRET || process.env.INSTAGRAM_APP_SECRET || "YOUR_META_APP_SECRET";
const DASHBOARD_URL = process.env.DASHBOARD_URL || "https://ais-dev-nxbmi3irti6u6jyx5hkcbc-959115144547.asia-east1.run.app";

exports.authInstagramCallback = onRequest({ cors: true }, async (req, res) => {
  const { code, state, error, error_reason, error_description } = req.query;

  // Handle user cancellation or Meta authorization errors
  if (error || !code) {
    console.error("[Meta OAuth Error]:", { error, error_reason, error_description });
    const errMessage = error_description || error || "Authorization was cancelled or failed.";
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Authentication Error</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 40px; background: #0f172a; color: #f87171;">
          <h2>Instagram Connection Failed</h2>
          <p>${errMessage}</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'INSTAGRAM_AUTH_ERROR', error: '${encodeURIComponent(errMessage)}' }, '*');
              setTimeout(() => window.close(), 2500);
            } else {
              setTimeout(() => { window.location.href = '${DASHBOARD_URL}?auth_error=${encodeURIComponent(errMessage)}'; }, 2000);
            }
          </script>
        </body>
      </html>
    `);
  }

  // The 'state' parameter contains the authenticated user's Firebase UID
  const userId = state;
  if (!userId) {
    console.error("[Meta OAuth Error]: Missing user state parameter.");
    return res.status(400).send("Bad Request: Missing user state identifier.");
  }

  // Dynamic redirect URI reconstruction matching what was sent in the authorization request
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const redirectUri = `${protocol}://${host}${req.path}`;

  try {
    // -------------------------------------------------------------
    // STEP A: Exchange code for Short-Lived User Access Token
    // -------------------------------------------------------------
    const tokenUrl = new URL("https://graph.facebook.com/v21.0/oauth/access_token");
    tokenUrl.searchParams.set("client_id", META_APP_ID);
    tokenUrl.searchParams.set("client_secret", META_APP_SECRET);
    tokenUrl.searchParams.set("redirect_uri", redirectUri);
    tokenUrl.searchParams.set("code", code);

    const tokenResponse = await fetch(tokenUrl.toString(), { method: "POST" });
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error("[Step A Failed] Exchange code for token:", tokenData.error);
      throw new Error(`Token exchange failed: ${tokenData.error.message}`);
    }

    const shortLivedToken = tokenData.access_token;

    // -------------------------------------------------------------
    // STEP B: Upgrade to Long-Lived (60-Day) Access Token
    // -------------------------------------------------------------
    const longLivedUrl = new URL("https://graph.facebook.com/v21.0/oauth/access_token");
    longLivedUrl.searchParams.set("grant_type", "fb_exchange_token");
    longLivedUrl.searchParams.set("client_id", META_APP_ID);
    longLivedUrl.searchParams.set("client_secret", META_APP_SECRET);
    longLivedUrl.searchParams.set("fb_exchange_token", shortLivedToken);

    const longLivedResponse = await fetch(longLivedUrl.toString(), { method: "GET" });
    const longLivedData = await longLivedResponse.json();

    const longLivedToken = longLivedData.access_token || shortLivedToken;

    // -------------------------------------------------------------
    // STEP C: Query Meta Graph API for Instagram Business Account
    // -------------------------------------------------------------
    const accountsUrl = new URL("https://graph.facebook.com/v21.0/me/accounts");
    accountsUrl.searchParams.set(
      "fields",
      "id,name,access_token,instagram_business_account{id,username,name,profile_picture_url}"
    );
    accountsUrl.searchParams.set("access_token", longLivedToken);

    const accountsResponse = await fetch(accountsUrl.toString(), { method: "GET" });
    const accountsData = await accountsResponse.json();

    if (accountsData.error) {
      console.error("[Step C Failed] Fetch /me/accounts:", accountsData.error);
      throw new Error(`Failed to query Facebook Pages: ${accountsData.error.message}`);
    }

    // Find linked Instagram Business Account from user's Facebook Pages
    let targetBusinessAccount = null;
    let pageAccessToken = longLivedToken;

    if (Array.isArray(accountsData.data)) {
      for (const page of accountsData.data) {
        if (page.instagram_business_account) {
          targetBusinessAccount = page.instagram_business_account;
          pageAccessToken = page.access_token || longLivedToken;
          break;
        }
      }
    }

    // Specific Error Logging if account is personal or lacks a connected business profile
    if (!targetBusinessAccount || !targetBusinessAccount.id) {
      console.warn(
        `[Instagram Business Connection Missing]: User ${userId} attempted to connect, but none of the Facebook Pages have a connected Instagram Professional/Business account.`
      );
      return res.status(422).send(`
        <!DOCTYPE html>
        <html>
          <head><title>No Instagram Business Account</title></head>
          <body style="font-family: sans-serif; text-align: center; padding: 40px; background: #0f172a; color: #f8fafc;">
            <h2 style="color: #fbbf24;">No Instagram Business Account Found</h2>
            <p style="color: #94a3b8; max-width: 500px; margin: 16px auto; line-height: 1.5;">
              The Instagram account linked to this Facebook account is a <strong>Personal Profile</strong> or is not linked to a Facebook Page.
            </p>
            <p style="color: #94a3b8; font-size: 13px;">
              Please switch your account to an <strong>Instagram Creator or Business account</strong> in Instagram settings, connect it to a Facebook Page, and try again.
            </p>
            <script>
              setTimeout(() => {
                if (window.opener) {
                  window.close();
                } else {
                  window.location.href = '${DASHBOARD_URL}?auth_error=No_Instagram_Business_Account_Found';
                }
              }, 4000);
            </script>
          </body>
        </html>
      `);
    }

    const { id: instagramAccountId, username: handle, profile_picture_url: avatarUrl } = targetBusinessAccount;

    // -------------------------------------------------------------
    // STEP D: Write data directly to Firestore: /instagram_accounts/{instagramAccountId}
    // -------------------------------------------------------------
    const accountDocRef = db.collection("instagram_accounts").doc(instagramAccountId);
    
    await accountDocRef.set(
      {
        userId: userId,
        instagramAccountId: instagramAccountId,
        handle: handle || "instagram_creator",
        avatarUrl: avatarUrl || "",
        accessToken: pageAccessToken,
        status: "Active",
        connectedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    console.log(`[Success]: Successfully linked @${handle} (${instagramAccountId}) to user ${userId}`);

    // Return clean HTML script response that closes the popup or redirects to dashboard
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Connected to Instagram</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px; background: #0f172a; color: #f8fafc;">
          <h2 style="color: #34d399;">✓ Connected Successfully!</h2>
          <p style="color: #94a3b8;">Linked @${handle} to your Auto-DM account.</p>
          <script>
            // If opened in a popup window
            if (window.opener && !window.opener.closed) {
              window.opener.postMessage({
                type: 'INSTAGRAM_AUTH_SUCCESS',
                handle: '${handle}',
                instagramAccountId: '${instagramAccountId}'
              }, '*');
              window.close();
            } else {
              // Direct browser navigation fallback
              window.location.href = '${DASHBOARD_URL}?connected=true&handle=${handle}';
            }
          </script>
        </body>
      </html>
    `);

  } catch (error) {
    console.error("[authInstagramCallback Exception]:", error);
    return res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Server Error</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 40px; background: #0f172a; color: #f87171;">
          <h2>Connection Error</h2>
          <p>${error.message || 'An unexpected error occurred during Instagram authentication.'}</p>
          <script>
            setTimeout(() => {
              if (window.opener) window.close();
              else window.location.href = '${DASHBOARD_URL}?auth_error=${encodeURIComponent(error.message || 'server_error')}';
            }, 3000);
          </script>
        </body>
      </html>
    `);
  }
});
