// Generates a distinct Open Graph price card for every service page.
//
// WHY: the site's primary share channel is WhatsApp (every CTA is a wa.me
// link). WhatsApp, Facebook, LinkedIn and X all render og:image as the link
// preview — and 43 of the service pages were sharing ONE generic cover
// image, so every shared service link looked identical and carried no price.
//
// Each card is 1200x630 (the OG/Twitter standard), rendered headlessly from
// the same data that drives the page, so the card can never show a price
// that is not the published rate.
//
// Run once and commit the output:
//   node scripts/gen-og-images.mjs
// The build only consumes the PNGs; it does not render them.

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { getService } from '../src/lib/services.js';
import { SERVICE_LINKS } from '../src/generated/service-links.js';
import { BRAND_NAME, PHONE, ADDRESS_FULL } from '../src/lib/site.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outDir = resolve(root, 'public/images/og');
const tmpDir = join(tmpdir(), 'sachin-og-cards');

mkdirSync(outDir, { recursive: true });
mkdirSync(tmpDir, { recursive: true });

const CHROME = ['google-chrome', 'chromium', 'chromium-browser'].find((c) => {
  try {
    execFileSync('which', [c], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
});
if (!CHROME) {
  console.error('gen-og-images: no chrome/chromium found — skipping.');
  process.exit(0);
}

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function cardHtml({ label, price, priceLabel, bullets }) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1200px; height: 630px; overflow: hidden;
         font-family: "DejaVu Sans", Arial, Helvetica, sans-serif;
         background: radial-gradient(1200px 630px at 88% -10%, #1b3a5c 0%, #0a1628 55%, #060d18 100%);
         color: #fff; position: relative; }
  .glow { position: absolute; right: -140px; bottom: -180px; width: 560px; height: 560px;
          border-radius: 50%; background: radial-gradient(circle, rgba(74,222,128,.30) 0%, rgba(74,222,128,0) 68%); }
  .wrap { position: relative; padding: 58px 62px; height: 100%; display: flex; flex-direction: column; }
  .brand { display: flex; align-items: center; gap: 12px; font-size: 25px; font-weight: 700;
           color: #9fd8ff; letter-spacing: .3px; }
  .dot { width: 13px; height: 13px; border-radius: 50%; background: #4ade80;
         box-shadow: 0 0 14px rgba(74,222,128,.9); }
  h1 { margin-top: 34px; font-size: 62px; line-height: 1.06; font-weight: 800; letter-spacing: -1.6px; max-width: 1000px; }
  .price { margin-top: 26px; display: flex; align-items: baseline; gap: 16px; }
  .amount { font-size: 76px; font-weight: 800; color: #4ade80; letter-spacing: -2px; line-height: 1; }
  .plabel { font-size: 27px; color: #a9bed4; }
  ul { margin-top: 28px; list-style: none; display: flex; flex-direction: column; gap: 11px; }
  li { font-size: 27px; color: #d7e4f0; display: flex; gap: 13px; align-items: flex-start; }
  li b { color: #4ade80; font-weight: 800; }
  .foot { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end;
          border-top: 2px solid rgba(255,255,255,.13); padding-top: 20px; }
  .phone { font-size: 30px; font-weight: 700; }
  .note { font-size: 20px; color: #8fa4be; text-align: right; max-width: 520px; }
</style></head>
<body>
  <div class="glow"></div>
  <div class="wrap">
    <div class="brand"><span class="dot"></span>${esc(BRAND_NAME)} · Gurgaon</div>
    <h1>${esc(label)}</h1>
    <div class="price"><span class="amount">${esc(price)}</span><span class="plabel">${esc(priceLabel)}</span></div>
    <ul>${bullets.map((b) => `<li><b>✓</b><span>${esc(b)}</span></li>`).join('')}</ul>
    <div class="foot">
      <div class="phone">📞 ${esc(PHONE)}</div>
      <div class="note">${esc(ADDRESS_FULL)}<br>Fixed price on the call · pay after walkthrough</div>
    </div>
  </div>
</body></html>`;
}

// The bullets are the first three "what is included" scope lines, cleaned up
// for a card (they are already short).
function bulletsFor(svc) {
  return (svc.includes || []).slice(0, 3).map((i) => String(i).split('\u2013')[0].trim());
}

const written = [];
const seen = new Set();

for (const link of SERVICE_LINKS) {
  if (link.key === 'residential' || link.key === 'partners' || link.key === 'landing') continue;
  let svc;
  try {
    svc = getService(link.key);
  } catch {
    continue;
  }
  if (!svc || !svc.price) continue;

  // One card per service, not per BHK variant — the price ladder is the same.
  const key = link.key;
  if (seen.has(key)) continue;
  seen.add(key);

  const price = svc.price.amount;
  const priceLabel = svc.price.label;
  const html = cardHtml({
    label: svc.name,
    price,
    priceLabel,
    bullets: bulletsFor(svc),
  });

  const htmlPath = resolve(tmpDir, `${key}.html`);
  const pngPath = resolve(outDir, `${key}.jpg`);
  writeFileSync(htmlPath, html);

  execFileSync(
    CHROME,
    [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--screenshot=${pngPath}`,
      '--window-size=1200,630',
      `file://${htmlPath}`,
    ],
    { stdio: 'ignore' }
  );

  if (existsSync(pngPath)) {
    written.push({ key, file: `images/og/${key}.jpg` });
  } else {
    console.error(`gen-og-images: FAILED to render ${key}`);
  }
}

// Cards for the money pages that are not `page: 'service'`.
for (const [key, label, price, priceLabel, bullets] of [
  ['services', 'All Cleaning Services in Gurgaon', '₹499', 'per visit, house cleaning',
    ['Full home deep clean ₹2,500–₹9,000', 'Kitchen ₹1,500 · Bathroom ₹800', 'Office from ₹3 per sq ft']],
  ['facts', 'Facts & Price List', '₹2,500', '1 BHK full home deep clean',
    ['Published rate card for every service', 'Areas covered across all Gurgaon sectors', 'Open 7 days · pay after walkthrough']],
  ['residential', 'Residential Cleaners Near Me, Gurgaon', '₹499', 'per visit',
    ['Same trusted team on every visit', 'Nearest crew for your sector', 'Pay only after the job is done']],
  ['society', 'Society & Bulk Cleaning in Gurgaon', '₹2,499', 'per tower cluster day',
    ['Gate-pass and lift-slot handling', 'GST invoice, per-zone tick sheet', 'Covering every Gurgaon sector since 2015']],
  ['bookcleaning', 'Book Cleaning Online in Gurgaon', '₹2,000', 'full home deep clean, from',
    ['No app — WhatsApp your BHK and society', 'Fixed price in 30 seconds', 'Same-day slots before noon']],
  ['about', 'About Sachin Deep Cleaning', 'Since 2015', 'Gurugram, Haryana',
    ['Police-verified, uniformed crew', 'Pay after the walkthrough', 'Serving every Gurgaon sector']],
  ['blog', 'Cleaning Guides for Gurgaon Homes', '85', 'in-depth guides',
    ['Real prices, real durations, real exclusions', 'Written for Gurgaon conditions', 'No "call for price" dead ends']],
  ['about', 'About Sachin Deep Cleaning, Gurgaon', 'Since 2015', 'Gurugram, Haryana',
    ['Police-verified, uniformed crew', 'Pay after the walkthrough', 'Serving every Gurgaon sector']],
  ['contact', 'Book Deep Cleaning in Gurgaon', '₹2,000', 'full home deep clean, from',
    ['Same-day slots when you book before noon', 'Fixed price confirmed on the call', 'Pay after the walkthrough']],
  ['home', 'Deep Cleaning in Gurgaon', '₹2,000', 'full home deep clean, from',
    ['1 BHK ₹2,500 · 2 BHK ₹4,500 · 3 BHK ₹5,500', 'Kitchen ₹1,500 · Bathroom ₹800', 'Police-verified crew · pay after walkthrough']],
]) {
  const htmlPath = resolve(tmpDir, `${key}.html`);
  const pngPath = resolve(outDir, `${key}.jpg`);
  writeFileSync(htmlPath, cardHtml({ label, price, priceLabel, bullets }));
  execFileSync(
    CHROME,
    [
      '--headless', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--screenshot=${pngPath}`,
      '--window-size=1200,630',
      `file://${htmlPath}`,
    ],
    { stdio: 'ignore' }
  );
  if (existsSync(pngPath)) written.push({ key, file: `images/og/${key}.jpg` });
}

// Emit the manifest the build reads.
writeFileSync(
  resolve(outDir, 'manifest.json'),
  `${JSON.stringify(Object.fromEntries(written.map((w) => [w.key, w.file])), null, 2)}\n`
);

console.log(`gen-og-images: ${written.length} price cards written to public/images/og/`);
