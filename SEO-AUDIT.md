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

---

# SEO Audit — 2026-09-10 (Search keyword report(1).csv, 9 keywords)

Source: `Search keyword report(1).csv` (Google Ads, 10 Sep 2026, Exact match, campaign paused, 0 clicks/impr).
Build after fix: 45 pages prerendered 45/45, `public/sitemap.xml` 44 URLs, `dist/` verified.

## 1. Keyword → page map (exact-phrase counts from built `dist/` BEFORE fix)

| # | Exact keyword | Final URL (Ads) | QS signals | Organic owner (this repo) | Exact phrase on owner |
|---|---|---|---|---|---|
| 1 | deep cleaners near me | sachincleaning.online/deep-cleaning | no data (paused) | NONE — gap | 0 everywhere |
| 2 | residential cleaning services near me | …/residential-cleaners-near-me | no data | residential-cleaners-near-me.html (partial: "residential cleaners", not "cleaning services") | 0 |
| 3 | home cleaning services | …/house-cleaning-services-gurgaon | Landing Below avg, CTR Below avg, Rel Above avg | house-cleaning-services-in-gurgaon.html ("House", not "Home") | 0 |
| 4 | house cleaning services gurgaon | …/house-cleaning-services-gurgaon | Landing Below avg, CTR Above avg, Rel Average | house-cleaning-services-in-gurgaon.html | 0 exact (title has "in Gurgaon", body never the bare phrase) |
| 5 | deep cleaning services near me | …/deep-cleaning | Landing Average, CTR Above avg, Rel Above avg ✅ | deep page + blog/deep-cleaning-near-me-gurgaon | 0 on deep page; present in near-me blog FAQs |
| 6 | home cleaners near me | …/residential-cleaners-near-me | no data | NONE — gap (residential page had "residential cleaners" only) | 0 |
| 7 | deep cleaning | …/deep-cleaning | Landing Below avg, CTR Below avg, Rel Above avg | deep page (60× substring, but page is transactional, no definitional content) | generic only |
| 8 | deep cleaning services in gurgaon | …/deep-cleaning | Landing Average, CTR Above avg, Rel Above avg ✅ | deep-cleaning-services-in-gurgaon.html (10× exact) | 10 ✅ |
| 9 | home cleaning services near me | …/house-cleaning-services-gurgaon | Landing Below avg, CTR Average, Rel Average | NONE primary (secondary in house guide only) | 0 on money page |

Pattern: **Ad relevance is Average/Above (ad copy matches) but Landing is Below average on 4/5 rated keywords** → classic keyword-to-page term mismatch + thin intent coverage, not a bidding problem.

## 2. Landing Page Experience diagnosis (why Below average)

1. **Zero exact-match on money pages (verified).** Residential page contained only "residential cleaners near me" — never "residential cleaning services near me", "deep cleaners near me", "home cleaners near me", "deep cleaning services near me". House page said "House" everywhere, never "home cleaning services" / "home cleaning services near me" / "house cleaning services gurgaon" verbatim. Google Ads landing-exp is literal: no exact phrase = Below average.
2. **House vs Home wording split.** Keyword [home cleaning services] landing on a page whose H1/body says "House" exclusively. Same intent, different token → Below average landing + Below average CTR.
3. **Generic [deep cleaning] → transactional page.** A one-word informational query landing on a sales page with no "what is deep cleaning" definition block. High bounce intent mismatch → Below average landing + CTR.
4. **Wrong/old domain in Final URLs.** All 9 Final URLs point to `sachincleaning.online` (old domain), not `sachindeepcleaning.shop` (this repo). Split-domain = split authority (already flagged 2026-08-11: 301 `sachincleaning.online` → `sachindeepcleaning.shop`, one GBP, one sitemap). QS was measured on the OLD domain — these fixes must go live on the canonical domain to move QS.
5. **Residential page thinner than siblings.** 1,605 prerendered words vs deep 2,658 / house 2,355. Less crawlable text for 4 assigned near-me intents.
6. **Index title 68 chars** (over 60) — truncated in SERP/Ads headline matching. Fixed → 45 chars.

## 3. What was fixed (this audit)

