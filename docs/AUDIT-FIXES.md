# Audit fixes report — SEO/AEO/GEO (2026-10-23)

Scope: Tasks 1–8 of the audit brief. Branch: `main`. **Nothing has been pushed.**
Related docs: `docs/CONSOLIDATION.md` (Task 5 detail), `docs/DEPLOY.md` (Task 7 detail).

Final state: `scripts/preflight.mjs` **PASS** (117 real pages + 16 redirect
stubs + verification stub), `npm test` **26/26 pass**, 0 invalid JSON-LD,
0 broken internal links, 0 title/description length violations, 0 images
missing alt or dimensions, FAQPage schema mirrors visible content on all 108
FAQ-carrying pages.

---

## Task 1 — Data consistency (flag; fixed only where the majority was clear)

### Inventory

| Value | Occurrences (tracked files) | Files | Assessment |
|---|---|---|---|
| **Phone +91 95607 39281** (incl. `tel:`, wa.me) | 305 | 61 (site source of truth: `src/lib/site.js`) | Consistent everywhere. **Current site value.** |
| **Phone +91 92679-05943** | 4 | 2 — `target.md`, `SEO-AUDIT.md` (planning docs only, not site content) | `scripts/preflight.mjs` explicitly bans it as the "old phone number". Site never shows it. |
| **Coordinates 28.4538, 77.0782** | 528 | 134 (all derived from `GEO` in `src/lib/site.js`) | Consistent across schema, geo meta tags, llms.txt, and the live site. |
| **Coordinates 28.4595, 77.0266** | 6 | 3 — `SEO-AUDIT.md`, `SEO_AUDIT_2026-09-19.md`, `plan.md` (audit docs only) | Not present anywhere in the built site. |
| **Address "Shop No-B, 747B, Sushant Lok Rd, Block B, Sector 43"** | 7 | 5 (source: `ADDRESS_PARTS` in `src/lib/site.js`; also llms.txt, README, ContactPage) | Consistent; matches the live site today. |
| **Address "Block D, Sector 27, Sector 43"** | 0 | 0 | Not present in the current tree. The grep hits for "Block D" are DLF Phase 3 block names (C-Block/B-Block DLF 3), unrelated to the business address. |
| **Review link → "Balaji Cleaning Services"** | 0 | 0 | Not present. Removed in commit `18a9a43` ("fix(brand): one brand only + remove fake urgency…"), which deleted `GBP_LISTING_NAME = 'Balaji Cleaning Services'` and every reference to it. `src/lib/site.js` now deliberately ships **no review link** (see the comment above `MAPS_URL`): a review CTA built from a search can land on the wrong listing. |
| **Business name** | single brand | — | "Sachin Deep Cleaning" everywhere; no second trading name in the site source. |

### ⚠ Values you need to decide (nothing changed in the site)

1. **Which phone is real — 95607 39281 or 92679-05943?** The repo treats 95607
   as current (102+ source files, preflight bans the other). If 92679-05943 is
   the live GBP number, the GBP must be corrected (off-repo) — do **not** edit
   the site to match a wrong GBP.
2. **Which coordinates are real — 28.4538,77.0782 (site) or 28.4595,77.0266
   (old audit docs)?** The site and llms.txt use 28.4538,77.0782 consistently.
   Confirm against the live GBP pin; if the GBP differs, tell me and I'll
   change the single `GEO` constant in `src/lib/site.js`.
3. **Google review URL** — none exists in the repo (the Balaji one was already
   removed). If you have the real GBP "Write a review" URL, it belongs in
   exactly one place: `src/lib/site.js` (next to `MAPS_URL`), consumed once.

Note: the "conflicts" you listed (Block D / Sector 27, the Balaji review link)
do not exist in the current build — they were on the older live version and
were already cleaned up in commits `18a9a43`/`15fe9d5`. If you still see them
on the live site, you are looking at a cached page (see docs/DEPLOY.md).

