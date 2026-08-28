# Performance (Core Web Vitals) — Findings

**Score: 60/100** — JS payload is the bottleneck; fonts/videos already optimized partially.

## What Works
- Fonts `media=print` non-blocking: `<link ... media=print onload="this.media='all'">` + noscript fallback.
- Videos compressed: repo notes `15.6→4.3MB 72%` (4 autoplay videos) — still heavy but improved.
- CSS modest `57KB` (`bootstrap-B7aJ2VDE.css`).
- Images lazy where possible; hero not hero-image heavy (gradient).

## Issues

### 1. 405KB JS includes three.js unused — High (LCP/INP)
- Evidence: `dist/assets/bootstrap-CtDAvBzZ.js 405KB` (was 414KB pre-gzip) — imports `three`, `@react-three/fiber`, `drei` for 3D hero not visible on service pages. Decode cost hurts INP on mid-tier Android (common in Gurgaon). `curl -s https://sachindeepcleaning.shop/ | grep bootstrap-Ct` confirms single bundle.
- Impact: Estimated lab LCP 2.8–3.4s mobile, INP >200ms.
- Fix: Code-split: `import('three')` dynamic only on homepage hero; create `landing.chunk.js` vs `service.chunk.js` via `vite.config.js` manualChunks. Defer GTM (`gtm.js` async already) but add `partytown` or delay 3s. Lazy-load videos (`preload=metadata` already) + `loading=lazy` for below-fold.

### 2. 4 autoplay videos inflate LCP — High
- Evidence: homepage has `<video src="videos/cleaning-1.mp4" muted loop autoplay playsinline>` plus reel embeds; mobile autoplay still decodes.
- Fix: Poster image first, load video on intersection observer; add `poster="/images/cleaning-1.jpg"`; limit to 1 autoplay above fold.

### 3. Booking popup nudge is render-blocking JS driven — Medium
- Evidence: `.booking-popup` + `.wa-nudge` injected via JS, no CSS-only.
- Fix: Defer nudge JS after `requestIdleCallback`.

### 4. No `fetchpriority=high` on LCP image — Low
- Evidence: hero has no large image, but `cleaning-1.jpg` is below fold; not preloaded.
- Fix: Add `<link rel="preload" as="image" href="/images/cleaning-1.jpg" fetchpriority="high">` only on pages where image is LCP.

### 5. Cache-Control 600s too short — Medium
- Evidence: `cache-control: max-age=600` for HTML+assets (GitHub Pages default).
- Fix: Via Cloudflare set `max-age=31536000, immutable` for `/assets/*`.

## Estimated Field Data (no CrUX yet)
- LCP ~3.0s mobile / 1.8s desktop; INP ~220ms mobile; CLS ~0.02 (good layout stability).
- Target after code-split: LCP <2.5s, INP <150ms.

## Actions
1. Split three.js; lazy-load videos.
2. Cloudflare caching.
3. Preload LCP; defer GTMs.
