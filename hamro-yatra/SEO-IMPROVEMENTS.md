# SEO Audit & Improvement Checklist
**Based on Google Search Central Guidelines**

## ✅ Already Implemented (Good Work!)

- [x] **Structured Data (JSON-LD)** - TravelAgency, TouristTrip, Product schemas
- [x] **Dynamic XML Sitemap** - Automatically generated with all pages
- [x] **Meta Tags** - Title, description, OpenGraph, Twitter Cards
- [x] **Mobile Responsive** - Proper viewport configuration
- [x] **HTTPS** - Secure connection
- [x] **Canonical URLs** - Proper canonical tags
- [x] **robots.txt** - ✅ Just added!
- [x] **Web App Manifest** - ✅ Just added!

---

## 🔴 Critical Actions Required

### 1. **Create Favicon & App Icons**
**Priority: HIGH**

Create these image files:
- `public/favicon.ico` (16x16, 32x32, 48x48)
- `public/icon-192.png` (192x192)
- `public/icon-512.png` (512x512)
- `public/apple-touch-icon.png` (180x180)

**Tools to create them:**
- Use [Favicon Generator](https://realfavicongenerator.net/)
- Or [Canva](https://www.canva.com/) → Export at required sizes

---

### 2. **Verify Google Search Console**
**Priority: HIGH**

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: `https://www.hamroyatraadventure.com`
3. Get verification meta tag
4. Add to `src/lib/seo.ts` in the `verification` object:
   ```typescript
   verification: {
     google: "your-google-verification-code",
   }
   ```
5. Submit your sitemap: `https://www.hamroyatraadventure.com/sitemap.xml`

---

### 3. **Add Breadcrumbs to Detail Pages**
**Priority: MEDIUM**

Example for trek detail page (`src/app/treks/[slug]/page.tsx`):

```tsx
import { breadcrumbJsonLd } from "@/lib/jsonld";

// In your page component:
<JsonLd data={breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Trek Packages", url: "/treks" },
  { name: trekTitle, url: `/treks/${slug}` }
])} />
```

Apply to:
- Tour detail pages
- Trek detail pages
- Vehicle detail pages
- Adventure detail pages

---

### 4. **Image Optimization**
**Priority: HIGH**

Current Issues:
- Large images slow down page load
- Missing `alt` attributes hurt accessibility and SEO

**Actions:**
1. **Optimize all images** using [TinyPNG](https://tinypng.com/) or Next.js Image Optimization
2. **Add descriptive alt text** to all images:
   ```tsx
   <Image 
     src="/images-5.jpg" 
     alt="Trekkers hiking through Annapurna Base Camp with mountain views"
   />
   ```
3. **Use WebP format** for better compression
4. **Add image dimensions** to prevent layout shift

---

### 5. **Page Speed Optimization**
**Priority: HIGH**

Test your site: [PageSpeed Insights](https://pagespeed.web.dev/)

**Quick Wins:**
1. Enable Next.js image optimization (already using next/image)
2. Add `loading="lazy"` to below-the-fold images
3. Minimize JavaScript bundles
4. Enable Gzip/Brotli compression on server
5. Use CDN for static assets

Check your `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  compress: true, // Add this
  images: {
    formats: ['image/webp'], // Add this
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

---

### 6. **Content Improvements**
**Priority: MEDIUM**

#### A. Add More Descriptive Content
- Homepage intro should be 300-500 words about your company
- Each tour/trek page should have 400+ words of unique content
- Add FAQ sections to major pages (already have on homepage - good!)

#### B. Internal Linking
- Link related treks/tours within content
- Add "You might also like" sections
- Create blog posts linking to packages

#### C. Add Alt Text to All Images
Search your codebase for `<img` and `<Image` tags without alt attributes:
```bash
# Check for missing alt attributes
grep -r "<Image" src/ | grep -v "alt="
```

---

### 7. **Schema Markup Enhancements**
**Priority: MEDIUM**

Add these to relevant pages:

#### **Reviews Page:**
```typescript
import { reviewJsonLd } from "@/lib/jsonld";

// For each review:
<JsonLd data={reviewJsonLd({
  itemName: "Everest Base Camp Trek",
  rating: 5,
  reviewBody: review.comment,
  author: review.name,
  datePublished: review.createdAt,
})} />
```

#### **Contact Page:**
Add LocalBusiness schema with contact info

---

### 8. **Technical SEO**
**Priority: MEDIUM**

#### A. Add 404 Page
Create `src/app/not-found.tsx`:
```tsx
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link href="/">Go home</Link>
    </div>
  );
}
```

#### B. Add Error Page
Create `src/app/error.tsx` for better error handling

#### C. Check for Broken Links
Use [Broken Link Checker](https://www.brokenlinkcheck.com/)

---

### 9. **Mobile Optimization**
**Priority: HIGH**

Test: [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

- Ensure all buttons are at least 44x44px
- Text should be at least 16px
- Avoid horizontal scrolling
- Test on real devices (iPhone, Android)

---

### 10. **Social Media Integration**
**Priority: LOW**

1. Create social media accounts (if not already):
   - Facebook Business Page
   - Instagram
   - Twitter/X
   
2. Add social sharing buttons to tour/trek pages

3. Update the `sameAs` array in `travelAgencyJsonLd()` with actual URLs

---

## 📊 Monitoring & Analytics

### Set Up These Tools:

1. **Google Search Console** ✅ (Do this first!)
2. **Google Analytics 4** - Track visitor behavior
3. **Bing Webmaster Tools** - Don't ignore Bing!
4. **Ahrefs/SEMrush** - Track rankings (paid tools)

### Monthly SEO Tasks:

- Review Search Console for indexing issues
- Check for crawl errors
- Monitor keyword rankings
- Update content on underperforming pages
- Add new blog content
- Build backlinks from tourism sites

---

## 🎯 Content Strategy

### Blog Topics to Create:
1. "Best Time to Visit Nepal for Trekking"
2. "Everest Base Camp Trek: Complete Guide"
3. "What to Pack for Annapurna Circuit"
4. "Nepal Travel Tips for First-Timers"
5. "Comparing Popular Nepal Treks"
6. "How to Rent a Car in Pokhara"
7. "Nepal Travel Budget Guide"

**Each blog post should:**
- Be 1500+ words
- Include images with alt text
- Link to relevant tours/treks
- Have FAQ section
- Include structured data

---

## 🔗 Link Building Strategy

### Get backlinks from:
1. Nepal tourism forums
2. Travel blogs (guest posting)
3. Tourism directories
4. TripAdvisor business listing
5. Google My Business
6. Tourism authority websites
7. Partner with hotels/lodges

---

## 📈 Expected Results Timeline

- **Week 1-2**: Google indexes all pages
- **Month 1**: Appear in search results
- **Month 2-3**: Rankings improve for brand terms
- **Month 3-6**: Rankings improve for generic keywords
- **Month 6+**: Consistent organic traffic growth

---

## 🚀 Quick Action Plan (Priority Order)

1. ✅ robots.txt - **DONE**
2. ✅ Web manifest - **DONE**
3. ✅ Enhanced structured data - **DONE**
4. 🔴 Create favicon & app icons - **DO TODAY**
5. 🔴 Set up Google Search Console - **DO TODAY**
6. 🔴 Test page speed - **DO TODAY**
7. 🟡 Optimize images - **THIS WEEK**
8. 🟡 Add breadcrumbs - **THIS WEEK**
9. 🟡 Add 404/error pages - **THIS WEEK**
10. 🟢 Create blog content - **ONGOING**

---

## 📞 Support Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

---

**Last Updated**: September 22, 2026
**Next Review**: October 22, 2026
