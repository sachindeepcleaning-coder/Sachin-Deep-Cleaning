# Sachin Deep Cleaning — Website

A modern, mobile-friendly marketing site for **Sachin Deep Cleaning**, a home deep cleaning service in Gurgaon, Haryana. Built with **Vite + React 18 (MPA)**.

- **Live URL:** [https://sachindeepcleaning.shop](https://sachindeepcleaning.shop) (custom domain via CNAME)
- **Repo:** `sachindeepcleaning-coder/Sachin-Deep-Cleaning` (GitHub)
- **Hosting:** GitHub Pages (deploys from the **`gh-pages`** branch)
- **Branch sync rule:** **`main` and `gh-pages` MUST be kept in sync** — `gh-pages` is a snapshot of the latest `main` build, not a separate working branch. After every `main` push, redeploy to `gh-pages` (see below). The script in `scripts/sync-gh-pages.sh` automates the full sequence.

---

## 🚀 DEPLOY TO GITHUB PAGES — READ THIS FIRST

### How the site deploys (IMPORTANT)

- This is a **Vite + React 18 MPA**. Source code lives on the **`main`** branch.
- GitHub Pages is configured to serve from the **`gh-pages` branch** (built output), **NOT** `main`.
- **Pushing to `main` alone does NOT update the live site.** You must build and push the fresh `dist/` to `gh-pages`.
- **`main` and `gh-pages` must stay in sync.** Never commit source changes to `gh-pages`, never commit built artefacts to `main`. The script enforces this.
- There is **no GitHub Actions workflow**. Auto-deploy was attempted once and skipped (the local `gh` token lacks the `workflow` scope, so pushing `.github/workflows/` files is rejected). Do not re-add a workflow unless the token has `workflow` scope, and remember to switch the Pages source back to `workflow` in that case.
- The `gh-pages` branch contains only build output + deploy files (`CNAME`, `robots.txt`, `.nojekyll`, `dist/` contents).

### One-command deploy (recommended)

Use the bundled script — it runs `gen` → `build` → fresh-clone `gh-pages` → copy `dist` → restore `.nojekyll` → force-push to the real remote. Always run this from `main` and **only when `main` is the head you want live**.

```bash
./scripts/sync-gh-pages.sh
```

The script:

1. Verifies you are on `main` (refuses to deploy from any other branch).
2. Runs `npm run gen` (regenerates HTML entry shells if `pages.config.mjs` changed).
3. Runs `npm run build` (sitemap → vite build → prerender → `dist/`).
4. Clones the **remote** `gh-pages` branch fresh into `/tmp/opencode/ghp` (no stale local-branch reuse).
5. Wipes the clone, restores `.nojekyll`, copies `dist/*` over.
6. Sets the clone's `origin` to the **real** GitHub remote (the local `git clone ... .` defaults to the local repo path).
7. Commits and `git push --force origin gh-pages` (force is safe — `gh-pages` is a deploy branch).
8. Prints the new `gh-pages` HEAD commit so you can confirm what went live.

### Manual deploy (if the script is unavailable)

```bash
# 1. Build (regenerate entry shells first if pages.config.mjs changed)
git checkout main
git pull origin main
npm run gen
npm run build                     # = sitemap gen + vite build + prerender → dist/

# 2. Clone the REMOTE gh-pages branch into a scratch dir (no stale local branch)
rm -rf /tmp/opencode/ghp
git clone -b gh-pages --single-branch https://github.com/sachindeepcleaning-coder/Sachin-Deep-Cleaning.git /tmp/opencode/ghp

# 3. Replace contents with the fresh build
cd /tmp/opencode/ghp
rm -rf ./*
touch .nojekyll
cp -r /home/vegeta/Music/website\ 2nd\ copy/dist/* .

# 4. Restore deploy-only files that vite does NOT emit (.nojekyll only — CNAME & robots.txt are now in public/ and copied by vite)
git checkout origin/gh-pages -- .nojekyll

# 5. Commit + push to the REAL remote (clone's origin already points to GitHub, no fix needed)
git add -A
git config user.name "vegeta" && git config user.email "vegeta@localhost"   # if not inherited
git commit -m "Deploy fresh build"
git push --force origin gh-pages     # force push is fine: gh-pages is a deploy branch
```

### Gotchas

- **`main` and `gh-pages` desync = live regressions.** If you fix something in `main` and forget to run the script, live keeps showing the old build. Add a post-commit hook or CI reminder if you ship often.
- The local `gh-pages` branch may lag behind `origin/gh-pages`. Always clone fresh (the script does this) instead of reusing the local branch.
- The script sets `origin` to the **real** GitHub remote. If you `git clone ... .` from inside the working tree, the clone's `origin` points to the local repo path — **fix the remote URL** before pushing, or you'll push nowhere.
- If the push is rejected with "tip behind", you cloned from a stale local branch → `git push --force` after confirming the working tree has the full build (all `*.html`, `assets/`, `videos/`, `sitemap.xml`, `CNAME`, `robots.txt`, `.nojekyll`).
- Verify live: `curl -sI https://sachindeepcleaning.shop/<page>.html` → expect `HTTP/2 200`. The new `Last-Modified` header should reflect the time of your deploy.
- **Source-only push (no deploy):** `git add -A && git commit -m "message" && git push origin main`. This updates `main` only — the live site is unchanged until you also deploy to `gh-pages`.

### Sync verification

After every deploy, run:

```bash
git fetch origin gh-pages main --prune
echo "main:    $(git rev-parse --short origin/main)"
echo "gh-pages:$(git rev-parse --short origin/gh-pages)"
# Should show main and gh-pages pointing to related commits.
# gh-pages should always contain a built dist/ tree (not source).
```

---

## 🧱 Tech Stack & Structure

| File/Dir | Purpose |
|----------|---------|
| `pages.config.mjs` | Single source of truth for every MPA page (file, page type, title, description) |
| `scripts/gen-entries.mjs` | Generates HTML entry shells from `pages.config.mjs` (head meta, canonical, OG, robots, preload) |
| `scripts/gen-article-modules.mjs` | Projects `src/lib/blog.js` into `src/generated/articles/<slug>.js` (one module per guide) + a metadata index — keeps the 1 MB authored collection out of the browser bundle |
| `scripts/gen-sitemap.mjs` | Regenerates `public/sitemap.xml` with content-driven `lastmod` |
| `scripts/gen-geo-assets.mjs` | Generates `public/llms.txt`, `public/llms-full.txt` and `public/sitemap-images.xml` |
| `scripts/gen-redirects.mjs` | Generates `public/_redirects` + `netlify.toml` — collapses the duplicate `/page` vs `/page.html` render paths |
| `scripts/gen-modulepreload.mjs` | Injects `<link rel="modulepreload">` per page (from Vite's manifest) so the page chunk loads in parallel with the entry chunk |
| `scripts/prerender.mjs` | Renders every page to static HTML with `ReactDOMServer` and injects it into `dist/` (SEO: Google/Bing see content + JSON-LD without JS). Also strips React 18 Fizz NUL padding and fails the build if any NUL byte survives |
| `scripts/preflight.mjs` | Post-build gate: NUL bytes, JSON-LD parses, `@id` collisions, broken local refs, canonical, one `<h1>`, FAQ schema parity, HowTo on service pages, noindex allowlist, sitemap/llms URLs, third-party fetch hosts |
| `src/app.jsx` | Shared app tree (route-split via `React.lazy` + `Suspense`; see prerender note) |
| `src/prerender-entry.jsx` | SSR entry (`renderToPipeableStream`, required for lazy pages) for `scripts/prerender.mjs` |
| `src/bootstrap.jsx` | Hydrates the pre-rendered HTML (or renders normally in dev) based on `data-page` |
| `src/lib/article-routes.jsx` | Per-article route map (`import.meta.glob`) — each guide gets its own JS chunk |
| `src/pages/*.jsx` | Page components (ServicePage, ResidentialPage, PartnersPage, BookingPage, ContactPage, ...) |
| `src/components/*.jsx` | Nav, Footer, Hero, QuoteForm, FaqSection, MapEmbed, ReviewsSection, ReelEmbed, ... |
| `src/lib/services.js` | Service data (name, tagline, includes, process, faqs, price) |
| `src/lib/site.js` | Phone, WhatsApp, social links, URLs |
| `src/lib/schema.jsx` | JSON-LD builders + the entity graph (WebSite / LocalBusiness / Organization / Person / WebPage / BlogPosting / Service / HowTo / FAQPage / BreadcrumbList) |
| `scripts/submit-indexing.cjs` | Google Indexing API submitter (sitemap → skip submitted → publish; `--test`, `--limit N`, `--reset`, `--url <u>`) |
| `indexing-progress.json` | Submitted/failed URL state for the submitter (commit after each run) |
| `src/styles/global.css` | Global styles / design tokens |
| `public/sitemap.xml` | SEO sitemap (regenerated on every build) |
| `public/llms.txt` / `public/llms-full.txt` | AI-discovery maps (regenerated on every build) |
| `public/robots.txt` | Crawler rules (must be restored in gh-pages deploy) |
| `public/_redirects` | Canonical redirects (active on Netlify / Cloudflare Pages) |
| `public/CNAME` | Custom domain `sachindeepcleaning.shop` (must be restored in gh-pages deploy) |

## 🔧 Development

```bash
npm install
npm run dev        # local dev server http://localhost:5173
npm run build      # production build → dist/ (regenerates every derived asset, then prerenders)
npm run gen        # regenerate HTML entry shells + article modules after editing pages.config.mjs / blog.js
```

`npm run build` runs, in order: `gen-entries` → `gen-article-modules` → `content-lint` → `gen-sitemap` → `gen-geo-assets` → `gen-redirects` → `vite build` → `gen-modulepreload` → `prerender`. Nothing derived is hand-maintained — edit the source and rebuild.

## ⚙️ Config

- **Build:** `npm run build` (vite). No Tailwind here.
- **Leads:** Netlify Forms (`lead-quote`) + `FORMSPREE_ID = 'xdaqkbwa'` fallback via `QuoteForm.jsx`; redirect to `thank-you.html`.
- **Reels:** click-to-play facades with local posters (no autoplay, no IG/YT embeds on load); local mp4s lazy-load on scroll into view.
- **Map:** `MapEmbed.jsx` — click-to-load facade, so the contact page ships **no** third-party request until the visitor asks for the map.
- **Fonts:** self-hosted in `public/fonts` (DM Sans + Syne), preloaded — no Google Fonts requests. Only these two families are referenced.
- **Media:** `public/images` (responsive `-400w`/`-800w` webp, truthful srcset descriptors) + `public/videos` (4 mp4s).

## 📊 Site State (2026-10-22)

- **108 entry shells** (`npm run gen`) → **107 prerendered pages** in `dist/` (1 merge stub + the GSC verification file are not pages)
- **Sitemap:** 104 URLs (excludes `thank-you`, `404`, `all-pages`) · **Indexing API: 56/56 submitted, 0 failed**
- **Blog:** 85 articles + booking landing page + society page · every page ≥1,500 words, unique titles/descs/H1s
- **Performance:** per-article chunks (a guide page ships ~12 KB of copy, not the whole 85-guide library) · `modulepreload` on every page · largest single chunk is the 170 KB entry
- **Content gate:** `content-lint` passes with **0 warnings**, including `--strict`
- **Hydration rule:** SSR output must equal first client render — never mutate another component's DOM; keep effects out of render output.

## 📝 Content System (how pages get built)

- **Service pages** are data-driven: `src/lib/services.js` keyed by `serviceKey` (`deep/house/kitchen/bathroom/sofa/carpet/office/move/fullhome` + `bhk` 1–5), rendered by `ServicePage.jsx` with LocalBusiness + Service + HowTo + FAQ + Breadcrumb + WebPage JSON-LD, pricing tables, before/after sliders (deep/fullhome), related guides + services. The included-scope list and the process steps render as real `<ul>`/`<ol>` so AI extractors can parse them, and the same steps feed the `HowTo` node 1:1.
- **Blog articles** live in `src/lib/blog.js` (`ARTICLES[]`: slug/file/title/description/dates/image/lead/faqs/cta/blocks). Block types: `p, lead, h2, h3, table{head,rows}, ul, ol, tip`; `**bold**` inline supported. Rendered by `BlogArticlePage.jsx` with Article + FAQ + Breadcrumb + WebPage JSON-LD. Every article also renders a **Key takeaways** box (derived from the guide's own copy by `gen-article-modules.mjs`) — the labelled summary an answer engine lifts.
- **`src/lib/blog.js` is never bundled.** `gen-article-modules.mjs` projects it into one module per guide; `src/lib/article-routes.jsx` maps each guide to its own chunk.
- **Custom pages** (`index/residential/partners/landing/about/blog/allpages/contact/thank-you/404`) are hand-built components with own schema; new page types need an `app.jsx` lazy mapping + `pages.config.mjs` entry (see `BookingPage.jsx` + `page:'landing'` precedent).
- **Content bars (enforced):** titles <60 chars, descriptions 120–160, exactly 1 H1, every page ≥1,500 prerendered words, primary keyword in title/H1/lead + body multiples, Hinglish FAQ on local-intent pages, CTA → money page, `since 2015` business history (never 2024), prices from the live rate card only.
- **Comparison pages** (Mr/UC/NoBroker/Safaiwale/Best-office): verifiable public facts only, “Not publicly listed” where unknown, affiliation disclosed in lead + tip, figures dated (Sep 2026).
- **Internal linking:** `RelatedGuides.jsx` (serviceKey → guides), `RelatedServices.jsx` (service mesh), blog CTA footer (3 money links), footer keyword links, `llms.txt` mirror for AI discovery.

## 🔍 SEO Operations

- **Keyword → page map:** `KEYWORD_TARGETING.md` (spend plan + coverage tables).
- **Audit log:** `SEO-AUDIT.md` (dated sections per change).
- **Backlinks:** `BACKLINKS.md` (NAP block, copy kit, tiered targets). Rule: never buy/automate links.
- **Indexing discipline:** `scripts/submit-indexing.cjs` ONLY for newly written or materially changed URLs (`--url …`); never mass `--reset` except after site-wide rebuilds (200/day project quota, shared with old-domain cron).
- **Pre-flight before every deploy:** `node scripts/preflight.mjs` — same-origin assets exist, internal links resolve, JSON-LD parses, no `@id` claimed by two types, canonical present, exactly one `<h1>`, FAQ schema parity, HowTo on every service page, noindex only on the allowlist, sitemap + llms.txt URLs all exist, zero third-party fetch hosts in the initial HTML.
- **Docs policy:** `.md` files are local-only (`*.md` gitignored) except `README.md`, which stays on GitHub. Secrets safety net in `.gitignore` (`*key.json`, `.env*`); the Indexing API key lives outside any git repo and is referenced by path only.

## 📞 Business Details

- **Company:** Sachin Deep Cleaning
- **Phone / WhatsApp:** +91 9560739281
- **Location:** Gurgaon, Haryana
- **Facebook:** [Sachin Deep Cleaning](https://www.facebook.com/profile.php?id=61577737535478)
- **Instagram:** [@cleaning_service_in_gurgaon](https://www.instagram.com/cleaning_service_in_gurgaon)
- **YouTube:** [@Cleaning_service_in_Gurgaon](https://www.youtube.com/@Cleaning_service_in_Gurgaon)
- **X:** [@sachindeepclean](https://x.com/sachindeepclean)
- **WhatsApp:** https://wa.me/919560739281

---

© Sachin Deep Cleaning. All rights reserved.
