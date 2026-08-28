# AI Search Readiness (GEO) — Findings

**Score: 45/100** — FAQ schema helps citability but llms.txt missing caps AI crawler access.

## What Works
- `FAQPage` schema on every service (6–9 Qs) — prime for AI citations (Perplexity, AI Overviews).
- Strong topical coverage for Gurgaon queries; Hindi FAQs aid vernacular AI answers.
- Product/service pricing tables in HTML tables — easily parsable by LLMs.

## Issues

### 1. `llms.txt` 404 — High
- Evidence: `curl -I https://sachindeepcleaning.shop/llms.txt` → 404 GitHub Pages (see technical.md). No `llms-full.txt`.
- Impact: GPTBot, ClaudeBot, PerplexityBot, Google Extended lack explicit allowlist with markdown summary.
- Fix: Add `public/llms.txt`:
```
# Sachin Deep Cleaning
> Professional deep cleaning in Gurgaon since 2024 — pay after satisfaction.
- [Home](https://sachindeepcleaning.shop/): Full-home offers
- [Deep Cleaning Services](...): Prices & process
... (all 40 URLs with 1-line desc)
```
and `llms-full.txt` concatenating all service markdown. Allow bots in robots.

### 2. No AI bot Allow in robots.txt — High
- Evidence: live robots allows only `Googlebot`, `Bingbot` explicitly; AI bots default to `* Allow:/` but better to explicit.
- Fix: Add:
```
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: CCBot
Allow: /
User-agent: Google-Extended
Allow: /
```

### 3. Citability structuring — Medium
- Evidence: Pricing in tables but FAQs repeat similar answers; passage-level citations benefit from `id` anchors per FAQ.
- Fix: Add `id` per FAQ question and anchor links; add `speakable` schema for voice.

### 4. Authority signals thin — Medium
- Evidence: No external inbound citations; no Wikipedia/Wikidata; social `sameAs` present but no press mentions.
- Fix: Publish 2 guest posts in local Gurgaon portals linking back; add `sameAs` to JustDial/IndiaMART once citations built.

## Recommendation
Deploy llms.txt + AI bot allowlist within Week 1 — highest GEO ROI.
