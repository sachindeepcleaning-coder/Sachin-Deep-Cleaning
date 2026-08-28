# On-Page SEO — Findings

**Score: 75/100** — Titles/descriptions within optimal ranges; one brand-first title and OG reuse remain.

## What Works
- Title lengths 41–56ch optimal, desc 137–149ch within 150: e.g. kitchen `45ch` + `144ch`, bathroom `50ch`+`137ch` — measured live via curl (see technical.md evidence).
- H1 present with keyword on every service: `Kitchen Deep Cleaning in Gurgaon`, `2 BHK Full Home Deep Cleaning` etc.
- OG/Twitter complete on homepage: `og:type website`, `og:image 1200x630`, `twitter:card summary_large_image`.
- Geo tags + canonical + hreflang correct.
- Internal linking grid: 9 service cards + footer links + blog CTA `Deep Cleaning Services in Gurgaon →`.

## Issues

### 1. Homepage title brand-first — Medium
- Evidence: `index.html:12` `<title>Sachin Deep Cleaning — Home Cleaning Services in Gurgaon</title>` 56ch brand first. Competitors rank with keyword-first: `Deep Cleaning Services in Gurgaon | …`.
- Impact: Slight keyword prominence loss for primary query.
- Fix: Change to `Deep Cleaning Services in Gurgaon | Sachin Deep Cleaning — Pay After Satisfaction` (keep ≤60ch) and mirror `og:title`.

### 2. OG image reused sitewide — Medium
- Evidence: homepage `og:image https://sachindeepcleaning.shop/images/cleaning-1.jpg` also used as fallback on service pages that should have unique. Live `sitemap-images.xml` has 7 service images but OG not page-specific.
- Fix: Set page-specific `og:image`: e.g. kitchen → `kitchen-deep-cleaning.webp`, bathroom → `bathroom-deep-cleaning.jpg`, sofa → `sofa-shampoo-cleaning.jpg`. Add `og:image:width/height` per page.

### 3. Anchor text generic — Low
- Evidence: Service grid uses `View Details →`, blog CTA uses `Deep Cleaning Services in Gurgaon →` (good) but footer uses `Kitchen`, `Bathroom` without location modifier.
- Fix: Use keyword-rich anchors: `Kitchen Deep Cleaning Gurgaon`, `Bathroom Descaling Gurgaon` especially blog → service internal links (currently not keyword-rich).

### 4. Heading hierarchy gaps on homepage — Low
- Evidence: Hero H1 contains `<span>` with `hl` styling and concatenated text `Full Home Deep Cleaningin GurgaonPay Only After...` missing space in rendered text extraction — potential parse issue for crawlers reading innerText.
- Fix: Ensure H1 plain text `Full Home Deep Cleaning in Gurgaon — Pay Only After We Finish` with space, keep spans for style via CSS not innerHTML concatenation.

### 5. Blog → service funnel thin — Low
- Evidence: Each blog ends with single CTA to hub (`/deep-cleaning-services-in-gurgaon.html`) but not to most relevant BHK/service (e.g. `kitchen-chimney-cleaning-guide.html` → `kitchen-deep-cleaning` would be better).
- Fix: Add contextual inline links per blog to 2–3 related services with exact-match anchors.

## Quick Wins
- Swap homepage title order; make OG images page-specific; enrich footer anchors.
