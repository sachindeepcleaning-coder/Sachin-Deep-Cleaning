# Sachin Deep Cleaning — Website

A modern, mobile-friendly marketing site for **Sachin Deep Cleaning**, a home deep cleaning service in Gurgaon, Haryana. Built with **Vite + React 18 (MPA)**.

- **Live URL:** https://sachindeepcleaning.shop (custom domain via CNAME)
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
