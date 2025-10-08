# Clink Website

Official website for Clink - The social app designed for university students.

## 🌐 Live Site

[https://clinkn.com](https://clinkn.com)

## 📋 Overview

This repository contains the marketing website for the Clink iOS app. The website features:

- Modern, responsive design matching the app's green color scheme
- Features overview and benefits
- Privacy policy and terms of service
- Download links to the App Store
- Contact information

## 🛠 Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, flexbox, and grid
- **Vanilla JavaScript** - No frameworks, pure performance
- **Responsive Design** - Mobile-first approach

## 🎨 Design

The website uses Clink's brand colors:
- Primary: `#33CC66` (Bright Green)
- Primary Dark: `#28a352`
- Primary Light: `#52d97d`

The design is inspired by the iOS app's theme, featuring:
- Clean, modern interface
- Smooth animations and transitions
- Accessible color contrasts
- Professional typography (Inter font family)

## 📁 Project Structure

```
Clink_Website/
├── index.html          # Main landing page
├── privacy.html        # Privacy policy page
├── terms.html         # Terms of service page
├── styles.css         # Main stylesheet
├── legal.css          # Legal pages stylesheet
├── script.js          # JavaScript functionality
├── assets/            # Images and media files
│   ├── favicon.png    # Website favicon (add your own)
│   └── og-image.png   # Open Graph image for social sharing (add your own)
├── vercel.json        # Vercel deployment configuration
├── netlify.toml       # Netlify deployment configuration
├── CNAME              # Custom domain for GitHub Pages
├── robots.txt         # Search engine directives
├── sitemap.xml        # XML sitemap for SEO
└── README.md          # This file
```

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel offers the easiest deployment with automatic HTTPS and excellent performance.

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd /path/to/Clink_Website
   vercel
   ```

3. Follow the prompts to link to your account

4. Set up custom domain in Vercel dashboard:
   - Go to your project settings
   - Add domain: `clinkn.com` and `www.clinkn.com`
   - Vercel will provide DNS records

### Option 2: Netlify

Netlify is another excellent option with great features.

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   cd /path/to/Clink_Website
   netlify deploy --prod
   ```

3. Set up custom domain in Netlify dashboard:
   - Go to Domain settings
   - Add custom domain: `clinkn.com`
   - Follow DNS instructions

### Option 3: GitHub Pages

GitHub Pages is free and works well for static sites.

1. Create a new repository on GitHub (in your organization)
2. Push this code to the repository
3. Go to repository Settings → Pages
4. Set source to main branch, root directory
5. Add custom domain: `clinkn.com`
6. Enable HTTPS (may take a few minutes)

## 🌍 DNS Configuration

### GoDaddy DNS Setup

Based on your current DNS records, here's what you need to do:

#### For Vercel:

1. **Remove the existing A record** that points to WebsiteBuilder
2. **Add these A records** (point @ to Vercel):
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 1 Hour
   ```

3. **Add CNAME for www**:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 1 Hour
   ```

#### For Netlify:

1. **Remove the existing A record** that points to WebsiteBuilder
2. **Add these A records**:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   TTL: 1 Hour
   ```

3. **Add CNAME for www**:
   ```
   Type: CNAME
   Name: www
   Value: [your-site-name].netlify.app
   TTL: 1 Hour
   ```

#### For GitHub Pages:

1. **Remove the existing A record** that points to WebsiteBuilder
2. **Add these A records**:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   TTL: 1 Hour
   
   Type: A
   Name: @
   Value: 185.199.109.153
   TTL: 1 Hour
   
   Type: A
   Name: @
   Value: 185.199.110.153
   TTL: 1 Hour
   
   Type: A
   Name: @
   Value: 185.199.111.153
   TTL: 1 Hour
   ```

3. **Add CNAME for www**:
   ```
   Type: CNAME
   Name: www
   Value: [your-github-username].github.io
   TTL: 1 Hour
   ```

**Important Notes:**
- Keep all your existing CNAME records (autodiscover, email, firebase DKIM)
- Keep all NS, SOA, MX, and TXT records
- Only modify/remove the A record that points to WebsiteBuilder
- DNS changes can take 24-48 hours to propagate, but usually happen within 1-2 hours

## 📝 Setup Instructions

### Step 1: Create GitHub Repository

1. Go to your GitHub organization
2. Click "New repository"
3. Name it: `Clink_Website` or `clinkn.com`
4. Make it Public (required for GitHub Pages free tier)
5. Don't initialize with README (we already have one)

### Step 2: Push Code to GitHub

```bash
cd /Users/moeinrazavi/Documents/GitHub/Clink_Website
git init
git add .
git commit -m "Initial commit: Clink website"
git branch -M main
git remote add origin https://github.com/[your-org]/Clink_Website.git
git push -u origin main
```

### Step 3: Add Your Assets

Before deploying, add these files to the `assets/` folder:

1. **favicon.png** - 32x32 or 64x64 icon for browser tabs
2. **og-image.png** - 1200x630 image for social media sharing
3. **App screenshots** (optional) - For the phone mockup

### Step 4: Update App Store Link

Once your app is live on the App Store, update the download link in `index.html`:

```html
<!-- Find this line and update the href -->
<a href="https://apps.apple.com/app/clink/[YOUR_APP_ID]" ...>
```

### Step 5: Choose and Deploy

Choose one of the deployment options above (Vercel, Netlify, or GitHub Pages) and follow those instructions.

### Step 6: Configure DNS

Follow the DNS configuration instructions for your chosen platform in the section above.

### Step 7: Test

1. Wait for DNS propagation (use [whatsmydns.net](https://www.whatsmydns.net/) to check)
2. Visit https://clinkn.com
3. Test on mobile devices
4. Check all links work
5. Verify HTTPS is working

## 🔧 Customization

### Update Colors

Edit `styles.css` and change the CSS custom properties:

```css
:root {
    --primary-color: #33CC66;
    --primary-dark: #28a352;
    --primary-light: #52d97d;
}
```

### Update Content

- **index.html** - Main landing page content
- **privacy.html** - Privacy policy (already populated from your app)
- **terms.html** - Terms of service

### Update Contact Info

Update email addresses throughout the site:
- Replace `innovated@clinkn.com` with your actual support email
- Update social media handles if applicable

## 📱 Features

- ✅ Fully responsive design
- ✅ Mobile-first approach
- ✅ Fast loading performance
- ✅ SEO optimized
- ✅ Accessible (WCAG 2.1 compliant)
- ✅ Cross-browser compatible
- ✅ No external dependencies
- ✅ Smooth animations
- ✅ Interactive elements

## 🔍 SEO

The site includes:
- Semantic HTML5 markup
- Meta tags for social sharing (Open Graph, Twitter Cards)
- Sitemap.xml for search engines
- Robots.txt for crawler directives
- Fast page load times
- Mobile-friendly design

## 📊 Analytics (Optional)

If you want to add analytics, you can add:

### Google Analytics

Add to `<head>` in all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

### Plausible (Privacy-focused alternative)

Add to `<head>` in all HTML files:

```html
<script defer data-domain="clinkn.com" src="https://plausible.io/js/script.js"></script>
```

## 🐛 Troubleshooting

### Site not loading after DNS change
- DNS can take up to 48 hours to propagate
- Clear your browser cache
- Try accessing from a different device/network
- Check DNS propagation at [whatsmydns.net](https://www.whatsmydns.net/)

### HTTPS not working
- Wait a few minutes after deployment
- Most platforms (Vercel, Netlify, GitHub Pages) automatically provision SSL certificates
- Make sure DNS is properly configured

### Mobile menu not working
- Check browser console for JavaScript errors
- Ensure script.js is loading correctly
- Try clearing browser cache

## 📄 License

Copyright © 2025 Clink Innovated, LLC. All rights reserved.

## 🤝 Support

For website issues or questions:
- Email: innovated@clinkn.com
- Website: https://clinkn.com

---

**Built with ❤️ for the Clink community**

