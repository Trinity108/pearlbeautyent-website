# 📸 Pearl Beauty Image Management Guide
## Quick Reference for Adding & Optimizing Images

---

## **IMAGE FOLDER STRUCTURE**

```
webapp/
└── public/
    └── static/
        ├── favicon.ico              # Browser tab icon (32x32px)
        ├── app.js                   # Frontend JavaScript
        ├── style.css                # Custom styles
        └── images/
            ├── logo.png             # Main logo (200-300px wide)
            ├── logo-white.png       # White version for dark backgrounds
            ├── hero-curls.jpg       # Homepage hero image (1920x1080px)
            └── products/
                ├── curl-gel-main.webp      # Product photos
                ├── curl-gel-angle.webp
                ├── curl-gel-back.webp
                ├── curl-gel-inuse.webp
                ├── leave-in-main.webp
                ├── leave-in-angle.webp
                ├── moisturizer-main.webp
                ├── shine-spray-main.webp
                └── ... (more products)
```

---

## **QUICK IMAGE SPECS**

### **Logo**
- **Format:** PNG with transparency or SVG
- **Size:** 200-300px wide, proportional height
- **File size:** Under 50KB
- **Location:** `/public/static/images/logo.png`
- **Usage:** Header, footer, meta tags

### **Favicon** 
- **Format:** ICO or PNG
- **Size:** 32x32px or 16x16px
- **File size:** Under 10KB
- **Location:** `/public/static/favicon.ico`
- **Usage:** Browser tab icon

### **Hero Banner**
- **Format:** WebP or JPEG
- **Size:** 1920x1080px (Full HD)
- **File size:** Under 300KB
- **Location:** `/public/static/images/hero-curls.jpg`
- **Usage:** Homepage hero background

### **Product Photos**
- **Format:** WebP (preferred) or JPEG
- **Size:** 1200x1200px (square)
- **File size:** Under 200KB each
- **Location:** `/public/static/images/products/`
- **Usage:** Product cards, detail pages

### **UGC/Lifestyle Photos**
- **Format:** WebP or JPEG
- **Size:** 800x800px to 1200x1200px
- **File size:** Under 150KB each
- **Location:** `/public/static/images/ugc/`
- **Usage:** Social proof sections

---

## **IMAGE OPTIMIZATION WORKFLOW**

### **Step 1: Organize Your Raw Images**

Create folders on your computer:
```
Pearl-Beauty-Images/
├── 01-logo/
│   ├── logo-original.png
│   └── logo-white.png
├── 02-products/
│   ├── curl-gel/
│   │   ├── main.jpg
│   │   ├── angle.jpg
│   │   └── inuse.jpg
│   ├── leave-in/
│   └── moisturizer/
├── 03-hero/
│   └── hero-beach.jpg
└── 04-ugc/
    ├── miami-test.jpg
    └── houston-festival.jpg
```

### **Step 2: Compress & Convert**

**Option A: TinyPNG (Easiest)**
1. Go to https://tinypng.com
2. Drag and drop up to 20 images
3. Wait for compression (automatic)
4. Click "Download all"
5. Extract ZIP file

**Option B: Squoosh (More Control)**
1. Go to https://squoosh.app
2. Drop one image
3. Choose "WebP" in right panel
4. Set quality to 85%
5. Click download icon
6. Repeat for each image

**Option C: Batch Convert (Multiple Images)**
1. Go to https://cloudconvert.com
2. Select "Convert to WebP"
3. Upload all images
4. Set quality to 85%
5. Click "Convert"
6. Download all

### **Step 3: Rename Files**

Use this naming convention:

**Products:**
```
curl-gel-main.webp          # Front view, clean background
curl-gel-angle.webp         # 45-degree angle
curl-gel-back.webp          # Label/ingredients visible
curl-gel-inuse.webp         # Hand holding or using

leave-in-main.webp
leave-in-angle.webp
leave-in-back.webp
leave-in-inuse.webp

moisturizer-main.webp
shine-spray-main.webp
```

