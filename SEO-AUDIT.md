# SEO Audit & Action Plan — sachindeepcleaning.shop

Audit date: **2026-08-11**

## ✅ What was fixed in this repo

| Fix | Why it matters |
|-----|----------------|
| **Pre-rendered static HTML** (`scripts/prerender.mjs`) | The site was 100% client-rendered — Google/Bing saw an empty `<div id="root">` and nothing was indexed. Now every page's content, headings, text and JSON-LD are in the raw HTML. This is the fix that unblocks indexing. |
| **Canonical URLs** now use `https://sachindeepcleaning.shop/` for the homepage (was `/index.html`) | One consistent URL per page = no duplicate-signal split. |
| **Richer LocalBusiness schema** — added `geo`, `openingHoursSpecification`, `priceRange`, `aggregateRating`, `image`, `@id` | Better rich-result eligibility (stars, local pack). |
| **Related Services links** on every service page | Internal links let Google crawl the whole site from any page and pass link equity between service pages. |
| **Auto-generated `sitemap.xml`** (`scripts/gen-sitemap.mjs`) with fresh `lastmod` on every build | Keeps Google's crawl budget focused on your pages. |
| **Videos compressed 72%** (15.6 MB → 4.3 MB) | Faster LCP/INP on mobile = better Core Web Vitals. |
| **Fonts load non-blocking** (`media="print" onload`) | Removes a render-blocking request from the critical path. |
| **Real OG image** (`/images/cleaning-1.jpg`) instead of generic stock | Better link-preview results on WhatsApp/Facebook. |
| Keyword-first homepage title | `Deep Cleaning Services in Gurgaon | Sachin Deep Cleaning` |
| **Real pricing** pulled from the live Firebase DB (`deep-cleaning-49627`) | Full-home rate card now matches the booking app: ₹2,000 (1 RK NF) → ₹14,500 (6 BHK F). Schema `priceRange` = ₹2,000–₹14,500. |
| **Service pages de-duplicated** — unique 120–150 word "About" copy, 6-8 includes, detailed process, 5-6 unique FAQs and 3 service-specific reviews per service | Worst-case page-vs-page duplicate content dropped from **90% → 61%** (remaining is nav/footer/form chrome). Fixes keyword cannibalization + thin content. |
| **Service images with keyword alt text** (copied from production app) + `loading="lazy"` | Image SEO + visual conversion proof on every service page. |
| **Pricing grid fixed** — full-home 1/2/3 BHK cards only on full-home-relevant pages, removed from kitchen/bathroom/sofa/carpet | Stops showing irrelevant full-home pricing to service-specific searchers. |
| **Homepage lists all 9 services** with links + prices | Fixes internal-link bias toward full-home; every service reachable from homepage. |

## 🛠️ You must do these (external, account-based)

### 1. Google Search Console (do first)
- Add property `https://sachindeepcleaning.shop/` at https://search.google.com/search-console (use the CNAME/DNS method).
- **Submit the new `sitemap.xml`** after deploying.
- This is how you'll see whether pages are indexed — verify after deploying.

### 2. Google Business Profile (GBP) — the #1 local ranking factor
- Create/claim at https://business.google.com with exact NAP:
  - **Name:** Sachin Deep Cleaning
  - **Phone:** +91 92679-05943
  - **Address:** Gurgaon (service-area business → set service area, not street address)
- Add service categories: *Deep Cleaning Service*, *House Cleaning Service*, *Home Cleaning*.
- Add photos weekly (before/after real jobs).
- Ask every happy customer for a review → these reviews power the `aggregateRating` stars and the local pack.

### 3. Domain consolidation — pick ONE domain
Two domains target the same business:
- `sachindeepcleaning.shop` (this site)
- `sachincleaning.online` (currently the one that already ranks)

**Recommendation:** keep `sachindeepcleaning.shop` (matches brand + is in GBP-ready state). 301-redirect `sachincleaning.online` → `sachindeepcleaning.shop` and point all GBP/social/backlinks to one domain. Until you do this, you are competing against yourself.

### 4. Citations & directories (NAP consistency)
Same Name/Phone on every listing. Submit to at least: JustDial, IndiaMART, Sulekha, UrbanPro, Practo-style local directories, Google Maps. Your IndiaMART profile already exists — link it to your site.

### 5. Backlinks
A 1-month-old domain cannot beat "deep cleaning Gurgaon" competition without links. Realistic plan:
- IndiaMART, Sulekha, JustDial profiles → link to your site.
- Local articles: Gurgaon "best home services" listicles.
- Facebook/Instagram/X bios → your domain.
- Post before/after reels daily; each link counts.

## 📈 Ranking expectations (be realistic)
- **Weeks 1–4:** get indexed (this build + GSC submission). Long-tail wins: e.g. *"2 bhk deep cleaning gurgaon price"*, *"sofa cleaning gurgaon"*.
- **Months 2–4:** with consistent GBP reviews + citations, start seeing the local pack in Gurgaon for *"deep cleaning near me"* and *"house cleaning gurgaon"*.
- **Head term** ("deep cleaning in Gurgaon") is dominated by Urban Company etc. — expect 6–12 months of consistent content + links.

## 📦 Deploy steps (after this build)

```bash
npm run gen        # regenerate entry shells (only needed if pages.config.mjs changed)
npm run build      # = sitemap gen + vite build + prerender → dist/
```

Then follow the gh-pages deploy steps in `README.md` (clone gh-pages, copy dist/, restore CNAME + robots.txt + .nojekyll, force push).
After deploying: verify `curl -sI https://sachindeepcleaning.shop/` → `200`, then re-submit sitemap in Search Console.
