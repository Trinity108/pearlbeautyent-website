# Shopify Bundles Setup Guide for Pearl Beauty
*Implementation plan for when you get Shopify admin access*

---

## 🎯 OBJECTIVE

Create 3 bundle products in Shopify that match the pricing and structure on the Pearl Beauty website.

---

## 📦 BUNDLES TO CREATE

### **Bundle 1: Frizz-Control Trio**
**Products Included:**
- Caribbean Players Leave-In Conditioner ($10.95)
- Caribbean Players Curl Defining Gel ($8.95)
- Caribbean Players Moisturizing Shine Spray ($8.95)

**Pricing:**
- Regular Price: $28.85
- Sale Price: $24.52
- Savings: $4.33 (15% off)

**Ideal For:** High humidity, outdoor lifestyle

---

### **Bundle 2: Hydration Wash-Day Kit**
**Products Included:**
- Caribbean Players Shampoo ($8.95)
- Caribbean Players Conditioner ($8.95)
- Caribbean Players Softening Hair Moisturizer ($8.95)

**Pricing:**
- Regular Price: $26.85
- Sale Price: $22.82
- Savings: $4.03 (15% off)

**Ideal For:** Dry, coarse textures

---

### **Bundle 3: Define & Shine Set**
**Products Included:**
- Caribbean Players Leave-In Conditioner ($10.95)
- Caribbean Players Curl Defining Gel ($8.95)
- Caribbean Players Conditioner ($8.95)

**Pricing:**
- Regular Price: $28.85
- Sale Price: $24.52
- Savings: $4.33 (15% off)

**Ideal For:** All curl types, daily styling

---

## 🛠️ SHOPIFY SETUP STEPS

### **Step 1: Install Bundle App (Recommended)**

**Option A: Shopify Bundles (Official - FREE)**
1. Go to Shopify App Store
2. Search for "Shopify Bundles"
3. Click "Add app"
4. Follow installation prompts

**Option B: Bold Bundles (Premium - if you need more features)**
- More customization options
- Tiered discounts
- Bundle variants

---

### **Step 2: Create Each Bundle Product**

For each bundle, follow these steps:

#### **2.1 Create Bundle in App**
1. Open Shopify Bundles app
2. Click "Create bundle"
3. Enter bundle name (e.g., "Frizz-Control Trio")

#### **2.2 Add Products to Bundle**
1. Click "Add products"
2. Select the 3 products for this bundle
3. Set quantity to 1 for each product

#### **2.3 Set Bundle Pricing**
1. **Compare at price:** Enter regular price (e.g., $28.85)
2. **Sale price:** Enter bundle price (e.g., $24.52)
3. Enable "Show savings" badge

#### **2.4 Add Bundle Description**
Copy-paste from below based on bundle type:

**Frizz-Control Trio Description:**
```
Beat halo-frizz and keep glossy definition in sticky weather.

✅ Leave-In Conditioner - Lightweight moisture prep
✅ Curl Defining Gel - Flexible hold without crunch
✅ Shine Spray - Adds gloss and fights humidity

**Perfect for:** High humidity, outdoor lifestyle
**Tested in:** Caribbean humidity - up to 90% RH
**Hair types:** 2C, 3A, 3B, 3C, 4A

🎁 Save $4.33 (15% OFF) when you bundle!
🚚 FREE shipping on orders $50+

**Why this routine works:**
Island-tested formulas create a moisture barrier against humidity while defining your curls without stiffness or crunch. The complete system preps, defines, and seals for all-day hold.
```

**Hydration Wash-Day Kit Description:**
```
Reset, rehydrate, and soften so curls start smooth and stay smooth.

✅ Shampoo - Gentle sulfate-free cleanse
✅ Conditioner - Deep conditioning without buildup
✅ Softening Hair Moisturizer - Rich moisture seal

**Perfect for:** Dry, coarse textures
**Ideal for:** Wash day reset
**Hair types:** 2A-4C (all curl types)

🎁 Save $4.03 (15% OFF) when you bundle!
🚚 FREE shipping on orders $50+

**Why this routine works:**
Complete wash-day system that cleanses, conditions, and seals moisture deep into curls. Caribbean botanicals nourish from root to tip while softening rough textures without weighing down your pattern.
```

**Define & Shine Set Description:**
```
Touchably defined curls with flexible hold and healthy bounce.

✅ Leave-In Conditioner - Prep and protect
✅ Curl Defining Gel - Strong hold without crunch
✅ Conditioner - Deep conditioning base

**Perfect for:** All curl types, daily styling
**Best for:** Everyday definition
**Hair types:** 2A-4C

🎁 Save $4.33 (15% OFF) when you bundle!
🚚 FREE shipping on orders $50+

**Why this routine works:**
The all-purpose curl system that works for every texture. Prep with moisture, define with lightweight gel, and maintain with regular conditioning. Your go-to routine for consistent results.
```

#### **2.5 Add Bundle Images**
Create bundle mockup images showing:
- All 3 products arranged together
- Text overlay with bundle name
- "Save 15%" badge
- Lifestyle shot (if available)

**Image specs:**
- Size: 2048x2048px (square)
- Format: JPG or PNG
- Background: White or lifestyle

#### **2.6 Set Bundle Handle (URL)**
- Frizz-Control Trio: `frizz-control-trio`
- Hydration Wash-Day Kit: `hydration-wash-day-kit`
- Define & Shine Set: `define-shine-set`

#### **2.7 Add Bundle to Collection**
1. Create new collection: "Bundles"
2. Add all 3 bundles to this collection
3. Set collection handle: `bundles`