**Lifestyle/UGC:**
```
hero-caribbean-beach.webp
miami-pool-test.webp
houston-festival.webp
nyc-subway-curls.webp
```

### **Step 4: Upload to Project**

**Via Terminal:**
```bash
# Navigate to project
cd /home/user/webapp

# Copy logo
cp ~/Downloads/logo.png public/static/images/
cp ~/Downloads/favicon.ico public/static/

# Copy products
cp ~/Downloads/products/*.webp public/static/images/products/

# Copy hero
cp ~/Downloads/hero-curls.jpg public/static/images/
```

**Via File Manager:**
1. Open project folder: `/home/user/webapp/public/static/images/`
2. Drag and drop images into appropriate folders
3. Verify file names match exactly

---

## **UPDATING IMAGE REFERENCES IN CODE**

### **Logo Update**

**File:** `/home/user/webapp/src/renderer.tsx`

Find and update:
```tsx
// Around line 60
"logo": "/static/images/logo.png"

// Open Graph image
content="/static/images/hero-curls.jpg"
```

### **Product Images Update**

**File:** `/home/user/webapp/src/index.tsx`

Find the products array (around line 30) and update:

```typescript
{
  id: 1,
  name: 'Caribbean Players Curl Defining Gel',
  image: '/static/images/products/curl-gel-main.webp',  // UPDATE THIS
  // ... rest of product data
}
```

Repeat for all 4 products.

### **Hero Background (Optional Advanced)**

If you want a real image background instead of gradient:

**File:** `/home/user/webapp/src/index.tsx`

Update hero section (around line 580):

```tsx
// OLD
<section className="hero bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20 px-4">

// NEW - with background image
<section className="hero bg-cover bg-center text-white py-20 px-4" 
         style="background-image: linear-gradient(rgba(13, 148, 136, 0.8), rgba(17, 94, 89, 0.9)), url('/static/images/hero-curls.jpg');">
```

This adds a teal overlay over your hero image for better text readability.

---

## **VERIFICATION CHECKLIST**

After uploading images, verify:

### **Local Testing**
```bash
cd /home/user/webapp
npm run build
pm2 restart pearl-beauty
```

Visit http://localhost:3000 and check:
- [ ] Logo appears in header
- [ ] Favicon shows in browser tab
- [ ] All 4 product images load
- [ ] Hero section displays correctly
- [ ] Images look sharp (not pixelated)
- [ ] Page loads quickly (under 3 seconds)

### **Browser Console Check**
1. Open site in Chrome
2. Press F12 (open DevTools)
3. Go to Console tab
4. Look for any 404 errors (missing images)
5. Fix any broken image paths

### **Mobile Check**
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select iPhone or Android device
4. Verify:
   - [ ] Images scale properly
   - [ ] No horizontal scrolling
   - [ ] Text readable over hero image

---

## **COMMON IMAGE ISSUES & FIXES**

### **Issue: "Logo is blurry on my 4K monitor"**

**Fix:** Export logo at 2x size
```
Display size: 200px wide
Export size: 400px wide (2x retina)
```

Or use SVG format (scales infinitely).

### **Issue: "Product images different sizes, layout broken"**

**Fix:** Ensure all products are square (1200x1200px)
```bash
# Check image dimensions
file public/static/images/products/*.webp
```

### **Issue: "Hero image takes forever to load"**

**Fix:** Compress more aggressively
1. Go to TinyPNG
2. Upload hero image
3. Should reduce to under 300KB
4. Replace old file

### **Issue: "Images work locally but not after deployment"**

**Fix:** Check paths use `/static/` prefix
```typescript
// ✅ CORRECT
image: '/static/images/products/curl-gel-main.webp'

// ❌ WRONG
image: './images/curl-gel.webp'
image: '../static/images/curl-gel.webp'
```

### **Issue: "Some images show, others don't"**

