# 🚀 Pearl Beauty Live Deployment Guide
## From Localhost to pearlbeautyent.com - Complete Step-by-Step

---

## 📋 **TABLE OF CONTENTS**

1. [Pre-Deployment Checklist](#1-pre-deployment-checklist)
2. [Adding Your Logo & Brand Images](#2-adding-your-logo--brand-images)
3. [Adding Product Images](#3-adding-product-images)
4. [Optimizing Images for Web](#4-optimizing-images-for-web)
5. [Setting Up Cloudflare Account](#5-setting-up-cloudflare-account)
6. [Deploying to Cloudflare Pages](#6-deploying-to-cloudflare-pages)
7. [Connecting Your Custom Domain](#7-connecting-your-custom-domain-pearlbeautyentcom)
8. [Post-Deployment Testing](#8-post-deployment-testing)
9. [Troubleshooting Common Issues](#9-troubleshooting-common-issues)

---

## **1. PRE-DEPLOYMENT CHECKLIST**

Before we start, make sure you have:

- [ ] **Pearl Beauty logo** (PNG or SVG format, transparent background recommended)
- [ ] **Product images** (high-quality photos of each product)
- [ ] **Hero/banner images** (Caribbean landscape, curl close-ups, lifestyle shots)
- [ ] **Cloudflare account** (free tier works perfectly)
- [ ] **Access to pearlbeautyent.com domain** (login to domain registrar)
- [ ] **Product information** (descriptions, prices, ingredients)
- [ ] **GitHub account** (for code hosting - optional but recommended)

---

## **2. ADDING YOUR LOGO & BRAND IMAGES**

### **Step 2.1: Prepare Your Logo**

1. **Save your logo file** with these exact names:
   - Main logo: `logo.png` (or `logo.svg`)
   - Favicon: `favicon.ico` (16x16 or 32x32 pixels)

2. **Optimize your logo:**
   - Remove any extra whitespace
   - Keep transparent background
   - Recommended size: 200-300px wide
   - Format: PNG with transparency or SVG

### **Step 2.2: Upload Logo to Project**

**Where the files are located on your computer:**
```
📁 /home/user/webapp/public/static/images/
```

**Upload process:**

```bash
# Create images directory if it doesn't exist
mkdir -p /home/user/webapp/public/static/images

# Copy your logo files to this location
# (Replace /path/to/your with actual location of your files)
cp /path/to/your/logo.png /home/user/webapp/public/static/images/
cp /path/to/your/favicon.ico /home/user/webapp/public/static/
```

**Alternative - Manual Upload:**
1. Open your project folder: `/home/user/webapp/public/static/images/`
2. Create an `images` folder if not exists
3. Drag and drop your logo files into this folder

### **Step 2.3: Hero Background Image**

**Recommended hero image:**
- Size: 1920x1080px (or larger)
- Subject: Caribbean beach scene, tropical leaves, or curly hair close-up
- Format: WebP or JPEG
- File name: `hero-curls.jpg`

**Upload location:**
```bash
cp /path/to/your/hero-curls.jpg /home/user/webapp/public/static/images/
```

---

## **3. ADDING PRODUCT IMAGES**

### **Step 3.1: Product Photo Requirements**

Each product needs **4-5 images:**
1. **Main product shot** (front view, white/clean background)
2. **Angle view** (45-degree angle showing shape)
3. **Back label** (ingredients visible)
4. **In-use shot** (hand holding product or hair application)
5. **Size reference** (optional - product next to common object)

**Technical specs:**
- Minimum size: 800x800px
- Recommended: 1200x1200px
- Format: WebP (best) or JPEG
- File size: Under 200KB each

### **Step 3.2: Image Naming Convention**

Use this exact naming pattern:

```
curl-gel-main.webp          # Main product shot
curl-gel-angle.webp         # Angle view
curl-gel-back.webp          # Back label
curl-gel-inuse.webp         # In-use shot

leave-in-main.webp
leave-in-angle.webp
leave-in-back.webp
leave-in-inuse.webp

moisturizer-main.webp
shine-spray-main.webp
```

### **Step 3.3: Upload Product Images**

```bash
# Create product images directory
mkdir -p /home/user/webapp/public/static/images/products

# Copy all product images
cp /path/to/your/product-photos/*.webp /home/user/webapp/public/static/images/products/
```

### **Step 3.4: Update Image References in Code**

**Open this file:** `/home/user/webapp/src/index.tsx`

**Find the product API section** (around line 30-80) and update image paths:

```typescript
// OLD (placeholder):
image: '/static/images/curl-gel.jpg'

// NEW (your actual image):
image: '/static/images/products/curl-gel-main.webp'
```

**Do this for ALL products:**
- Caribbean Players Curl Defining Gel
- Caribbean Players Leave-In Conditioner
- Caribbean Players Softening Hair Moisturizer
- Caribbean Players Moisturizing Shine Spray

---

## **4. OPTIMIZING IMAGES FOR WEB**

### **Step 4.1: Use Online Image Optimizers**

**Recommended free tools:**

1. **TinyPNG** (https://tinypng.com)
   - Drag and drop your images
   - Downloads compressed versions
   - Reduces file size by 60-80%

2. **Squoosh** (https://squoosh.app)
   - Convert to WebP format
   - Adjust quality slider
   - Compare before/after

3. **CloudConvert** (https://cloudconvert.com)
   - Batch convert to WebP
   - Set quality to 85%
   - Download all at once

### **Step 4.2: Image Optimization Checklist**

Before uploading, verify:
- [ ] All images under 200KB each
- [ ] WebP format preferred (or optimized JPEG)
- [ ] Dimensions appropriate (1200px max width for products)
- [ ] No personal metadata embedded
- [ ] Transparent backgrounds for logos
- [ ] Proper file names (no spaces, lowercase)

---

## **5. SETTING UP CLOUDFLARE ACCOUNT**

### **Step 5.1: Create Cloudflare Account**

1. Go to **https://dash.cloudflare.com/sign-up**
2. Enter your email and create password
3. Verify email address
4. Choose **FREE plan** (perfect for Pearl Beauty)

### **Step 5.2: Get Your Cloudflare API Token**

1. Log in to Cloudflare Dashboard
2. Click your profile icon (top right) → **My Profile**
3. Go to **API Tokens** tab
4. Click **Create Token**
5. Choose **Edit Cloudflare Workers** template
6. Click **Continue to summary**
7. Click **Create Token**
8. **COPY THE TOKEN** - you'll need this! (It only shows once)

**Save your token somewhere safe:**
```
Example: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
```

### **Step 5.3: Configure API Token in Sandbox**

**Run this command in your terminal:**
```bash
cd /home/user/webapp
echo "CLOUDFLARE_API_TOKEN=your_token_here" > .dev.vars
```

Replace `your_token_here` with your actual token.

---

## **6. DEPLOYING TO CLOUDFLARE PAGES**

### **Step 6.1: Install Wrangler CLI**

Wrangler is already installed in your project! Verify:

```bash
cd /home/user/webapp
npx wrangler --version
```

### **Step 6.2: Login to Cloudflare via Wrangler**

**IMPORTANT:** Use the `setup_cloudflare_api_key` tool first!

```bash
# This configures your Cloudflare authentication
# Run this in the AI assistant interface
```

After successful setup, verify:
```bash
cd /home/user/webapp
npx wrangler whoami
```

You should see your Cloudflare account email.

### **Step 6.3: Build Your Site**

**Build the production-ready version:**

```bash
cd /home/user/webapp
npm run build
```

**What this does:**
- Compiles TypeScript to JavaScript
- Bundles all files
- Creates `dist/` folder with production code
- Optimizes for Cloudflare Workers runtime

**Check the build output:**
```bash
ls -la dist/
```

You should see:
- `_worker.js` (your compiled Hono app)
- `static/` (your CSS, JS, images)

### **Step 6.4: Create Cloudflare Pages Project**

**Run this command:**

```bash
cd /home/user/webapp
npx wrangler pages project create pearl-beauty \
  --production-branch main \
  --compatibility-date 2024-01-01
```

**Expected output:**
```
✨ Successfully created the 'pearl-beauty' project.
```

### **Step 6.5: Deploy to Cloudflare Pages**

**First deployment:**

```bash
cd /home/user/webapp
npx wrangler pages deploy dist --project-name pearl-beauty
```

**What happens:**
1. Uploads all files from `dist/` folder
2. Deploys to Cloudflare's global network
3. Gives you a temporary URL

**Example output:**
```
✨ Deployment complete! Take a peek over at
   https://abc123.pearl-beauty.pages.dev
```

**Copy this URL!** This is your live site on Cloudflare.

### **Step 6.6: Test Your Deployed Site**

Open the URL in your browser:
```
https://abc123.pearl-beauty.pages.dev
```

**Test these pages:**
- [ ] Homepage loads correctly
- [ ] Images appear (logo, products)
- [ ] Quiz button works
- [ ] Product page works (`/product/1`)
- [ ] Mobile view looks good
- [ ] All links work

---

## **7. CONNECTING YOUR CUSTOM DOMAIN (pearlbeautyent.com)**

### **Step 7.1: Add Custom Domain in Cloudflare Pages**

1. Go to **Cloudflare Dashboard** → **Pages**
2. Click on your **pearl-beauty** project
3. Go to **Custom domains** tab
4. Click **Set up a custom domain**
5. Enter: `pearlbeautyent.com`
6. Click **Continue**

**Cloudflare will give you DNS records to add.**

### **Step 7.2: Update DNS Settings**

**You have TWO options:**

#### **OPTION A: Transfer Domain to Cloudflare (RECOMMENDED)**

**Easiest and fastest method:**

1. In Cloudflare Dashboard, go to **Websites**
2. Click **Add a Site**
3. Enter `pearlbeautyent.com`
4. Choose **FREE plan**
5. Cloudflare will scan your DNS records
6. Review and click **Continue**
7. **CRITICAL:** Note the nameservers Cloudflare gives you
   ```
   Example:
   anna.ns.cloudflare.com
   bob.ns.cloudflare.com
   ```

8. **Go to your domain registrar** (where you bought pearlbeautyent.com)
   - Common registrars: GoDaddy, Namecheap, Google Domains, etc.
   
9. **Find the nameserver settings:**
   - GoDaddy: Domain Settings → Nameservers → Change
   - Namecheap: Domain List → Manage → Nameservers → Custom DNS
   - Google Domains: DNS → Name servers → Use custom name servers

10. **Replace old nameservers with Cloudflare's nameservers**
    
11. **Save changes**

12. **Wait 2-24 hours** for nameserver propagation
    - Cloudflare will email you when it's complete
    - You can check status in Cloudflare Dashboard

13. **After nameservers are active:**
    - Go back to Cloudflare Pages → Custom domains
    - Add `pearlbeautyent.com`
    - Cloudflare automatically configures everything ✨

#### **OPTION B: Keep Domain at Current Registrar**

**If you prefer to keep domain where it is:**

Cloudflare will provide DNS records like:

```
Type: CNAME
Name: pearlbeautyent.com (or @)
Value: pearl-beauty.pages.dev
```

**Add these records at your domain registrar:**

1. Log in to your domain registrar
2. Find DNS settings
3. Add the CNAME record exactly as Cloudflare specified
4. Save changes
5. Wait 10-60 minutes for DNS propagation

### **Step 7.3: Add WWW Subdomain (Optional)**

To make `www.pearlbeautyent.com` work:

1. In Cloudflare Pages → Custom domains
2. Click **Set up a custom domain**
3. Enter: `www.pearlbeautyent.com`
4. Click **Continue**
5. Cloudflare automatically creates redirect from www → non-www

### **Step 7.4: Verify Domain Connection**

**Check if domain is working:**

```bash
# Test domain resolution
nslookup pearlbeautyent.com

# Test site loads
curl -I https://pearlbeautyent.com
```

**Or simply visit in browser:**
- https://pearlbeautyent.com
- https://www.pearlbeautyent.com

Both should load your Pearl Beauty site!

### **Step 7.5: Force HTTPS (Security)**

1. In Cloudflare Dashboard → **SSL/TLS**
2. Set encryption mode to **Full** or **Full (strict)**
3. Go to **Edge Certificates**
4. Enable **Always Use HTTPS**
5. Enable **Automatic HTTPS Rewrites**

**Result:** All HTTP traffic automatically redirects to HTTPS.

---

## **8. POST-DEPLOYMENT TESTING**

### **Step 8.1: Comprehensive Site Testing**

**Test on multiple devices:**

**Desktop (Chrome, Firefox, Safari):**
- [ ] Homepage hero displays correctly
- [ ] Logo appears in header
- [ ] All product images load
- [ ] Quiz modal opens and works
- [ ] Product detail page (`/product/1`) works
- [ ] Email capture form works
- [ ] All links clickable
- [ ] Footer displays properly

**Mobile (iPhone, Android):**
- [ ] Responsive layout works
- [ ] Images load quickly
- [ ] Text readable without zooming
- [ ] Buttons easy to tap
- [ ] Sticky cart appears on product page
- [ ] Quiz works on small screens

**Performance Tests:**
1. Open Chrome DevTools (F12)
2. Go to **Lighthouse** tab
3. Click **Generate report**
4. Check scores:
   - Performance: 90+ (green)
   - Accessibility: 90+ (green)
   - Best Practices: 90+ (green)
   - SEO: 90+ (green)

### **Step 8.2: Test API Endpoints**

```bash
# Test products API
curl https://pearlbeautyent.com/api/products

# Test quiz API
curl "https://pearlbeautyent.com/api/quiz-results?texture=curly&concern=frizz&lifestyle=high-humidity"
```

Both should return JSON data.

### **Step 8.3: Test Custom Domain**

**Verify all variations work:**
- http://pearlbeautyent.com → redirects to https://pearlbeautyent.com ✅
- https://pearlbeautyent.com → loads site ✅
- http://www.pearlbeautyent.com → redirects to https://pearlbeautyent.com ✅
- https://www.pearlbeautyent.com → redirects to https://pearlbeautyent.com ✅

---

## **9. TROUBLESHOOTING COMMON ISSUES**

### **Issue 1: Images Not Showing After Deployment**

**Problem:** Images work locally but show as broken on live site.

**Solution:**

1. **Check image paths are correct:**
   ```typescript
   // ✅ CORRECT
   image: '/static/images/products/curl-gel-main.webp'
   
   // ❌ WRONG
   image: './static/images/products/curl-gel-main.webp'
   image: '../images/curl-gel.jpg'
   ```

2. **Verify images exist in public folder:**
   ```bash
   ls -la /home/user/webapp/public/static/images/
   ```

3. **Check built dist folder:**
   ```bash
   ls -la /home/user/webapp/dist/static/images/
   ```

4. **Rebuild and redeploy:**
   ```bash
   cd /home/user/webapp
   npm run build
   npx wrangler pages deploy dist --project-name pearl-beauty
   ```

### **Issue 2: "This site can't be reached" Error**

**Problem:** Domain not loading after DNS changes.

**Solution:**

1. **Wait longer** - DNS can take 2-48 hours
   
2. **Check DNS propagation:**
   - Visit https://dnschecker.org
   - Enter `pearlbeautyent.com`
   - Verify it resolves globally

3. **Verify nameservers (if using Cloudflare nameservers):**
   ```bash
   dig NS pearlbeautyent.com
   ```
   Should show Cloudflare nameservers.

4. **Clear your browser cache:**
   - Chrome: Ctrl+Shift+Delete → Clear cache
   - Or try incognito/private mode

### **Issue 3: "Error 1000: DNS points to prohibited IP"**

**Problem:** CNAME record pointing to wrong destination.

**Solution:**

1. Go to Cloudflare Dashboard → DNS
2. Delete any A records for `@` or `pearlbeautyent.com`
3. Ensure CNAME points to: `pearl-beauty.pages.dev`
4. **NOT** an IP address
5. Save and wait 5 minutes

### **Issue 4: API Routes Return 404**

**Problem:** `/api/products` or `/api/quiz-results` not found.

**Solution:**

1. **Check _routes.json in dist folder:**
   ```bash
   cat /home/user/webapp/dist/_routes.json
   ```

2. **Verify worker is deployed:**
   ```bash
   cd /home/user/webapp
   npx wrangler pages deployment list --project-name pearl-beauty
   ```

3. **Test locally first:**
   ```bash
   npm run build
   pm2 restart pearl-beauty
   curl http://localhost:3000/api/products
   ```

4. **If local works but production doesn't, redeploy:**
   ```bash
   npx wrangler pages deploy dist --project-name pearl-beauty
   ```

### **Issue 5: Logo Appears Blurry or Pixelated**

**Problem:** Logo looks fuzzy on high-resolution screens.

**Solution:**

1. **Use SVG format instead of PNG:**
   - SVG scales perfectly at any size
   - No quality loss

2. **If using PNG, export at 2x resolution:**
   - If logo displays at 200px wide
   - Export PNG at 400px wide

3. **Optimize PNG with TinyPNG:**
   - Maintains quality while reducing file size

### **Issue 6: Site Loads Slowly**

**Problem:** First page load takes 5+ seconds.

**Solution:**

1. **Compress all images:**
   - Use TinyPNG or Squoosh
   - Target under 200KB per image

2. **Convert to WebP format:**
   - 30% smaller than JPEG
   - Better quality at smaller sizes

3. **Enable Cloudflare optimizations:**
   - Dashboard → Speed → Optimization
   - Enable "Auto Minify" (JS, CSS, HTML)
   - Enable "Brotli compression"

4. **Remove unused code:**
   ```bash
   # Check bundle size
   ls -lh dist/_worker.js
   ```

### **Issue 7: Deployment Fails with "Authentication Error"**

**Problem:** Wrangler can't authenticate to Cloudflare.

**Solution:**

1. **Re-run setup tool:**
   - Call `setup_cloudflare_api_key` again
   
2. **Verify token is valid:**
   ```bash
   npx wrangler whoami
   ```

3. **Check token permissions:**
   - Go to Cloudflare → Profile → API Tokens
   - Ensure token has "Workers" edit permission

4. **Create new token if needed:**
   - Delete old token
   - Create new "Edit Cloudflare Workers" token
   - Update `.dev.vars` file

---

## **🎉 SUCCESS CHECKLIST**

Your site is LIVE when all these are ✅:

- [ ] Logo appears in header and footer
- [ ] All 4 product images display on homepage
- [ ] Hero section looks beautiful
- [ ] pearlbeautyent.com loads the site
- [ ] www.pearlbeautyent.com redirects to main domain
- [ ] HTTPS padlock shows in browser
- [ ] Site loads in under 3 seconds
- [ ] Mobile version looks perfect
- [ ] Quiz opens and generates results
- [ ] Product page displays correctly
- [ ] API endpoints work (`/api/products`)
- [ ] No console errors in browser DevTools
- [ ] Lighthouse score 90+ on all metrics

---

## **📞 NEED HELP?**

### **Quick Reference:**

**Project location:**
```
/home/user/webapp/
```

**Important files:**
- Logo: `/home/user/webapp/public/static/images/logo.png`
- Products: `/home/user/webapp/public/static/images/products/`
- Main app: `/home/user/webapp/src/index.tsx`
- Config: `/home/user/webapp/wrangler.jsonc`

**Common commands:**
```bash
# Build site
cd /home/user/webapp && npm run build

# Deploy to Cloudflare
cd /home/user/webapp && npx wrangler pages deploy dist --project-name pearl-beauty

# Test locally
cd /home/user/webapp && pm2 restart pearl-beauty

# Check logs
cd /home/user/webapp && pm2 logs pearl-beauty --nostream
```

**Cloudflare Dashboard:**
- Pages: https://dash.cloudflare.com > Pages
- DNS: https://dash.cloudflare.com > Your domain > DNS
- SSL: https://dash.cloudflare.com > Your domain > SSL/TLS

---

## **🚀 NEXT STEPS AFTER LAUNCH**

1. **Share your site:**
   - Social media announcement
   - Email to existing customers
   - Update business cards/marketing materials

2. **Monitor performance:**
   - Set up Google Analytics (optional)
   - Check Cloudflare Analytics dashboard
   - Monitor site speed monthly

3. **Content updates:**
   - Add more product images as available
   - Collect customer reviews
   - Add before/after photos

4. **SEO optimization:**
   - Submit sitemap to Google Search Console
   - Add business to Google My Business
   - Start creating blog content

---

**Congratulations!** 🎉 

Pearl Beauty is now LIVE on **pearlbeautyent.com** with your branding, beautiful images, and ready to convert customers across America!

From Trinidad to the world—let's get it! 🌴💪