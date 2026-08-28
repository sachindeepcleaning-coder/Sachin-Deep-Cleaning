# Schema / Structured Data — Findings

**Score: 72/100** — LocalBusiness + Service implementation strong; blog schema mis-typed.

## What Works (live `curl -s https://sachindeepcleaning.shop/ | grep ld+json`)
- Homepage `LocalBusiness` + `HomeAndConstructionBusiness` with `@id https://sachindeepcleaning.shop/#business`, `telephone +91 92679-05943`, `priceRange ₹499-₹14,500`, `currenciesAccepted INR`, `areaServed` 25 zones (City DLF Phases, Sohna Road, Golf Course, MG Road, sectors 14-57, Vatika, Manesar etc), `geo 28.4595,77.0266`, `openingHours Mo-Su 08:00-20:00`, `aggregateRating 4.9/247`, `hasOfferCatalog` 7 services, `sameAs` FB/IG/WA, `contactPoint` Hindi/English.
- Per service: `Service` (e.g. Kitchen) + `FAQPage` (9 Qs) + `HowTo` (4 steps/tools) + `BreadcrumbList` + `Review` + `ItemList` — validated via `curl kitchen-deep-cleaning… | grep '"@type"'` counts: 9 Answer, 1 FAQPage, 1 HowTo, 4 HowToStep, 3 Review etc.
- Blog example (`deep-cleaning-cost-gurgaon-2026.html`): `Article` + `FAQPage` + `BreadcrumbList`, `datePublished/dateModified 2026-08-11`, publisher `@id` linking to business.

## Issues

### 1. BlogPosting schema missing — High
- Evidence: `dist/blog/*.html` emits `{"@type":"Article"}` with `author: Organization` not `BlogPosting` + `Person`. No `author.sameAs`, no `image.width/height`, `headline` identical to title but type generic.
- Impact: `BlogPosting` gets richer eligibility; `Person` author boosts E-E-A-T and AI citations.
- Fix: Change to `BlogPosting` JSON-LD per blog:
```json
{"@type":"BlogPosting","headline":"...","author":{"@type":"Person","name":"Sachin Kumar","url":"https://sachindeepcleaning.shop/team/sachin-kumar.html","sameAs":[...]},"datePublished":"2026-08-11","dateModified":"2026-08-28","image":{"@type":"ImageObject","url":"...","width":1200,"height":675}}
```

### 2. LocalBusiness missing `postalCode` granularity + `hasMap` — Medium
- Evidence: `address.postalCode 122001` only one code for all Gurgaon; no `hasMap` linking to Google Maps, no `geo` per areaServed.
- Fix: Keep 122001 primary but add `hasMap: https://maps.app.goo.gl/...` (GBP link) and embed map; add `areaServed` as `PostalCode` variants if needed.

### 3. Review schema not tied to GBP — Medium
- Evidence: Reviews lack `reviewRating` source URL; risks appearing self-authored.
- Fix: Add `review` array with external `url` to GBP, keep `aggregateRating` count synced to GBP reviewCount.

### 4. `ItemList` vs `OfferCatalog` duplication — Low
- Evidence: homepage has both `hasOfferCatalog` and per-service `ItemList` — slight duplication but valid.
- Fix: Keep OfferCatalog canonical; ensure no conflicting price in Service `offers`.

### 5. No `VideoObject` for reels — Low
- Evidence: Homepage embeds 4 Instagram Reels + 3 YouTube Shorts (`p-ArftUay5I` etc) with `<video src="videos/cleaning-1.mp4">` but no `VideoObject` schema.
- Fix: Add `VideoObject` with `thumbnailUrl https://i.ytimg.com/vi/.../hqdefault.jpg`, `uploadDate`, `duration: PT60S`, `embedUrl`.

## Validation
- Run `https://validator.schema.org/` per URL; current passes but BlogPosting change needed.