- **4 new blogs (25 total articles, 44 sitemap URLs):**
  - `blog/deep-cleaners-near-me-gurgaon` → primary `deep cleaners near me` (17×) + `home cleaners near me` (13×). Angle: hire-a-cleaner (individual vs team, verification, per-cleaner prices). CTA → residential page. Differentiated from sector-wise `deep-cleaning-near-me` guide.
  - `blog/residential-cleaning-services-near-me-gurgaon` → primary `residential cleaning services near me` (10×). Angle: flats/societies/villas + RWA entry. CTA → residential page.
  - `blog/home-cleaning-services-near-me-gurgaon` → primary `home cleaning services near me` (14×) + `home cleaning services` (23×) + `house cleaning services gurgaon` (4×). Angle: near-me dispatch + plans. CTA → house page.
  - `blog/what-is-deep-cleaning-guide` → primary `deep cleaning` (56× definitional pillar). Angle: definition, room-by-room scope, vs-regular table. CTA → deep page.
  - All: title 42–53 chars, desc 129–137, 1 H1, canonical, Article+FAQ+Breadcrumb JSON-LD, 1,000+ words, Hinglish FAQ, internal CTA.
- **Exact-match patches on money pages (no URL changes):**
  - `services.js deep`: intro/detail now contain `deep cleaning services near me` (3×), `deep cleaners near me` (3×), `what is deep cleaning` definition.
  - `services.js house`: intro/detail now contain `home cleaning services near me` (5×), `home cleaning services` (9×), `house cleaning services gurgaon` (3×).
  - `ResidentialPage.jsx`: hero + 2 FAQs now contain all four `residential cleaning services near me` (5×) / `deep cleaners near me` (5×) / `home cleaners near me` (5×) / `deep cleaning services near me` (3×).
- **Internal linking:** `RelatedGuides` deep→+what-is +deep-cleaners; house→+home-near-me; `llms.txt` +4 entries (AI-search discovery).
- **Meta:** index title 68→45 chars.

## 4. Cannibalization guardrails

- One primary per URL (table above = owner). New blogs use distinct angles (hire vs society vs dispatch vs definition), not reworded duplicates of `deep-cleaning-near-me-gurgaon` (sector table) or `house-cleaning-services-gurgaon-guide` (price table).
- Do NOT create sector-doorway pages ("Sector 14/15…") — `deep-cleaning-all-sectors-gurgaon` pillar already covers them.
- Do NOT create maid/manpower pages (`housekeeping 880`, `maid…`) — filter article `housekeeping-vs-deep-cleaning` owns that intent.

## 5. Still external (owner must do)
1. Deploy: `npm run gen && npm run build` done locally → run `./scripts/sync-gh-pages.sh`, verify `curl -sI` 200 + Last-Modified, resubmit `sitemap.xml` (now 44 URLs) in Search Console.
2. Point all 9 Ads Final URLs to `sachindeepcleaning.shop` equivalents (or 301 old→new) and re-enable — QS landing-exp is measured on Final URL, fixes only count there.
3. GBP + reviews + citations/backlinks per 2026-08-11 plan (unchanged) — needed for `near me` map-pack, which blogs alone won't win.

---

# 2026-09-10 (pm) — Festive blogs: Diwali / Dussehra / Navratri + business history 2015

Owner confirmed operating **since 2015** (site previously said 2024). Aligned site-wide: `pages.config.mjs` descriptions, `blog.js`, `AboutPage.jsx` (`foundingDate`, `5+ years` → `10+ years`), `llms.txt`. Verified `dist/`: 0× "since 2024", "since 2015" on 17 pages. Historical audit docs left untouched. NOTE: update GBP founding date to 2015 too, or site↔GBP mismatch hurts trust.

3 new blogs (28 articles, 48 shells, sitemap 47 URLs), distinct angles, no cannibalization:
- `blog/diwali-cleaning-gurgaon` → `diwali cleaning in gurgaon` 10×, festive prices/checklist/timeline, CTA → deep page. Linked from fullhome `RelatedGuides`.
- `blog/dussehra-cleaning-gurgaon` → `dussehra cleaning in gurgaon` 10× (+ `Dusshera` variant captured), post-monsoon + early-bird angle, CTA → 3BHK page. Linked from fullhome guides.
- `blog/navratri-cleaning-gurgaon` → `navratri cleaning in gurgaon` 8×, satvik-kitchen/pooja angle, CTA → kitchen page. Linked from kitchen guides.
- All: titles 47–49 chars, descs 145–152, 1 H1, canonical, Article+FAQ+Breadcrumb JSON-LD, 1,200–1,600 words, Hinglish FAQ, sectors + site-attested societies (DLF Magnolias, Emaar Emerald Hills, Godrej Aria, Unitech South City, Ansal Florance, Vatika/Nirvana/Ardee). Society names used as coverage + review-sector proof — swap in real festive job photos when available.

---

# 2026-09-10 (eve) — GSC Instagram demand → competitor audit → 4 blogs

