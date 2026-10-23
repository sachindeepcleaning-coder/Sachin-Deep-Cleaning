# Blog consolidation — merged & redirected pages (Task 5)

84 blog articles were grouped by topic. Fifteen thin or duplicated pages were
merged into the strongest page of their cluster; each merged page now serves a
static redirect (canonical + `noindex` + `meta refresh`) to its target, so old
URLs and bookmarks still resolve. No new pages were created.

Rule applied throughout: only unique, verifiable content was merged. Invented
testimonials ("Local Review" quotes) had already been removed repo-wide before
the merge — see docs/AUDIT-FIXES.md, Task 2.

## Mergers performed

| # | Redirected page (now a static redirect) | Target (kept, strengthened) | Unique content merged into the target |
|---|---|---|---|
| 1 | blog/home-cleaning-services-near-me-gurgaon.html | blog/deep-cleaning-near-me-gurgaon.html | Zone Dispatch Table; Plan Picker; 3 Questions That Filter Gig Listings; 2 FAQs |
| 2 | blog/residential-cleaning-services-near-me-gurgaon.html | blog/deep-cleaning-near-me-gurgaon.html | Society & RWA Entry; RWA Playbook; Density Routes; 2 FAQs |
| 3 | blog/deep-cleaners-near-me-gurgaon.html | blog/deep-cleaning-near-me-gurgaon.html | Individual Cleaner vs Verified Team; 5 Vetting Questions; Red Flags; 2 FAQs |
| 4 | blog/home-cleaning-service-guide.html | blog/home-deep-cleaning-services-gurgaon.html | Service vs Maid vs Deep Clean; When to Upgrade a Visit; Red Flags; 2 FAQs |
| 5 | blog/home-cleaning-services-gurgaon.html | blog/home-deep-cleaning-services-gurgaon.html | 12-Month Upkeep-vs-Deep Calendar; Weekly Plan vs One-Time; 1 FAQ |
| 6 | blog/home-deep-cleaning-service-gurgaon.html | blog/home-deep-cleaning-services-gurgaon.html | What a Cheaper Quote Usually Leaves Out |
| 7 | blog/best-home-cleaning-services-gurgaon.html | blog/home-deep-cleaning-services-gurgaon.html | 10-Point "Best" Checklist; Price Traps; Ad Decoder; 1 FAQ |
| 8 | blog/full-home-deep-cleaning.html | blog/full-home-deep-cleaning-packages-gurgaon.html | Quote Red Flags; Full Home vs By-Room; 60-Second Quote Comparison; 1 FAQ |
| 9 | blog/full-home-deep-cleaning-gurgaon-guide.html | blog/full-home-deep-cleaning-packages-gurgaon.html | Furnished vs Non-Furnished; Condition-Based Pricing; Seasonal Calendar; Walkthrough Script; 1 FAQ |
| 10 | blog/full-house-cleaning-checklist-gurgaon.html | blog/full-home-deep-cleaning-packages-gurgaon.html | Room Sign-Off Sheets; Time-Boxed Day Plan; 1 FAQ |
| 11 | blog/commercial-office-cleaning-udyog-vihar.html | blog/office-deep-cleaning-udyog-vihar.html | AMC vs One-Time; What the AMC Does Not Cover; 1 FAQ |
| 12 | blog/office-bathroom-cleaning-udyog-vihar.html | blog/office-deep-cleaning-udyog-vihar.html | Drain-First Odour Control; What ₹800/Bath Pays For; 1 FAQ |
| 13 | blog/best-office-deep-cleaning-services-gurgaon.html | blog/office-deep-cleaning-gurgaon-guide.html | Corporate Proof Checklist; When Scale Wins vs Local-Fixed; 1 FAQ |
| 14 | blog/kitchen-cleaning-price-gurgaon-chimney.html | blog/kitchen-deep-cleaning-cost-gurgaon.html | Chimney Types & Method; Kitchen vs Full-Home Bundle Math; 1 FAQ |
| 15 | blog/bathroom-deep-cleaning-services-gurgaon-guide.html | blog/bathroom-deep-cleaning-gurgaon-best.html | Mould vs Limescale vs Soap Scum; Ventilation Protocol; Fixture Materials |

Rationale for the keepers: each target already had the strongest content and/or
the strongest internal-link position in its cluster (e.g.
full-home-deep-cleaning-packages-gurgaon.html is linked from the RelatedGuides
mesh on ~129 pages, so it — not the shorter-slugged alternatives — carries the
family's link equity).

## Clusters reviewed and deliberately KEPT (not duplicates)

- **DLF Phases 1–5** — each page carries genuinely phase-specific content
  (society lists, tower names, TDS notes, access rules). Phase 1 (Magnolias,
  Aralias, Belvedere), Phase 2 (Cyber City corridor), Phase 3 (C/B-block
  builder floors), Phase 4/5. Not merged.
- **Sectors 65–67** — distinct sector-level content of healthy length. Not merged.
- **BHK price pages (1–5 BHK)** — distinct price-intent keywords; every price
  traces to the fixed BHK card. Not merged.
- **Udyog Vihar service variants (chair/carpet/sofa)** — distinct services with
  their own search intent. Not merged.
- **Seasonal guides (Diwali, Dussehra, Navratri, Monsoon)** — distinct seasonal
  intent. Not merged.
- **Comparison guides (Urban Company / NoBroker / Safaiwale / Mr Deep Cleaning /
  Housekeeping / Pest-control)** — distinct comparison intents. Their
  competitor figures remain flagged for owner verification (docs/AUDIT-FIXES.md).

## Redirect mechanics

`pages.config.mjs` marks each redirected entry with `redirectTo`; the build
emits a static page with `<link rel="canonical">` to the target,
`<meta name="robots" content="noindex, follow">` and
`<meta http-equiv="refresh" content="0; url=…">`. Redirect stubs are excluded
from sitemap.xml and are exempt from preflight's orphan rule (check 20) — they
exist for stale external URLs, not for crawling.

The old tool used for the merge is kept for reference: `scripts/merge-blog.mjs`
(plus the verified plan snapshot it consumed). It is not part of `npm run build`.