---

## Task 2 — Fake urgency and unverifiable social proof removed

Commit `39a6ee6`.

| Item searched | Found? | Action |
|---|---|---|
| "Priya M. booked X minutes ago" live-booking popups | **Not found** (nothing generates fake booking events) | — |
| "Offer expires today" / countdown timers | **Not found**. The only urgency copy is the static, factual "same-day slots when you book before noon" (a real service fact) | — |
| "ISO-certified" / certifications / awards | **Not found** | — |
| Damage-cover parity claims ("same as Urban Company") | 1 found: sofa-udyog-vihar FAQ compared our weekend slots to "Urban Company's 'at your home' 30-day guarantee" | **Comparison removed**; the page now states only the documented own-service fact |
| "4.4★ 80 reviews" block | **Not found** (grep hits were SVG path data, not text) | — |
| Named testimonials — homepage | 6 invented reviews (Priya Mehta, Amit Kumar, Shivani Gupta, Rohit Gupta, Neha Trivedi, Vikram Sharma) in `src/lib/landing.js`, rendered by `ReviewsSection` on the homepage | **Removed** with the whole "What Gurgaon Families Say" section (`IndexPage.jsx`); `REVIEWS` export deleted |
| Named testimonials — service pages | 8 per-service review arrays in `src/lib/services.js` + per-BHK rotation in `ServicePage.jsx` | **Removed**; no-op review slots on Partners/Residential pages dropped |
| Named testimonials — blog | 35 invented "**Local Review:**" quote paragraphs across `src/lib/blog.js` (Neha, Rohit, Ankita, Sahil, Sneha, Rajeev, Nikhil & Priya…) | **All removed**; regenerated article modules no longer ship them |
| aggregateRating schema | None anywhere | `scripts/preflight.mjs` fails the build if it ever appears — nothing added |

**Removed as unverifiable — supply real evidence if you want it back:** every
named customer quote listed above. The only claims the site now makes are the
ones in `src/lib/claims.js` (police-verified team + proof line) and the price
card. Case-study specifics inside blog articles (sq ft, hours, TDS readings)
are presented as the business's own job records — I left them, but they are
only as true as your job sheets; say the word and I'll strip them too.

**Flagged, not removed (competitor comparison data):** the Urban Company /
NoBroker / Safaiwale comparison articles quote competitor prices and ratings
(UC "4.79 stars, 853K+ reviews", ₹10,000 damage cover, NoBroker tiers). These
describe competitors, not us, but the repo itself carries an in-content
`[OWNER TO CONFIRM: source URLs and the exact access date…]` marker on
`blog/urban-company-vs-sachin-deep-cleaning.html` (visible on the live page).
Either supply the source URLs/dates so the marker can be completed, or tell me
to strip the competitor figures from that article.

---

## Task 3 — Thin duplicate page

Commit `2864719`.

- `blog/sector-44-office-deep-cleaning-gurgaon.html` remains a static redirect:
  canonical → the target, `noindex, follow`, `meta refresh 0s` — verified
  present in the built file.
- Target `blog/office-deep-cleaning-sector-44-gurgaon.html` exists and renders
  a full page (H1 + content). Behind the old stub sat a stranded full playbook
  (coworking turnover cleans, Sector 44 price bands, workstation-density crew
  table, 6 FAQs) that the redirect had orphaned — that unique content is now
  **merged into the target**, and the dead 9.8 KB JS chunk no longer ships.
- Internal links updated old → target: `src/components/RelatedGuides.jsx` (1)
  and 4 in-article links in `src/lib/blog.js`. No link in the site points at
  the stub any more; preflight now exempts redirect stubs from the orphan rule
  by design.

---

## Task 4 — Sitemap and robots.txt

Commit `f205c14`.

