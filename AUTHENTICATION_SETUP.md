# Authentication Setup for Anniversary Website

## Overview
Your anniversary website is now protected with a dual authentication system:

### Access Control
- **Authorized Emails**: 
  - `anishgillella@gmail.com`
  - `sana.dharani13@gmail.com`
- **Password**: `Gillellaanish@123`

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

**Advantages:**
- Already configured
- Fast deployment
- Automatic SSL
- Great performance
- Custom domain support

### Option 2: GitHub Pages (Backup)
If you prefer GitHub Pages:

```bash
# Deploy to GitHub Pages
./deploy-github.sh
```

**Before deploying to GitHub Pages:**
1. Create a new repository on GitHub named `anniversary-website`
2. Push your code to the repository
3. Run the deployment script

**Advantages:**
- Free hosting
- GitHub integration
- Version control
- Static site hosting

## Security Considerations

### Client-Side vs Server-Side
- This is **client-side authentication** - suitable for personal/private websites
- For higher security needs, consider server-side authentication
- The password is visible in the code, so it's not bank-level security
- Perfect for protecting personal content from casual visitors

### Additional Security
- Added security headers to Netlify configuration
- Prevents embedding in frames
- Protects against XSS attacks
- Strict content type sniffing

## Customization

### Changing Access
To modify who can access the website, edit `src/components/AuthGate.tsx`:

```typescript
const ALLOWED_EMAILS = ['anishgillella@gmail.com', 'sana.dharani13@gmail.com'];
const VALID_PASSWORD = 'Gillellaanish@123';
```

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
1. **Login not working**: Check email spelling and password
2. **Stuck on login**: Clear browser localStorage and try again
3. **Deployment fails**: Check if all dependencies are installed

### Clear Authentication
If you need to reset authentication:
```javascript
// In browser console
localStorage.removeItem('anniversary-auth');
localStorage.removeItem('anniversary-email');
location.reload();
```

## Next Steps
1. Deploy using your preferred method
2. Test the authentication
3. Share the URL with Sana
4. Enjoy your beautiful, private anniversary website! 💖 