Source: `instagram.com_cleaning_service_in_gurgaon-Performance-on-Search-2026-09-10/Queries.csv` (GSC property for IG profile — real Gurgaon demand: 434 queries, 6,257 impr, 75 clicks). Top clusters: deep-cleaning core 2,099 (top `deep cleaning services gurgaon` 468), home/house core 2,113 (top `cleaning services gurgaon` 337), full-home 466 (top `full home deep cleaning` **370 impr, 0 clicks**), competitor-brand 259 (`mr deep cleaning services` 172 — verified real: mrdeepcleaning.com, thin site), room-level 115.

Top-3 audit (Urban Company, NoBroker, Safaiwale + ZoopGo/TechSquad/MyGate/KleanHomz patterns): UC wins on package picker + inclusions/EXCLUSIONS + durations; Safaiwale blog (Aug 2026) on red-flags + quote-compare method; ZoopGo on Hinglish + price tables + sector FAQs + author byline; TechSquad on trust badges. Baked into new blogs: exclusions lists, package picker, Hinglish FAQs, since-2015 badges. Note: old domain `sachincleaning.online` ranks for same queries — self-competition, 301 consolidation still pending.

4 new blogs (32 articles, 52 shells, sitemap 51 URLs):
- `blog/cleaning-services-gurgaon-guide` → `cleaning services gurgaon` (umbrella directory + quote-compare method; CTA → deep page; linked from deep guides).
- `blog/full-home-deep-cleaning-packages-gurgaon` → `full home deep cleaning` (package picker: furnished vs not, full vs partial, honest exclusions; CTA → 3BHK; linked from fullhome guides).
- `blog/room-cleaning-services-gurgaon` → `room cleaning services gurgaon` (single-room prices + partial-vs-full math; CTA → house page; linked from fullhome guides).
- `blog/mr-deep-cleaning-vs-sachin-deep-cleaning` → `mr deep cleaning services` (fair comparison per competitor-page rules: verifiable facts only, "not publicly listed" where unknown, affiliation disclosed, Sep-2026 dated; CTA → deep page).
- Titles 47–52 chars, descs 131–152, 1 H1, canonical, Article+FAQ+Breadcrumb JSON-LD, 1,100–1,400 words each.

**Expansion (same eve):** all 4 grown to **~2,000–2,300 words, 11–13 H2s, 8–13 FAQs, 4–7 tables** — matching Safaiwale/KleanHomz depth (methods, maintenance 20/10 rule, exclusions, worked examples, methodology, landscape + benchmark tables, full 434-query long-tail woven in: company/agency/local variants, full-house/flat/new-home forms, bedroom/PG/nursery forms, best/cheap/same-day commercial forms).

---

# 2026-09-10 (night) — Zero-thin-content sweep (all 52 pages ≥1,500 words)

Measured every `dist/` page (prerendered words). Found 23 pages <1,500 (thinnest: move-in checklist 694, contact 740, kitchen-vs-regular 757). Expanded all: 20 blogs (+400–1,100 words each — deposit logic, stain first-aid, scoring rubrics, TDS zones, seasonal calendars, AMC math, RWA playbooks, quote autopsies, day-of checklists + 60+ new FAQs incl. Hinglish), carpet service (+detail/FAQs), residential page (residence-type + dispatch sections, +3 FAQs), About (story/milestones/training/societies), Contact (minute-by-minute timeline, channel cards, 10 FAQs), blog index (intent-cluster intro). Result: **every page ≥1,500 words** (services all ≥2,000; median 1,691) except `thank-you.html` (noindex utility, intentionally thin). Also fixed 2 content bugs found en route: Python `% R` fragments leaked into 6 blog blocks (ReferenceError broke the build) and a duplicated housekeeping section — both repaired and verified (single occurrences, `node --check` clean, 52/52 prerendered).

---

# 2026-09-10 (late) — Office keyword offensive vs Balaji Cleaning

