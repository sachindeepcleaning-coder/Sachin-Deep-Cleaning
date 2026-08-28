# Technical SEO — Findings

**Score: 78/100** — Good prerender fixes indexing; remaining gaps are hosting headers and sitemap drift.

## What Works
- Prerendered static HTML in `dist/*.html` — live homepage `curl -s https://sachindeepcleaning.shop/` returns full hero, service grid, FAQ and schema (was empty CSR before Feb 2026 fix).  
- Canonicals correct: `https://sachindeepcleaning.shop/` (not `/index.html`) on all 40 live URLs; `hreflang en-IN` + `en` present.
- `robots.txt` live allows crawling, disallows only `/thank-you.html`, dual sitemap declared (sitemap.xml + sitemap-images.xml).
- Live `sitemap.xml` has 40 URLs (20 service + 20 blog + about/contact/blog/all-pages) with `lastmod 2026-08-28` weekly/monthly — valid XML.
- Geo tags present: `geo.region IN-HR`, `geo.placename Gurgaon`, `ICBM 28.4595,77.0266`.
- HTTPS via GitHub Pages, valid cert, `cache-control max-age=600` consistent.

## Issues

### 1. No security headers on GitHub Pages — Medium
- Evidence: `curl -I https://sachindeepcleaning.shop/` shows `server: GitHub.com` but no `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`. Only `cache-control: max-age=600`.
- Impact: No HSTS = downgrade risk; short cache wastes revalidation; CSP missing lowers trust signals.
- Fix: Put Cloudflare in front (free) to add HSTS + set `cache-control: public, max-age=31536000, immutable` for `/assets/*` via `_headers` or Cloudflare cache rules. Keep HTML at 600s.

### 2. Source `robots.txt` drift vs live — Low
- Evidence: repo `/robots.txt:1` is `User-agent: * Allow:/ Disallow:/thank-you.html` + single sitemap. Live robots adds explicit `Googlebot`, `Bingbot` allows and `sitemap-images.xml`. File `public/robots.txt` vs `scripts/gen-sitemap` not synced.
- Fix: Commit live version into `public/robots.txt` so source = dist; add AI bots allowlist (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `CCBot`) for GEO.

### 3. `sitemap.xml` in repo stale — Medium
- Evidence: repo `sitemap.xml:5` lastmod `2026-08-06` with ~17 URLs; dist/live has 40 URLs dated `2026-08-28`. Indicates manual commit lag.
- Fix: Ensure `npm run build` regenerates via `scripts/gen-sitemap.mjs` and CI commits dist on deploy; add pre-commit check.

### 4. No `llms.txt` — blocks AI crawlers (see GEO)
- Evidence: `curl -I https://sachindeepcleaning.shop/llms.txt` → 404 GitHub Pages.
- Fix: Add `public/llms.txt` + `llms-full.txt` (markdown site map) and reference in robots.

### 5. Duplicate render paths (`/.html` vs clean `/`) — Low
- Evidence: `dist/` contains both `/full-home-deep-cleaning-2bhk-gurgaon.html` and clean URL via rewrite; live serves both 200. Canonical points to clean, but internal nav uses `/full-home-deep-cleaning-1bhk-gurgaon` without `.html` (good). Need redirect rule.
- Fix: Add `netlify.toml` / `vercel.json` 301: `/*.html → /:splat` or canonical-only serve via `_redirects`.

## Recommendations (prioritized)
1. Sync `public/robots.txt` and `public/sitemap.xml` to dist/live versions.
2. Front with Cloudflare for HSTS + long asset caching.
3. Add `llms.txt` and AI bot Allow.
4. Add 301 html→clean URL redirects.
