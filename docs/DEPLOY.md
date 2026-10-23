# Deployment & hosting — how the site ships, and what the host does not do

## Current hosting (verified 2026-10-23)

| Fact | Value | Evidence |
|---|---|---|
| Domain | sachindeepcleaning.shop | `CNAME` file at repo root |
| Host | GitHub Pages (project site, `gh-pages` branch) | DNS resolves to 185.199.108–111.153 — GitHub's Pages IPs, no CDN in front |
| Deploy method | manual: `./scripts/sync-gh-pages.sh` | no `.github/workflows/` directory exists |
| Source branch | `main` (source only — no build artefacts) | repo convention, enforced by the sync script |
| Published branch | `gh-pages` (a snapshot of the latest `dist/`) | sync script force-updates it from a fresh clone |
| Live freshness check | `curl -sI https://sachindeepcleaning.shop/ \| grep -i last-modified` | should be within minutes of the last sync |

Deploy procedure: run `./scripts/sync-gh-pages.sh` from a clean `main`. It
regenerates, builds, clones `gh-pages` fresh into a scratch dir, replaces its
contents with `dist/`, commits and force-pushes.

## What GitHub Pages does NOT serve (and cannot)

`public/_headers` (Netlify format) is **ignored** by GitHub Pages. Concretely,
the live site today sends:

- no `Strict-Transport-Security` (HSTS)
- no `Content-Security-Policy`
- no `X-Frame-Options` / `X-Content-Type-Options` / `Referrer-Policy` / `Permissions-Policy`
- `cache-control: max-age=600` on **everything** (GitHub's hardcoded value) —
  the single biggest remaining PageSpeed "cache lifetimes" item

There is nothing to fix in the repo for these; they require a host that serves
response headers. Two options:

1. **Front GitHub Pages with Cloudflare (free plan, no origin change).**
   Point the domain's nameservers at Cloudflare, proxy the record, then
   reproduce `public/_headers` as Cloudflare **Cache Rules** (the exact rules
   are documented in the comment inside `public/_headers`):
   - `/assets/*` and `/fonts/*` → Browser TTL 1 year, Edge TTL 1 year (hashed
     filenames, so immutable is safe)
   - `/images/*` → Browser/Edge TTL 30 days
   - `/*.html` and `/` → Browser/Edge TTL 10 minutes (fast deploys)
   HSTS and the CSP can then be added as a Cloudflare **Response Header
   Transform Rule**; the CSP value is in `public/_headers` (its `connect-src`
   and `form-action` hosts are load-bearing — see the NOTE there).
2. **Move hosting to Netlify or Cloudflare Pages.** `netlify.toml` (redirects +
   headers) is already in the repo; `public/_headers` covers Cloudflare Pages.
   Either platform reads those files natively and serves the headers as-is.

## If the live site looks like an older build

Checked in this order:

1. **Did the sync run?** `git log origin/gh-pages -1` — its message is the
   sync script's banner ("Deploy fresh build: …"). If `main` is ahead of
   `gh-pages`, the sync was not run (or failed on a dirty tree — it refuses to
   run with uncommitted changes).
2. **GitHub Pages build pending.** After a force-push, Pages rebuilds async
   (usually 1–3 min). Check the commit status on the `gh-pages` branch or just
   wait and hard-refresh.
3. **CDN/browser cache.** GitHub's Fastly edge honours `max-age=600`; a page
   fetched up to 10 minutes ago is served from cache. `curl -sI` shows `age:`
   — anything above 0 is cached at the edge. Hard-refresh or wait out the TTL.
4. **Wrong branch published.** In GitHub → Settings → Pages, the source must be
   the `gh-pages` branch (root). If it points at `main` or `/docs`, the site
   serves something else entirely.

The cache cannot be purged from the repo — a deploy simply has to wait out the
600-second TTL (or the CDN must be purged from the CDN's own dashboard once
Cloudflare is in front).
