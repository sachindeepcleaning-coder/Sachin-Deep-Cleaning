// Generates the redirect rules that collapse the duplicate render paths.
//
// THE PROBLEM: GitHub Pages serves BOTH /about and /about.html with HTTP 200
// and byte-identical content. The canonical tag points at /about.html, but
// with no redirect the clean path stays indexable and splits the page's
// signals.
//
// THE FIX: 301 the non-canonical path to the canonical one. GitHub Pages
// cannot send a 301 (it ignores netlify.toml and _redirects), so this becomes
// active the moment the site is moved to Netlify or Cloudflare Pages — which
// is also when the security headers in public/_headers start working.
//
// Both files are written:
//   public/_redirects  — Netlify + Cloudflare Pages
//   netlify.toml       — Netlify (processed BEFORE _redirects, so the greedy
//                        catch-all 404 there must not shadow these rules)

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages } from '../pages.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Every page whose canonical form is /page.html needs a rule from /page.
const rules = pages
  .filter((p) => p.file !== 'index' && !p.redirectTo)
  .map((p) => ({ from: `/${p.file}`, to: `/${p.file}.html` }));

// The homepage is served from / — /index.html is the duplicate.
const homeRule = { from: '/index.html', to: '/' };

const redirectsFile = [
  '# Canonical redirects — collapse the duplicate render paths.',
  '# GitHub Pages serves both /about and /about.html with HTTP 200; only one',
  '# of them can be canonical. These 301s send the non-canonical path to the',
  '# canonical one. Active on Netlify and Cloudflare Pages.',
  '',
  `${homeRule.from}  ${homeRule.to}  301`,
  ...rules.map((r) => `${r.from}  ${r.to}  301`),
  '',
].join('\n');

writeFileSync(resolve(root, 'public/_redirects'), redirectsFile);

// netlify.toml — keep the same rules so a Netlify deploy does not depend on
// _redirects being read (and so the catch-all 404 does not shadow them).
const netlify = `[build]
  command = "npm run build"
  publish = "dist"

# Canonical redirects — extensionless path -> the canonical .html path.
# GitHub Pages ignores this file; it activates when the site moves here.
${[homeRule, ...rules].map((r) => `[[redirects]]\n  from = "${r.from}"\n  to = "${r.to}"\n  status = 301`).join('\n\n')}

# Canonical: www -> apex
[[redirects]]
  from = "https://www.sachindeepcleaning.shop/*"
  to = "https://sachindeepcleaning.shop/:splat"
  status = 301
  force = true

# Enforce https (apex + www)
[[redirects]]
  from = "http://sachindeepcleaning.shop/*"
  to = "https://sachindeepcleaning.shop/:splat"
  status = 301
  force = true

[[redirects]]
  from = "http://www.sachindeepcleaning.shop/*"
  to = "https://sachindeepcleaning.shop/:splat"
  status = 301
  force = true

# Custom 404 (cache/security headers live in public/_headers)
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
`;

writeFileSync(resolve(root, 'netlify.toml'), netlify);

console.log(
  `Generated redirect rules for ${rules.length + 1} paths (public/_redirects + netlify.toml).`
);
