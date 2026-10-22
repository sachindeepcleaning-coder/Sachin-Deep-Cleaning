# Fast Index Cleanup — sachindeepcleaning.shop (14/09/2026 Snapshot)

> **Sitemap:** `public/sitemap.xml` / `dist/sitemap.xml` = 58 URLs (`lastmod 2026-09-18`, deployed `bc1bcb4` to `gh-pages`)
> **Hosting:** GitHub Pages `sachindeepcleaning-coder/Sachin-Deep-Cleaning` (`CNAME: sachindeepcleaning.shop`), Vite MPA prerendered `60/60`
> **Live:** `https://sachindeepcleaning.shop/` → `200`, `https://www` → `301`, `http` → `301` (verified)

## Your GSC Snapshot (14/09/2026)

- **Alternative page with proper canonical: 4** — `carpet-shampoo-cleaning-gurgaon` (clean), `deep-cleaning-services-in-gurgaon` (clean), `sofa-shampoo-cleaning-gurgaon` (clean), `kitchen-deep-cleaning-gurgaon` (clean) — all **without `.html`**, last crawled 30/08–02/09
- **Page with redirect: 3** — `http://www.sachindeepcleaning.shop/` (11/09), `https://www.sachindeepcleaning.shop/` (11/09), `http://sachindeepcleaning.shop/` (02/09)
- **Discovered – currently not indexed: 31** — `N/A` last crawled, first detected 11/08 (22 blog + 9 services: `book-cleaning-online`, `contact`, `full-home-1/3/4/5bhk`, `house-cleaning`, `move-in-move-out`, `society`)
- **Indexed: 29** — `deep-cleaning-services-in-gurgaon.html:14/09`, `urban-company-vs...:12/09`, `/:12/09`, `office-deep-cleaning:11/09`, etc.
- **Sitemap: Success / 58 discovered** (12/09 submitted, 15/09 last read)

## Truth Check — What Actually Needs Fixing

### Issue 1: 31 Discovered — REAL, Priority 🔴
All 31 are in your sitemap (58) but `N/A` = Google found them via sitemap/internal links but hasn't crawled. Needs `Request indexing`.

### Issue 2: 4 Alternative canonical — NOT an error 🟢
Your files have correct self-canonical:
```html
<link rel="canonical" href="https://sachindeepcleaning.shop/carpet-shampoo-cleaning-gurgaon.html" />
```
(`carpet-shampoo-cleaning-gurgaon.html:15`, same for other 3, `og:url` matches). Sitemap also lists `.html` versions. Indexed `29` shows `*.html` is the indexed version (`carpet-shampoo:19/08`, `deep-cleaning-services-in-gurgaon.html:14/09`).

GSC lists the **clean URLs without `.html`** (`/carpet-shampoo-cleaning-gurgaon`) as `Alternative` — that's GitHub Pages serving both `/file.html` and `/file` as `200` with same content, and correctly canonicalizing the clean duplicate to the `.html` canonical. **Do NOT remove the 4 `.html` pages** — they are your indexed good pages. This report is informational, not an error. Fix is to ensure internal links use `.html` consistently (they do — `pages.config.mjs:12` `SITE_URL` + `.html`), nothing to deploy.

### Issue 3: 3 www/http redirects — NOT an error 🟢
Verified live:
```
https://www.sachindeepcleaning.shop/ → 301 → https://sachindeepcleaning.shop/ (GitHub Pages CNAME)
http://sachindeepcleaning.shop/ → 301 → https://sachindeepcleaning.shop/ (Enforce HTTPS)
```
Both already `301` (tested `18/09`). GSC shows them as `Page with redirect` = expected. **Do NOT remove or fix** — they are healthy.

## What We Executed (18/09)

1. **Sitemap refreshed:** `node scripts/gen-sitemap.mjs` → `public/sitemap.xml` + `dist/sitemap.xml` `58 URLs, lastmod 2026-09-18` (was `2026-09-11`)
2. **Build:** `npm run build` → `60/60 prerendered` + `dist/` ready
3. **Deploy:** `gh-pages bc1bcb4` pushed (`public/sitemap.xml` commit `f0b6f21` on `main`, then `gh-pages` deploy) — live will show `2026-09-18` within minutes (CDN cache)
4. **Indexing API:** `31/31 URL_UPDATED:200` for all `Discovered` URLs via `indexing-bot-firebase-915@deep-cleaning-49627.iam.gserviceaccount.com` (same key works for `.shop` — verified):
   ```
   blog/balcony-terrace-cleaning-gurgaon.html → 200
   blog/bathroom-deep-cleaning-services-gurgaon-guide.html → 200
   ... (22 blog + 9 services, see list below)
   contact.html → 200
   house-cleaning-services-in-gurgaon.html → 200
   ```
   Remaining quota: `200/day` — used `31` today (+ `53` earlier for `.online` = `84 total`)
5. **Verified:** `curl -I https://www.sachindeepcleaning.shop/` = `301`, `curl -s .../sitemap.xml | grep -c <loc>` = `58`, `curl -s .../carpet-shampoo...html | grep canonical` = self

## Correct Action Plan (1 hour, not 1–2)

### Step 1 — www Redirects (0 min, already done)
No change needed — `https://www` and `http` already `301`. If you ever move off GitHub Pages, set `CNAME` + `Enforce HTTPS` in Pages settings. No `.htaccess` needed (GitHub Pages ignores it).

### Step 2 — Canonical (0 min, already correct)
Do NOT change canonicals to clean URLs and do NOT remove the 4 pages. Verify:
```bash
curl -s https://sachindeepcleaning.shop/kitchen-deep-cleaning-gurgaon.html | grep canonical
# expect: <link rel="canonical" href="https://sachindeepcleaning.shop/kitchen-deep-cleaning-gurgaon.html" />
```
If you want to eliminate the `Alternative` report entirely, change internal links to never use clean URLs (already done) — no deploy needed.

