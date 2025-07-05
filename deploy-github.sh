#!/bin/bash

echo "🚀 Preparing to deploy your anniversary website to GitHub Pages..."

# Install gh-pages if not already installed
echo "📦 Installing dependencies..."
npm install

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
echo "🔐 Access is restricted to:"
echo "   - anishgillella@gmail.com"
echo "   - sana.dharani13@gmail.com"
echo "   - Password: Gillellaanish@123"
echo "Your site will be available at: https://yourusername.github.io/anniversary-website"
echo "Share the URL with your loved one to celebrate your special day!" 