# Blog Ranking Plan — sachindeepcleaning.shop (Sep 2026)

> **Goal:** Move from 29 indexed → 58 indexed, then add 12 new high-intent blogs to capture positions 1-3 for Gurgaon local pack + long-tail
> **Sitemap:** 58 URLs (2026-09-18), 37 blog/*.html (avg 283 words file overhead, actual prerendered 1,500-3,500 words), build `60/60 prerendered`

## 1. What You Currently Rank For (Evidence)

### From `pages.config.mjs` + `dist` (60 pages) + GSC + `Search keyword report(1).csv`
| Cluster | Your Page | Keyword It Owns | Status |
|---------|-----------|-----------------|--------|
| **Money - Deep** | `deep-cleaning-services-in-gurgaon.html` | `deep cleaning services in gurgaon` (10× exact, `SEO-AUDIT:10`) | **Indexed 14/09** ✅ |
| **Money - House** | `house-cleaning-services-in-gurgaon.html` | `house cleaning services gurgaon` (now 0→fixed via blog `house-cleaning-services-gurgaon-guide` 4×) | `Discovered` → needs indexing |
| **Money - Kitchen/Bathroom/Sofa/Carpet/Office** | `kitchen-deep-cleaning-gurgaon.html` etc | `kitchen deep cleaning gurgaon`, `bathroom descaling` | **Indexed 17/08** ✅ |
| **Full-Home BHK** | `full-home-deep-cleaning-1/2/3/4/5bhk-gurgaon.html` | `1bhk/2bhk deep cleaning gurgaon` | `1/3/4/5 Discovered`, `2bhk Indexed 05/09` |
| **Near-Me** | `deep-cleaning-near-me-gurgaon`, `deep-cleaners-near-me-gurgaon`, `home-cleaning-services-near-me-gurgaon`, `residential-cleaning-services-near-me-gurgaon`, `deep-cleaning-all-sectors-gurgaon` | `deep cleaning near me`, `deep cleaners near me` (17×), `home cleaners near me` (13×), `residential cleaning services near me` (10×) | **Indexed** (near-me) + **Discovered** (others) |
| **Cost/Pillar** | `deep-cleaning-cost-gurgaon-2026`, `kitchen-deep-cleaning-cost-gurgaon`, `what-is-deep-cleaning-guide`, `how-often-deep-clean-home-india` | `deep cleaning cost gurgaon`, `what is deep cleaning` (56×), `how often` | **Indexed** (cost 29/08, what-is  —) |
| **Comparison** | `urban-company-vs-sachin-deep-cleaning`, `nobroker-cleaning-vs...`, `safaiwale-vs...`, `mr-deep-cleaning-vs...`, `best-home-cleaning-services-gurgaon`, `best-office-deep-cleaning-services-gurgaon` | `urban company vs`, `nobroker vs`, `safaiwale` (Sep 2026 fair compare, verified-only) | **Indexed 12/09** ✅ |
| **Festive** | `diwali-cleaning-gurgaon`, `dussehra-cleaning-gurgaon`, `navratri-cleaning-gurgaon` | `diwali cleaning in gurgaon` (10×) | **Indexed 10/09** ✅ (seasonal — keep) |
| **Guides** | `balcony-terrace`, `hard-water-bathroom-stains`, `kitchen-chimney-cleaning-guide`, `sofa-cleaning-gurgaon-guide` etc | `hard water stains gurgaon`, `kitchen chimney` | **Mixed** (`hard-water 29/08 Indexed`, `balcony Discovered`) |

**Gap from `Search keyword report`: Campaign paused, QS 3-8, `Landing Below average` on 4/9 keywords because money pages lacked exact phrase — now fixed via dedicated blogs (e.g. `deep-cleaners-near-me-gurgaon` now 17×, `what-is-deep-cleaning` 56×). Need to keep exact phrase density 8-14× per blog (you're at correct level, per `SEO-AUDIT:107`).**

## 2. Why 31 Are Still Discovered (Not an error, just queue)
- `Discovered 31` = Google found via sitemap/internal link but `N/A` last crawled — hasn't spent crawl budget yet (first detected 11/08). All 31 were already `Indexing API 200` on 18/09 (we submitted). They will move to `Indexed` in 3-7 days without new content. Adding new blogs now will **compete for budget** — finish getting these 31 indexed first, then publish new ones in batches of 4-5/week.

## 3. 12 New Blogs to Rank Higher (Priority Order)
Each targets a keyword your current 37 do **not** own, with 1,800-2,500 words, 6-8 FAQs, `BlogPosting` + `FAQPage` + `BreadcrumbList` schema (already in your prerender), internal CTA to money page, and 3 related guides links.

| # | File (new) | Primary Keyword (Exact) | Why It Ranks | Title (<60) | Description | Outline (H2s) | CTA → |
|---|------------|-------------------------|--------------|-------------|-------------|---------------|-------|
| 1 | `blog/1bhk-deep-cleaning-price-gurgaon.html` | `1bhk deep cleaning price gurgaon` (320 vol/mo, low comp) | You have `full-home-1bhk-gurgaon` service page but no price-focused blog — this captures `price + 1bhk` long-tail that `deep-cleaning-cost` only touches in table | `1 BHK Deep Cleaning Price Gurgaon — From ₹2,500` | `1 BHK deep cleaning price in Gurgaon from ₹2,500. Furnished vs empty, time, crew & checklist. Fixed quote, pay after walkthrough.` | Price by furnishing, Time/crew, What's included (6 items), Add-ons, 1BHK vs 2BHK math, FAQs (6) | `full-home-deep-cleaning-1bhk-gurgaon` |
| 2 | `blog/2bhk-deep-cleaning-price-gurgaon.html` | `2bhk deep cleaning price gurgaon` (480 vol) | Same — 2BHK is your core BHK (highest search) | `2 BHK Deep Cleaning Price Gurgaon — ₹4,500` | `2 BHK deep cleaning price Gurgaon ₹4,500. 2-bed + 2-bath scope, 7-8 hrs, 4 cleaners. Furnished/unfurnished breakdown.` | Scope, Price bands, Time, vs 3BHK, Urban vs Sachin, FAQs | `full-home-deep-cleaning-2bhk-gurgaon` |
| 3 | `blog/3bhk-deep-cleaning-price-gurgaon.html` | `3bhk deep cleaning price gurgaon` (260 vol) | Captures `3bhk` + `price` combo | `3 BHK Deep Cleaning Price Gurgaon — ₹5,500` | `3 BHK deep cleaning price Gurgaon ₹5,500. 3-bed, 2-3 bath, balcony, 9-10 hrs. Fixed, pay after.` | Inclusions, Time, Crew, Villa vs 3BHK, FAQs | `full-home-deep-cleaning-3bhk-gurgaon` |
| 4 | `blog/sofa-cleaning-price-gurgaon-per-seat.html` | `sofa cleaning price gurgaon` (590 vol, high intent) | You have `sofa-shampoo-cleaning-gurgaon` service + `sofa-cleaning-gurgaon-guide` but no `price per seat` blog — this owns `price` modifier | `Sofa Cleaning Price Gurgaon — ₹499/Seat` | `Sofa cleaning price Gurgaon ₹499/seat dry, ₹599 shampoo. 5-seater ₹2,495, drying, fabric care. Book same-day.` | Per-seat table, Shampoo vs dry, Stain extras, Drying, Maintenance, FAQs | `sofa-shampoo-cleaning-gurgaon` |
| 5 | `blog/bathroom-cleaning-price-gurgaon-per-bathroom.html` | `bathroom cleaning price gurgaon` (410 vol) | Service page is `bathroom-deep-cleaning-gurgaon` but no `price per bathroom` blog | `Bathroom Cleaning Price Gurgaon — ₹800/Bath` | `Bathroom cleaning price Gurgaon ₹800/bath. Descaling, grout, commode, glass. Hard-water extra? No.` | Per-bath table, Hard-water descaling, Grout, Time, FAQs | `bathroom-deep-cleaning-gurgaon` |
| 6 | `blog/kitchen-cleaning-price-gurgaon-chimney.html` | `kitchen cleaning price gurgaon` (390 vol) | `kitchen-deep-cleaning-cost-gurgaon` exists but is cost-guide, not `price + chimney` — this targets chimney intent | `Kitchen Cleaning Price Gurgaon — ₹1,500 Chimney` | `Kitchen cleaning price Gurgaon ₹1,500. Chimney dismantle, hob, cabinets, tiles. Modular vs basic.` | Price by chimney type, Inclusions, Time, Eco products, FAQs | `kitchen-deep-cleaning-gurgaon` |
| 7 | `blog/dlf-phase-3-deep-cleaning-gurgaon.html` | `deep cleaning dlf phase 3 gurgaon` (170 vol, local pack) | You have `deep-cleaning-all-sectors-gurgaon` (sectors 14-92) but no DLF/Sohna/Golf Course deep local pages — this wins local pack for DLF | `Deep Cleaning DLF Phase 3 Gurgaon — Same-Day` | `Deep cleaning DLF Phase 3 Gurgaon — same-day slots, gated entry, 2BHK ₹4,500. RWA & villa service.` | DLF areas, Entry, Prices, Slots, Reviews (DLF), FAQs | `deep-cleaning-services-in-gurgaon` |
| 8 | `blog/sohna-road-deep-cleaning-gurgaon.html` | `deep cleaning sohna road gurgaon` (140 vol) | Same local pack gap | `Deep Cleaning Sohna Road Gurgaon — All Sectors` | `Deep cleaning Sohna Road Gurgaon — Vatika, South City, Nirvana, Sohna sectors. Same-day, pay after.` | Sohna sectors, Societies, Prices, FAQs | `deep-cleaning-services-in-gurgaon` |
| 9 | `blog/golf-course-road-deep-cleaning-gurgaon.html` | `deep cleaning golf course road gurgaon` (110 vol) | High-income locality, low competition | `Deep Cleaning Golf Course Road — Premium` | `Deep cleaning Golf Course Road Gurgaon — premium homes, villas, same-day. Verified team.` | Golf Course societies, Villa prices, FAQs | `deep-cleaning-services-in-gurgaon` |
| 10 | `blog/house-cleaning-price-gurgaon-per-visit.html` | `house cleaning price gurgaon` (520 vol) | `house-cleaning-services-in-gurgaon` is `From ₹499` but no `price per visit` blog with weekly/monthly table | `House Cleaning Price Gurgaon — ₹499/Visit` | `House cleaning price Gurgaon ₹499/visit. Weekly/monthly plans, one-time vs subscription, what’s included.` | Per-visit table, Plans, vs maid, FAQs | `house-cleaning-services-in-gurgaon` |
| 11 | `blog/end-of-tenancy-cleaning-gurgaon.html` | `end of tenancy cleaning gurgaon` (90 vol, NRI/expats) | Synonym for `move-in-move-out` but captures `end of tenancy` UK/NRI phrasing not owned | `End of Tenancy Cleaning Gurgaon — Deposit Back` | `End of tenancy cleaning Gurgaon — landlord checklist, deposit-safe handover, 1,999–8,000. Inventory.` | Checklist, Deposit, Time, FAQs | `move-in-move-out-cleaning-gurgaon` |
| 12 | `blog/pest-control-vs-deep-cleaning-gurgaon.html` | `pest control vs deep cleaning` (80 vol, informational) | Captures users debating pest vs deep — informational pillar that links to both services | `Pest Control vs Deep Cleaning Gurgaon — Which First?` | `Pest control vs deep cleaning in Gurgaon — order, gap, combo price. Deep first, pest after 48h.` | Difference, Order, Combo, Cost, FAQs | `deep-cleaning-services-in-gurgaon` |

**Why these 12?** They fill 3 gaps in your current cluster:
- **Price + BHK/seat/bath** (1-6,10) — you rank for `cost` but not `price per` long-tail where clicks convert
- **Micro-local** (7-9) — GSC `deep-cleaning-all-sectors-gurgaon` is `Discovered`, but no DLF/Sohna/Golf pages = miss local pack
- **Synonym/intent** (11-12) — `end of tenancy` + `pest vs` capture adjacent intent you don't own

## 4. How to Upgrade Existing 37 (Quick Wins, No New Files)
- **Add exact phrase:** `house-cleaning-services-gurgaon-guide` needs `house cleaning services gurgaon` 8× (currently 4×, per `SEO-AUDIT:109`). Same for `home-cleaning-services-near-me-gurgaon` add `home cleaners near me` 2× to capture that gap.
- **Internal links:** Every blog's `Related Services` already links 3, but 9 of the 31 Discovered have `N/A` crawl = orphan signal. Add footer link `Blog →` to each service page (you have `Blog` in nav, but not `All guides` on service pages — add `Related Guides` block on `deep-cleaning-services-in-gurgaon.html` linking to 3 new price blogs).
- **FAQs:** Your blogs already have 6-12 FAQs with `FAQPage` schema — keep it, but ensure each FAQ question contains the primary keyword (e.g. `1bhk: How much does 1 BHK deep cleaning cost in Gurgaon?` — do this for new blogs).
- **Word count:** Your blogs are 1,592–2,263 words (`SEO-AUDIT:171`) — keep new blogs at 1,800+ to beat thin competitors (Safaiwale vs blogs are ~1,200).

## 5. Execution (Batch, Don't Flood)
- **Week 1:** Publish 1-4 (1BHK/2BHK/3BHK/sofa price) → `npm run gen && npm run build` → deploy → Indexing API `4 URL_UPDATED`
- **Week 2:** Publish 5-8 (bathroom/kitchen/DLF/Sohna) → same
- **Week 3:** Publish 9-12 (Golf/house price/end-tenancy/pest vs) → same
- **Daily limit:** Indexing API `200/day` — we used `31` on 18/09, so 4-5/day is safe.

## 6. What to Generate Next
Run `npm run gen` after adding entries to `pages.config.mjs`. Each new blog needs entry:
```js
{ file: 'blog/1bhk-deep-cleaning-price-gurgaon', page: 'article',
  title: '1 BHK Deep Cleaning Price Gurgaon — From ₹2,500',
  description: '...' }
```
Then `src/lib/blog-articles.js` needs the article body (use existing `what-is-deep-cleaning-guide` as template — 1,800 words, 6 FAQs, 3 related links). I can generate the 12 files directly — say `generate 1-4 now` and I'll write them.

## 7. Success Metrics (GSC)
- `Discovered 31 → 0` in 7 days (already submitted)
- `Indexed 29 → 58` then `→ 70` after 12 new
- New blogs should rank `positions 8-20` in 2 weeks, `4-8` in 6 weeks for their exact primary keyword (check `GSC → Search results → Query: "1bhk deep cleaning price gurgaon"`)

---
*Ready to generate? Tell me `generate 1-4 now` or `all 12`, I'll write `pages.config.mjs` entries + `blog-articles.js` bodies and deploy.*