### Step 3 — Request Indexing for 31 (Done via API, optional GSC double-confirm 15 min)
We already submitted all 31 via API (`200`). Optional GSC manual double-confirm:

1. `https://search.google.com/search-console` → `sachindeepcleaning.shop`
2. **URL Inspection** (top search box) → paste each URL → `Enter` → **Request indexing**

Full 31 list (already submitted):
```
https://sachindeepcleaning.shop/blog/balcony-terrace-cleaning-gurgaon.html
https://sachindeepcleaning.shop/blog/bathroom-deep-cleaning-services-gurgaon-guide.html
https://sachindeepcleaning.shop/blog/best-deep-cleaning-services-gurgaon.html
https://sachindeepcleaning.shop/blog/best-home-cleaning-services-gurgaon.html
https://sachindeepcleaning.shop/blog/best-office-deep-cleaning-services-gurgaon.html
https://sachindeepcleaning.shop/blog/carpet-cleaning-gurgaon-guide.html
https://sachindeepcleaning.shop/blog/cleaning-services-gurgaon-guide.html
https://sachindeepcleaning.shop/blog/commercial-cleaning-services-gurgaon.html
https://sachindeepcleaning.shop/blog/deep-cleaners-near-me-gurgaon.html
https://sachindeepcleaning.shop/blog/deep-cleaning-all-sectors-gurgaon.html
https://sachindeepcleaning.shop/blog/deep-cleaning-near-me-gurgaon.html
https://sachindeepcleaning.shop/blog/full-home-deep-cleaning-gurgaon-guide.html
https://sachindeepcleaning.shop/blog/full-home-deep-cleaning-packages-gurgaon.html
https://sachindeepcleaning.shop/blog/full-house-cleaning-checklist-gurgaon.html
https://sachindeepcleaning.shop/blog/home-cleaning-services-near-me-gurgaon.html
https://sachindeepcleaning.shop/blog/house-cleaning-services-gurgaon-guide.html
https://sachindeepcleaning.shop/blog/housekeeping-vs-deep-cleaning-gurgaon.html
https://sachindeepcleaning.shop/blog/kitchen-deep-cleaning-cost-gurgaon.html
https://sachindeepcleaning.shop/blog/office-deep-cleaning-gurgaon-guide.html
https://sachindeepcleaning.shop/blog/residential-cleaning-services-near-me-gurgaon.html
https://sachindeepcleaning.shop/blog/room-cleaning-services-gurgaon.html
https://sachindeepcleaning.shop/blog/what-is-deep-cleaning-guide.html
https://sachindeepcleaning.shop/book-cleaning-online-gurgaon.html
https://sachindeepcleaning.shop/contact.html
https://sachindeepcleaning.shop/full-home-deep-cleaning-1bhk-gurgaon.html
https://sachindeepcleaning.shop/full-home-deep-cleaning-3bhk-gurgaon.html
https://sachindeepcleaning.shop/full-home-deep-cleaning-4bhk-gurgaon.html
https://sachindeepcleaning.shop/full-home-deep-cleaning-5bhk-gurgaon.html
https://sachindeepcleaning.shop/house-cleaning-services-in-gurgaon.html
https://sachindeepcleaning.shop/move-in-move-out-cleaning-gurgaon.html
https://sachindeepcleaning.shop/society-cleaning-services-gurgaon.html
```

### Step 4 — Verify Sitemap (5 min)
```
# Local
grep -c "<loc>" public/sitemap.xml  # expect 58
# Live (after CDN ~5 min)
curl -s https://sachindeepcleaning.shop/sitemap.xml | grep -c "<loc>"  # expect 58
curl -s https://sachindeepcleaning.shop/sitemap.xml | grep lastmod | head -1  # expect 2026-09-18
# GSC → Sitemaps → https://sachindeepcleaning.shop/sitemap.xml → Success / 58
```

### Step 5 — Do NOT Remove 4 Pages (0 min)
The plan's Step 5 says to `Temporarily remove` the 4 `.html` pages — **do not do this**. They are indexed good pages (`deep-cleaning-services-in-gurgaon.html:14/09 indexed`). Removing them would de-index your money pages. The 4 `Alternative` entries are the clean duplicates (without `.html`) that are already correctly not indexed. No `noindex` needed.

### Step 6 — Monitor (Days 3–7, 2 min/day)
`GSC → Pages`:
- `Indexed 29 → ~58` (31 Discovered should move to Indexed in 3–7 days)
- `Discovered 31 → 0`
- `Alternative 4` + `Page with redirect 3` will stay at 4/3 — that's healthy duplicate handling, not an error. If they drop to 0, it means GitHub stopped serving clean duplicates (also fine).
- `Sitemap Success/58`

## Checklist

- [x] Sitemap refreshed `2026-09-18` + deployed `bc1bcb4`
- [x] www/http already `301` (verified)
- [x] Canonical already self-referential `.html` (verified)
- [x] 31 Discovered submitted via Indexing API `31/31:200`
- [ ] Optional: GSC URL Inspection double-confirm for 31 (15 min)
- [ ] Monitor daily 3–7 days: `Indexed →58`
- [ ] Do NOT remove 4 Alternative pages

## Files

- `pages.config.mjs:12` `SITE_URL`, `scripts/gen-sitemap.mjs:1`, `public/sitemap.xml:1`, `dist/sitemap.xml:1`
- `carpet-shampoo-cleaning-gurgaon.html:15` canonical example
- `CNAME:1` `sachindeepcleaning.shop`, `robots.txt:7` `Sitemap: https://sachindeepcleaning.shop/sitemap.xml`
