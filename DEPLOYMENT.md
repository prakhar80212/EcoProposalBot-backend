# 🚀 Render Deployment Guide

## Prerequisites
- GitHub repository with your code
- Render account (free tier available)
- Firebase service account JSON
- Gemini API key

## Deployment Steps

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `prakhar80212/EcoProposalBot-backend`
4. Configure the service:
   - **Name**: `ecoproposalbot-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3. Set Environment Variables

In Render dashboard, add these environment variables:

#### PORT
```
PORT=5000
```

#### GEMINI_API_KEY
```
GEMINI_API_KEY=your_actual_gemini_api_key
```

#### FIREBASE_SERVICE_ACCOUNT
Copy your entire `serviceAccountKey.json` content and paste as a single line JSON string:
```json
{"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
```

### 4. Deploy

Click **"Create Web Service"** and Render will automatically:
- Clone your repository
- Install dependencies
- Start your server

### 5. Access Your API

Your API will be available at:
```
https://ecoproposalbot-backend.onrender.com
```

Test endpoints:
```bash
# Health check
curl https://ecoproposalbot-backend.onrender.com/api/health

# Generate impact report
curl -X POST https://ecoproposalbot-backend.onrender.com/api/impact/generate \
  -H "Content-Type: application/json" \
  -d '{"products":[{"name":"Bamboo Toothbrush","quantity":2}]}'
```

## Important Notes

⚠️ **Free Tier Limitations:**
- Service spins down after 15 minutes of inactivity
- First request after inactivity may take 30-60 seconds
- 750 hours/month free

💡 **Tips:**
- Keep your Firebase credentials secure in environment variables
- Monitor logs in Render dashboard
- Set up auto-deploy from GitHub for continuous deployment

## Troubleshooting

**Service fails to start:**
- Check environment variables are set correctly
- Verify Firebase JSON is valid (use JSON validator)
- Check logs in Render dashboard

**API returns 500 error:**
- Verify GEMINI_API_KEY is correct
- Check Firebase credentials are properly formatted
- Review application logs

## Auto-Deploy

Render automatically deploys when you push to `main` branch:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

Render will detect the push and redeploy automatically! 🎉
