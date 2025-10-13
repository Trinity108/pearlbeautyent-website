# 🎨 Lion's AI Image Generation Workflow

**Goal**: Generate professional product images for Caribbean Players haircare line using AI tools.

---

## 🎯 What You Need

### Product Images Required (4 total)
1. **Caribbean Players Curl Defining Gel** → `curl-gel-main.webp`
2. **Caribbean Players Leave-In Conditioner** → `leave-in-main.webp`
3. **Caribbean Players Shampoo** → `shampoo-main.webp`
4. **Caribbean Players Edge Control** → `edge-control-main.webp`

### Image Specs
- **Format**: WebP (best compression for web)
- **Dimensions**: 800x800px minimum (square aspect ratio for product shots)
- **Style**: Clean, professional e-commerce photography
- **Background**: White or transparent
- **Lighting**: Studio-quality, well-lit
- **Branding**: Teal (#0D9488) and coral (#FF6B6B) accent colors

---

## 🎨 AI Image Generation: Step-by-Step

### Method 1: GenSpark Image Generation Tool (Fastest)

**Use this command structure for each product:**

```
Generate product image with these specs:
- Model: ideogram/V_3 (best for product photography + text rendering)
- Aspect ratio: 1:1 (square)
- Prompt: [see prompts below]
```

#### Optimized Prompts for Each Product

**1. Curl Defining Gel**
```
Professional product photography of Caribbean hair gel bottle on white background. 
Clear plastic bottle with teal pump cap, coral accent stripe, clean minimalist label 
with "Caribbean Players" text. Studio lighting, soft shadows, e-commerce style, 
8K resolution, photorealistic.
```

**2. Leave-In Conditioner**
```
Professional product photography of Caribbean leave-in conditioner spray bottle on 
white background. Frosted teal bottle with coral spray nozzle, "Caribbean Players" 
branding. Studio lighting, commercial photography, clean aesthetic, 8K resolution, 
photorealistic.
```

**3. Shampoo**
```
Professional product photography of Caribbean shampoo bottle with pump dispenser on 
white background. Teal bottle with coral pump top, "Caribbean Players" label. Studio 
lighting, clean minimalist style, e-commerce product shot, 8K resolution, photorealistic.
```

**4. Edge Control**
```
Professional product photography of Caribbean edge control jar on white background. 
Teal cylindrical jar with coral lid, "Caribbean Players" branding on front. Studio 
lighting, clean aesthetic, commercial photography, 8K resolution, photorealistic.
```

#### Generation Parameters
- **Model**: `ideogram/V_3` (best text rendering + product consistency)
- **Aspect Ratio**: `1:1`
- **Quality**: High (use default settings)
- **Iterations**: Generate 2-3 variations per product, pick best

---

### Method 2: Dall-E 3 or Midjourney (Alternative)

**If using Dall-E 3** (via ChatGPT Plus or API):
```
Style: Product photography, studio lighting, white background
Mood: Professional, clean, commercial
Colors: Teal (#0D9488) and coral (#FF6B6B)
Format: Square aspect ratio
Quality: HD
```

**If using Midjourney**:
```
/imagine prompt: Professional product photography of [product description], 
white background, studio lighting, commercial photography, 8k, photorealistic 
--ar 1:1 --style raw --v 6
```

---

### Method 3: Use Existing Assets (Fastest if Available)

**Steps:**
1. **Download current logo** from Shopify:
   - URL: https://pearlbeautyent.com/cdn/shop/files/Pearl-Beauty-Logo.webp
   - Save as: `/home/user/webapp/public/static/images/logo.webp`

2. **Check if client has product photos**:
   - Ask client directly for high-res images
   - Check their Shopify product listings for existing assets

3. **Grab from Shopify catalog**:
   ```bash
   # Download images from Shopify CDN (if they exist)
   curl -o /home/user/webapp/public/static/images/products/curl-gel-main.webp \
     https://pearlbeautyent.com/cdn/shop/files/curl-gel.webp
   ```

---

## 🛠️ Post-Generation: Image Optimization

### Convert to WebP Format (if needed)
```bash
# Install cwebp if not available
# (usually pre-installed in most systems)

# Convert PNG/JPG to WebP
cwebp -q 85 input-image.png -o curl-gel-main.webp
cwebp -q 85 input-image.jpg -o leave-in-main.webp

# Batch convert all images
for img in *.png; do
  cwebp -q 85 "$img" -o "${img%.png}.webp"
done
```

### Resize Images to Optimal Dimensions
```bash
# Using ImageMagick (if available)
convert input.jpg -resize 800x800 -quality 85 output.webp

# Or using ffmpeg
ffmpeg -i input.png -vf scale=800:800 -quality 85 output.webp
```

### Optimize File Size
```bash
# Check current file sizes
ls -lh /home/user/webapp/public/static/images/products/

# Target: Keep each image under 150KB for fast loading
# If images are too large, reduce quality:
cwebp -q 75 input.webp -o output-optimized.webp
```

---

## 📁 File Organization

### Directory Structure
```
/home/user/webapp/public/static/images/
├── logo.webp                          # Pearl Beauty logo
├── products/
│   ├── curl-gel-main.webp            # Curl Defining Gel
│   ├── leave-in-main.webp            # Leave-In Conditioner
│   ├── shampoo-main.webp             # Shampoo
│   └── edge-control-main.webp        # Edge Control
└── hero/
    └── caribbean-background.webp      # (Optional) Hero section background
```

### Add Images to Project
```bash
# Create directories
mkdir -p /home/user/webapp/public/static/images/products/
mkdir -p /home/user/webapp/public/static/images/hero/

# Move generated images to correct locations
# (After downloading from AI tool)
mv ~/Downloads/curl-gel-main.webp /home/user/webapp/public/static/images/products/
mv ~/Downloads/leave-in-main.webp /home/user/webapp/public/static/images/products/
mv ~/Downloads/shampoo-main.webp /home/user/webapp/public/static/images/products/
mv ~/Downloads/edge-control-main.webp /home/user/webapp/public/static/images/products/

# Verify images
ls -lh /home/user/webapp/public/static/images/products/

# Commit to git
cd /home/user/webapp
git add public/static/images/
git commit -m "✨ Add AI-generated product images"
```

---

## 🎯 Brand Consistency Guidelines

### Color Palette
- **Primary Teal**: `#0D9488` (RGB: 13, 148, 136)
- **Dark Teal**: `#115E59` (RGB: 17, 94, 89)
- **Coral Accent**: `#FF6B6B` (RGB: 255, 107, 107)
- **Background**: White `#FFFFFF`

### Typography Style
- **Font**: Clean, modern sans-serif (e.g., "Montserrat", "Poppins", "Inter")
- **Text**: "Caribbean Players" branding should be visible on labels
- **Size**: Label text should be readable (not too small)

### Caribbean Visual Elements (Optional)
- Subtle wave patterns (teal gradient)
- Tropical leaf motifs (background/watermark)
- Ocean/beach color palette inspiration

---

## ⚡ Quick Commands Cheatsheet

```bash
# CREATE DIRECTORIES
mkdir -p /home/user/webapp/public/static/images/{products,hero}/

# DOWNLOAD EXISTING LOGO
curl -o /home/user/webapp/public/static/images/logo.webp \
  https://pearlbeautyent.com/cdn/shop/files/Pearl-Beauty-Logo.webp

# VERIFY IMAGES
ls -lhR /home/user/webapp/public/static/images/

# CHECK FILE SIZES
du -sh /home/user/webapp/public/static/images/*

# COMMIT IMAGES
cd /home/user/webapp && git add public/static/images/ && git commit -m "✨ Add product images"

# BUILD AND TEST LOCALLY
cd /home/user/webapp && npm run build && npm run dev:sandbox
```

---

## 🚨 Troubleshooting

### Images Not Loading in Browser
```bash
# Check file paths match exactly
ls /home/user/webapp/public/static/images/products/

# Expected files:
# - curl-gel-main.webp
# - leave-in-main.webp
# - shampoo-main.webp
# - edge-control-main.webp

# Check serveStatic config in src/index.tsx
# Line should be: app.use('/static/*', serveStatic({ root: './public' }))
```

### Images Too Large (Slow Loading)
```bash
# Check file sizes
ls -lh /home/user/webapp/public/static/images/products/

# If over 200KB each, re-optimize:
cwebp -q 75 curl-gel-main.webp -o curl-gel-main-optimized.webp
mv curl-gel-main-optimized.webp curl-gel-main.webp
```

### Wrong Image Format
```bash
# Convert to WebP if you have PNG/JPG
cwebp -q 85 image.png -o image.webp
```

---

## 🎨 Next Level: Hero Background (Optional)

**If you want a custom hero background image:**

### Prompt for Hero Section
```
Wide cinematic photograph of Caribbean beach scene with turquoise ocean waves and 
golden sand, soft focus, dreamy atmosphere, teal and coral color grading, professional 
travel photography, 8K resolution, shallow depth of field, warm tropical lighting 
--ar 16:9
```

**Or use gradient background (easier):**
- Already implemented in `style.css` with animated teal wave pattern
- No image needed (keeps site faster)

---

## 📊 Image Performance Checklist

- [ ] All 4 product images generated
- [ ] Images saved as WebP format
- [ ] File sizes under 150KB each
- [ ] Images placed in `/public/static/images/products/`
- [ ] Filenames match exactly: `curl-gel-main.webp`, etc.
- [ ] Logo downloaded from Shopify (optional)
- [ ] Committed to git repository
- [ ] Tested locally (images load correctly)
- [ ] Built and deployed to Cloudflare Pages

---

**Ready to generate?** Use the prompts above and let's get these images live! 🚀
