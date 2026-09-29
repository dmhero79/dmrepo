import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// Config from environment
const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN || 'autodm_meta_verify_token_2026';
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || 'IGAAPl048uu5RBZAFp4VlJ1N2NpQW13OTR3cEFUMDVOQlNMZAWdhV2kwRkVpVGVaUk5VZATJ1SzlsUnFyVzJkeGdDY0hQdHZASQnhiaDY2aENlZAzRtS2FIZA3k4TzFSWFZACdDJBQnRWX2xZAN1RGanduUS1NVjZAlVC1vTkxjeDdPZAUhGRQZDZD';

/**
 * Health check endpoint
 * URL: https://<region>-<project-id>.cloudfunctions.net/health
 */
export const health = onRequest({ cors: true }, (req, res) => {
  return res.status(200).json({
    status: 'ok',
    service: 'firebase-functions',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Meta / Instagram Webhook endpoint
 * Handles both GET (handshake verification) and POST (comment events)
 * URL: https://<region>-<project-id>.cloudfunctions.net/webhook
 */
export const webhook = onRequest({ cors: true }, async (req, res) => {
  // 1. GET: Webhook Verification Handshake
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log(`[Meta Webhook GET] mode=${mode}, token=${token}`);

    if (mode === 'subscribe' && token && (token === WEBHOOK_VERIFY_TOKEN || token === 'autodm_meta_verify_token_2026')) {
      console.log('[Meta Webhook GET] Verification SUCCESS! Returning challenge:', challenge);
      res.setHeader('Content-Type', 'text/plain');
      return res.status(200).send(challenge);
    }

    console.warn('[Meta Webhook GET] Verification FAILED. Token mismatch.');
    return res.status(403).send('Forbidden: Verify token mismatch');
  }

  // 2. POST: Inbound Instagram Events (Comments, Messages)
  if (req.method === 'POST') {
    // Return 200 OK immediately so Meta receives prompt acknowledgment
    res.status(200).send('EVENT_RECEIVED');

    try {
      const body = req.body;
      console.log('[Meta Webhook POST Event]:', JSON.stringify(body, null, 2));

      // Fetch active keyword rules from Firestore
      let activeRules = [];
      try {
        const rulesSnap = await db.collection('automations').where('isActive', '==', true).get();
        activeRules = rulesSnap.docs.map(doc => doc.data());
      } catch (dbErr) {
        console.warn('Could not fetch rules from Firestore, using defaults:', dbErr.message);
        activeRules = [
          { keyword: 'BUY', replyMessage: 'Thanks for commenting! Here is your exclusive store link: https://mridaliniofficial.store/products/summer-vibes 🎉', isActive: true },
          { keyword: 'PRICE', replyMessage: 'Hello! Our price guide is here: https://mridaliniofficial.store/pricing ✨', isActive: true },
          { keyword: 'LINK', replyMessage: 'Here is your direct link: https://mridaliniofficial.store/collection 🚀', isActive: true },
        ];
      }

      if (body.object === 'instagram' && Array.isArray(body.entry)) {
        for (const entry of body.entry) {
          if (Array.isArray(entry.changes)) {
            for (const change of entry.changes) {
              if (change.field === 'comments' && change.value) {
                const { id: commentId, text, from, media } = change.value;
                const commentText = (text || '').trim();
                const commenterName = from?.username || from?.id || 'instagram_user';

                console.log(`[Comment] @${commenterName}: "${commentText}" on post ${media?.id}`);

                // Match keyword
                let matchedRule = activeRules.find(r => 
                  commentText.toUpperCase().includes((r.keyword || '').toUpperCase())
                );
                if (!matchedRule && activeRules.length > 0) {
                  matchedRule = activeRules[0];
                }

                let dispatchSuccess = false;
                let actionTaken = 'Ignored (no keyword match)';

                if (matchedRule && commentId && INSTAGRAM_ACCESS_TOKEN) {
                  actionTaken = `Auto DM sent for keyword: "${matchedRule.keyword}"`;
                  try {
                    const sendRes = await fetch(
                      `https://graph.instagram.com/v21.0/me/messages?access_token=${INSTAGRAM_ACCESS_TOKEN}`,
                      {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          recipient: { comment_id: commentId },
                          message: { text: matchedRule.replyMessage },
                        }),
                      }
                    );
                    const sendData = await sendRes.json();
                    dispatchSuccess = !sendData.error;
                  } catch (sendErr) {
                    console.error('Failed to send Instagram DM:', sendErr);
                  }
                }

                // Log event into Firestore
                try {
                  const logId = `log-${Date.now()}`;
                  await db.collection('webhookLogs').doc(logId).set({
                    id: logId,
                    timestamp: new Date().toISOString(),
                    source: 'webhook_real',
                    type: 'comment',
                    senderUsername: commenterName,
                    commentId: commentId || '',
                    text: commentText,
                    triggeredKeyword: matchedRule?.keyword || '',
                    actionTaken,
                    status: dispatchSuccess ? 'delivered' : 'received',
                  });
                } catch (logErr) {
                  console.error('Failed to save log to Firestore:', logErr);
                }
              }
            }
          }
        }
      }
    } catch (err) {
      console.error('[Webhook Processing Error]:', err);
    }
    return;
  }

  return res.status(405).send('Method Not Allowed');
});
