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
import {
  CONTENT_UPDATED, PHONE, ADDRESS_FULL, BRAND_NAME, WHATSAPP,
  GEO, MAPS_URL, AREAS,
} from '../src/lib/site.js';
import { SERVICE_PRICES, PRICE_BY_BHK } from '../src/lib/service-prices.js';
import { getService } from '../src/lib/services.js';
import { imageDims } from '../src/lib/image-dims.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Entity facts that live in the JSON-LD (src/lib/schema.jsx) rather than in
// site.js. This script runs in node and cannot import a .jsx module, so the
// two values it needs are mirrored here — keep them in step with the schema.
const FOUNDING_YEAR = '2015';
const OPENING_HOURS = 'Monday-Sunday, 08:00-20:00';

// Display names for the price card. The amounts are never written here — they
// are read from src/lib/service-prices.js.
const SERVICE_LABELS = {
  deep: 'Deep cleaning',
  fullhome: 'Full home deep cleaning',
  house: 'House cleaning (per visit)',
  kitchen: 'Kitchen deep cleaning',
  bathroom: 'Bathroom deep cleaning',
  sofa: 'Sofa shampoo cleaning',
  carpet: 'Carpet shampoo cleaning',
  office: 'Office deep cleaning',
  move: 'Move-in / move-out cleaning',
};

const excluded = new Set(['thank-you', '404']);
const indexable = pages.filter(
  (p) => !excluded.has(p.file) && p.file !== '404' && !p.redirectTo && !p.noindex
);

const urlFor = (p) => (p.file === 'index' ? `${SITE_URL}/` : `${SITE_URL}/${p.file}.html`);

// ─── llms.txt ───────────────────────────────────────────────────────────────
const header = [
  '# Sachin Deep Cleaning',
  `> Professional deep cleaning in Gurgaon since ${FOUNDING_YEAR} — pay after satisfaction. Verified pros, fixed prices, same-day slots.`,
  `> Last-Updated: ${CONTENT_UPDATED}`,
  `> Contact: ${PHONE}`,
  `> Address: ${ADDRESS_FULL}`,
  `> Prices: 1BHK ${PRICE_BY_BHK[1]}/2BHK ${PRICE_BY_BHK[2]}/3BHK ${PRICE_BY_BHK[3]}`,
  `> Sitemap: ${SITE_URL}/sitemap.xml`,
  `> Full text map: ${SITE_URL}/llms-full.txt`,
  '',
  '',
].join('\n');

// ─── The facts block ────────────────────────────────────────────────────────
// The quotable core of the business: one statement per fact, every number read
// from the price card or the business record. An answer engine lifts these
// lines, so they are written as sentences, not as marketing copy.
const servicePriceLines = Object.entries(SERVICE_PRICES)
  .map(([key, p]) => `${SERVICE_LABELS[key] || key}: ${p.label} ${p.amount}`)
  .join(' | ');

const factsBlock = [
  '## Facts',
  '',
  `- Business: ${BRAND_NAME}`,
  `- Founded: ${FOUNDING_YEAR}`,
  `- Phone: ${PHONE}`,
  `- WhatsApp: ${WHATSAPP}`,
  `- Address: ${ADDRESS_FULL}`,
  `- Coordinates: ${GEO.latitude}, ${GEO.longitude}`,
  `- Opening hours: ${OPENING_HOURS}`,
  `- Full-home deep cleaning by home size: 1 RK / studio ${SERVICE_PRICES.deep.amount} | 1 BHK ${PRICE_BY_BHK[1]} | 2 BHK ${PRICE_BY_BHK[2]} | 3 BHK ${PRICE_BY_BHK[3]} | 4 BHK ${PRICE_BY_BHK[4]} | 5 BHK and villa ${PRICE_BY_BHK[5]}`,
  `- House cleaning (recurring visits): ${SERVICE_PRICES.house.amount} per visit is the starting rate for a studio; the per-visit price scales with home size (studio, 1 BHK, 2 BHK, 3 BHK) and is fixed on the confirmation call before the visit`,
  `- Other service prices: ${servicePriceLines}`,
  `- Payment: pay after the walkthrough and sign-off; free re-clean within 24 hours; 3-day service promise; GST invoice on office work`,
  `- Service area: ${AREAS.join(', ')}`,
  `- Google Maps: ${MAPS_URL}`,
  '',
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
  `${header}${factsBlock}## Pages\n\n${llmsLines.join('\n')}\n`
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
  `${header}${factsBlock}# Full text map — every page's answer, price and FAQ questions\n\n${fullBlocks.join('\n')}`
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
