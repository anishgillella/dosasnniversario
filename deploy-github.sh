#!/bin/bash

echo "🚀 Preparing to deploy your anniversary website to GitHub Pages..."

# Install gh-pages if not already installed
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  ERROR: .env.local file not found!"
    echo "Please create .env.local with your authentication credentials."
    echo "Example:"
    echo "NEXT_PUBLIC_ALLOWED_EMAILS=your-email@gmail.com,partner-email@gmail.com"
    echo "NEXT_PUBLIC_VALID_PASSWORD=your-secure-password"
    exit 1
fi

# Set export mode for GitHub Pages
echo "🔧 Setting up for GitHub Pages export..."
export EXPORT_MODE=true

# Build and export the project
echo "📦 Building and exporting the project..."
npm run export

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "💖 Deployment complete! Your anniversary website is now live on GitHub Pages."
echo "🔐 Access is restricted to the emails and password you configured in .env.local"
echo "Your site will be available at: https://anishgillella.github.io/dosasnniversario"
echo "Share the URL with your loved one to celebrate your special day!" 