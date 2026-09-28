import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Instagram / Meta Credentials (loaded securely from environment variables)
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN || '';
const INSTAGRAM_APP_ID = process.env.INSTAGRAM_APP_ID || process.env.META_APP_ID || '';
const INSTAGRAM_APP_SECRET = process.env.INSTAGRAM_APP_SECRET || process.env.META_APP_SECRET || '';
const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN || 'autodm_meta_verify_token_2026';
const INSTAGRAM_WEBHOOK_VERIFY_TOKEN = WEBHOOK_VERIFY_TOKEN;

// In-memory logs of real and simulated webhook events and DM dispatches
interface WebhookEventLog {
  id: string;
  timestamp: string;
  source: 'webhook_real' | 'webhook_simulated' | 'api_dispatch';
  type: 'comment' | 'message' | 'mention' | 'dm_sent' | 'error';
  senderUsername: string;
  senderId?: string;
  mediaId?: string;
  commentId?: string;
  text: string;
  triggeredKeyword?: string;
  actionTaken?: string;
  status: 'delivered' | 'received' | 'failed' | 'ignored';
  details?: any;
}

const webhookLogs: WebhookEventLog[] = [
  {
    id: 'log-init-1',
    timestamp: new Date().toISOString(),
    source: 'api_dispatch',
    type: 'dm_sent',
    senderUsername: 'mridaliniofficial',
    text: 'Meta Webhooks listener initialized for @mridaliniofficial',
    status: 'delivered',
    actionTaken: 'System Startup',
  }
];

// Active automation rules
interface AutomationRule {
  id: string;
  name: string;
  keyword: string;
  actionType: 'send_dm' | 'reply_comment' | 'send_product';
  replyMessage: string;
  productLink?: string;
  isActive: boolean;
}

let activeAutomations: AutomationRule[] = [
  {
    id: 'rule-1',
    name: 'Instant Product Link DM',
    keyword: 'BUY',
    actionType: 'send_dm',
    replyMessage: 'Hey! Thanks for your comment on our post! Here is your exclusive store link: https://mridaliniofficial.store/products/summer-vibes 🎉',
    productLink: 'https://mridaliniofficial.store/products/summer-vibes',
    isActive: true,
  },
  {
    id: 'rule-2',
    name: 'Price & Catalog Inquiry',
    keyword: 'PRICE',
    actionType: 'send_dm',
    replyMessage: 'Hi there! The item shown is currently on sale for $49.99 (Free Worldwide Shipping). Check it out here: https://mridaliniofficial.store ✨',
    productLink: 'https://mridaliniofficial.store',
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
  }
];

