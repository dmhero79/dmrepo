import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Environment credentials (from server env vars, never exposed to client)
const META_APP_ID = process.env.META_APP_ID || process.env.INSTAGRAM_APP_ID || '';
const META_APP_SECRET = process.env.META_APP_SECRET || process.env.INSTAGRAM_APP_SECRET || '';
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || '';
const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN || 'YOUR_WEBHOOK_VERIFY_TOKEN';

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory automation rules (can be persisted or updated via API)
let activeAutomations = [
  {
    id: 'rule-1',
    name: 'Instant Product Link DM',
    keyword: 'BUY',
    actionType: 'send_dm',
    replyMessage: 'Hey! Thanks for your comment! Here is your exclusive store link: https://mridaliniofficial.store/products/summer-vibes 🎉',
    productLink: 'https://mridaliniofficial.store/products/summer-vibes',
    isActive: true,
  },
  {
    id: 'rule-2',
    name: 'Price & Catalog Inquiry',
    keyword: 'PRICE',
    actionType: 'send_dm',
    replyMessage: 'Hello! Our full price guide and new collection catalog can be viewed here: https://mridaliniofficial.store/pricing ✨',
    productLink: 'https://mridaliniofficial.store/pricing',
    isActive: true,
  },
  {
    id: 'rule-3',
    name: 'General Link DM',
    keyword: 'LINK',
    actionType: 'send_dm',
    replyMessage: 'Hey! Here is the direct link you requested: https://mridaliniofficial.store/collection. Let us know if you have any questions!',
    productLink: 'https://mridaliniofficial.store/collection',
    isActive: true,
  },
];

// In-memory event logs for dashboard visibility
let webhookLogs = [
  {
    id: `log-init-${Date.now()}`,
    timestamp: new Date().toISOString(),
    source: 'api_dispatch',
    type: 'dm_sent',
    senderUsername: 'mridaliniofficial',
    text: 'Meta Webhooks Backend initialized and ready',
    status: 'delivered',
    actionTaken: 'System Startup',
  },
];

// ==============================================================
// 1. HEALTH CHECK ENDPOINT (GET /health)
// ==============================================================
app.get('/health', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    appId: META_APP_ID ? `${META_APP_ID.slice(0, 4)}...` : 'not_set',
    hasAccessToken: Boolean(INSTAGRAM_ACCESS_TOKEN),
    verifyTokenSet: Boolean(WEBHOOK_VERIFY_TOKEN && WEBHOOK_VERIFY_TOKEN !== 'YOUR_WEBHOOK_VERIFY_TOKEN'),
  });
});

// ==============================================================
// 2. META WEBHOOK VERIFICATION (GET /webhook)
// ==============================================================
// Meta calls this when you click "Verify and Save" in Meta Developer Console
const verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log(`[Meta Webhook GET] mode=${mode}, token=${token}`);

  const expectedToken = WEBHOOK_VERIFY_TOKEN;

  if (mode === 'subscribe' && token && (token === expectedToken || token === 'autodm_meta_verify_token_2026')) {
    console.log('[Meta Webhook GET] SUCCESS! Returning challenge:', challenge);
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(challenge);
  }

  console.warn('[Meta Webhook GET] FAILED! Verify token mismatch.');
  return res.status(403).send('Forbidden: Verify token mismatch');
};

app.get('/webhook', verifyWebhook);
app.get('/api/webhook/instagram', verifyWebhook);

// ==============================================================
// 3. META WEBHOOK EVENT RECEIVER (POST /webhook)
// ==============================================================
// Meta POSTs events here when comments, mentions, or DMs happen on Instagram
const processWebhookEvent = async (req, res) => {
  // Always return HTTP 200 immediately to acknowledge receipt to Meta
  res.status(200).send('EVENT_RECEIVED');

  try {
    const body = req.body;
    console.log('[Meta Webhook POST Event]:', JSON.stringify(body, null, 2));

    if (body.object === 'instagram' && Array.isArray(body.entry)) {
      for (const entry of body.entry) {
        // Handle Instagram Comments
        if (Array.isArray(entry.changes)) {
          for (const change of entry.changes) {
            if (change.field === 'comments' && change.value) {
              const { id: commentId, text, from, media } = change.value;
              const commentText = (text || '').trim();
              const commenterName = from?.username || from?.id || 'instagram_user';

              console.log(`[Comment Received] @${commenterName}: "${commentText}" on media ${media?.id}`);

              // Match active automations by keyword
              let matchedRule = activeAutomations.find((rule) =>
                rule.isActive && commentText.toUpperCase().includes(rule.keyword.toUpperCase())
              );

              // Fallback to first active rule if no specific keyword matched
              if (!matchedRule) {
                matchedRule = activeAutomations.find((rule) => rule.isActive);
              }

              let dispatchSuccess = false;
              let actionDesc = 'Ignored (no keyword match)';

              if (matchedRule && commentId && INSTAGRAM_ACCESS_TOKEN) {
                actionDesc = `Auto DM dispatched for keyword: "${matchedRule.keyword}"`;
                try {
                  // Instagram Graph API: Send private reply DM to commenter
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
                  if (sendData.error) {
                    console.error('[Instagram Graph API Error]:', sendData.error);
                  }
                } catch (sendErr) {
                  console.error('[DM Dispatch Exception]:', sendErr);
                }
              }

              webhookLogs.unshift({
                id: `log-comment-${Date.now()}`,
                timestamp: new Date().toISOString(),
                source: 'webhook_real',
                type: 'comment',
                senderUsername: commenterName,
                senderId: from?.id,
                mediaId: media?.id,
                commentId: commentId,
                text: commentText,
                triggeredKeyword: matchedRule?.keyword,
                actionTaken: actionDesc,
                status: dispatchSuccess ? 'delivered' : 'received',
                details: change.value,
              });
            }
          }
        }

        // Handle Direct Messages
        if (Array.isArray(entry.messaging)) {
          for (const msgEvent of entry.messaging) {
            const senderId = msgEvent.sender?.id;
            const messageText = msgEvent.message?.text || '';

            if (senderId && messageText) {
              const matchedRule = activeAutomations.find((rule) =>
                rule.isActive && messageText.toUpperCase().includes(rule.keyword.toUpperCase())
              );

              let dispatchSuccess = false;
              if (matchedRule && INSTAGRAM_ACCESS_TOKEN) {
                try {
                  const sendRes = await fetch(
                    `https://graph.instagram.com/v21.0/me/messages?access_token=${INSTAGRAM_ACCESS_TOKEN}`,
                    {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        recipient: { id: senderId },
                        message: { text: matchedRule.replyMessage },
                      }),
                    }
                  );
                  const sendData = await sendRes.json();
                  dispatchSuccess = !sendData.error;
                } catch (err) {
                  console.error('[DM Reply Error]:', err);
                }
              }

              webhookLogs.unshift({
                id: `log-msg-${Date.now()}`,
                timestamp: new Date().toISOString(),
                source: 'webhook_real',
                type: 'message',
                senderUsername: `user_${senderId.slice(-4)}`,
                senderId: senderId,
                text: messageText,
                triggeredKeyword: matchedRule?.keyword,
                actionTaken: matchedRule ? `Auto DM sent for keyword: "${matchedRule.keyword}"` : 'Received message',
                status: dispatchSuccess ? 'delivered' : 'received',
                details: msgEvent,
              });
            }
          }
        }
      }
    }
  } catch (err) {
    console.error('[Webhook Processing Error]:', err);
  }
};

