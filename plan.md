# Website Knowledge + SEO Fix Plan — sachindeepcleaning.shop

> Single source of truth for this repo. Read this before touching content, schema, or build scripts.
> Created 2026-09-20 after a full content audit (73 blogs + 14 service pages, 96 built pages).

---

## 1. Business facts (never invent alternatives)

- **Brand:** Sachin Deep Cleaning — service-area business (SAB), Gurgaon/Gurugram, Haryana. Operating **since 2015**.
- **Domain (canonical):** `https://sachindeepcleaning.shop` (GitHub Pages + custom domain, HTTPS enforced, `www` → apex 301).
- **Old domain:** `sachincleaning.online` (Firebase, still live — self-competition; long-term goal is 301 consolidation, out of scope here).
- **Phone/WhatsApp:** +91 95607-39281 (`wa.me/919560739281`). Email: `contact@sachindeepcleaning.shop`.
- **Founder:** Sachin Kumar — bio anchor `/about.html#sachin-kumar`, Person schema on About.
- **Social:** FB `profile.php?id=61577737535478`, IG `cleaning_service_in_gurgaon`, YT `@Cleaning_service_in_Gurgaon`, X `@sachindeepclean` (see `src/lib/site.js` SOCIAL).
- **Trust claims (site-attested, keep consistent):** 148 Google reviews (schema says 4.5/148), police-verified team, pay-after-walkthrough, eco-friendly products, same-day slots (book before noon).
- **Rate card (fixed, mirrored in schema + tables):** 1RK ₹2,000 · 1BHK ₹2,500 · 2BHK ₹4,500 · 3BHK ₹5,500 · 4BHK ₹6,500 · 5BHK/villa ₹9,000 · kitchen ₹1,500+ · bathroom ₹800 · sofa ₹499–599/seat · carpet ₹15–18/sq ft · office ₹3/sq ft · house visit ₹499 · room ₹299+ · move-in/out ₹1,999–8,000.
- **GBP coordinates:** 28.4612679, 77.0786716 (Sushant Lok Rd). Meta geo tags use 28.4595;77.0266 (city-level — intentional, do not "fix").

## 2. Tech architecture

- **Stack:** Vite 8 MPA + React 18. `pages.config.mjs` is the single source of truth (96 entries: title/description per page).
- **Content stores:** `src/lib/blog.js` (85 ARTICLES: title/desc/dates/image/cta/lead/faqs/blocks/sources), `src/lib/services.js` (`base` + `getService()` with per-BHK injection for `fullhome`), `src/lib/landing.js` (homepage FAQs/reviews), `src/lib/site.js` (URLs, phone, social), `src/lib/schema.jsx` (all JSON-LD builders).
- **Rendering:** `src/pages/*.jsx` per page type (`service` → ServicePage, `article` → BlogArticlePage). Blog blocks: `p lead h2 h3 table ul ol tip` (+ `sources` added 2026-09-20).
- **Build (`npm run build`):** `content-lint` (gate, fails build) → `gen-sitemap` (writes `public/sitemap.xml`) → `vite build` (root shells → `dist/`, `public/*` copied to `dist/`) → `prerender` (SSR injects content into `dist/**/*.html`).
- **`npm run gen`:** regenerates root `*.html` entry shells from `pages.config.mjs` + content stores. Root shells are **build inputs** (committed). Uncommitted shell diffs = someone ran gen without committing — regenerate + keep in sync.
- **Deploy:** `scripts/sync-gh-pages.sh` (main only, clean tree) snapshots `dist/` to `gh-pages` branch. **Deployed truth = `dist/`** (`dist/sitemap.xml`, `dist/robots.txt`, `dist/llms.txt` come from `public/`). Root `sitemap.xml`/`robots.txt` are legacy committed copies — `public/` is source of truth; root copies are synced one-way for hygiene.
- **`.md` files are gitignored** (local-only docs, never pushed). `plan.md` lives here for agents, not GitHub.

## 3. Page inventory (96 built pages)

