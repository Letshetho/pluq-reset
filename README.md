# Pluq Password Reset API

Backend API for handling password reset requests from the Pluq iOS app.

## 🚀 Quick Start

1. **Clone this repository:**
   ```bash
   git clone https://github.com/Letshetho/pluq-reset.git
   cd pluq-reset
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set environment variables:**
   Create a `.env` file with:
   ```
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   PORT=3001
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

## 📡 API Endpoints

### POST /api/auth/reset-password
Updates a user's password using Supabase Admin API.

**Request Body:**
```json
{
  "email": "user@example.com",
  "token": "reset-token-uuid",
  "newPassword": "new-password-123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

### GET /health
Health check endpoint.

## 🚂 Railway Deployment

### Option 1: Railway CLI
1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Deploy:**
   ```bash
   railway up
   ```

4. **Set environment variables:**
   ```bash
   railway variables set SUPABASE_URL=your_supabase_url
   railway variables set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

### Option 2: Railway Dashboard
1. **Connect GitHub repository** to Railway
2. **Set environment variables** in Railway dashboard
3. **Deploy automatically** on git push

## 🔗 Integration

This API is used by the Pluq iOS app for password reset functionality:

- **iOS App** → Calls this API with email, token, and new password
- **This API** → Updates password via Supabase Admin API
- **No Supabase built-in service limits** ✅

## 🔒 Security Notes

- Uses Supabase Service Role Key for admin operations
- No rate limits (bypasses Supabase built-in service limits)
- Token verification should be implemented in production
- Environment variables are required for deployment
