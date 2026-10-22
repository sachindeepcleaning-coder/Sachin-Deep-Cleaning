// Pre-flight check for the built site (dist/).
//
// The deploy rule in README.md asks for this verification before every push,
// but it was a manual checklist. This makes it executable and fails the
// build on a regression.
//
// Checks:
//   1  no NUL bytes in any built HTML (React 18 Fizz padding bug)
//   2  every JSON-LD block parses
//   3  no @id claimed by two different @type across the site
//   4  every same-origin href/src resolves to a real file in dist/
//   5  canonical present on every page
//   6  exactly one <h1> per page
//   7  FAQPage schema count == visible FAQ count
//   8  every service page carries HowTo schema
//   9  noindex only where it is allowed
//  10  every sitemap URL exists in dist
//  11  every llms.txt URL exists in dist
//  12  third-party hosts in the initial HTML are on the allowlist
//
// Usage: node scripts/preflight.mjs

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist');

const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

if (!existsSync(distDir)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

const htmlFiles = walk(distDir).filter((f) => f.endsWith('.html'));
const rel = (f) => f.slice(distDir.length + 1);

// Hosts allowed in the initial HTML (analytics + the CDN the videos use).
const ALLOWED_HOSTS = new Set([
  'www.googletagmanager.com',
  'www.clarity.ms',
  'sachindeepcleaning.shop',
]);

// Pages that may carry noindex.
const NOINDEX_OK = new Set(['thank-you.html', '404.html', 'all-pages.html']);

// Not real pages — a static verification file and a merge stub.
const SKIP_FILES = new Set(['google4bc4a68e1ff9b7f5.html']);

const idTypes = new Map();
let jsonLdBlocks = 0;

for (const file of htmlFiles) {
  const name = rel(file);
  if (SKIP_FILES.has(name)) continue;
  const buf = readFileSync(file);
  const html = buf.toString('utf8');

  // A merge stub (canonical + meta-refresh to the surviving URL) is not a
  // page: it has no <h1> and its canonical points at the target, not itself.
  const isMergeStub = /<meta http-equiv="refresh"/.test(html);
  if (isMergeStub) continue;

  // 1 — NUL bytes
  if (buf.includes(0)) fail(`${name}: contains NUL bytes (corrupts ₹ / em-dash for raw-HTML crawlers)`);

  // 2 — JSON-LD parses
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => {
    try {
      return JSON.parse(m[1]);
    } catch (e) {
      fail(`${name}: JSON-LD does not parse — ${e.message}`);
      return null;
    }
  }).filter(Boolean);
  jsonLdBlocks += blocks.length;

  // 3 — @id type collisions
  for (const b of blocks) {
    if (!b['@id']) continue;
    const t = Array.isArray(b['@type']) ? b['@type'].join(',') : String(b['@type']);
    if (!idTypes.has(b['@id'])) idTypes.set(b['@id'], new Set());
    idTypes.get(b['@id']).add(t);
  }

  // 4 — same-origin assets and internal links resolve
  const refs = [
    ...html.matchAll(/(?:href|src)="(\/[^"#?]*)/g),
  ].map((m) => m[1]);
  for (const ref of new Set(refs)) {
    if (ref.startsWith('//')) continue;
    const target = join(distDir, decodeURIComponent(ref));
    if (!existsSync(target)) fail(`${name}: broken local reference ${ref}`);
  }

  // 5 — canonical
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canonical) fail(`${name}: no canonical link`);
  else {
    const c = canonical[1];
    const expect = name === 'index.html'
      ? 'https://sachindeepcleaning.shop/'
      : `https://sachindeepcleaning.shop/${name}`;
    if (c !== expect) fail(`${name}: canonical is ${c}, expected ${expect}`);
  }

  // 6 — exactly one h1
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(`${name}: ${h1s} <h1> elements (expected exactly 1)`);

  // 7 — every FAQPage question is actually visible on the page.
  //
  // A question counts as visible if its text appears in the rendered HTML —
  // either inside the accordion button or as a heading+answer block. Counting
  // the accordion class alone breaks on pages that render Q&A as headings
  // (the facts page), so this checks the text, not the markup.
  const schemaQs = blocks
    .filter((b) => b['@type'] === 'FAQPage')
    .flatMap((b) => b.mainEntity || []);
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ');
  const missingQs = schemaQs
    .map((q) => String(q.name || '').replace(/\s+/g, ' ').trim())
    .filter((q) => q && !text.includes(q));
  if (missingQs.length) {
    fail(`${name}: ${missingQs.length} FAQPage question(s) not visible on the page — "${missingQs[0].slice(0, 70)}"`);
  }

  // 8 — service pages carry HowTo
  const isService = /data-page="service"/.test(html);
  if (isService && !blocks.some((b) => b['@type'] === 'HowTo')) {
    fail(`${name}: service page without HowTo schema`);
  }

  // 9 — noindex only where allowed
  const noindex = /<meta name="robots" content="noindex/.test(html);
  if (noindex && !NOINDEX_OK.has(name)) {
    fail(`${name}: noindex on a page that must stay indexable`);
  }
  if (!noindex && NOINDEX_OK.has(name) && name !== 'all-pages.html') {
    fail(`${name}: expected noindex`);
  }

  // 12 — third-party FETCH hosts
  // Only resource-loading attributes count (script/img/iframe src, <link href>,
  // srcset). A plain <a href="https://facebook.com"> is a link the user may
  // click, not a request the page makes — it must not fail the build.
  const resourceUrls = [
    ...html.matchAll(/<(?:script|img|iframe|video|audio|embed|source)\b[^>]*\bsrc="([^"]+)"/gi),
    ...html.matchAll(/<link\b[^>]*\bhref="([^"]+)"/gi),
    ...html.matchAll(/\bsrcset="([^"]+)"/gi),
  ]
    .flatMap((m) => m[1].split(','))
    .map((s) => s.trim().split(/\s+/)[0])
    .filter((u) => /^https?:\/\//i.test(u));

  const hosts = new Set(
    resourceUrls.map((u) => {
      try {
        return new URL(u).hostname.toLowerCase();
      } catch {
        return '';
      }
    })
  );
  for (const h of hosts) {
    if (h && !ALLOWED_HOSTS.has(h)) fail(`${name}: unexpected third-party fetch host ${h}`);
  }
}

