# PLAN — Rank for BOTH "Urban Company" + "Maid / Online Booking" Keywords

> **Coverage:** This is a **two-goal** plan.
> - **Goal A — Urban Company comparison** (`urban company gurgaon`, `urbanclap`, `urban clap`, `urban company gurugram` = **4,160/mo**, brand-intent) → the UC comparison article, sections 2–6.
> - **Goal B — Maid / app-style online booking** (`maid service app`, `house help app`, `cleaning services app`, `instant maid`, `online maid service gurgaon`, `house maid services gurgaon` = **~2,300/mo**, service-intent) → dedicated maid pages, section 7.
> - **Competitor data source:** Urban Company + NoBroker pages (rank #1 for "deep cleaning services in gurgaon"), captured September 2026
> - **Status:** plan only — repo untouched

### Page & blog count — "how many blogs will we create?"

**3 new content pages total** (2 blog articles + 1 landing page). Everything else in the plan is **wiring / edits to existing pages**, not new content pages.

| # | Type | Page | Primary keywords |
|---|---|---|---|
| 1 | Blog article | `blog/urban-company-vs-sachin-deep-cleaning` | urban company gurgaon / urbanclap / urban clap / urban company gurugram (4,160/mo) |
| 2 | Blog article | `blog/house-maid-vs-deep-cleaning-gurgaon` | house maid services gurgaon / maid vs deep cleaning / maid service cleaning |
| 3 | Landing page (not a blog) | `book-cleaning-online-gurgaon` | cleaning services app / house cleaning app / instant maid / online maid service gurgaon |

**Deliberately NOT counted as new pages** (folded into existing content):
- "Is Urban Company Worth It? Honest Review" → FAQ/section inside the UC article (0 extra)
- "Near me / cleaning company near me" → H2 sections on existing service pages (0 extra)

**Resulting site totals once both goals ship:**
- Blog articles: **33 live → 35** (+2 — the UC comparison + the House Maid vs Deep Cleaning guides)
- Total pages in `pages.config.mjs`: **55 → 56** (+1 landing page `book-cleaning-online-gurgaon`)
- Wiring-only changes (not new content pages): `pages.config.mjs`, `src/app.jsx` (new `landing` page type), `RelatedGuides.jsx`, `BlogIndexPage.jsx`, `public/llms.txt`, sitemap auto-pickup

---

## 1. Strategy / Why this approach

The gap analysis ranks a UC-vs-us comparison as the single biggest opportunity (**4,160 combined monthly searches** on `urban company gurgaon / urban clap gurgaon / urbanclap gurgaon / urban company gurugram` — brand-intent, high commercial value).

**Key decision — build it as a blog `article` page, not a new standalone page type.** Reasons:

- The existing **`Mr Deep Cleaning vs Sachin Deep Cleaning`** page (already live, submitted to indexing) is exactly this pattern — a full comparison landing page rendered by `BlogArticlePage.jsx` via the block system (`p`, `lead`, `h2`, `h3`, `table`, `ul`, `ol`, `tip`).
- Zero new architecture: no `app.jsx` mapping, no new page type, no new schema wiring. Article pages automatically get **Article + FAQ + Breadcrumb JSON-LD**, canonical/OG/geo meta, sitemap inclusion (priority 0.7), blog-index listing, and `all-pages.html` listing — everything for free.
- The `mr-deep` article proves this format already ranks; "full landing page (not a short blog)" is about depth (multiple comparison tables + 8–10 FAQs + regional Hinglish answers), not page type.

### Two goal clusters — and why ONE page cannot rank for both

| | Goal A — Urban Company | Goal B — Maid / online booking |
|---|---|---|
| Query examples | urban company gurgaon, urbanclap gurgaon, urban clap home cleaning price | maid service app, house help app, instant maid, house maid services gurgaon |
| Search intent | **Compare / choose a company** (brand-intent) | **Hire recurring help / book by app** (service-intent) |
| The page Google will rank | A comparison article about UC vs us | A page that is *about* maid/online booking |
| Can one page do both? | It can *mention* maid topics, but it will rank for the intent it's actually about | Same — the maid pages can mention UC, but rank for maid intent |

**The honest SEO rule:** never publish a page that *implies* we supply live-in/daily maids (we don't — bait pages get penalized). Goal B captures the **searcher** with real "maid vs deep clean" decision content and steers them to the service we actually sell. The UC page picks up the app/booking-intent keywords only via one genuine section (§4, Table H).

---

## 2. Page specification

| Property | Value |
|---|---|
| **File / URL** | `blog/urban-company-vs-sachin-deep-cleaning` → `https://sachindeepcleaning.shop/blog/urban-company-vs-sachin-deep-cleaning.html` |
| **`page` type** | `'article'` |
| **Title** | `Urban Company vs Sachin Deep Cleaning Gurgaon — Compared` (49 chars ✓ <60) |
| **Description** | `Urban Company vs Sachin Deep Cleaning in Gurgaon — full-home, kitchen & mini-service prices, scope, reviews and damage policy compared line-by-line. Sep 2026.` |
| **Dates** | `datePublished` / `dateModified` = `2026-09-10` |
| **Image** | `/images/full-home-deep-cleaning.webp` (reuse existing; hero already eager-loaded) |
| **imageAlt** | `Urban Company vs Sachin Deep Cleaning — fair service comparison for Gurgaon` |
| **CTA** | `{ title: 'Compare done — book your fixed quote', href: '/deep-cleaning-services-in-gurgaon.html', label: 'Deep Cleaning Services in Gurgaon →' }` |

**Tone rules (copy from the repo's fair-comparison standards in `SEO-AUDIT.md §2026-09-10`):**

- Verifiable facts only; every competitor figure labeled with **source + date** ("Urban Company app, September 2026").
- Affiliation disclosed in the lead + closing `tip` ("written by Sachin Deep Cleaning… verify before booking").
- Where we're more expensive (UC 2-BHK Premium ₹3,529 vs our ₹4,500), say so honestly and explain the scope/time delta (4 hrs vs 7–8 hrs, exclusions) instead of hiding it.
---

## 3. Files to change (exact, with content)

### 3.1 `pages.config.mjs` — add article entry

Insert **after** the `blog/mr-deep-cleaning-vs-sachin-deep-cleaning` block (~line 292):

```js
{
  file: 'blog/urban-company-vs-sachin-deep-cleaning', page: 'article',
  title: 'Urban Company vs Sachin Deep Cleaning Gurgaon — Compared',
  description: 'Urban Company vs Sachin Deep Cleaning in Gurgaon — full-home, kitchen & mini-service prices, scope, reviews and damage policy compared line-by-line. Sep 2026.',
},
```

### 3.2 `src/lib/blog.js` — add the ARTICLES object

Insert **before** the closing `];` (~line 3106), after the `mr-deep-cleaning-vs-sachin-deep-cleaning` article. Structure: `slug`, `file`, `title`, `description`, dates, `image`, `imageAlt`, `cta`, `lead`, `faqs[8–10]`, `blocks[]` — full content spec in §4.

### 3.3 `src/components/RelatedGuides.jsx` — internal links

Add so money pages link into the new comparison (link equity to the new page):

- `{ serviceKey: 'deep', title: 'Urban Company vs Sachin Deep Cleaning — Compared', href: '/blog/urban-company-vs-sachin-deep-cleaning.html' }`
- `{ serviceKey: 'fullhome', ...same href }` (2-BHK page is the main comparison-shopper entry point)
- `{ serviceKey: 'house', ...same href }` (UC is also a house-cleaning competitor)

### 3.4 `public/llms.txt` — add guide link

Mirror the existing `- [Mr vs Sachin](...)` line with the new URL (dist copy of llms.txt exists too — regenerated at build).

### 3.5 `src/pages/BlogIndexPage.jsx` — optional one-line copy tweak

Line 33 pitch already mentions "Mr Deep Cleaning vs us"; optionally extend to "**and Urban Company vs us**". (The article card itself appears automatically via `ARTICLES.map` — no code change needed for listing.)

### 3.6 `indexing-progress.json`

No manual edit — re-submit via `scripts/submit-indexing.cjs` after deploy (existing pattern appends the URL + updates `lastRun`).

### 3.7 No changes needed (verified)

`src/app.jsx`, `BlogArticlePage.jsx`, `gen-entries.mjs`, `gen-sitemap.mjs`, `prerender.mjs`, `RelatedServices.jsx`, `all-pages.html` — all auto-pick-up articles.
---

## 4. Full content outline (the article itself)

### Lead

*"Choosing between **Urban Company** and **Sachin Deep Cleaning**? This fair, source-cited comparison covers **prices, packages, scope, review scale and damage policy** — written by Sachin Deep Cleaning, checked against the Urban Company app and urbancompany.com in September 2026."*

### H2 — At a Glance: Who Wins on What

Table A: `Dimension | Urban Company | Sachin Deep Cleaning | Who Wins`

| Dimension | UC | Sachin | Win |
|---|---|---|---|
| 2 BHK full-home price | ₹3,529 (Premium, **4 hrs**) | ₹4,500 (**7–8 hrs**) | Scope-dependent (see note) |
| Price locked in advance | App display price (dynamic) | Fixed on the confirmation call | **Sachin** |
| Booking | App, slot-based | WhatsApp/call, same-day before noon | Tie |
| Team | Rotating verified pros | Same police-verified local crew since 2015 | **Sachin** |
| Damage cover | ₹10,000 insurance per booking | Supervisor on-site + free 24-hr re-clean | **UC** (formal policy) |
| Payment | Online prepay | **Pay after walkthrough** | **Sachin** |
| Review scale | 4.81 · 262K (marketplace) | 4.5 · 148 (local, deep) | Honest framing (see Table E) |

### H2 — Full-Home Packages Compared

Table B: `Package (UC) | UC price | UC time | Closest Sachin equivalent | Scope note`

| Package | UC price | UC time | Sachin equivalent | Note |
|---|---|---|---|---|
| Furnished Apt Essential | ₹3,209 | 4 hrs | 1 BHK ₹2,500 | UC excludes sofa/carpet wet shampoo, walls, polish |
| Furnished Apt Premium | ₹3,529 | 4 hrs | 2 BHK ₹4,500 | UC is ~₹970 less but ~half the crew-hours + broader exclusions |
| Furnished Apt Elite | ₹4,309 | 4.5 hrs | 2 BHK ₹4,500 | Adds sofa/carpet/mattress shampoo |
| Unfurnished Apt Essential | ₹3,039 | 3h 20m | 1 BHK ₹2,500 | UC line-item scope |
| Unfurnished Apt Premium | ₹3,289 | 3h 50m | 2 BHK ₹4,500 | — |
| Furnished Villa Essential | ₹4,439 | 9 hrs | 4 BHK ₹6,500 | — |
| Furnished Villa Premium | ₹6,729 | 9 hrs | 5 BHK ₹9,000 | — |
| Unfurnished Villa Essential/Premium | ₹4,419 / ₹5,819 | 9 hrs | 4–5 BHK ₹6,500–9,000 | — |
| By room (Bedroom/Living/Floor) | ₹599 / ₹699 / ₹399 | 1 / 1.5 / 1 hr | Per-room ₹800–₹1,500 | — |

*Footnote: UC prices are as displayed in the app, September 2026, and can change by slot/demand; our BHK prices are fixed on the confirmation call and identical in every Gurgaon sector (no travel/gate surcharge).*
### H2 — Kitchen, Bathroom & Mini-Service Price List (UC vs NoBroker vs Us)

Table C: `Service | Urban Company | NoBroker | Sachin add-on` — the long-tail money table (captures "urban company price list" intent). Rows: Full kitchen (occup/empty), Power Steam, Eco-Smart, Bathroom (hands-on/machine/eco), Fridge, Chimney, Microwave, Gas Stove, Tiles & Slabs, Cabinet & Trolley, Oven/Toaster/Grill, Balcony, Utility, Sofa, Sofa+Cushion, Mattress, Dining, Window, Carpet, and mini-services (fan, exhaust, mirror, door, sink, washbasin, ceiling dusting, utensils). *Source label: app/web, Sep 2026.*

### H2 — Scope Reality Check: What's Included vs Not

Table D: `Item | Urban Company home deep clean | Sachin | Difference` — UC **expressly excludes**: utensils, walls & ceiling, floor polishing, wet shampoo of blinds/chair/sofa/carpets, wooden-furniture polishing. We include sofa/carpet vacuum + shampoo add-ons (₹499/seat, ₹15/sq ft), grout descaling, behind-furniture zones. Also note UC's own FAQ: avg **~6 hrs** home deep clean vs our 5–10 hrs by BHK.

### H2 — Reviews: 262K Marketplace Ratings vs Local Depth

Table E: `Metric | UC | NoBroker | Sachin` — 4.81/262K vs 4.74/249.5K vs 4.5/148. Honest framing: marketplace ratings cover a pool of different pros (one bad partner among thousands); a local team's 148 Google reviews all describe the **same crews** you'll get. Also cite UC's notice: some low reviews exist (the "worst" 1-star review in your data) — reviews average ≠ per-pro guarantee.

### H2 — App vs Direct: Urban Company's App Booking vs Our WhatsApp Line

Table H: `Booking factor | Urban Company app | Sachin (no app)` — the section that *genuinely* captures the "cleaning services app / house cleaning app / book online / instant maid" long-tail intent on this page. Rows: download + account needed, slot selection, payment, cancellation, who answers you, what the platform costs you. Quick-win line to include: "No app. No account. WhatsApp +91 9267905943 — price locked on the call in under 30 minutes." This is the only part of the UC page that targets Goal B keywords — and only because it's a real section about app-vs-direct booking, not a keyword-stuffed paragraph.

### H2 — Team, Verification & Damage Policy

Table F: `Trust factor | UC | NoBroker | Sachin` — verification, insurance, re-clean, guarantee, who actually shows up, GST invoice (society/commercial), 3-day/service guarantees.

### H2 — NoBroker vs Urban Company vs Sachin (3-way context)

Compact landscape table (`Provider | Best for | Caveat`) + link to the existing `blog/mr-deep-cleaning-vs-sachin-deep-cleaning.html` for the local-vs-local comparison. (NoBroker data included because it also ranks #1 for the same keyword.)

### H2 — How to Choose: The 5-Question Test

Ordered list: (1) fixed price in writing before arrival; (2) written list of exclusions; (3) verification proof; (4) damage/re-clean policy; (5) same team each time or rotating pros? "A ₹999-cheaper quote that excludes half the scope is not cheaper."

### H2 — When Urban Company Wins vs When Local-Fixed Wins

Table G: `Your situation | Lean toward | Why` — single urgent flat → local-fixed; multi-city rollouts → UC/NoBroker scale; tightest budget+flexible timing → compare aggregates; regulated spaces → paperwork-first (NDA/GST).

### Tip (closing)

Disclosure + WhatsApp CTA: *"Disclosure: written by Sachin Deep Cleaning. Competitor prices from Urban Company app & NoBroker, September 2026. Verify before booking; WhatsApp +91 9267905943 for a fixed quote."*

### FAQs (8–10, incl. Hinglish)

1. Is Urban Company available for deep cleaning in Gurgaon? (Yes — but read the platform layer note.)
2. Why is Urban Company cheaper/dearer than local cleaners? (₹2,999 sasta wala vs genuine: machines, descaling, time.)
3. Urban Company 2 BHK deep cleaning price? (Answer with Table B figures + scope caveat.)
4. Are Urban Company partners verified? (Yes — plus their ₹10,000 damage cover.)
5. NoBroker vs Urban Company vs Sachin — sabse sasta kaun? (₹ figures, scope-annotated.)
6. Sachin Deep Cleaning se booking kaise karein? (WhatsApp +91 9267905943, fixed price, pay after walkthrough.)
7. UC ke ₹3,529 vs aapke ₹4,500 — aap costlier kyun? (4 hrs vs 7–8 hrs, exclusions listed, honest.)
8. Damage ho jaye toh? (UC ₹10,000 cover vs our supervisor + re-clean promise.)
9. Is this comparison biased? (Disclosure answer, same as Mr Deep article.)
10. Which is best overall for a Gurgaon 2 BHK? (Decision framework, not a slogan.)

**Length target:** ~1,400–1,700 words + 7 tables + 10 FAQs (slightly over the general 1,100–1,400 article norm — intentionally, as the flagship comparison landing page; narrative text stays lean while tables/FAQs carry the depth).
---

## 5. Data-integrity notes (flagged for review before implementation)

1. **UC prices** are app-display prices (Sep 2026) — label them "app, September 2026, subject to change."
2. **NoBroker discrepancy:** the app view shows *Occupied Kitchen Essential ₹1,449 / Power Steam ₹1,949* and *Empty Kitchen ₹849/₹949*, while the web "Price List" table shows *₹919 / ₹1,019 / ₹1,539* and *₹749 / ₹849*. For any row with two figures cite the **range** (e.g. "₹919–₹1,449") and note both sources, rather than silently picking one.
3. **Our own numbers** used in tables: 1 BHK ₹2,500 / 2 BHK ₹4,500 (7–8 hrs) / 3 BHK ₹5,500 / 4 BHK ₹6,500 / 5 BHK ₹9,000; kitchen ₹1,500+ / bathroom ₹800 / sofa ₹499/seat / carpet ₹15/sq ft / house ₹499/visit; fridge add-on ₹500 — all already published on this site.
4. Where a competitor fact is unverifiable, use the repo convention *"Not publicly listed"* rather than guessing.

---

## 6. Execution & verification checklist (for when you say go)

> **Scope:** Steps below are for **Goal A (UC article)**. **Goal B runs the exact same pipeline** per page — 7.1 (blog article) and 7.2 (landing page, which additionally needs `src/app.jsx` mapping + `gen-entries` support for the new `landing` page type). Run A first, deploy it, then run B.

1. Edit `pages.config.mjs` (§3.1)
2. Edit `src/lib/blog.js` (§3.2 with §4 content)
3. Edit `src/components/RelatedGuides.jsx`, `public/llms.txt`, optional blog-index copy (§3.3–3.5)
4. `npm run gen` → regenerates the new entry shell `blog/urban-company-vs-sachin-deep-cleaning.html`
5. `npm run build` → sitemap gen → vite build → prerender; **verify**:
   - `dist/blog/urban-company-vs-sachin-deep-cleaning.html` exists, contains prerendered `<h1>`, tables, FAQ JSON-LD
   - `public/sitemap.xml` now lists the URL
   - blog index & all-pages include the card
   - `grep` for title / description / canonical / `FAQPage` + `Article` schema
6. **Local smoke test** — `npm run dev` and/or `vite preview`, curl the page, confirm HTTP 200 + no prerender errors
7. Commit to `main`, then deploy: `./scripts/sync-gh-pages.sh` (keeps `main`/`gh-pages` in sync; builds+pushes `dist`)
8. Verify live: `curl -sI https://sachindeepcleaning.shop/blog/urban-company-vs-sachin-deep-cleaning.html` → `HTTP/2 200`
9. Submit to Google/Bing: `scripts/submit-indexing.cjs` (updates `indexing-progress.json`)
10. Update `KEYWORD_TARGETING.md` / `README.md` page count if you keep those docs accurate (optional)

**Definition of done:** page is live, returns 200 on the custom domain, contains all 7 tables + 10 FAQs, appears in sitemap + blog index + all-pages, is in Google's index submission queue, and links point from deep/fullhome/house service pages back to it.

---

## 7. Maid & Online-Booking keyword cluster (Goal B) — separate pages

> **Rule:** `house maid services gurgaon` and `maid apps` are hiring-intent, NOT deep-cleaning-intent. We never publish a page that implies we supply live-in/daily maids (we don't — bait pages get penalized). Instead we capture the **searcher** and steer them to what we actually sell.

### 7.1 Blog article — "House Maid vs Deep Cleaning in Gurgaon: What You Actually Need"
- **File:** `blog/house-maid-vs-deep-cleaning-gurgaon`, page `article`
- **Title:** `House Maid vs Deep Cleaning in Gurgaon — What's Actually Worth It` (~57 chars ✓)
- **Primary intents:** `house maid vs deep cleaning`, `maid vs cleaning service`, `house maid services gurgaon`, `maid service cleaning`
- **Content:** cost table (live-in maid ₹12,000–18,000/mo via agencies vs quarterly deep clean 1 BHK ₹2,500 / 2 BHK ₹4,500); what a maid does vs what a deep-clean team does; the "both" answer (maid for daily upkeep, deep clean every 3–6 months); weekly house-cleaning plans from ₹499/visit as the middle option.
- **Schema:** Article + FAQ + Breadcrumb (free via article type). **CTA → deep page + house page.**
- **Cross-links:** RelatedGuides entries for `deep`, `fullhome`, `house` serviceKeys.

### 7.2 Service landing page — "Book Cleaning Online in Gurgaon | No App Needed"
- **File:** `book-cleaning-online-gurgaon`, new page type `landing` (add mapping in `src/app.jsx` + entry in `pages.config.mjs`; thin wrapper reusing `QuoteForm` + hero pattern from ResidentialPage).
- **Title:** `Book House Cleaning Online in Gurgaon — No App, Instant Confirm`
- **Primary intents:** `cleaning services app`, `house cleaning app`, `instant maid`, `online maid service gurgaon`, `book maid online`, `cleaning services online booking` (combined ~1,300/mo)
- **Content:** no-app value prop (WhatsApp 30-second booking vs 7-screen app checkout), same-day before noon, fixed price on confirmation call, pay after walkthrough, embed QuoteForm, FAQ on app-less booking (privacy, slots, rebooking). **CTA → deep page + house page.**
- **Schema:** localBusiness + service + FAQ (mirror ResidentialPage).

### 7.3 Interlinking (both directions)
- Each maid/online page ↔ UC comparison page ↔ house page ↔ deep page.
- `RelatedGuides.jsx` gains: `house-maid-vs-deep-cleaning` entries (deep/fullhome/house) + `book-cleaning-online` entry (house/deep).
- UC page §Table H links forward to 7.2 as "no-app booking, try the direct line".

### 7.4 Keyword → page map (`target.md` = the full coverage of the gap analysis)

| Cluster | Query group | Captured on |
|---|---|---|
| A | urban company gurgaon / urbanclap / urban clap / urban company gurugram | UC comparison article (§2–6) |
| A | urban company home cleaning price / price list / charges | UC article — Table C + FAQ |
| B | cleaning services app / house cleaning app / online booking | UC article Table H **+** landing 7.2 |
| B | instant maid / online maid service gurgaon / book maid online | landing 7.2 |
| B | house maid services gurgaon / maid services near me / maid service cleaning | blog 7.1 (honest steering) |
| B | house maid vs deep cleaning / maid vs cleaning service | blog 7.1 |
| C | deep cleaning company near me / cleaning businesses near me / home cleaning companies near me | long-tail add-ons on existing pages (ongoing) |

---

## 8. Remaining backlog (after Goals A + B are live)

1. **"Is Urban Company Worth It in Gurgaon? Honest Review"** long-tail blog → folds cleanly into a FAQ/section of the UC article instead of a separate page.
2. **"Near me / cleaning company near me"** long-tail expansions → add H2 "Serving Every Sector of Gurgaon" lists to existing service pages + weekly house page FAQ.
3. Update `KEYWORD_TARGETING.md` with section 7.4 as the master keyword→page map once both goals ship.
