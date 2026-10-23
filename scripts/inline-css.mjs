// Inlines the built stylesheet into every generated HTML page.
//
// Why: the stylesheet was the only render-blocking request on the critical
// path. On a Slow-4G mobile connection one extra round trip (HTML -> CSS)
// cost ~150-200ms of FCP/LCP. The CSS is small (about 12 KiB gzipped), so
// inlining it removes the request entirely without changing a single style.
//
// The hashed CSS file is left on disk (harmless, and keeps /assets/* cache
// rules meaningful) — it is simply no longer referenced by any page.
//
// Runs AFTER scripts/prerender.mjs, because prerender rewrites the final
// HTML files.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist');
const assetsDir = resolve(distDir, 'assets');

function collectHtmlFiles(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) collectHtmlFiles(full, acc);
    else if (entry.isFile() && entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const cssFiles = readdirSync(assetsDir).filter((f) => f.endsWith('.css'));
if (cssFiles.length === 0) {
  console.error('inline-css: no CSS found in dist/assets/');
  process.exit(1);
}

const cssByName = new Map();
for (const f of cssFiles) {
  cssByName.set(`/assets/${f}`, readFileSync(resolve(assetsDir, f), 'utf8'));
}

const linkRe = /<link\s+rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>\s*/g;

let touched = 0;
let inlined = 0;
for (const path of collectHtmlFiles(distDir)) {
  let html = readFileSync(path, 'utf8');
  if (!html.includes('rel="stylesheet"')) continue;
  let changed = false;
  html = html.replace(linkRe, (match, href) => {
    const css = cssByName.get(href);
    if (!css) return match;
    changed = true;
    inlined++;
    return `<style data-inlined-css>${css}</style>\n`;
  });
  if (changed) {
    writeFileSync(path, html);
    touched++;
  }
}

console.log(
  `inline-css: inlined ${inlined} stylesheet link(s) across ${touched} page(s)`
);
