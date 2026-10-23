// Generates public/sitemap.xml + public/sitemap-videos.xml.
// Runs before `vite build` so the updated files are copied into dist/.
// thank-you.html is intentionally excluded (robots.txt disallows it, noindex).
//
// lastmod policy (seo-sitemap): never the build date.
//   - articles: the article's own dateModified, maintained in src/lib/blog.js
//     (per-article real content date).
//   - every other page: the last git commit date of the source file(s) that
//     define the page's content (`git log -1 --format=%cs -- <file>`), so a
//     page that did not change keeps its old lastmod instead of being bumped
//     by every deploy.

import { writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, SITE_URL } from '../pages.config.mjs';
import { ARTICLES } from '../src/lib/blog.js';
import { CONTENT_UPDATED } from '../src/lib/site.js';
import { VIDEOS, VIDEO_POSTER, VIDEO_UPLOAD_DATE } from '../src/lib/videos.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const today = new Date().toISOString().slice(0, 10);

// Source files whose last-commit date defines each page type's lastmod.
// Arrays are combined with max() — a content change in the data lib (e.g.
// services.js) is as much a page change as a change in the page component.
const PAGE_SOURCES = {
  index: ['src/pages/IndexPage.jsx', 'src/lib/landing.js'],
  service: ['src/pages/ServicePage.jsx', 'src/lib/services.js'],
  contact: ['src/pages/ContactPage.jsx'],
  about: ['src/pages/AboutPage.jsx'],
  residential: ['src/pages/ResidentialPage.jsx'],
  partners: ['src/pages/PartnersPage.jsx'],
  landing: ['src/pages/BookingPage.jsx'],
  allpages: ['src/pages/AllPagesPage.jsx'],
  blog: ['src/pages/BlogIndexPage.jsx'],
  facts: ['src/pages/FactsPage.jsx'],
};

const gitDateCache = new Map();
function gitDate(file) {
  if (gitDateCache.has(file)) return gitDateCache.get(file);
  let date = null;
  try {
    date =
      execSync(`git log -1 --format=%cs -- ${JSON.stringify(file)}`, {
        cwd: root,
        encoding: 'utf8',
      }).trim() || null;
  } catch {
    date = null;
  }
  gitDateCache.set(file, date);
  return date;
}

function lastmodFor(p) {
  if (p.lastmod) return p.lastmod;
  if (p.page === 'article') {
    const art = ARTICLES.find((a) => a.file === p.file);
    return (art && art.dateModified) || CONTENT_UPDATED;
  }
  const sources = PAGE_SOURCES[p.page];
  if (!sources) return CONTENT_UPDATED;
  const dates = sources.map(gitDate).filter(Boolean);
  return dates.length ? dates.sort().at(-1) : CONTENT_UPDATED;
}

// Pages excluded from the sitemap (noindex / utility pages + merge stubs).
const excluded = new Set(['thank-you', '404']);

const PRIORITY = {
  index: '1.0',
  services: '0.9',
  facts: '0.8',
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
    // Every service page is a money page. The 20 added 2026-10-22 target
    // queries the site already ranks 1-8 for, so they carry a service-level
    // priority rather than the default.
    const priority = p.page === 'service' ? (p.serviceKey === 'deep' ? '0.9' : '0.8') : PRIORITY[p.page] || '0.5';
    const lastmod = lastmodFor(p);
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

// ─── sitemap-videos.xml ─────────────────────────────────────────────────────
// The four reels are hosted MP4s whose URL is only assigned by JS after the
// carousel scrolls into view, so a crawler cannot discover them from the HTML.
// The video sitemap is the supported discovery path; each entry points at the
// homepage, where the carousel (and its VideoObject graph) is rendered.
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const videoEntries = VIDEOS.map((v) => `  <url>
    <loc>${SITE_URL}/</loc>
    <video:video>
      <video:thumbnail_loc>${SITE_URL}${VIDEO_POSTER}</video:thumbnail_loc>
      <video:title>${esc(v.name)}</video:title>
      <video:description>${esc(`${v.name} — real job footage from the Sachin Deep Cleaning team in Gurgaon.`)}</video:description>
      <video:content_loc>${SITE_URL}/videos/${v.file}</video:content_loc>
      <video:duration>${v.seconds}</video:duration>
      <video:publication_date>${VIDEO_UPLOAD_DATE}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:live_stream>no</video:live_stream>
    </video:video>
  </url>`).join('\n');

const videoXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videoEntries}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap-videos.xml'), videoXml);
console.log(`Generated public/sitemap-videos.xml with ${VIDEOS.length} videos.`);
