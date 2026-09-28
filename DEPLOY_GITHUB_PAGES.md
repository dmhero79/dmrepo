# Deploying AutoDM to GitHub Pages

This app is fully configured for deployment on **GitHub Pages**.

---

### Method 1: Automatic Deployment via GitHub Actions (Recommended)

A workflow file has been created at `.github/workflows/deploy.yml`.

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages** (under "Code and automation" in the left sidebar).
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Every time you push to `main` (or `master`), GitHub Actions will automatically build and publish your site!
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

---

### Method 2: One-Command Manual Deploy via `gh-pages`

If you prefer deploying directly from your local terminal:

1. In your project directory, run:
   ```bash
   npm run deploy
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Source**, select **Deploy from a branch**.
   - Select the `gh-pages` branch and `/ (root)` folder, then click **Save**.

---

### Key Configurations Included:
- **`vite.config.ts`**: Configured with `base: './'` so that all assets, scripts, stylesheets, and fonts resolve properly on any subpath or custom domain.
- **`public/assets`**: Static assets and product images are placed in the `public/` directory so they are bundled into `dist/` upon build.
- **`package.json`**: Pre-configured with `npm run build`, `npm run predeploy`, and `npm run deploy`.
