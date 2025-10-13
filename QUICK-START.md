# ⚡ Quick Start: Take Pearl Beauty from 0 → Live

**For Lion - No client BS, just what YOU need to do.**

---

## 🎯 Current State
- ✅ Site code complete and tested locally
- ✅ Copy finalized (conversion-optimized)
- ✅ Git repository initialized
- ❌ NO IMAGES YET (all placeholder paths)
- ❌ NOT DEPLOYED to Cloudflare Pages
- ❌ NOT connected to pearlbeautyent.com (currently on Shopify)

---

## 📋 Your Checklist: 4 Steps to Live

### ✅ Step 1: Generate Product Images (30 minutes)
**Read**: `AI-IMAGE-WORKFLOW.md` for full details

**Quick version:**
1. Use GenSpark's `image_generation` tool with these prompts:
   ```
   Model: ideogram/V_3
   Aspect ratio: 1:1
   
   Product 1: "Professional product photography of Caribbean hair gel bottle 
   on white background. Clear plastic bottle with teal pump cap, coral accent 
   stripe, clean minimalist label with 'Caribbean Players' text. Studio 
   lighting, photorealistic."
   
   Product 2: "Professional product photography of Caribbean leave-in 
   conditioner spray bottle on white background. Frosted teal bottle with 
   coral spray nozzle, 'Caribbean Players' branding. Studio lighting, 
   commercial photography, photorealistic."
   
   Product 3: "Professional product photography of Caribbean shampoo bottle 
   with pump dispenser on white background. Teal bottle with coral pump top, 
   'Caribbean Players' label. Studio lighting, photorealistic."
   
   Product 4: "Professional product photography of Caribbean edge control jar 
   on white background. Teal cylindrical jar with coral lid, 'Caribbean 
   Players' branding. Studio lighting, photorealistic."
   ```

2. Download images as WebP format
3. Save to: `/home/user/webapp/public/static/images/products/`
4. Name exactly as:
   - `curl-gel-main.webp`
   - `leave-in-main.webp`
   - `shampoo-main.webp`
   - `edge-control-main.webp`

5. Commit:
   ```bash
   cd /home/user/webapp
   git add public/static/images/
   git commit -m "✨ Add product images"
   ```

---

### ✅ Step 2: Deploy to Cloudflare Pages (15 minutes)
**Read**: `LION-DEPLOY.md` for full details

**Quick version:**
1. **Setup Cloudflare API key:**
   ```bash
   # I'll call setup_cloudflare_api_key tool for you
   # If it fails, go to Deploy tab and configure your API key
   ```

2. **Build the site:**
   ```bash
   cd /home/user/webapp && npm run build
   ```

3. **Create Cloudflare Pages project:**
   ```bash
   npx wrangler pages project create pearl-beauty \
     --production-branch main \
     --compatibility-date 2024-01-01
   ```

4. **Deploy:**
   ```bash
   npx wrangler pages deploy dist --project-name pearl-beauty
   ```

5. **Test deployment:**
   - You'll get URL like: `https://pearl-beauty.pages.dev`
   - Test: `curl https://pearl-beauty.pages.dev`

---

### ✅ Step 3: Connect Custom Domain (10 minutes)
**Read**: `LION-DEPLOY.md` Phase 3 for full details

**Quick version:**
1. **Add domain to Cloudflare Pages:**
   ```bash
   npx wrangler pages domain add pearlbeautyent.com --project-name pearl-beauty
   ```

2. **Update DNS:**
   - Login to domain registrar (whoever manages pearlbeautyent.com)
   - Change nameservers to Cloudflare's (they'll provide these)
   - OR update DNS records:
     - Delete: A/CNAME records pointing to Shopify
     - Add: CNAME record pointing to `pearl-beauty.pages.dev`

3. **Wait 5-10 minutes** for DNS propagation

4. **Verify:**
   ```bash
   curl https://pearlbeautyent.com
   ```

---

### ✅ Step 4: Final Verification (5 minutes)

**Browser tests:**
- [ ] Homepage loads with styling
- [ ] Product images display correctly
- [ ] Quiz modal opens and shows results
- [ ] Product page tabs work
- [ ] Mobile responsive (test on phone)

**API tests:**
```bash
curl https://pearlbeautyent.com/api/products | jq
curl https://pearlbeautyent.com/static/app.js -I
curl https://pearlbeautyent.com/static/images/products/curl-gel-main.webp -I
```

**Performance test:**
- Open: https://developers.google.com/speed/pagespeed/insights/
- Test: pearlbeautyent.com
- Target: 90+ score on mobile

---

## 🚨 If Something Breaks

### Images not loading?
```bash
# Check file paths
ls /home/user/webapp/public/static/images/products/

# Should show:
# curl-gel-main.webp
# leave-in-main.webp
# shampoo-main.webp
# edge-control-main.webp
```

### Build fails?
```bash
rm -rf node_modules .wrangler dist
npm install
npm run build
```

### Domain not connecting?
```bash
# Check DNS propagation
nslookup pearlbeautyent.com

# Verify Cloudflare Pages domain
npx wrangler pages domain list --project-name pearl-beauty
```

---

## 🎉 Success = Site Live!

**When complete, you'll have:**
- ✅ pearlbeautyent.com pointing to YOUR new site
- ✅ All product images displaying
- ✅ Full conversion-optimized UX
- ✅ Deployed on Cloudflare Pages (free)
- ✅ HTTPS enabled automatically
- ✅ Global edge performance (195+ countries)

**Total time estimate: 1-2 hours** (mostly AI image generation wait time)

---

## 📱 Test Devices

**After live, test on:**
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Desktop (Chrome, Firefox, Safari)
- [ ] Tablet (iPad Safari)

---

## 💡 Pro Tips

1. **Save Cloudflare URLs:**
   - Production: `https://pearl-beauty.pages.dev`
   - Custom: `https://pearlbeautyent.com`

2. **Keep git updated:**
   ```bash
   cd /home/user/webapp
   git add .
   git commit -m "🚀 Production deployment"
   ```

3. **Monitor performance:**
   - Cloudflare Analytics: https://dash.cloudflare.com
   - Check loading times weekly

4. **Future updates:**
   ```bash
   # Make changes
   cd /home/user/webapp && npm run build
   npx wrangler pages deploy dist --project-name pearl-beauty
   ```

---

**Questions? Check `LION-DEPLOY.md` or `AI-IMAGE-WORKFLOW.md` for detailed instructions.**

**Let's get this live! 🚀**
