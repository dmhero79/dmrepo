# AutoDM Standalone Backend

This is the standalone Node.js Express backend that handles Meta / Instagram Webhooks, comment keyword detection, and Instagram Graph API private DM dispatches.

---

## Why a Separate Backend is Required
- **GitHub Pages (`dmhero79.github.io`) is static-only:** It cannot run a Node.js process to listen for Meta's `GET /webhook` and `POST /webhook` requests.
- Meta requires a public HTTPS server that returns `HTTP 200` with the `hub.challenge` string upon verification.

---

## Endpoints Provided

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check endpoint. Returns `{"status":"ok"}`. |
| `GET` | `/webhook` | Meta Webhook Handshake verification (validates `hub.verify_token`, returns `hub.challenge`). |
| `POST` | `/webhook` | Meta Webhook Event receiver (receives comment/message events and triggers auto-DMs). |
| `GET` | `/api/instagram/account` | Retrieves connected Instagram business profile data. |
| `GET` | `/api/automations` | Retrieves active keyword rules. |
| `POST` | `/api/automations` | Creates a new keyword rule. |
| `GET` | `/api/webhook/logs` | Real-time logs of received webhooks and DM dispatches. |

---

## 2-Minute Deployment to Render.com (Free)

1. Sign up / Log in to [render.com](https://render.com).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository (`dmhero79/dmrepo`).
4. Set the following settings:
   - **Root Directory:** `backend` (or leave empty if deploying a dedicated repo)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
5. Under **Environment Variables**, add:
   - `META_APP_ID` = `YOUR_META_APP_ID`
   - `META_APP_SECRET` = `YOUR_META_APP_SECRET`
   - `INSTAGRAM_ACCESS_TOKEN` = `YOUR_INSTAGRAM_ACCESS_TOKEN`
   - `WEBHOOK_VERIFY_TOKEN` = `YOUR_WEBHOOK_VERIFY_TOKEN`
6. Click **Deploy Web Service**.
7. Test your backend in your browser:
   `https://<YOUR-RENDER-APP>.onrender.com/health`
   Should return: `{"status":"ok",...}`
8. In Meta Developer Dashboard → Instagram → Webhooks:
   - **Callback URL:** `https://<YOUR-RENDER-APP>.onrender.com/webhook`
   - **Verify Token:** `YOUR_WEBHOOK_VERIFY_TOKEN`
   - Click **Verify and Save**!
