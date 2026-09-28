# Deploying Your Webhook to Firebase (No Render.com needed!)

Your Firebase project has already been provisioned:
- **Firebase Project ID:** `gen-lang-client-0580617321`
- **Firestore Database:** Connected and rules deployed

---

## Architecture: GitHub Pages + Firebase Cloud Functions

```text
Instagram Comment
       ↓
Meta Webhook Call
       ↓
Firebase Cloud Function (GET & POST /webhook)
       ↓
Instagram Graph API (Sends DM) + Firebase Firestore (Saves Log)
       ↓ (Real-time live sync)
GitHub Pages Frontend (https://dmhero79.github.io/dmrepo/)
```

---

## 1. Deploy the Function to Firebase

In your project directory:

```bash
# Login to Firebase (if not already logged in)
firebase login

# Set your project
firebase use gen-lang-client-0580617321

# Deploy the functions
firebase deploy --only functions
```

Firebase will output your live HTTPS URL:
```text
Function URL (health): https://us-central1-gen-lang-client-0580617321.cloudfunctions.net/health
Function URL (webhook): https://us-central1-gen-lang-client-0580617321.cloudfunctions.net/webhook
```

---

## 2. Configure Meta Developer Portal

1. Go to **[developers.facebook.com](https://developers.facebook.com)** → Your App → **Instagram** → **Webhooks**.
2. Click **Edit Subscription** or **Configure Webhook**:
   - **Callback URL:**
     ```text
     https://us-central1-gen-lang-client-0580617321.cloudfunctions.net/webhook
     ```
   - **Verify Token:**
     ```text
     autodm_meta_verify_token_2026
     ```
3. Click **Verify and Save**.
4. Meta will verify the handshake with `HTTP 200` instantly!