- `scripts/gen-sitemap.mjs` now derives each `<lastmod>` from the **real last
  git commit date** of the files that define the page (`git log -1
  --format=%cs -- <file>`; page component + its data lib, max of the two).
  Articles keep their per-article `dateModified` from `src/lib/blog.js`.
  Result: lastmod now spreads across real change dates (2026-09-10 …
  2026-10-23) instead of being stamped with the build date.
- `sitemap-videos.xml`: valid XML (4 videos, correct `video:` namespace,
  thumbnails, durations, publication dates); already declared in robots.txt.
- robots.txt: the `Llms-Txt:` / `Llms-Full:` lines are gone (removed in the
  earlier deploy); all AI-crawler allow rules kept verbatim.
- The sector-44 stub is excluded from sitemap.xml (the `redirectTo` filter) —
  verified 0 occurrences.

---

## Task 5 — Blog duplication and thin content

Commit `725593c`. Full detail in **`docs/CONSOLIDATION.md`**.

84 articles grouped by topic; **15 pages merged + redirected** (within the
15–20 target). Merged-page → target:

1. home-cleaning-services-near-me-gurgaon → deep-cleaning-near-me-gurgaon
2. residential-cleaning-services-near-me-gurgaon → deep-cleaning-near-me-gurgaon
3. deep-cleaners-near-me-gurgaon → deep-cleaning-near-me-gurgaon
4. home-cleaning-service-guide → home-deep-cleaning-services-gurgaon
5. home-cleaning-services-gurgaon → home-deep-cleaning-services-gurgaon
6. home-deep-cleaning-service-gurgaon → home-deep-cleaning-services-gurgaon
7. best-home-cleaning-services-gurgaon → home-deep-cleaning-services-gurgaon
8. full-home-deep-cleaning → full-home-deep-cleaning-packages-gurgaon
9. full-home-deep-cleaning-gurgaon-guide → full-home-deep-cleaning-packages-gurgaon
10. full-house-cleaning-checklist-gurgaon → full-home-deep-cleaning-packages-gurgaon
11. commercial-office-cleaning-udyog-vihar → office-deep-cleaning-udyog-vihar
12. office-bathroom-cleaning-udyog-vihar → office-deep-cleaning-udyog-vihar
13. best-office-deep-cleaning-services-gurgaon → office-deep-cleaning-gurgaon-guide
14. kitchen-cleaning-price-gurgaon-chimney → kitchen-deep-cleaning-cost-gurgaon
15. bathroom-deep-cleaning-services-gurgaon-guide → bathroom-deep-cleaning-gurgaon-best

Each target absorbed the source's unique sections + FAQs (merge inventory in
docs/CONSOLIDATION.md); unique-but-thin content was preserved, nothing unique
was deleted, no new pages created. Kept as genuinely distinct (reviewed, not
merged): DLF Phases 1–5, Sectors 65–67, BHK price pages, Udyog Vihar service
variants, seasonal guides, comparison guides.

---

## Task 6 — Schema and FAQ

Commit `fa82215`.

- New checker `scripts/check-faq-schema.mjs`: for all 108 pages carrying
  FAQPage schema, every schema question must appear in the visible page
  (accordion items, service-page money-QA headings, or the facts-page Q&A
  blocks). **Result: 0 mismatches** — no FAQ schema exists without matching
  visible content, so nothing needed removing.
- aggregateRating: none anywhere (preflight gate); not added (Task 2).

---

## Task 7 — Headers and deployment

Commit `23ef794`. Detail in **`docs/DEPLOY.md`**.

- Verified: DNS resolves straight to GitHub Pages IPs (185.199.108–111.153) —
  **no Cloudflare branch/CDN in front**; `CNAME` → sachindeepcleaning.shop;
  no GitHub Actions workflows — deploys are the manual
  `scripts/sync-gh-pages.sh` (main → gh-pages).
- The live site is serving the **current** build (verified by asset hash +
  last-modified today); if it ever looks stale, docs/DEPLOY.md has the
  4-step diagnosis (sync not run → Pages build pending → 600s edge cache →
  wrong branch in Pages settings).
