// Generates the GEO assets that AI crawlers read:
//
//   public/llms.txt       — the compact site map (title + one-line summary
//                           per URL). Hand-maintained before; now generated so
//                           it can never drift from pages.config.mjs.
//   public/llms-full.txt  — the extended version: every page's full answer
//                           lead, FAQ questions and price line, so an answer
//                           engine can lift a citable chunk without fetching
//                           100+ pages.
//   public/sitemap-images.xml — the image sitemap, regenerated from the real
//                           hero assets instead of being hand-listed.
//
// Runs before `vite build` so the files are copied into dist/.

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, SITE_URL } from '../pages.config.mjs';
import { ARTICLES } from '../src/lib/blog.js';
import { CONTENT_UPDATED, RATING, PHONE, ADDRESS_FULL } from '../src/lib/site.js';
import { getService } from '../src/lib/services.js';
import { imageDims } from '../src/lib/image-dims.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const excluded = new Set(['thank-you', '404']);
const indexable = pages.filter(
  (p) => !excluded.has(p.file) && p.file !== '404' && !p.redirectTo && !p.noindex
);

const urlFor = (p) => (p.file === 'index' ? `${SITE_URL}/` : `${SITE_URL}/${p.file}.html`);

// ─── llms.txt ───────────────────────────────────────────────────────────────
const header = [
  '# Sachin Deep Cleaning',
  '> Professional deep cleaning in Gurgaon since 2015 — pay after satisfaction. Verified pros, fixed prices, same-day slots.',
  `> Last-Updated: ${CONTENT_UPDATED}`,
  `> Contact: ${PHONE}`,
  `> Address: ${ADDRESS_FULL}`,
  `> Google rating: ${RATING.value} from ${RATING.count} reviews (Google Business Profile, checked ${RATING.asOf})`,
  '> Prices: 1BHK 2500/2BHK 4500/3BHK 5500',
  `> Sitemap: ${SITE_URL}/sitemap.xml`,
  '',
].join('\n');

const llmsLines = indexable.map((p) => {
  const art = p.page === 'article' ? ARTICLES.find((a) => a.file === p.file) : null;
  // Label for humans: the first clause of the title, before the pipe.
  const label = p.title.split('|')[0].trim().replace(/ —.*$/, '');
  const desc = art ? art.description : p.description;
  return `- [${label}](${urlFor(p)}): ${p.title} — ${desc}`;
});

writeFileSync(
  resolve(root, 'public/llms.txt'),
  `${header}${llmsLines.join('\n')}\n`
);

// ─── llms-full.txt ──────────────────────────────────────────────────────────
// The extended map. Each entry carries the answer-first lead, the price line
// and the FAQ questions — the three things an answer engine quotes.
const fullBlocks = [];

for (const p of indexable) {
  const loc = urlFor(p);
  const art = p.page === 'article' ? ARTICLES.find((a) => a.file === p.file) : null;

  let lead = p.description;
  let faqs = [];
  let price = '';

  if (art) {
    lead = art.lead || art.description;
    faqs = (art.faqs || []).map((f) => f.q);
  } else if (p.page === 'service') {
    try {
      const svc = getService(p.serviceKey, p.bhk);
      if (svc) {
        lead = svc.intro.replace(/\*\*/g, '').replace(/\[[^\]]+\]\([^)]+\)/g, '$1');
        faqs = (svc.faqs || []).map((f) => f.q);
        if (svc.price && svc.price.amount && svc.price.amount !== 'request') {
          price = svc.price.amount;
        }
      }
    } catch {}
  }

  fullBlocks.push(
    [
      `## ${p.title}`,
      `URL: ${loc}`,
      price ? `Price: ${price}` : null,
      `Summary: ${lead}`,
      faqs.length ? `Questions answered:\n${faqs.map((q) => `- ${q}`).join('\n')}` : null,
      '',
    ]
      .filter((x) => x !== null)
      .join('\n')
  );
}

writeFileSync(
  resolve(root, 'public/llms-full.txt'),
  `${header}\n# Full text map — every page's answer, price and FAQ questions\n\n${fullBlocks.join('\n')}`
);

// ─── sitemap-images.xml ─────────────────────────────────────────────────────
// Rebuilt from the real hero assets so the image locs always exist.
const imageEntries = [];

for (const p of indexable) {
  const loc = urlFor(p);
  const art = p.page === 'article' ? ARTICLES.find((a) => a.file === p.file) : null;
  let img = null;
  let title = p.title;
  let caption = p.description;

  if (art && art.image) {
    img = art.image;
    title = art.title;
    caption = art.imageAlt || art.description;
  } else if (p.page === 'service') {
    try {
      const svc = getService(p.serviceKey, p.bhk);
      if (svc && svc.image) {
        img = svc.image;
        title = svc.name;
        caption = svc.imageAlt || p.description;
      }
    } catch {}
  }

  if (!img) continue;

  const [w, h] = imageDims(img);
  imageEntries.push(
    `  <url>
    <loc>${loc}</loc>
    <image:image>
      <image:loc>${SITE_URL}${img}</image:loc>
      <image:title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
      <image:caption>${caption.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:caption>
    </image:image>
  </url>`
  );
}

const imageXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries.join('\n')}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap-images.xml'), imageXml);

console.log(
  `Generated llms.txt (${llmsLines.length} entries), llms-full.txt (${fullBlocks.length} entries), sitemap-images.xml (${imageEntries.length} images).`
);
