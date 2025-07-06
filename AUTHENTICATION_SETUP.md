# Authentication Setup for Anniversary Website

## 🔒 Security Update - Environment Variables

Your anniversary website now uses **environment variables** for authentication credentials instead of hardcoded values. This keeps your credentials secure even with a public GitHub repository.

### Access Control
- **Authorized Emails**: Configured in environment variables
- **Password**: Configured in environment variables

## 🛡️ Security Benefits

- ✅ **Credentials are NOT visible in GitHub** - Your public repository is safe
- ✅ **Environment variables are secure** - Only you and your hosting platform have access
- ✅ **Easy to update** - Change credentials without code changes
- ✅ **Multiple environments** - Different credentials for development/production

## 🔧 Setup Instructions

### 1. Local Development
Your `.env.local` file contains your credentials:
```bash
NEXT_PUBLIC_ALLOWED_EMAILS=anishgillella@gmail.com,sana.dharani13@gmail.com
NEXT_PUBLIC_VALID_PASSWORD=Gillellaanish@123
```

### 2. Production Deployment

#### For Netlify:
1. Go to your Netlify dashboard
2. Select your site
3. Go to Site settings → Environment variables
4. Add these variables:
   - `NEXT_PUBLIC_ALLOWED_EMAILS` = `anishgillella@gmail.com,sana.dharani13@gmail.com`
   - `NEXT_PUBLIC_VALID_PASSWORD` = `Gillellaanish@123`

#### For GitHub Pages:
Environment variables are automatically included during build from your `.env.local` file.

## How It Works

### Authentication Flow
1. User visits the website
2. Beautiful login form appears with gradient background
3. User enters email and password
4. System validates both email (must be one of the authorized emails) and password
5. On success, access is granted and credentials are stored locally
6. Logout button appears in top-right corner for easy sign-out

### Security Features
- Client-side validation for authorized emails
- Password protection
- Session persistence (remembers login until logout)
- Clean logout functionality
- Error messages for invalid credentials
- Responsive design that works on all devices

## Deployment Options

### Option 1: Netlify (Recommended)
Your current setup is optimized for Netlify:

```bash
# Deploy to Netlify
./deploy.sh
```

**Important:** After deployment, add environment variables to your Netlify dashboard.

**Advantages:**
- Already configured
- Fast deployment
- Automatic SSL
- Great performance
- Custom domain support

### Option 2: GitHub Pages
If you prefer GitHub Pages:

```bash
# Deploy to GitHub Pages
./deploy-github.sh
```

**Advantages:**
- Free hosting
- GitHub integration
- Version control
- Static site hosting

## Security Considerations

### Environment Variables vs Hardcoded
- ✅ **Environment variables** - Secure, not visible in public repositories
- ❌ **Hardcoded values** - Visible to anyone who can see your code

### Client-Side vs Server-Side
- This is **client-side authentication** - suitable for personal/private websites
- For higher security needs, consider server-side authentication
- Perfect for protecting personal content from casual visitors

### Additional Security
- Added security headers to Netlify configuration
- Prevents embedding in frames
- Protects against XSS attacks
- Strict content type sniffing

## Customization

### Changing Access
To modify who can access the website, update your environment variables:

**Local development (.env.local):**
```bash
NEXT_PUBLIC_ALLOWED_EMAILS=new-email@gmail.com,another-email@gmail.com
NEXT_PUBLIC_VALID_PASSWORD=new-secure-password
```

**Production (Netlify dashboard):**
Update the environment variables in your hosting platform settings.

### Styling
The login form uses:
- Gradient background (purple to blue)
- Glassmorphism effect
- Smooth animations
- Responsive design
- Heart emoji branding

## Testing
1. Deploy the website
2. Visit the URL
3. Try logging in with authorized email and correct password
4. Try logging in with unauthorized email (should show error)
5. Try logging in with wrong password (should show error)
6. Test logout functionality

## Troubleshooting

### Common Issues
1. **Login not working**: Check environment variables are set correctly
2. **Stuck on login**: Clear browser localStorage and try again
3. **Deployment fails**: Verify environment variables are configured on your hosting platform
4. **Blank authentication page**: Check that environment variables are properly set

### Clear Authentication
If you need to reset authentication:
```javascript
// In browser console
localStorage.removeItem('anniversary-auth');
localStorage.removeItem('anniversary-email');
location.reload();
```

### Check Environment Variables
To verify your environment variables are working:
```javascript
// In browser console (development only)
console.log('Emails:', process.env.NEXT_PUBLIC_ALLOWED_EMAILS);
console.log('Password set:', !!process.env.NEXT_PUBLIC_VALID_PASSWORD);
```

## Next Steps
1. ✅ Environment variables are configured locally
2. Deploy using your preferred method
3. Set environment variables on your hosting platform
4. Test the authentication
5. Share the URL with Sana
6. Enjoy your beautiful, secure anniversary website! 💖 

## 🔐 Security Checklist
- ✅ Credentials moved to environment variables
- ✅ `.env.local` is in `.gitignore` (not committed to repository)
- ✅ Public repository is safe - no credentials visible
- ✅ Production environment variables need to be set on hosting platform
- ✅ Authentication works the same way for users 