#!/bin/bash

echo "🚀 Deploying Pluq Password Reset API to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please install it first:"
    echo "npm install -g @railway/cli"
    exit 1
fi

# Check if user is logged in
if ! railway whoami &> /dev/null; then
    echo "🔐 Please login to Railway first:"
    echo "railway login"
    exit 1
fi

# Deploy the project
echo "🚀 Deploying to Railway..."
railway up

# Set environment variables (you'll need to replace these with your actual values)
echo "🔧 Setting environment variables..."
echo "⚠️  Please set these environment variables in Railway dashboard:"
echo "   SUPABASE_URL=your_supabase_url_here"
echo "   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here"
echo "   PORT=3001"

echo "✅ Deployment complete!"
echo "🔗 Your API will be available at: https://pluq-password-reset-api.railway.app"
echo "🔗 Health check: https://pluq-password-reset-api.railway.app/health"