- **Services (14):** `deep` (flagship 3,962w), `house`, `fullhome` 1–5 BHK (per-BHK intro/detail/FAQs injected in `getService()`), `kitchen`, `bathroom`, `sofa`, `carpet`, `office`, `move`, `residential-cleaners-near-me`, `society` (PartnersPage), `book-cleaning-online` (BookingPage).
- **Blogs (78)** in clusters: price-intent (BHK/seat/bath/visit), micro-local (DLF 1–5, Sushant Lok 1–3, Sectors 65–67, Sohna Rd, Golf Course Rd + `deep-cleaning-all-sectors` pillar), Udyog Vihar commercial (7) + office-hub detail set (4: Sector 44, Cyber City, Golf Course Rd, Sector 32, parented by the Sector-44-hubs roundup), vs/best comparators (UC, NoBroker, Safaiwale, Mr Deep, best-home, best-office), festive (Diwali/Dussehra/Navratri), guides (chimney, hard-water, sofa, carpet, kitchen-vs-regular, move-in checklist, full-house checklist, balcony), near-me/dispatch (deep-cleaners, residential, home-near-me), pillars (cost-2026, what-is, how-often, cleaning-services-guide, packages, room, home-* bare).
- **Utility:** index, about, contact, blog index, all-pages, thank-you (noindex), 404 (noindex).
- **Media:** `public/images/*` (webp + 400/800w variants + jpg). Videos `*.mp4` lazy-load via IntersectionObserver.

## 4. Keyword → owner map (one primary per URL; conflicts resolved 2026-09-20)

| Query | Owner (money page) | Supporting blog(s) |
|---|---|---|
| deep cleaning services in gurgaon | `deep-cleaning-services-in-gurgaon.html` | cost-2026, what-is, cleaners-near-me |
| deep cleaning services (bare, informational) | `blog/deep-cleaning-services.html` ("What's Included, BHK by BHK") | links up to deep service |
| home deep cleaning service gurgaon (booking) | `blog/home-deep-cleaning-service-gurgaon.html` ("Book in 5 Minutes", WhatsApp-quote angle) | — |
| home deep cleaning services gurgaon (rates/process) | `blog/home-deep-cleaning-services-gurgaon.html` ("Fixed BHK Rates") | — |
| home cleaning services gurgaon (plans) | `blog/home-cleaning-services-gurgaon.html` ("Plans & Pricing") | house price-per-visit |
| house cleaning services gurgaon / ₹499 visits | `house-cleaning-services-in-gurgaon.html` | house-guide, house price-per-visit |
| full home deep cleaning + 1–5 BHK price | BHK service pages + BHK price blogs (paired 1:1) | packages pillar, full-home bare pillar |
| kitchen / bathroom / sofa / carpet + price-per-unit | service page + per-unit price blog | cost/guide siblings |
| DLF/Sohna/Golf/Sushant/Sector micro-local | respective micro-local blog → deep service | all-sectors pillar |
| Udyog Vihar commercial | 7 Udyog blogs → office service | office guide, commercial pillar |
| UC / NoBroker / Safaiwale / Mr Deep vs | respective vs-blog → deep service | best-home, best-office |
| festive | diwali/dussehra/navratri → deep/3BHK/kitchen | — |
| maid/housekeeping intent | housekeeping-vs + house-maid-vs (filter, not rank) | — |

**Rules:** never create sector-doorway pages (pillar covers them); never create maid-placement pages; new pages only for unowned intents; keep exact-phrase density natural (no quotas); each FAQ Q1 contains the primary keyword.

## 5. SEO systems state (2026-09-20)