// Middleware & CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================================================
// 0. HEALTH CHECK ENDPOINT (GET /health)
// ==============================================================
// Used to verify that backend is running and reachable
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==============================================================
// 1. INSTAGRAM GRAPH API STATUS & ACCOUNT ENDPOINT
// ==============================================================
app.get('/api/instagram/account', async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      `https://graph.instagram.com/v21.0/me?fields=id,username,account_type,media_count,profile_picture_url&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    );
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({
        success: false,
        error: data.error.message,
        details: data.error,
      });
    }

    return res.json({
      success: true,
      account: {
        id: data.id,
        username: data.username,
        accountType: data.account_type,
        mediaCount: data.media_count,
        profilePictureUrl: data.profile_picture_url,
        appId: INSTAGRAM_APP_ID,
        webhookVerifyToken: INSTAGRAM_WEBHOOK_VERIFY_TOKEN,
        isTokenActive: true,
        connectedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==============================================================
// 2. FETCH REAL INSTAGRAM POSTS & REELS
// ==============================================================
app.get('/api/instagram/posts', async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      `https://graph.instagram.com/v21.0/me/media?fields=id,caption,media_type,permalink,thumbnail_url,media_url,timestamp,comments_count,like_count&limit=10&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    );
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ success: false, error: data.error.message });
    }

    return res.json({
      success: true,
      posts: data.data || [],
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==============================================================
// 3. SEND DIRECT MESSAGE OR PRIVATE REPLY VIA INSTAGRAM GRAPH API
// ==============================================================
app.post('/api/instagram/send-dm', async (req: Request, res: Response) => {
  const { recipientId, commentId, messageText } = req.body;

  if (!messageText) {
    return res.status(400).json({ success: false, error: 'messageText is required' });
  }

  if (!recipientId && !commentId) {
    return res.status(400).json({ success: false, error: 'recipientId or commentId is required' });
  }

  const payload: any = {
    message: { text: messageText },
  };

  if (commentId) {
    payload.recipient = { comment_id: commentId };
  } else if (recipientId) {
    payload.recipient = { id: recipientId };
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/v21.0/me/messages?access_token=${INSTAGRAM_ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (data.error) {
      webhookLogs.unshift({
        id: `log-err-${Date.now()}`,
        timestamp: new Date().toISOString(),
        source: 'api_dispatch',
        type: 'error',
        senderUsername: 'mridaliniofficial',
        text: `Failed to send DM: ${data.error.message}`,
        status: 'failed',
        details: data.error,
      });

      return res.status(400).json({
        success: false,
        error: data.error.message,
        details: data.error,
      });
    }

    webhookLogs.unshift({
      id: `log-dm-${Date.now()}`,
      timestamp: new Date().toISOString(),
      source: 'api_dispatch',
      type: 'dm_sent',
      senderUsername: 'mridaliniofficial',
      senderId: recipientId,
      commentId: commentId,
      text: messageText,
      status: 'delivered',
      details: data,
    });

    return res.json({
      success: true,
      result: data,
      recipient: recipientId || `comment:${commentId}`,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==============================================================
// 4. META WEBHOOK VERIFICATION (GET /webhook & GET /api/webhook/instagram)
// ==============================================================
// Meta calls this when configuring the Webhook callback in Meta App Dashboard
const handleWebhookVerification = (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'] as string | undefined;
  const challenge = req.query['hub.challenge'];

  console.log(`[Meta Webhook Verification] mode=${mode}, token=${token}`);

  const validTokens = [
    process.env.WEBHOOK_VERIFY_TOKEN,
    process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN,
    'autodm_meta_verify_token_2026',
  ].filter(Boolean);

  if (mode === 'subscribe' && token && validTokens.includes(token)) {
    console.log('[Meta Webhook Verification] SUCCESS! Challenge returned:', challenge);
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(challenge);
  }

  // Also support subscribe if challenge is present and token matches configured verify token
  if (mode === 'subscribe' && token && token === WEBHOOK_VERIFY_TOKEN) {
    console.log('[Meta Webhook Verification] SUCCESS with WEBHOOK_VERIFY_TOKEN! Challenge:', challenge);
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(challenge);
  }

  console.warn('[Meta Webhook Verification] FAILED! Verify token mismatch. Got:', token);
  return res.status(403).send('Forbidden: Verify token mismatch');
};

app.get('/webhook', handleWebhookVerification);
app.get('/api/webhook/instagram', handleWebhookVerification);

// ==============================================================
// 5. META WEBHOOK EVENT RECEIVER (POST /webhook & POST /api/webhook/instagram)
// ==============================================================
// Meta POSTs real-time events when comments or messages occur on Instagram
const handleWebhookEvent = async (req: Request, res: Response) => {
  // Always return 200 OK immediately so Meta knows the event was received
  res.status(200).send('EVENT_RECEIVED');

  try {
    const body = req.body;
    console.log('[Meta Webhook Inbound Event]', JSON.stringify(body, null, 2));

    if (body.object === 'instagram' && Array.isArray(body.entry)) {
      for (const entry of body.entry) {
        // Handle comment changes
        if (Array.isArray(entry.changes)) {
          for (const change of entry.changes) {
            if (change.field === 'comments' && change.value) {
              const { id: commentId, text, from, media } = change.value;
              const commentText = (text || '').trim();
              const commenterName = from?.username || from?.id || 'instagram_user';

              console.log(`[New Comment] From @${commenterName}: "${commentText}" on media ${media?.id}`);

              // Match active automations
              let matchedRule = activeAutomations.find(rule => 
                rule.isActive && commentText.toUpperCase().includes(rule.keyword.toUpperCase())
              );

              // Fallback to general rule if user just said something like "price please" or "link"
              if (!matchedRule) {
                matchedRule = activeAutomations.find(rule => rule.isActive);
              }

              let dispatchSuccess = false;
              let actionDesc = 'Ignored (no keyword match)';

              if (matchedRule && commentId) {
                actionDesc = `Auto DM sent for keyword: "${matchedRule.keyword}"`;
                try {
                  // Fire private reply DM to commenter
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
                  console.error('Failed to dispatch auto DM:', sendErr);
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

        // Handle direct incoming messages
        if (Array.isArray(entry.messaging)) {
          for (const msgEvent of entry.messaging) {
            const senderId = msgEvent.sender?.id;
            const messageText = msgEvent.message?.text || '';

            console.log(`[New Direct Message] From ${senderId}: "${messageText}"`);

            const matchedRule = activeAutomations.find(rule => 
              rule.isActive && messageText.toUpperCase().includes(rule.keyword.toUpperCase())
            ) || activeAutomations[0];

            let dispatchSuccess = false;
            if (matchedRule && senderId) {
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
              } catch (sendErr) {
                console.error('Failed to dispatch auto DM:', sendErr);
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
              actionTaken: matchedRule ? `Auto DM sent for keyword: "${matchedRule.keyword}"` : 'Received',
              status: dispatchSuccess ? 'delivered' : 'received',
              details: msgEvent,
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('[Meta Webhook Processing Error]:', error);
  }
};

app.post('/webhook', handleWebhookEvent);
app.post('/api/webhook/instagram', handleWebhookEvent);

// ==============================================================
// 6. SIMULATE / TEST WEBHOOK EVENT DIRECTLY FROM DASHBOARD
// ==============================================================
app.post('/api/webhook/simulate', async (req: Request, res: Response) => {
  const { username = 'priya_creator', text = 'BUY', type = 'comment', mediaId = '17997579704996102' } = req.body;

  const matchedRule = activeAutomations.find(rule => 
    rule.isActive && text.toUpperCase().includes(rule.keyword.toUpperCase())
  ) || activeAutomations[0];

  const logEntry: WebhookEventLog = {
    id: `log-sim-${Date.now()}`,
    timestamp: new Date().toISOString(),
    source: 'webhook_simulated',
    type: type as any,
    senderUsername: username,
    mediaId: mediaId,
    text: text,
    triggeredKeyword: matchedRule?.keyword || 'BUY',
    actionTaken: matchedRule 
      ? `Auto DM triggered: "${matchedRule.replyMessage.slice(0, 45)}..."`
      : 'No matching keyword',
    status: 'delivered',
    details: {
      replyMessage: matchedRule?.replyMessage,
      productLink: matchedRule?.productLink,
    }
  };

  webhookLogs.unshift(logEntry);

  return res.json({
    success: true,
    message: `Simulated ${type} event processed successfully!`,
    log: logEntry,
    autoReply: matchedRule?.replyMessage,
  });
});

// ==============================================================
// 7. GET WEBHOOK EVENT LOGS
// ==============================================================
app.get('/api/webhook/logs', (req: Request, res: Response) => {
  return res.json({
    success: true,
    logs: webhookLogs.slice(0, 50),
  });
});

// ==============================================================
// 8. AUTOMATION RULES MANAGEMENT
// ==============================================================
app.get('/api/automations', (req: Request, res: Response) => {
  return res.json({
    success: true,
    automations: activeAutomations,
  });
});

app.post('/api/automations', (req: Request, res: Response) => {
  const { name, keyword, replyMessage, productLink } = req.body;
  if (!name || !keyword || !replyMessage) {
    return res.status(400).json({ success: false, error: 'Name, keyword, and replyMessage are required' });
  }

  const newRule: AutomationRule = {
    id: `rule-${Date.now()}`,
    name,
    keyword: keyword.toUpperCase().trim(),
    actionType: 'send_dm',
    replyMessage,
    productLink: productLink || 'https://mridaliniofficial.store',
    isActive: true,
  };

  activeAutomations.push(newRule);
  return res.json({ success: true, automation: newRule });
});

// ==============================================================
// 9. WEBHOOK SETUP CONFIGURATION FOR USER (META DASHBOARD HELP)
// ==============================================================
app.get('/api/webhook/config', (req: Request, res: Response) => {
  const host = req.get('host') || 'localhost:3000';
  const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  return res.json({
    success: true,
    callbackUrl: `${baseUrl}/api/webhook/instagram`,
    verifyToken: INSTAGRAM_WEBHOOK_VERIFY_TOKEN,
    account: {
      username: 'mridaliniofficial',
      id: '28503726299236968',
      appId: INSTAGRAM_APP_ID,
    },
    fieldsToSubscribe: ['messages', 'comments', 'mentions'],
  });
});

// ==============================================================
// 10. VITE SPA / STATIC FILE MOUNTING
// ==============================================================
async function initServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AutoDM Full-Stack server running on port ${PORT}`);
    console.log(`Instagram Webhook Verify Token: ${INSTAGRAM_WEBHOOK_VERIFY_TOKEN}`);
  });
}

initServer().catch((err) => {
  console.error('Failed to start server:', err);
});
