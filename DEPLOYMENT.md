# 🚀 Complete Deployment Guide - Get Your Project Live!

## 📋 Overview

We'll deploy in this order:
1. **Push code to GitHub** (Required first)
2. **Deploy Frontend to Vercel** (Free, 2 minutes)
3. **Deploy Backend to Railway** (Free, 3 minutes)
4. **Connect them together**
5. **Get your live URL!**

**Total Time:** 10-15 minutes
**Cost:** $0 (100% Free)

---

## STEP 1: Push to GitHub (Required)

### 1.1 Create GitHub Repository

1. Go to: https://github.com/new
2. Fill in details:
   - **Repository name:** `ai-job-tracker`
   - **Description:** "AI-Powered Job Tracker with Smart Matching"
   - **Visibility:** ✅ **Public** (required for free hosting)
   - **DO NOT** check "Add README" (we already have one)
3. Click **"Create repository"**

### 1.2 Push Your Code

Open terminal in VS Code and run:

```bash
# Navigate to your project
cd C:\Users\admin\Desktop\ai-job-tracker

# Add GitHub remote (REPLACE YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/ai-job-tracker.git

# Push to GitHub
git push -u origin main
```

**If you get an error about authentication:**
```bash
# Use this instead (will ask for username/password)
git remote set-url origin https://YOUR_USERNAME@github.com/YOUR_USERNAME/ai-job-tracker.git
git push -u origin main
```

✅ **Checkpoint:** Your code is now on GitHub!

---

## STEP 2: Deploy Backend to Railway (3 minutes)

### 2.1 Sign Up for Railway

1. Go to: https://railway.app/
2. Click **"Login"** or **"Start a New Project"**
3. **Sign in with GitHub** (easiest option)
4. Click **"Authorize Railway"**

### 2.2 Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your **`ai-job-tracker`** repository
4. Railway will auto-detect Node.js

### 2.3 Configure Backend

1. In Railway dashboard, click your project
2. Click **"Settings"** tab
3. Under **"Service Settings":**
   - **Root Directory:** `backend`
   - **Start Command:** `npm start`
   - **Watch Paths:** Leave default

4. Click **"Variables"** tab
5. Click **"+ New Variable"** and add these:

```
PORT=3001
FRONTEND_URL=https://your-app.vercel.app
```