**Fix:** Verify exact file names
```bash
# List actual files
ls -la public/static/images/products/

# Compare with code references
grep "image:" src/index.tsx
```

File names are case-sensitive:
- `Curl-Gel.webp` ≠ `curl-gel.webp` ❌
- Must match exactly ✅

---

## **FREE IMAGE RESOURCES**

If you need stock images while waiting for real product photos:

### **Caribbean/Tropical Backgrounds**
- Unsplash: https://unsplash.com/s/photos/caribbean
- Pexels: https://www.pexels.com/search/tropical/
- Pixabay: https://pixabay.com/images/search/caribbean beach/

**Search terms:**
- "caribbean beach sunset"
- "tropical leaves close up"
- "turquoise water"
- "island palm trees"

### **Curly Hair Photos**
- Unsplash: https://unsplash.com/s/photos/curly-hair
- Pexels: https://www.pexels.com/search/afro hair/

**Search terms:**
- "natural curly hair"
- "3c curls"
- "coily hair texture"
- "black woman curly hair"

### **Product Mockup Templates**
- Placeit: https://placeit.net (paid but high quality)
- Canva: https://canva.com (free templates)

---

## **IMAGE OPTIMIZATION TOOLS COMPARISON**

| Tool | Format | Batch? | Quality Control | Best For |
|------|--------|--------|-----------------|----------|
| **TinyPNG** | PNG, JPEG | Yes (20) | Auto | Quick compression |
| **Squoosh** | All formats | No | Manual slider | Perfect quality control |
| **CloudConvert** | Any to WebP | Yes (100+) | Set percentage | Batch conversion |
| **ImageOptim** (Mac) | All formats | Yes | Auto | Mac users |
| **GIMP** (Free) | All formats | Manual | Full control | Advanced editing |

---

## **RECOMMENDED WORKFLOW FOR LAUNCH**

### **Day 1: Organize & Optimize**
1. Collect all brand assets (logo, product photos)
2. Create organized folder structure
3. Compress all images with TinyPNG
4. Convert to WebP format
5. Rename according to convention

### **Day 2: Upload & Test**
1. Upload images to project folders
2. Update image paths in code
3. Build project: `npm run build`
4. Test locally: `pm2 restart pearl-beauty`
5. Verify all images display correctly
6. Check mobile view

### **Day 3: Deploy**
1. Deploy to Cloudflare Pages
2. Test on live URL
3. Verify images on production
4. Test performance (Lighthouse)
5. Make final adjustments

---

## **QUICK TERMINAL COMMANDS**

```bash
# Create image directories
mkdir -p /home/user/webapp/public/static/images/products
mkdir -p /home/user/webapp/public/static/images/ugc

# Check what images exist
ls -lh /home/user/webapp/public/static/images/

# Find all image references in code
grep -r "image:" /home/user/webapp/src/

# Check image file sizes
du -h /home/user/webapp/public/static/images/*

# Verify images copied to dist after build
ls -lh /home/user/webapp/dist/static/images/
```

---

## **AFTER DEPLOYMENT**

### **Test Images on Live Site**

```bash
# Test logo
curl -I https://pearlbeautyent.com/static/images/logo.png

# Test product image
curl -I https://pearlbeautyent.com/static/images/products/curl-gel-main.webp

# Should return: HTTP/2 200 OK
```

### **Performance Check**

1. Open https://pearlbeautyent.com
2. Press F12 → Network tab
3. Reload page
4. Check image sizes in list
5. All images should be under 200KB

### **SEO Image Checklist**

- [ ] Logo has alt text in code
- [ ] Product images have descriptive alt text
- [ ] Hero image has alt text
- [ ] Open Graph image set (for social sharing)
- [ ] Favicon appears correctly
- [ ] All images load over HTTPS

---

**You're ready to make Pearl Beauty look STUNNING!** 🌴📸

Remember: Great images = higher conversions. Invest time in getting quality photos of your products—it pays off!