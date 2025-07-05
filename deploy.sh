#!/bin/bash

echo "🚀 Preparing to deploy your anniversary website to Netlify..."

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
echo "🔐 Access is restricted to:"
echo "   - anishgillella@gmail.com"
echo "   - sana.dharani13@gmail.com"
echo "   - Password: Gillellaanish@123"
echo "Share the URL with your loved one to celebrate your special day!"
