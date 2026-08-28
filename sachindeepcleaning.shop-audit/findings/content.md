# Content Quality & E-E-A-T — Findings

**Score: 70/100** — Strong topical coverage for Gurgaon intent; E-E-A-T and duplication need hardening.

## What Works
- Deduplicated service copy: each service page has 120–150w unique intro + 6–9 unique FAQs + 3 `Review` + `HowTo` steps (vs generic lorem before).
- 20 blog guides covering cost, BHK checklist, sector-wise, kitchen vs regular, hard-water stains — strong cluster for `deep cleaning cost gurgaon`, `near me`, `chimney cleaning`.
- Bilingual FAQs (Hindi + English) capture vernacular long-tail: e.g. `Sasta deep cleaning Gurgaon me kitne ka...`.
- `trust-bar` and `guarantee-section` add proof: 5,000+ homes, ₹10k damage protection, 100% satisfaction — same as Urban Company positioning.

## Issues

### 1. BHK pages risk cannibalization — High
- Evidence: `full-home-deep-cleaning-1bhk…5bhk-gurgaon.html` share 61% chrome (hero, checklist, pricing grid differ only by price/duration). Live titles: `1 BHK Deep Cleaning… | Sachin` vs `2 BHK…Price & Booking` — intent nearly identical. Google may consolidate to one.
- Impact: Dilutes link equity; 5 pages compete for `full home deep cleaning gurgaon`.
- Fix: Keep one canonical `deep-cleaning-services-in-gurgaon.html` as hub + BHK as anchor sections (`#1bhk`), or add substantial unique proof per BHK: unique photos, checklist differences (wardrobe count, balcony size), duration justification, 2 unique reviews per BHK with locality.

### 2. Thin E-E-A-T signals — Medium
- Evidence: No author bio pages. Blog `Article` publisher is Organization only (`"author":{"@type":"Organization"}` in `deep-cleaning-cost-gurgaon-2026.html`). No `Person`, no `sameAs` LinkedIn, no about-team photos with names. `about.html` exists but generic.
- Impact: AI Overviews and Helpful Content reward first-hand experience; current looks templated.
- Fix: Add `/team/sachin-kumar.html` Person schema, author bylines on all 20 blogs (`Person` with `sameAs` socials, `knowsAbout: Home Cleaning`), dateModified visible, photos of team at work with EXIF locality.

### 3. AggregateRating trust gap — Medium
- Evidence: `LocalBusiness` schema claims `ratingValue 4.9, reviewCount 247` but footer shows no GBP embed, no review source link. Reviews in page are static cards (`Priya Mehta — DLF Phase 3`) not linked to Google.
- Impact: Could be flagged as self-published without external proof.
- Fix: Embed real Google Business Profile reviews widget, link to GBP URL, collect 10+ verifiable Google reviews, add `review` JSON-LD with `author` + `datePublished` per review and keep count in sync.

### 4. Duplicate `all-pages.html` thin gateway — Low
- Evidence: `/all-pages.html` is link list for bots, no unique value.
- Fix: Add `noindex,follow` or convert to HTML sitemap with descriptions, or keep but lower priority to 0.2.

## Readability
- Pricing tables and checklists improve scannability; FAQ accordion good for dwell time. Hindi answers increase accessibility.

## Next
- Differentiate BHK pages, add author E-E-A-T, connect aggregateRating to GBP source.
