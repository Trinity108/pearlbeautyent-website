# 🚀 Lion's Deployment Workflow: Code → Live on pearlbeautyent.com

**Mission**: Take this site from local → live on **pearlbeautyent.com** (currently on Shopify)

---

## 🎯 Phase 1: Add Images (AI-Assisted)

### Current Logo Situation
✅ **Good news**: Client already has a logo on Shopify:
- `Pearl-Beauty-Logo.webp` (already exists at `/cdn/shop/files/Pearl-Beauty-Logo.webp`)
- You can grab this directly: https://pearlbeautyent.com/cdn/shop/files/Pearl-Beauty-Logo.webp

### Images You Need to Add
Your site has **placeholder paths** for:

1. **Product Images** (4 products):
   - `/static/images/products/curl-gel-main.webp`
   - `/static/images/products/leave-in-main.webp`
   - `/static/images/products/shampoo-main.webp`
   - `/static/images/products/edge-control-main.webp`

2. **Hero Background** (optional):
   - Could use a teal/coral gradient OR Caribbean-themed image

### AI Image Generation Workflow

**Option A: Use GenSpark AI Image Generation** (Best for speed)
```
Prompts for each product:

1. Curl Defining Gel:
"Professional product photography of Caribbean hair gel in clear bottle with teal cap, white background, studio lighting, clean minimalist aesthetic, e-commerce style"

2. Leave-In Conditioner:
"Professional product photography of Caribbean leave-in conditioner spray bottle, teal and coral branding, white background, studio lighting, e-commerce product shot"

3. Shampoo:
"Professional product photography of Caribbean shampoo bottle with pump, teal packaging, white background, clean studio lighting, e-commerce style"

4. Edge Control:
"Professional product photography of Caribbean edge control jar, teal lid and coral accent, white background, studio lighting, product photography"
```

**Steps:**
1. Generate 4 product images using prompts above
2. Download as WebP format (or convert using `cwebp` command)
3. Save to: `/home/user/webapp/public/static/images/products/`
4. Name exactly as: `curl-gel-main.webp`, `leave-in-main.webp`, etc.

**Option B: Source from Existing Pearl Beauty Assets**
- Download the existing logo from their Shopify site
- Check if they have product photos you can use
- Ask client for high-res product images

**Option C: Use AI Image Search** (If client has existing products)
```bash
# Use GenSpark's image_search tool to find similar products
# Then use image_generation to modify/adapt them
```

### Commands to Add Images
```bash
# Create images directory
mkdir -p /home/user/webapp/public/static/images/products/

# Add images (after generating/downloading)
# Place files in the directory above

# Verify images exist
ls -lh /home/user/webapp/public/static/images/products/

# Commit to git
cd /home/user/webapp && git add public/static/images/ && git commit -m "✨ Add product images"
```

---

## 🎯 Phase 2: Deploy to Cloudflare Pages

### Prerequisites
1. **Cloudflare Account** with API token
2. **Domain access** to pearlbeautyent.com (to change DNS)

### Step-by-Step Deployment

**1. Setup Cloudflare Authentication**
```bash
# Configure Cloudflare API token in sandbox
# This will be handled via setup_cloudflare_api_key tool
```

**2. Build the Site**
```bash
cd /home/user/webapp && npm run build
```

**3. Create Cloudflare Pages Project**
```bash
# Use project name: pearl-beauty (stored in meta_info)
npx wrangler pages project create pearl-beauty \
  --production-branch main \
  --compatibility-date 2024-01-01
```

**4. Deploy to Cloudflare Pages**
```bash
npx wrangler pages deploy dist --project-name pearl-beauty
```

**You'll get URLs like:**
- Production: `https://random-id.pearl-beauty.pages.dev`
- Branch: `https://main.pearl-beauty.pages.dev`

**5. Test Deployment**
```bash
curl https://pearl-beauty.pages.dev
curl https://pearl-beauty.pages.dev/api/products
```

---

## 🎯 Phase 3: Connect Custom Domain (pearlbeautyent.com)

### Option A: Replace Shopify Entirely (Recommended)
**Use this if client wants to fully migrate away from Shopify.**

#### DNS Changes Required
1. **Login to domain registrar** (whoever manages pearlbeautyent.com DNS)
2. **Change nameservers to Cloudflare** OR **update DNS records**:

