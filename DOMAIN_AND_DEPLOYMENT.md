# Domain Name & Deployment Guide

## 🌐 Domain Name Options

### Option 1: Netlify (Recommended)

**Default Domain:**
- When you first deploy, Netlify will assign a random domain like: `https://amazing-cupcake-123456.netlify.app`

**Custom Netlify Domain:**
- You can change this to something custom like: `https://our-anniversary-2025.netlify.app`
- Go to your Netlify dashboard → Site settings → Change site name

**Custom Domain:**
- Buy a custom domain (e.g., `ourlovejourney.com`, `anishandsana.com`)
- Connect it through Netlify's domain settings
- Netlify provides free SSL certificates

### Option 2: GitHub Pages

**Default Domain:**
- `https://[your-github-username].github.io/anniversary-website`
- Example: `https://anishgillella.github.io/anniversary-website`

**Custom Domain:**
- You can use a custom domain with GitHub Pages
- Add a `CNAME` file to your repository with your domain
- Configure DNS settings with your domain provider

## 🚀 How to Deploy

### Deploy to Netlify (Recommended)

1. **Make sure you have a Netlify account**
   ```bash
   # Install Netlify CLI globally
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   ```

2. **Deploy your site**
   ```bash
   ./deploy.sh
   ```

3. **Your site will be live at the provided URL**

### Deploy to GitHub Pages

1. **Create a GitHub repository**
   - Go to GitHub.com
   - Create a new repository named `anniversary-website`
   - Push your code to this repository

2. **Deploy to GitHub Pages**
   ```bash
   # Install dependencies
   npm install
   
   # Deploy
   ./deploy-github.sh
   ```

3. **Your site will be live at**
   - `https://[your-username].github.io/anniversary-website`

## 🔐 Authentication Theme

Your authentication page now has a **completely opposite theme** from your main website:

### Main Website Theme:
- 🌸 Light, warm, romantic
- 💛 Cream, pink, and gold colors
- 💕 Soft gradients and curves
- 🌺 Playfair Display elegant fonts

### Authentication Theme:
- 🖤 Dark, sleek, cyberpunk
- 💙 Black, zinc, and cyan colors
- ⚡ Sharp edges and tech aesthetic
- 🔒 Monospace fonts and uppercase text
- 🎯 Lock emoji instead of heart
- 🚨 Flashing status indicators

## 📱 What Users Will See

1. **First Visit:**
   - Dark cyberpunk authentication screen
   - "ACCESS CONTROL" with lock emoji
   - Email and password fields
   - "AUTHENTICATE" button

2. **After Login:**
   - Beautiful warm anniversary website
   - "LOGOUT" button in top-right corner
   - All your romantic content

3. **Invalid Credentials:**
   - Red error message with "ERROR:" prefix
   - Clear indication of what went wrong

## 🎨 Design Contrast

| Authentication Page | Main Website |
|-------------------|-------------|
| 🖤 Dark backgrounds | 🌸 Light backgrounds |
| 💙 Cyan/Blue accents | 💛 Gold/Pink accents |
| 🔒 Security/Tech theme | 💕 Romance/Love theme |
| 🤖 Monospace fonts | 🌺 Elegant serif fonts |
| ⚡ Sharp corners | 🌊 Soft curves |
| 🎯 Minimalist | 🌈 Decorative |

## 🔧 Customization

### Change Domain Name (Netlify)
1. Go to your Netlify dashboard
2. Select your site
3. Go to Site settings → General
4. Click "Change site name"
5. Enter your preferred name (e.g., "our-anniversary-2025")

### Change Domain Name (GitHub Pages)
1. Go to your repository settings
2. Scroll to "Pages" section
3. Add a custom domain if desired
4. Configure DNS with your domain provider

## 🚀 Next Steps

1. **Choose your deployment method**
2. **Run the deployment script**
3. **Get your domain URL**
4. **Test the authentication**
5. **Share with Sana!**

## 📞 Support

If you need help:
- Check the logs during deployment
- Verify your email and password are correct
- Clear browser cache if login issues persist
- Make sure JavaScript is enabled

Your anniversary website is now ready to deploy with a secure, opposite-themed authentication system! 🎉 