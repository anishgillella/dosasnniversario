#!/bin/bash

echo "🔗 Setting up GitHub repository connection..."

# Replace YOUR_USERNAME with your actual GitHub username
read -p "Enter your GitHub username: " USERNAME

echo "🌐 Adding remote repository..."
git remote add origin https://github.com/$USERNAME/anniversary-website.git

echo "🚀 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Code pushed to GitHub successfully!"
echo "🌐 Your repository: https://github.com/$USERNAME/anniversary-website" 