- Titles 30–60 chars (100%), descriptions ≤160 (after trim), exactly 1 H1/page, self-canonical, OG/Twitter complete, hreflang x-default/en-IN/en, geo meta.
- Schema: BlogPosting+Person(sameAs)+FAQPage+Breadcrumb on all 73; Service+FAQ+Review-ItemList+Breadcrumb+LocalBusiness on services (LocalBusiness added 2026-09-20 → aggregateRating/sameAs on 18 pages, was 5); LocalBusiness on index/contact/booking/partners/residential. HowTo **removed** 2026-09-20 (rich result deprecated Sep 2023). FAQPage kept (no SERP feature since May 2026 — harmless, no new FAQ markup for rankings).
- Internal mesh ~37 internal links/page: service→blog via `RelatedGuides.jsx`, blog→service via article CTA + 3 footer service links. New price/micro-local/Udyog inventory wired into RelatedGuides 2026-09-20.
- External citations: `sources` blocks on 8 high-impact articles (vs ×4, best ×2, cost, packages) linking competitor officials (urbancompany.com, nobroker.com, safaiwale.in — verified, mrdeepcleaning.com — verified) + Maps profile. Pattern established for rollout.
- Sitemap 94 URLs (excludes thank-you; 404 excluded via noindex flag — actually excluded set is thank-you only; 404 has noindex:true so filtered), lastmod = build date. GSC: Shop 29 indexed / 31 discovered (crawl-budget queue, Indexing API submitted); Online cleanup separate track.
- `content-lint.mjs` gates: banned jargon, competitor-brand leakage, foreign phones, MIN_BODY 350 / MIN_TOTAL 700 words, MIN_H2 3, MIN_FAQS 4, duplicate 6-gram limit 0.2 (area-masked), **trailing-duplicate-H2 + mod≥pub (added 2026-09-20)**.

## 6. Audit findings → fix status (2026-09-20)

> 2026-09-20 pm pass (all seo skills): image system rebuilt on measured dims
> (`src/lib/image-dims.js`), truthful srcset descriptors (base was labeled
> 1200w at 390–1300px actual), 1200x630 `og-cover.jpg` for all cards <1000px,
> per-article sitemap lastmod, publisher logo, CTA/footer link-dedup, lint
> image-asset gates, robots dangling `sitemap-images.xml` removed.
> Cannibalization re-measured: bare/home cluster 0.44–0.48 body overlap is
> shared factual tables (intent separated via title/H1/intro/cross-links =
> DIFFERENTIATE, no MERGE candidate); micro-local 0.44 area variants gated
> ≤0.2 area-masked. Indexing API skipped this round (91/200 quota used;
> template-level changes ride sitemap lastmod + natural crawl).

| # | Finding | Fix applied |
|---|---|---|
| C1 | Last H2 section duplicated on ~60 blogs (source data bug) | De-dupe script on `blog.js`; lint rule added |
| C2 | `dateModified` < `datePublished` on 47 blogs | Clamped mod≥pub; lint rule added |
| C3 | Root sitemap.xml (47 URLs) / robots.txt stale vs `public/` | Synced from `public/`; `public/` documented as truth; gen refreshes shells |
| H4 | Bare/home cluster cannibalization (0.48 pair) | Retitled/described 3 pages by intent + disambiguation paragraphs + cross-links; owner map §4 |
| H5 | No author bio depth; zero authoritative outbound; aggregateRating on 5/96 | LocalBusiness (+rating/sameAs) on ServicePage; sources on 8 pillars; About Person = author hub |
| H6 | New blogs orphaned from service pages | RelatedGuides extended (price, micro-local, Udyog, end-tenancy) |
| M7 | 1 image per blog | Auto 2nd mid-article image w/ fallback chain (category-mapped existing assets) — all 73 blogs now 3 imgs |
| M8 | 2 descriptions 161 chars | Trimmed in `pages.config.mjs` (final: all descs 110–160) |
| M9 | HowTo on 13 services (deprecated rich result) | Removed emission (configs kept, unused); final build: 0 HowTo |
| M10 | Micro-local bloat (up to 4,230w) | Verified unique via lint duplicate gate (≤0.2 area-masked); kept, monitor GSC |

## 7. Verification (run after any content/build change)

```bash
npm run gen && npm run build   # lint gates the build
# then re-run the audit scans: titles 30–60, desc ≤160, H1==1, zero dup-H2,
# mod≥pub, sitemap count == pages-nonindex, aggregateRating present on services
```

## 8. Do NOT

- Add thin micro-local/sector pages or maid-placement pages (§4 rules).
- Re-add HowTo JSON-LD or new FAQPage markup *for* rich results.
- Publish competitor prices without "Sep-2026 / verify current cards" dating; vs-pages must stay fair (verifiable facts, "not publicly listed" where unknown, affiliation disclosed).
- Commit `.md` files (gitignored) or secrets; deploy only via `sync-gh-pages.sh` from clean main.
- Mutate another component's DOM (hydration #425 lesson); keep SSR output identical to client render.
