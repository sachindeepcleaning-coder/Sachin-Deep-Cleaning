# Images — Findings

**Score: 65/100** — Alt text complete; formats still JPEG-heavy.

## What Works
- Alt text keyword-rich, 0 missing alt live (`curl ... | grep alt` shows YouTube thumbs with descriptive alt).
- `sitemap-images.xml` with 28 image entries (7 services + homepage etc) titles/captions include location `Gurgaon`.
- Lazy loading present on reel thumbs (`loading=lazy decoding=async`).

## Issues

### 1. Only 1 WebP among 10 images — Medium
- Evidence: `public/images` list: `bathroom 41KB jpg`, `carpet 22KB jpg`, `cleaning-1 63KB jpg`, `full-home-2bhk 54KB`, `full-home-3bhk 97KB`, `full-home-deep 47KB`, `house 163KB jpg`, `kitchen 46KB webp`, `office 63KB`, `sofa 169KB jpg` — sofa 169KB and house 163KB largest.
- Impact: Extra 30–50% bytes vs WebP/AVIF; no srcset means 1200px image served to 360px mobile.
- Fix: Convert all JPG to WebP + AVIF, generate `srcset 400w,800w,1200w` with `sizes="(max-width:600px) 400px, 800px"`, keep JPG fallback via `<picture>`. Preload LCP variant.

### 2. No dimensions on blog hero — Low
- Evidence: blog hero `<img src="/images/full-home-deep-cleaning.jpg" width=1200 height=675>` present (good) but homepage videos lack poster dimensions causing CLS risk.
- Fix: Add `width`/`height` or `aspect-ratio` to all media.

### 3. OG images not optimized — Low
- Evidence: `og:image cleaning-1.jpg 63KB` could be 1200x630 WebP 35KB.
- Fix: Provide OG WebP with JPG fallback, ensure 1200x630 exactly.

### 4. YouTube thumbs external without srcset — Low
- Evidence: `https://i.ytimg.com/vi/p-ArftUay5I/hqdefault.jpg` — could benefit from `mqdefault` vs `hqdefault` srcset.

## Quick Win
Convert `sofa 169KB` + `house 163KB` to WebP (~90KB each) first — biggest byte save.