(We'll update FRONTEND_URL after deploying frontend)

### 2.4 Generate Public URL

1. Click **"Settings"** tab
2. Scroll to **"Networking"**
3. Click **"Generate Domain"**
4. **Copy the generated URL** (e.g., `https://ai-job-tracker-production.up.railway.app`)

✅ **Save this URL!** You'll need it for frontend.

---

## STEP 3: Deploy Frontend to Vercel (2 minutes)

### 3.1 Sign Up for Vercel

1. Go to: https://vercel.com/
2. Click **"Sign Up"**
3. **Sign up with GitHub** (recommended)
4. Click **"Authorize Vercel"**

### 3.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Find your **`ai-job-tracker`** repository
3. Click **"Import"**

### 3.3 Configure Deployment

**Framework Preset:** Vite (auto-detected)

**Root Directory:** 
- Click **"Edit"**
- Type: `frontend`
- Click **"Continue"**

**Build Settings:** (Auto-filled, verify these)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**Environment Variables:**
- Click **"Environment Variables"**
- Add variable:
  - **Name:** `VITE_API_URL`
  - **Value:** `https://your-railway-url.up.railway.app/api`
  - (Use the Railway URL from Step 2.4, add `/api` at the end)

### 3.4 Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes (watch the build logs)
3. ✅ **Success!** Click **"Visit"** to see your live site

**Copy your Vercel URL** (e.g., `https://ai-job-tracker-xyz.vercel.app`)

---

## STEP 4: Connect Frontend & Backend

### 4.1 Update Backend CORS

1. Go back to **Railway dashboard**
2. Click your project
3. Click **"Variables"** tab
4. Find **`FRONTEND_URL`**
5. Update value to your **actual Vercel URL**:
   ```
   https://ai-job-tracker-xyz.vercel.app
   ```
6. Railway will auto-redeploy

### 4.2 Verify Environment Variables

**Railway (Backend):**
```
PORT=3001
FRONTEND_URL=https://ai-job-tracker-xyz.vercel.app
```

**Vercel (Frontend):**
```
VITE_API_URL=https://ai-job-tracker-production.up.railway.app/api
```

---

## STEP 5: Test Your Live Site! 🎉

1. Open your **Vercel URL** in browser
2. You should see the Job Tracker app!
3. Upload a resume
4. Browse jobs with AI match scores
5. Click "Apply" on a job
6. Return to app → Smart popup appears
7. Confirm application
8. Go to Applications tab → See it tracked!

---

## 🎯 Your Live URLs

**Frontend (User visits this):**
```
https://your-app-name.vercel.app
```

**Backend API:**
```
https://your-backend.up.railway.app
```

**GitHub Repository:**
```
https://github.com/YOUR_USERNAME/ai-job-tracker
```

---

## 🐛 Troubleshooting

### Issue 1: "Build Failed" on Vercel

**Solution:**
```bash
# Test build locally first
cd frontend
npm run build

# If it works locally, redeploy on Vercel
```

### Issue 2: "Cannot connect to backend"

**Check:**
1. Railway deployment succeeded
2. `VITE_API_URL` has correct Railway URL
3. `FRONTEND_URL` in Railway matches Vercel URL
4. Both have `/api` and no trailing slashes

**Test backend directly:**
```
Open: https://your-railway-url.up.railway.app/api/health
Should return: {"status":"ok"}
```

### Issue 3: "Jobs not loading"

This is **normal!** The app works without API keys:
- Uses 15 mock jobs
- AI matching works with rule-based algorithm
- Everything functional without external APIs

### Issue 4: "CORS Error"

**Fix:**
1. Go to Railway → Variables
2. Update `FRONTEND_URL` to exact Vercel URL
3. No trailing slash: ✅ `https://app.vercel.app`
4. With trailing slash: ❌ `https://app.vercel.app/`

---

## 🔧 Optional: Add API Keys

After deployment, you can add these for enhanced features:

### Get JSearch API Key (Real Jobs)

1. Go to: https://rapidapi.com/
2. Sign up free
3. Search "JSearch"
4. Subscribe to free tier (500 requests/month)
5. Copy API key
6. Add to Railway variables:
   ```
   RAPIDAPI_KEY=your_key_here
   ```

### Get Upstash Redis (Persistent Storage)

1. Go to: https://console.upstash.com/
2. Sign up free
3. Create new Redis database
4. Copy REST URL and Token
5. Add to Railway variables:
   ```
   UPSTASH_REDIS_REST_URL=your_url_here
   UPSTASH_REDIS_REST_TOKEN=your_token_here
   ```

### Get OpenAI Key (Enhanced AI)

1. Go to: https://platform.openai.com/
2. Create account
3. Go to API Keys
4. Create new key
5. Add to Railway:
   ```
   OPENAI_API_KEY=your_key_here
   ```

**Note:** App works perfectly WITHOUT these keys!

---

## 📱 Share Your Project

### For Assignment Submission:

**Live Demo URL:**
```
https://your-app-name.vercel.app
```

**GitHub Repository:**
```
https://github.com/YOUR_USERNAME/ai-job-tracker
```

**README with Docs:**
```
https://github.com/YOUR_USERNAME/ai-job-tracker/blob/main/README.md
```

### For Portfolio:

Add to your portfolio as:
- **Project Name:** AI-Powered Job Tracker
- **Live Demo:** [Your Vercel URL]
- **Source Code:** [Your GitHub URL]
- **Tech Stack:** React, Node.js, Fastify, AI Matching, Redis

---

## 🎨 Customization After Deployment

### Update Project Name

**Vercel:**
1. Go to Project Settings
2. Change project name
3. Redeploy

**Railway:**
1. Click project name
2. Rename
3. Generate new domain if needed

### Custom Domain (Optional)

**Vercel:**
1. Go to Project → Settings → Domains
2. Add your domain (e.g., `jobtracker.com`)
3. Follow DNS instructions

**Railway:**
1. Settings → Networking
2. Add custom domain
3. Update DNS settings

---

## 📊 Monitoring

### Check Deployment Status

**Vercel:**
- Dashboard shows build status
- View deployment logs
- Analytics available

**Railway:**
- Dashboard shows service status
- View logs in real-time
- Resource usage metrics

### View Logs

**Vercel:**
```
Project → Deployments → Click deployment → View Logs
```

**Railway:**
```
Project → View Logs (real-time)
```

---

## 💰 Cost Breakdown

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **Vercel** | ✅ Free forever | 100 GB bandwidth/month |
| **Railway** | ✅ $5 credit/month | ~500 hours runtime |
| **GitHub** | ✅ Free forever | Unlimited public repos |
| **JSearch API** | ✅ 500 requests/month | Optional |
| **Upstash Redis** | ✅ 10k commands/day | Optional |
| **TOTAL** | **$0/month** | Perfect for demo/portfolio |

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Code pushed to GitHub
- [ ] `.env` files in `.gitignore` (already done)
- [ ] No API keys in code (using env variables)
- [ ] `package.json` has all dependencies
- [ ] Backend has `start` script
- [ ] Frontend builds locally (`npm run build`)
- [ ] README.md is complete

---

## 🚀 Quick Deploy Commands

### Update Code After Changes

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push

# Vercel & Railway auto-deploy! ✨
```

### Redeploy Manually

**Vercel:** Click "Redeploy" in dashboard  
**Railway:** Pushes to GitHub trigger auto-deploy

---

## 🎉 You're Live!

Once deployed, you'll have:

- ✅ **Live web app** anyone can access
- ✅ **Professional portfolio piece**
- ✅ **Assignment submission ready**
- ✅ **GitHub repository with docs**
- ✅ **Real-world deployment experience**

**Share your live link with pride!** 🌟

---

## 📞 Need Help?

If you encounter issues:

1. Check deployment logs (Vercel/Railway)
2. Verify environment variables
3. Test backend health endpoint
4. Check browser console for errors
5. Review CORS configuration

**Remember:** The app works without any API keys - perfect for demo!

---

**Total Time:** ~10 minutes  
**Total Cost:** $0  
**Total Awesome:** 100% 🚀