---

### **Step 3: Update Website Quiz Links**

Once bundles are live in Shopify, update the quiz results link:

**Current link (in app.js):**
```javascript
<a href="https://pearlbeautyent.com/collections/bundles" target="_blank">
```

**If bundles are in separate collection:**
```javascript
<a href="https://pearlbeautyent.com/collections/bundles" target="_blank">
```

**If you want to link to specific bundles:**
- Frizz-Control: `https://pearlbeautyent.com/products/frizz-control-trio`
- Hydration Kit: `https://pearlbeautyent.com/products/hydration-wash-day-kit`
- Define & Shine: `https://pearlbeautyent.com/products/define-shine-set`

---

## 🎨 SHOPIFY THEME CUSTOMIZATION (Optional)

### **Add Bundle Section to Homepage**

1. Go to **Online Store → Themes → Customize**
2. Add new section: "Featured Collection"
3. Select collection: "Bundles"
4. Title: "Pre-Curated Curl Kits"
5. Subtitle: "Save 15% on complete routines"

### **Create Bundles Landing Page**

1. Go to **Online Store → Pages → Add page**
2. Page title: "Curl Care Bundles"
3. Handle: `bundles`
4. Content:

```html
<div style="text-align: center; max-width: 800px; margin: 0 auto 40px;">
  <h1>Pre-Curated Curl Care Bundles</h1>
  <p style="font-size: 18px; color: #666;">
    Not sure where to start? We've done the work for you. Each bundle is designed for specific curl concerns and tested in real Caribbean humidity.
  </p>
  <p style="font-size: 16px; color: #0D9488; font-weight: bold;">
    💰 Save 15% on every bundle | 🚚 FREE shipping on orders $50+
  </p>
</div>

<!-- Bundles will appear below via Shopify theme -->
```

4. Template: `page.collection-list`
5. Show collection: "Bundles"

---

## 📊 BUNDLE ANALYTICS TO TRACK

Once bundles are live, monitor these metrics in Shopify Analytics:

1. **Bundle conversion rate** vs individual products
2. **Average order value** (should increase from $8.95 → $23+)
3. **Which bundle sells most** (optimize marketing around winner)
4. **Quiz → Bundle purchase rate** (track effectiveness)

---

## 🔧 TECHNICAL INTEGRATION (For Developer)

### **Update Website Bundle Links Dynamically**

Once bundles are created, update these files:

**File 1: `/home/user/webapp/public/static/app.js`**

Current line 1010:
```javascript
<a href="https://pearlbeautyent.com/collections/bundles" target="_blank" class="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-block">
```

**Option 1: Link to bundles collection (recommended)**
Keep as-is: `collections/bundles`

**Option 2: Link to specific bundle based on quiz result**
```javascript
// Add bundle handle mapping
const bundleHandles = {
    'Frizz-Control Trio': 'frizz-control-trio',
    'Hydration Wash-Day Kit': 'hydration-wash-day-kit',
    'Define & Shine Set': 'define-shine-set'
};

// Update link dynamically
const bundleHandle = bundleHandles[routine.bundleName] || 'bundles';
<a href="https://pearlbeautyent.com/products/${bundleHandle}" target="_blank">
```

---

## ✅ PRE-LAUNCH CHECKLIST

Before announcing bundles to customers:

- [ ] All 3 bundles created in Shopify
- [ ] Pricing accurate ($22.82-$24.52)
- [ ] Product descriptions complete
- [ ] Bundle images uploaded
- [ ] Added to "Bundles" collection
- [ ] Test purchase flow (use Shopify test mode)
- [ ] Verify savings calculations show correctly
- [ ] Mobile responsive check
- [ ] Update website links if needed
- [ ] Create social media graphics for bundle launch
- [ ] Email existing customers about bundles

---

## 💡 MARKETING BUNDLE LAUNCH (Post-Setup)

### **Email Campaign:**
**Subject:** "New: Pre-Curated Curl Kits (Save 15%)"

**Content:**
```
We heard you: "Where do I start?"

We've created 3 pre-curated kits based on your most common curl concerns:

🌴 Frizz-Control Trio ($24.52) - Beat humidity
💧 Hydration Wash-Day Kit ($22.82) - Deep moisture
✨ Define & Shine Set ($24.52) - All-purpose routine

Each bundle saves you $4+ and comes with step-by-step instructions.

Not sure which one? Take our 2-minute quiz →
[Quiz Link]

🚚 FREE shipping on orders $50+ (2 bundles = free shipping!)

Shop Bundles →
[Collections/Bundles Link]
```

### **Social Media Posts:**
- Carousel showing each bundle's 3 products
- Quiz CTA: "Take our quiz to find your bundle"
- Customer testimonial using bundle
- Before/After with bundle results

---

## 🚀 NEXT STEPS

**Immediate (When You Get Admin Access):**
1. Install Shopify Bundles app (FREE)
2. Create 3 bundles using pricing above
3. Test purchase flow
4. Notify developer when live (update website links if needed)

**Optional (For Growth):**
5. Create bundle landing page
6. Add bundles section to homepage
7. Launch email campaign
8. Create social media bundle graphics

---

## 📞 SUPPORT

**If you need help with Shopify setup:**
1. Shopify Support: help.shopify.com
2. Shopify Bundles app docs: shopify.com/bundles
3. Your developer (Lion) can update website links once bundles are live

---

**This guide ensures your bundles match the website perfectly and are ready to drive sales! 🔥**