- `_headers` is ignored by GitHub Pages: HSTS, CSP, X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy and long cache TTLs are **not
  served** and cannot be from this host. Documented, plus the two fix paths
  (Cloudflare proxy with the exact Cache Rules written into
  `public/_headers`; or Netlify/Cloudflare Pages — `netlify.toml` is ready).

---

## Task 8 — Verification (rebuilt site)

Commit `9c60603` (checker scripts) + audit run on `dist/`.

| Check | Result |
|---|---|
| Preflight | **PASS** (132 pages incl. 16 redirect stubs; 551 JSON-LD blocks; 473 entity ids) |
| Unit tests | **26/26 pass** |
| One H1 per page | All real pages; the only pages without H1 are the 16 noindex redirect stubs + the Google verification file (by design) |
| Unique title ≤ 60 chars | 115/115 real pages pass (0 violations) |
| Meta description 110–160 chars | 115/115 real pages pass (0 violations) |
| Canonical | Present on every real page; absent only on the verification stub |
| Viewport | Present on every real page |
| Open Graph / Twitter cards | Present on every real page; absent only on redirect stubs (they're noindex) |
| Internal links | 0 broken (checker resolves `/` → index.html and trailing-slash paths) |
| Images | 591 images: 0 missing alt, 0 missing width/height |
| JSON-LD | 0 invalid blocks |
| FAQPage vs visible content | 108 pages, 0 mismatches |

---

## What cannot be fixed from the repo alone

1. **Cache purge** — GitHub's Fastly edge caches pages for 10 minutes
   (`max-age=600`); a stale page clears itself after the TTL. Cannot be purged
   from the repo. Long-term fix = Cloudflare in front (docs/DEPLOY.md).
2. **HSTS / CSP / security headers** — GitHub Pages does not serve them.
   Requires Cloudflare (Response Header Transform Rule) or a host move.
3. **Google Business Profile** — the listing still carries whatever name/phone/
   coordinates it has; if the GBP shows "Balaji Cleaning Services" or the other
   phone/coords, that must be corrected **in the GBP** (owner action), then the
   site constants confirmed to match. This is the single biggest local-SEO
   entity issue and it is off-repo.
4. **JustDial / IndiaMART / other directory listings** — NAP consistency there
   is off-repo; worth an owner pass so every citation matches
   `src/lib/site.js` exactly.
5. **Search Console** — sitemap resubmission, the sector-44 old URL's
   removal/removal-request, and Core Web Vitals data all live in Search
   Console (owner access). The repo side (sitemap, redirects, canonicals) is
   ready.
6. **Off-site reviews & backlinks** — real Google reviews (to ever justify
   rating schema) and external links cannot be created from the repo;
   `BACKLINKS.md` remains the plan.
7. **Competitor price/rating sources** — the `[OWNER TO CONFIRM]` marker on the
   Urban Company comparison page needs source URLs + access dates from you
   (or my removal of those figures on request).
8. **Case-study specifics in blog articles** (sq ft, crew hours, TDS values) —
   presented as the business's own job records; keep only if the job sheets
   support them (I can strip them on request).

---

## Commits (branch `main`, not pushed)

| Commit | Content |
|---|---|
| `39a6ee6` | Task 2 — invented testimonials + competitor-parity claim removed |
| `2864719` | Task 3 (+ Task 5 first case) — Sector 44 pages consolidated |
| `f205c14` | Task 4 — sitemap lastmod from git dates; sitemap/robots verification |
| `725593c` | Task 5 — 15 blog pages consolidated; docs/CONSOLIDATION.md |
| `fa82215` | Task 6 — FAQPage vs visible content checker (0 mismatches) |
| `23ef794` | Task 7 — docs/DEPLOY.md |
| `9c60603` | Task 8 — meta-length + internal-link checkers (all green) |
