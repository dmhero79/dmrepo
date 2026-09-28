# GitHub Pages + Firebase Webhook Architecture

This project connects your **GitHub Pages frontend** directly to **Firebase** for backend webhooks, persistent database storage, and Instagram Auto-DM automation — **no Render.com or external hosting needed**.

---

## The GitHub + Firebase Architecture

```text
1. Frontend (GitHub Pages)
   https://dmhero79.github.io/dmrepo/
   - Serves the dashboard UI
   - Connects in real-time to Firebase Firestore

2. Webhook & DM Automation (Firebase Cloud Functions)
   https://us-central1-gen-lang-client-0580617321.cloudfunctions.net/webhook
   - Public HTTPS endpoint provided by Google Cloud / Firebase
   - Handles GET (Meta Webhook Handshake: hub.challenge & hub.verify_token)
   - Handles POST (Receives Instagram comment events and dispatches DMs via Meta Graph API)

3. Persistent Storage (Firebase Firestore)
   - Stores active keyword rules in `/automations`
   - Stores real-time activity and DM logs in `/webhookLogs`
```

---

## 1-Step Deploy to Firebase

Your Firebase project has been provisioned:
- **Project ID:** `gen-lang-client-0580617321`

To deploy the webhook function:
```bash
# In your project root:
firebase deploy --only functions
```

Your function URL will be:
```text
https://us-central1-gen-lang-client-0580617321.cloudfunctions.net/webhook
```

---

## Meta Developer Dashboard Configuration

In **[developers.facebook.com](https://developers.facebook.com)** → Your App → **Instagram** → **Webhooks**:

- **Callback URL:**
  ```text
  https://us-central1-gen-lang-client-0580617321.cloudfunctions.net/webhook
  ```
- **Verify Token:**
  ```text
  autodm_meta_verify_token_2026
  ```

Click **Verify and Save**. Meta will handshake with the Firebase Cloud Function and verify with HTTP 200!
