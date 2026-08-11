# Sachin Deep Cleaning — Website

A modern, mobile-friendly marketing site for **Sachin Deep Cleaning**, a home deep cleaning service in Gurgaon, Haryana. Built with **Vite + React 18 (MPA)**.

- **Live URL:** https://sachindeepcleaning.shop (custom domain via CNAME)
- **Repo:** `sachindeepcleaning-coder/Sachin-Deep-Cleaning` (GitHub)
- **Hosting:** GitHub Pages (deploys from the **`gh-pages`** branch)

---

## 🚀 DEPLOY TO GITHUB PAGES — READ THIS FIRST

### How the site deploys (IMPORTANT)

- This is a **Vite + React 18 MPA**. Source code lives on the **`main`** branch.
- GitHub Pages is configured to serve from the **`gh-pages` branch** (built output), **NOT** `main`.
- **Pushing to `main` alone does NOT update the live site.** You must build and push the fresh `dist/` to `gh-pages`.
- There is **no GitHub Actions workflow**. Auto-deploy was attempted once and skipped (the local `gh` token lacks the `workflow` scope, so pushing `.github/workflows/` files is rejected). Do not re-add a workflow unless the token has `workflow` scope, and remember to switch the Pages source back to `workflow` in that case.
- The `gh-pages` branch contains only build output + deploy files (`CNAME`, `robots.txt`, `.nojekyll`, `dist/` contents).

### Full deploy steps

```bash
# 1. Build (regenerate entry shells first if pages.config.mjs changed)
npm run gen
npm run build                     # = sitemap gen + vite build + prerender → dist/

# 2. Clone the gh-pages branch into a scratch dir
rm -rf /tmp/opencode/ghp
git clone -b gh-pages --single-branch . /tmp/opencode/ghp

# 3. Replace contents with the fresh build
rm -rf /tmp/opencode/ghp/*
touch /tmp/opencode/ghp/.nojekyll
cp -r dist/* /tmp/opencode/ghp/

# 4. Restore deploy-only files that vite does NOT emit (.nojekyll only — CNAME & robots.txt are now in public/ and copied by vite)
cd /tmp/opencode/ghp
git checkout origin/gh-pages -- .nojekyll

# 5. Commit + push to the REAL remote
#    (the clone's origin points to the local repo — fix it first!)
git remote set-url origin https://github.com/sachindeepcleaning-coder/Sachin-Deep-Cleaning
git add -A
git config user.name "vegeta" && git config user.email "vegeta@localhost"   # if not inherited
git commit -m "Deploy fresh build"
git push --force origin gh-pages     # force push is fine: gh-pages is a deploy branch
```

### Gotchas

- The local `gh-pages` branch may lag behind `origin/gh-pages`. Always clone fresh (step 2) instead of reusing the local branch.
- `git clone ... .` (step 2) sets the clone's `origin` to the local repo path — **fix the remote URL (step 5)** before pushing, or you'll push nowhere.
- If the push is rejected with "tip behind", you cloned from a stale local branch → `git push --force` after confirming the working tree has the full build (all `*.html`, `assets/`, `videos/`, `sitemap.xml`, `CNAME`, `robots.txt`, `.nojekyll`).
- Verify live: `curl -sI https://sachindeepcleaning.shop/<page>.html` → expect `HTTP/2 200`.

### Just push source (no deploy)

```bash
git add -A && git commit -m "message" && git push origin main
```

This only updates source. The live site is unchanged until you also do the `gh-pages` deploy above.

---

## 🧱 Tech Stack & Structure

| File/Dir | Purpose |
|----------|---------|
| `pages.config.mjs` | Single source of truth for every MPA page (file, page type, title, description) |
| `scripts/gen-entries.mjs` | Generates HTML entry shells from `pages.config.mjs` (run `npm run gen` after editing it) |
| `scripts/gen-sitemap.mjs` | Regenerates `public/sitemap.xml` with fresh `lastmod` (runs automatically on `npm run build`) |
| `scripts/prerender.mjs` | Renders every page to static HTML with `ReactDOMServer` and injects it into `dist/` (SEO: Google/Bing see content + JSON-LD without JS) |
| `src/app.jsx` | Shared app tree used by both the browser entry and the prerender script |
| `src/prerender-entry.jsx` | SSR entry (`renderToString`) for `scripts/prerender.mjs` |
| `src/bootstrap.jsx` | Hydrates the pre-rendered HTML (or renders normally in dev) based on `data-page` |
| `src/pages/*.jsx` | Page components (ServicePage, ResidentialPage, AllPagesPage, ContactPage, ...) |
| `src/components/*.jsx` | Nav, Footer, Hero, QuoteForm, FaqSection, ReviewsSection, ReelSection, ... |
| `src/lib/services.js` | Service data (name, tagline, includes, process, faqs, price) |
| `src/lib/site.js` | Phone, WhatsApp, social links, URLs |
| `src/lib/schema.jsx` | JSON-LD builders (localBusiness, service, faq, breadcrumb) |
| `src/styles/global.css` | Global styles / design tokens |
| `public/sitemap.xml` | SEO sitemap (remember to add new pages here) |
| `public/robots.txt` | Crawler rules (must be restored in gh-pages deploy) |
| `public/CNAME` | Custom domain `sachindeepcleaning.shop` (must be restored in gh-pages deploy) |

## 🔧 Development

```bash
npm install
npm run dev        # local dev server http://localhost:5173
npm run build      # production build → dist/
npm run gen        # regenerate HTML entry shells after editing pages.config.mjs
```

## ⚙️ Config

- **Build:** `npm run build` (vite). No Tailwind here.
- **Leads:** Netlify Forms (`lead-quote`) + `FORMSPREE_ID = 'xdaqkbwa'` fallback via `QuoteForm.jsx`; redirect to `thank-you.html`.
- **Reels:** office page uses portrait 9:16 Instagram iframes (`OfficeReelSection.jsx`); other pages use local mp4s (`ReelSection.jsx`).

## 📞 Business Details

- **Company:** Sachin Deep Cleaning
- **Phone / WhatsApp:** +91 9267905943
- **Location:** Gurgaon, Haryana
- **Facebook:** https://www.facebook.com/profile.php?id=61577737535478
- **Instagram:** https://www.instagram.com/cleaning_service_in_gurgaon
- **WhatsApp:** https://wa.me/919267905943

---

© Sachin Deep Cleaning. All rights reserved.
