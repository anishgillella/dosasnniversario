#!/bin/bash

echo "🚀 Preparing to deploy your anniversary website to Netlify..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  ERROR: .env.local file not found!"
    echo "Please create .env.local with your authentication credentials."
    echo "Example:"
    echo "NEXT_PUBLIC_ALLOWED_EMAILS=your-email@gmail.com,partner-email@gmail.com"
    echo "NEXT_PUBLIC_VALID_PASSWORD=your-secure-password"
    exit 1
fi

# Build the project
echo "📦 Building the project..."
npm run build

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null
then
    echo "🔧 Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
netlify deploy --prod

echo "💖 Deployment complete! Your anniversary website is now live."
echo "🔐 Access is restricted to the emails and password you configured in .env.local"
echo "⚠️  IMPORTANT: Make sure to set the same environment variables in your Netlify dashboard!"
echo "Share the URL with your loved one to celebrate your special day!"