**If changing nameservers (best):**
- Point nameservers to Cloudflare's (they'll provide these)
- Cloudflare will automatically manage DNS

**If updating DNS records (manual):**
- Delete: `A` and `CNAME` records pointing to Shopify
- Add: `CNAME` record pointing to `pearl-beauty.pages.dev`

#### Cloudflare Domain Setup
```bash
# Add custom domain to Cloudflare Pages
npx wrangler pages domain add pearlbeautyent.com --project-name pearl-beauty

# Cloudflare will provide DNS instructions
# SSL certificate is automatic (HTTPS enabled)
```

#### Verify Domain Connection
```bash
# Wait 5-10 minutes for DNS propagation
curl https://pearlbeautyent.com
curl https://pearlbeautyent.com/api/products
```

### Option B: Use Subdomain (Keep Shopify Active)
**Use this if client wants to keep Shopify store for now.**

#### Setup subdomain like `new.pearlbeautyent.com`
```bash
# Add subdomain to Cloudflare Pages
npx wrangler pages domain add new.pearlbeautyent.com --project-name pearl-beauty

# Add DNS CNAME record:
# Type: CNAME
# Name: new
# Target: pearl-beauty.pages.dev
```

---

## 🎯 Phase 4: Post-Deployment Verification

### Test Checklist
```bash
# 1. Homepage loads
curl -I https://pearlbeautyent.com

# 2. API endpoints work
curl https://pearlbeautyent.com/api/products | jq

# 3. Static files load
curl -I https://pearlbeautyent.com/static/app.js
curl -I https://pearlbeautyent.com/static/style.css

# 4. Product images load
curl -I https://pearlbeautyent.com/static/images/products/curl-gel-main.webp

# 5. Quiz functionality works (browser test)
open https://pearlbeautyent.com
```

### Browser Tests
- [ ] Homepage loads with proper styling
- [ ] Product cards display images
- [ ] Quiz modal opens and shows results
- [ ] Product detail page tabs work
- [ ] Mobile responsive (test on phone)

---

## 📊 Quick Reference: Commands Summary

```bash
# BUILD
cd /home/user/webapp && npm run build

# DEPLOY
npx wrangler pages deploy dist --project-name pearl-beauty

# ADD DOMAIN
npx wrangler pages domain add pearlbeautyent.com --project-name pearl-beauty

# CHECK STATUS
npx wrangler pages deployment list --project-name pearl-beauty

# VIEW LOGS
npx wrangler pages deployment tail --project-name pearl-beauty
```

---

## 🚨 Common Issues & Fixes

### Issue: Build fails
```bash
# Clean and rebuild
rm -rf node_modules .wrangler dist
npm install
npm run build
```

### Issue: Images don't load
```bash
# Verify image paths
ls -R /home/user/webapp/public/static/images/

# Check serveStatic config in src/index.tsx
# Should be: app.use('/static/*', serveStatic({ root: './public' }))
```

### Issue: Domain not connecting
```bash
# Check DNS propagation (wait 5-10 minutes)
nslookup pearlbeautyent.com

# Verify Cloudflare Pages domain status
npx wrangler pages domain list --project-name pearl-beauty
```

### Issue: API routes 404
```bash
# Check _routes.json in dist directory
cat /home/user/webapp/dist/_routes.json

# Should include: {"include": ["/api/*"], "exclude": ["/static/*"]}
```

---

## 🎯 Next Steps After Live

1. **Monitor Performance**:
   - Check Cloudflare Analytics dashboard
   - Monitor API response times

2. **Add Monitoring**:
   ```bash
   # Setup uptime monitoring (optional)
   # Use services like UptimeRobot, Pingdom, or Cloudflare's built-in monitoring
   ```

3. **Setup Analytics** (optional):
   - Add Google Analytics 4
   - Add Meta Pixel for ads

4. **SEO Verification**:
   - Submit sitemap to Google Search Console
   - Verify meta tags and schema markup

---

## 💰 Cost Breakdown

- **Cloudflare Pages**: FREE (up to 500 builds/month)
- **Domain**: Already owned by client
- **SSL Certificate**: FREE (automatic via Cloudflare)
- **Bandwidth**: FREE (unlimited on Cloudflare Pages)
- **Total**: $0/month 🎉

---

**Questions?** Just ask. Let's get this live! 🚀
