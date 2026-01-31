# PhishGuard AI Production Deployment Guide

This guide details how to deploy the PhishGuard AI ecosystem to a public cloud provider like **Render** or **Railway**.

## Git LFS Setup (Required for Model)

Since the `url_model.pkl` is > 100MB, you must use Git LFS to push it to GitHub.

1. **Install Git LFS**:
   - Linux: `sudo apt install git-lfs`
   - Mac: `brew install git-lfs`
2. **Initialize LFS** in your repo:
   ```bash
   git lfs install
   ```
3. **Track model files**:
   ```bash
   git lfs track "*.pkl"
   git add .gitattributes
   ```
4. **Commit and Push**:
   ```bash
   git add ai-service/model/url_model.pkl
   git commit -m "feat: add AI model via Git LFS"
   git push origin main
   ```

---

### Step 1: Deploy the AI Inference Service
The AI service is a lightweight Python container.

1. Create a new **Web Service** on Render/Railway.
2. Select the `ai-service` directory.
3. Configure the following environment variables:
   - `PORT`: `5001` (or use the default assigned by the provider)
4. Take note of the public URL.

### Step 2: Deploy the Unified Backend
The Java backend orchestrates requests and needs to know where the AI service is located.

1. Create a new **Web Service** on Render/Railway.
2. Select the `backend` directory.
3. Configure the following environment variables:
   - `AI_SERVICE_URL`: `<Your AI Service Public URL from Step 1>` (e.g., `https://phishguard-ai.onrender.com`)
   - `PORT`: `8080`
4. Take note of the public API URL (e.g., `https://phishguard-api.onrender.com`).

### Step 3: Deploy the Website (Optional but Recommended)
The management dashboard should be hosted on a platform like **Vercel** or **Render**.

1. Create a new project pointing to `frontend/website`.
2. Configure the following environment variable:
   - `NEXT_PUBLIC_API_URL`: `<Your Backend Public URL from Step 2>/api/v1`
3. Deploy.

---

## Chrome Web Store Submission

Once your backend is live:

1. Update `frontend/extension/utils/storage.js` to change the default `BACKEND_URL` to your production API URL.
2. Zip the `frontend/extension` folder.
3. Upload to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
4. Provide the required Privacy Policy and store assets (I've drafted a privacy policy for you in `PRIVACY_POLICY.md`).

## Security Checklist
- [ ] Ensure all communication uses `HTTPS`.
- [ ] Monitor logs for suspicious patterns.
- [ ] Review permissions in `manifest.json` to ensure you only request what's necessary.