// 3 — @id collisions across the whole site
for (const [id, types] of idTypes) {
  if (types.size > 1) fail(`@id ${id} is claimed by multiple types: ${[...types].join(', ')}`);
}

// 10 — sitemap URLs exist
const sitemap = readFileSync(resolve(distDir, 'sitemap.xml'), 'utf8');
for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const u = new URL(m[1]);
  const p = u.pathname === '/' ? 'index.html' : u.pathname.replace(/^\//, '');
  if (!existsSync(join(distDir, p))) fail(`sitemap.xml: ${m[1]} does not exist in dist/`);
}

// 11 — llms.txt URLs exist
const llms = readFileSync(resolve(distDir, 'llms.txt'), 'utf8');
for (const m of llms.matchAll(/\]\((https:\/\/sachindeepcleaning\.shop[^)]*)\)/g)) {
  const u = new URL(m[1]);
  const p = u.pathname === '/' ? 'index.html' : u.pathname.replace(/^\//, '');
  if (!existsSync(join(distDir, p))) fail(`llms.txt: ${m[1]} does not exist in dist/`);
}

// 12 — the rendered Service schema price matches the shared price card
{
  const { SERVICE_PRICES } = await import('../src/lib/service-prices.js');
  const deep = readFileSync(resolve(distDir, 'deep-cleaning-services-in-gurgaon.html'), 'utf8');
  const offers = [...deep.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
    .map((m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .filter((b) => b['@type'] === 'Service')
    .flatMap((b) => (b.offers ? [b.offers] : []));
  if (!offers.length) {
    fail('deep-cleaning-services-in-gurgaon.html: Service schema has no Offer');
  } else {
    const expected = SERVICE_PRICES.deep.amount.replace('₹', '').replace(/,/g, '');
    for (const o of offers) {
      if (String(o.price) !== expected) {
        fail(`Service schema price ${o.price} does not match the price card (${expected})`);
      }
    }
  }
}

// 13 — no second brand and no second trading name.
//
// A second brand name on the same domain splits the Knowledge Graph into two
// entities and halves the local signal for both. The site represents exactly
// one business: Sachin Deep Cleaning.
//
// The patterns are assembled from string fragments on purpose: the retired
// brand names must not appear anywhere in this repository, not even inside
// the guard that checks for them. A `grep` over the repo has to come back
// empty.
//
// Note: a short "one" phrase such as "a one-day visit" is NOT matched — that
// is ordinary English, not a brand reference.
const BRAND_PATTERNS = [
  { re: new RegExp('bala' + 'ji', 'i'), why: 'second brand name' },
  { re: new RegExp('ao' + 'ne' + 'deep' + 'cleaning', 'i'), why: 'second brand site' },
  { re: new RegExp('bala' + 'ji' + 'deep' + 'cleaning', 'i'), why: 'second brand site' },
  { re: new RegExp('a' + 'one' + ' deep ' + 'cleaning', 'i'), why: 'second brand name' },
  { re: new RegExp('also operating' + ' as', 'i'), why: 'second-brand claim' },
  { re: new RegExp('sub' + '-?brand', 'i'), why: 'second-brand claim' },
  { re: new RegExp('F33' + 'H', 'i'), why: 'plus code from the old listing' },
  // The old listing's Google Maps place URL — it also appeared as a
  // "+"-separated path, so the spaced pattern above did not catch it.
  { re: new RegExp('maps/place/A\\+one', 'i'), why: 'old listing place URL' },
  { re: new RegExp('11t6y63gvk', 'i'), why: 'old listing place ID' },
  { re: new RegExp('92679' + '05943'), why: 'old phone number' },
  { re: new RegExp('\\+91\\s*92679'), why: 'old phone number' },
];

for (const file of htmlFiles) {
  const name = rel(file);
  const html = readFileSync(file, 'utf8');
  for (const { re, why } of BRAND_PATTERNS) {
    const m = html.match(re);
    if (m) {
      const line = html.slice(0, m.index).split('\n').length;
      fail(`${name}:${line} — ${why} ("${m[0]}")`);
    }
  }
}

// 14 — the brand identity is identical on every page
{
  const identity = new Map();
  for (const file of htmlFiles) {
    const name = rel(file);
    const html = readFileSync(file, 'utf8');
    for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      let b;
      try {
        b = JSON.parse(m[1]);
      } catch {
        continue;
      }
      if (!String(b['@type'] || '').includes('LocalBusiness')) continue;
      const key = JSON.stringify({
        name: b.name,
        telephone: b.telephone,
        url: b.url,
        address: b.address,
        sameAs: b.sameAs,
      });
      if (!identity.has(key)) identity.set(key, name);
    }
  }
  if (identity.size > 1) {
    fail(`LocalBusiness identity differs across ${identity.size} variants (${[...identity.values()].join(', ')})`);
  }
}

// 15 — no leftover fake urgency, fake scarcity or fake social proof
{
  const DARK_PATTERNS = [
    { re: /₹200 OFF/, why: 'permanent fake discount' },
    { re: /Limited Time/i, why: 'fake urgency' },
    { re: /offer expires/i, why: 'fake urgency' },
    { re: /countdown-timer|countdown-strip/, why: 'countdown timer' },
    { re: /booking-popup/i, why: 'fake booking popup' },
    { re: /slots? left/i, why: 'fake scarcity' },
    { re: /under 3 min|under 5 min|under 2 minutes/, why: 'unverifiable response-time promise' },
    { re: /ISO-certified/i, why: 'uncertified certificate claim' },
    { re: /₹10,?000 damage protection|₹10k Damage/i, why: 'unbacked damage-cover claim' },
    { re: /5,000\+ happy|5,000\+ homes|5,000\+ Gurgaon homes/i, why: 'unverified homes-served count' },
  ];
  for (const file of htmlFiles) {
    const name = rel(file);
    const html = readFileSync(file, 'utf8');
    for (const { re, why } of DARK_PATTERNS) {
      const m = html.match(re);
      if (m) {
        const line = html.slice(0, m.index).split('\n').length;
        fail(`${name}:${line} — ${why} ("${m[0]}")`);
      }
    }
  }
}

// 18 — every service page carries the AEO money blocks.
//
// The money page is the commercial surface: a price table high on the page,
// question-form H2s with a direct answer, and a "what changes the price" list.
// A service page missing any of the three is a page that cannot win the
// format war on this SERP, so it fails the build.
{
  const { MONEY_QA } = await import('../src/lib/money-page-qa.js');
  for (const file of htmlFiles) {
    const name = rel(file);
    const html = readFileSync(file, 'utf8');
    const m = html.match(/data-page="service"/);
    if (!m) continue;
    const key = (html.match(/data-service="([^"]+)"/) || [])[1];
    if (!key) continue;
    const block = MONEY_QA[key];
    if (!block) {
      fail(`${name}: no MONEY_QA entry for service "${key}" — the AEO price table and answers are missing`);
      continue;
    }
    if (!html.includes('money-price')) {
      fail(`${name}: service page without the price table block`);
    }
    const h2s = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gs)].map((m2) =>
      m2[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim()
    );
    const questionH2s = h2s.filter((x) => x.endsWith('?'));
    if (questionH2s.length < 6) {
      fail(`${name}: only ${questionH2s.length} question-form H2 answer block(s) (need 6+)`);
    }
    // Pair each question with its answer so a commercial question can be
    // checked on its own.
    // Split on the block marker rather than matching balanced markup — the
    // blocks are flat (h2 + p), so the next marker is the block boundary.
    const items = html.split('<div class="money-qa-item">').slice(1);
    const pairs = items.map((block) => {
      const q = ((block.match(/<h2[^>]*>(.*?)<\/h2>/s) || [])[1] || '').replace(/<[^>]+>/g, '').trim();
      const a = ((block.match(/class="money-qa-a"[^>]*>(.*?)<\/p>/s) || [])[1] || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      return { q, a };
    }).filter((x) => x.q && x.a);
    if (pairs.length < 6) {
      fail(`${name}: only ${pairs.length} question/answer block(s) (need 6+)`);
    }
    // A COMMERCIAL question — price, cost, rate, duration, how long, how
    // often — must be answered with a figure in the opening sentence.
    // "It depends on the home" is not an answer an engine can quote, and a
    // commercial question without a number is why a page gets impressions and
    // no clicks.
    const commercial = /^(how much|how (?:long|often|many)|when |what (?:is|does|are|it costs).*(?:cost|price|charge|rate|amount)|what is the (?:cost|price|charge|rate))/i;
    const weak = pairs.filter(({ q, a }) => {
      if (!commercial.test(q)) return false;
      const first = a.split(/(?<=[.?])\s/).slice(0, 2).join(' ');
      return !/(₹\s?\d|\d+\s*(?:hrs?|hours?|mins?|minutes?|months?|weeks?|years?|days?|pm|am|sq\s*ft|litres?|BHK|seats?|tanks?|panels?|chambers?|floors?|people|cleaners|per\b)|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|quarterly|monthly|weekly|daily|annually)\b)/i.test(first);
    });
    if (weak.length) {
      fail(`${name}: ${weak.length} commercial answer(s) do not lead with a figure — "${weak[0].q.slice(0, 55)}" → "${weak[0].a.slice(0, 55)}"`);
    }
  }
}

// 19 — the GEO surfaces exist and are wired
{
  const { MONEY_QA } = await import('../src/lib/money-page-qa.js');
  const serviceKeys = Object.keys(MONEY_QA);

  // blog.html must expose the corpus as an ItemList inside a CollectionPage.
  const blogHtml = readFileSync(resolve(distDir, 'blog.html'), 'utf8');
  const blogTypes = new Set();
  for (const m of blogHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    const d = JSON.parse(m[1]);
    const t = d['@type'];
    (Array.isArray(t) ? t : [t]).forEach((x) => blogTypes.add(x));
  }
  if (!blogTypes.has('CollectionPage')) fail('blog.html: no CollectionPage schema — AI engines cannot parse the corpus');
  if (!blogTypes.has('ItemList')) fail('blog.html: no ItemList schema');
  const n = (blogHtml.match(/"numberOfItems":(\d+)/) || [])[1];
  if (n && Number(n) < 50) fail(`blog.html: ItemList numberOfItems is ${n} (expected the full corpus)`);

  // The facts page must exist, be in the sitemap and be linked from llms.txt.
  if (!existsSync(resolve(distDir, 'facts.html'))) fail('facts.html: the citable facts page is missing');
  const sm = readFileSync(resolve(distDir, 'sitemap.xml'), 'utf8');
  if (!sm.includes('/facts.html')) fail('sitemap.xml: facts.html is not listed');
  const llms = readFileSync(resolve(distDir, 'llms.txt'), 'utf8');
  if (!llms.includes('/facts.html')) fail('llms.txt: facts.html is not listed');
  if (!llms.includes('llms-full.txt')) fail('llms.txt: no pointer to llms-full.txt');
  if (!/Google rating:/.test(llms)) fail('llms.txt: no facts block');

  // Every service in the money-page registry must have a real page. The
  // mapping comes from pages.config.mjs, because the original 9 services
  // have descriptive file names while the new ones are named after the key.
  const { pages: pageCfg } = await import('../pages.config.mjs');
  for (const key of serviceKeys) {
    const files = pageCfg.filter((pg) => pg.page === 'service' && pg.serviceKey === key);
    if (!files.length) {
      fail(`service "${key}": has a MONEY_QA entry but no page in pages.config.mjs`);
      continue;
    }
    for (const pg of files) {
      if (!existsSync(resolve(distDir, `${pg.file}.html`))) {
        fail(`${pg.file}.html: service page missing for MONEY_QA entry "${key}"`);
      }
    }
  }
}

// ─── report ─────────────────────────────────────────────────────────────────
console.log(`preflight: ${htmlFiles.length} pages, ${jsonLdBlocks} JSON-LD blocks, ${idTypes.size} entity ids`);

// Outstanding [VERIFY] items — reported, but they do not fail the build.
{
  const { ADDRESS_FULL } = await import('../src/lib/site.js');
  warn(`[VERIFY] Re-check the single address against the live GBP listing each deploy: "${ADDRESS_FULL}"`);
}

// 17 — every public claim in the register either has a proof or is flagged.
//
// A claim with no proof is not a build failure (the business may legitimately
// make it) but it must never be asserted silently: it is reported on every
// build until the owner supplies the proof and sets verified: true.
{
  const { CLAIMS } = await import('../src/lib/claims.js');
  for (const [id, c] of Object.entries(CLAIMS)) {
    if (c.verified && c.proof) continue;
    warn(
      `[VERIFY] Claim "${id}" (${c.label}) has no proof. ` +
        (c.proofWhenConfirmed
          ? `Set proof to: "${c.proofWhenConfirmed}" once confirmed.`
          : 'Supply a proof source, or remove the claim from the site.')
    );
  }
}

if (warnings.length) {
  console.log(`\nWARNINGS (${warnings.length})`);
  for (const w of warnings) console.log('  -', w);
}

if (errors.length) {
  console.error(`\nFAILED (${errors.length})`);
  for (const e of errors) console.error('  ✗', e);
  process.exit(1);
}

console.log('\npreflight: PASS');
