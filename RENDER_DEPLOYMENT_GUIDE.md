# Render Deployment Guide

## 🚀 Deploy to Render

### 1. Connect GitHub Repository
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Select the `Letshetho/pluq-reset` repository
5. Click "Connect"

### 2. Configure Service
- **Name**: `pluq-password-reset-api`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Health Check Path**: `/health`

### 3. Set Environment Variables
In the Render dashboard, add these environment variables:

```
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
PORT=3001
```

### 4. Deploy
- Click "Create Web Service"
- Render will automatically build and deploy
- Your API will be available at: `https://pluq-password-reset-api.onrender.com`

## 🔗 API Endpoints

### Health Check
```
GET https://pluq-password-reset-api.onrender.com/health
```

### Password Reset
```
POST https://pluq-password-reset-api.onrender.com/api/auth/reset-password
```

## 🧪 Testing

1. **Health Check**: Visit the health endpoint to verify deployment
2. **Password Reset**: Test with the iOS app
3. **Logs**: Check Render logs for any issues

## 🔧 Troubleshooting

- **Node.js Version**: Render uses Node.js 20+ (compatible with Supabase)
- **Environment Variables**: Make sure all required variables are set
- **Logs**: Check Render service logs for errors
- **Health Check**: Ensure `/health` endpoint returns 200 OK