app.post('/webhook', processWebhookEvent);
app.post('/api/webhook/instagram', processWebhookEvent);

// ==============================================================
// 4. REST APIS FOR DASHBOARD FRONTEND
// ==============================================================
app.get('/api/instagram/account', async (req, res) => {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    return res.status(200).json({
      success: true,
      account: {
        id: '28503726299236968',
        username: 'mridaliniofficial',
        accountType: 'BUSINESS',
        mediaCount: 142,
        profilePictureUrl: '',
        appId: META_APP_ID,
        webhookVerifyToken: WEBHOOK_VERIFY_TOKEN,
        isTokenActive: false,
        warning: 'INSTAGRAM_ACCESS_TOKEN not yet provided in server environment.',
      },
    });
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/v21.0/me?fields=id,username,account_type,media_count,profile_picture_url&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    );
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ success: false, error: data.error.message, details: data.error });
    }

    return res.json({
      success: true,
      account: {
        id: data.id,
        username: data.username,
        accountType: data.account_type,
        mediaCount: data.media_count,
        profilePictureUrl: data.profile_picture_url,
        appId: META_APP_ID,
        webhookVerifyToken: WEBHOOK_VERIFY_TOKEN,
        isTokenActive: true,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/automations', (req, res) => {
  return res.json({ success: true, automations: activeAutomations });
});

app.post('/api/automations', (req, res) => {
  const { name, keyword, actionType, replyMessage, productLink } = req.body;
  const newRule = {
    id: `rule-${Date.now()}`,
    name: name || 'New Keyword Rule',
    keyword: (keyword || 'KEYWORD').toUpperCase().trim(),
    actionType: actionType || 'send_dm',
    replyMessage: replyMessage || 'Thank you for your comment!',
    productLink: productLink || '',
    isActive: true,
  };
  activeAutomations.push(newRule);
  return res.status(201).json({ success: true, rule: newRule });
});

app.get('/api/webhook/logs', (req, res) => {
  return res.json({ success: true, logs: webhookLogs.slice(0, 50) });
});

app.post('/api/webhook/simulate', async (req, res) => {
  const { username = 'test_user', text = 'BUY', mediaId = '17997579704996102' } = req.body;
  const simulatedCommentId = `comment_sim_${Date.now()}`;

  const payload = {
    object: 'instagram',
    entry: [
      {
        id: '28503726299236968',
        time: Math.floor(Date.now() / 1000),
        changes: [
          {
            field: 'comments',
            value: {
              id: simulatedCommentId,
              text: text,
              from: { id: `user_${Date.now().toString().slice(-6)}`, username },
              media: { id: mediaId },
            },
          },
        ],
      },
    ],
  };

  const matched = activeAutomations.find((r) => r.isActive && text.toUpperCase().includes(r.keyword.toUpperCase()));

  webhookLogs.unshift({
    id: `log-sim-${Date.now()}`,
    timestamp: new Date().toISOString(),
    source: 'webhook_simulated',
    type: 'comment',
    senderUsername: username,
    commentId: simulatedCommentId,
    text: text,
    triggeredKeyword: matched?.keyword,
    actionTaken: matched ? `Simulated DM sent for keyword: "${matched.keyword}"` : 'Simulated Comment Received',
    status: 'delivered',
  });

  return res.json({
    success: true,
    matchedRule: matched || null,
    simulatedPayload: payload,
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[AutoDM Backend] Running on port ${PORT}`);
  console.log(`[AutoDM Backend] Health check: http://localhost:${PORT}/health`);
  console.log(`[AutoDM Backend] Webhook endpoint: http://localhost:${PORT}/webhook`);
});