Target: `office deep cleaning services in gurgaon` (GSC office cluster: 131 impr, 0 clicks). Incumbent dissected from user-provided page + SERP: **Balaji Cleaning** (200+ pros, govt licences, 20+ verticals, 50-sector footer, GST public, office testimonial) + Safaiwale office page, ZoopGo sq-ft bands + sector links, AYS Max (sq-ft rates ₹2,500–₹15,000, 18% GST note, hub-wise areas, 7 FAQs), ShineGlow/TechSquad/Eco-Cleaning.
- Money page `office-deep-cleaning-gurgaon` 2,148 → **~2,993 words**: commercial verticals (IT/BPO/clinic/retail/restaurant), 7 business hubs (Cyber City → Manesar), sq-ft bands, compliance pack (GST/NDA/MSDS/photo-logs), +4 includes, +7 PAA FAQs (16 total).
- Guide `blog/office-deep-cleaning-gurgaon-guide` 1,592 → **~2,263 words**: hub playbooks, sq-ft bands, 3 vertical checklists, compliance pack, +4 FAQs.
- New `blog/best-office-deep-cleaning-services-gurgaon` (~1,663 words, T53/D146): fair top-5 (Balaji/Safaiwale/AYS Max/ZoopGo/us, verifiable-only, affiliation disclosed) for the “Best office…” PAA query; linked from office guides.
- Zero-thin bar intact (53/53 ≥1,500). Sitemap 52 URLs.

---

# 2026-09-10 (GSC) — URL Inspection resource failures → full lockdown

User pasted GSC “Page resources couldn’t be loaded” for deep (26/34) + office (38/99) pages. Triage:
- **Repo-fixed:** 625KB monolith JS failing on mobile emulation → route-split per-page chunks (money pages 625KB → ~163KB initial JS); mp4 autoplay → IntersectionObserver + preload=none + poster; YouTube thumbs (i.ytimg) → local posters; Instagram iframes/embeds (~15 blocked scontent requests) → click-to-play facades + embed.js removed; Google Fonts (5 failing woff2) → self-hosted in /fonts + preloaded, zero GF requests; per-page og:image:alt + x-default hreflang; footer deep-keyword link; custom 404 (noindex, off-sitemap); hourly + Pronto/UrbanClap FAQs; 4 dead components + 4 unused deps removed.
- **Local pre-flight (new standard):** script checks all 54 dist pages — same-origin assets exist, internal links resolve, JSON-LD parses, head essentials present, noindex only thank-you/404 → **zero issues, zero third-party fetch hosts in initial HTML** (GTM inline loader intended).
- **Cannot fix from repo (harmless, documented):** doubleclick.net / google-analytics / stats.g beacons “blocked by robots.txt” come from Google’s own hosts + your GTM container tags (Ads AW-449303659, GA4 ×2) — expected on every GTM site, zero indexing impact. Removing them means editing the GTM container, not the site.

---

# 2026-09-10 (final) — Money-keyword offensive: `deep cleaning services in gurgaon`

SERP dissected (user-provided): local pack MH 5.0/366, JK 4.8/154, Mr Deep 4.9/245 (all out-review us: 148) + organic UC, NoBroker, JustDial, IG (our profile ranks #4!), Kleanhomz, TechSquad, ShineGlow, ZoopGo, Safaiwale. PAA: price / best / included / 24-hr maid. Related: price list, urban clap, pronto, bathroom, floor.
- Money page 2,750 → **~3,745 words, exact keyword 17×**: price-honesty section with checkable public figures (UC/NoBroker/Safaiwale vs our fixed ₹4,500), methods + honest exclusions, +4 includes (12), +7 PAA FAQs (19 total: price, best, included, maid-cost, UC-alternative, minis, damage cover), NEW on-page public price-check table (rendered from `priceCheck` data).
- Cost guide → **~2,615+ words**: competitor price grid (UC/NoBroker/Safaiwale/ZoopGo/us, Sep-2026 dated), mini-task menu, exact `price list` query line, +4 FAQs.
- Homepage hero now carries the exact keyword (internal anchor weight to money page).
- Sitemap 52 URLs. Honest limit noted to owner: review-volume gap (148 vs 245–366) and UC domain authority need the GBP actions below — content is now best-in-class.

---

# 2026-09-10 (schema) — Review-snippet critical errors → fixed

GSC URL Inspection (live retest): Review snippets showed **3 invalid items × “Sachin Deep Cleaning / 1 critical issue”** on deep + office pages. Root cause: `reviewsSchema()` emitted `itemReviewed: { '@id' }` with no `@type`/`name` — Google rejects bare ID references. Fixed at source: `itemReviewed` now carries `@type: LocalBusiness` + `@id` + `name` (applies to all pages using reviews: index, residential, 14 service pages). Verified locally: **45/45 Review nodes valid** (author.name, ratingValue, reviewBody, itemReviewed.name). VideoObject “2 non-critical issues” (warnings only, eligibility intact): added `author` + `publisher` + `isFamilyFriendly` to resolve what's resolvable without fabricating view counts. Owner action: re-run TEST LIVE URL → Review snippets should flip to valid; stars eligibility follows Google's own thresholds, not ours.
