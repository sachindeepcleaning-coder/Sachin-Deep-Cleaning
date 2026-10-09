// Generates public/sitemap.xml from pages.config.mjs with a fresh lastmod.
// Runs before `vite build` so the updated file is copied into dist/.
// thank-you.html is intentionally excluded (robots.txt disallows it, noindex).

import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, SITE_URL } from '../pages.config.mjs';
import { ARTICLES } from '../src/lib/blog.js';
import { CONTENT_UPDATED } from '../src/lib/site.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const today = new Date().toISOString().slice(0, 10);

// Pages excluded from the sitemap (noindex / utility pages + merge stubs).
const excluded = new Set(['thank-you', '404']);

const PRIORITY = {
  index: '1.0',
  residential: '0.9',
  service: '0.8',
  contact: '0.6',
  allpages: '0.5',
  blog: '0.6',
  article: '0.7',
};

const CHANGEFREQ = {
  index: 'weekly',
  article: 'yearly',
};

const entries = pages
  .filter((p) => !excluded.has(p.file) && p.file !== '404' && !p.redirectTo && !p.noindex)
  .map((p) => {
    const loc = p.file === 'index' ? `${SITE_URL}/` : `${SITE_URL}/${p.file}.html`;
    const priority = p.page === 'service' ? (p.serviceKey === 'deep' ? '0.9' : '0.8') : PRIORITY[p.page] || '0.5';
    // seo-sitemap: lastmod must reflect the real content change, not the build
    // date — articles carry their dateModified; service/utility pages use
    // CONTENT_UPDATED (src/lib/site.js), bumped only when prices/rating/address change.
    const art = p.page === 'article' ? ARTICLES.find((a) => a.file === p.file) : null;
    const lastmod = (art && art.dateModified) || CONTENT_UPDATED;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${CHANGEFREQ[p.page] || 'monthly'}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

const urls = entries.join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), xml);
console.log(`Generated public/sitemap.xml with ${entries.length} URLs (lastmod ${today}).`);
