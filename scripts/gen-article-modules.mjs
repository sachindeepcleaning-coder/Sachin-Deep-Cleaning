// Splits the authored article collection (src/lib/blog.js) into one module
// per article plus a lightweight metadata index.
//
// WHY: src/lib/blog.js is ~1 MB of article copy. Bundled as-is it shipped as a
// single 930 KB (280 KB gzipped) chunk that EVERY blog page downloaded — the
// blog index, and each of the 85 article pages, all shipped all 85 articles
// to render one. Splitting gives each guide its own chunk, so an article page
// loads one article.
//
// src/lib/blog.js stays the single source of truth for the copy — it is never
// bundled. This script projects it into src/generated/, which is build output
// (gitignored). It runs automatically from vite.config.js before every dev
// server and build, so the projection can never go stale.
//
// Usage: node scripts/gen-article-modules.mjs

import { writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARTICLES } from '../src/lib/blog.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outDir = resolve(root, 'src/generated');
const articlesDir = resolve(outDir, 'articles');

// Wipe stale article modules so a renamed/removed guide cannot linger.
if (existsSync(articlesDir)) rmSync(articlesDir, { recursive: true, force: true });
mkdirSync(articlesDir, { recursive: true });

// Fields the listing pages need (blog index, all-pages, blog metadata).
// Deliberately excludes `blocks` and `faqs` — that is the 1 MB.
const INDEX_FIELDS = [
  'slug',
  'file',
  'title',
  'description',
  'datePublished',
  'dateModified',
  'image',
  'imageAlt',
  'lead',
  'cta',
];

const index = [];

// Strips the inline markdown used across the article copy so a derived
// bullet reads as plain prose.
const plain = (s) =>
  String(s)
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

// Derives a compact "Key takeaways" list from the article's OWN copy.
//
// Why: an answer engine (ChatGPT, Perplexity, AI Overviews) lifts a labelled,
// self-contained summary far more reliably than a wall of prose. Nothing here
// is invented — every bullet is a sentence that already exists in the guide,
// so there is no new claim to fact-check and no duplication penalty between
// articles (the content-lint shingle check compares guides to each other).
//
// Order: the answer-first lead, then the bolded claim openers that the
// checklists already use ("**Assessment** — ..."), then the price table rows.
function deriveTakeaways(a) {
  const out = [];
  if (a.lead) out.push(plain(a.lead));

  const claims = [];
  for (const b of a.blocks || []) {
    if (b.t !== 'ul' && b.t !== 'ol') continue;
    for (const it of b.items || []) {
      const text = plain(it);
      if (!text) continue;
      // "Do not …" / "Never …" advice belongs in the body, not the summary.
      const negative = /^(do not|don'?t|never|avoid)\b/i.test(text);
      claims.push({
        text,
        negative,
        bold: /^\*\*/.test(it),
        figure: /(₹|\d)/.test(text),
      });
    }
  }

  const picked = [];
  const take = (test) => {
    for (const c of claims) {
      if (picked.length >= 4) break;
      if (picked.includes(c.text)) continue;
      if (c.negative) continue;
      if (!test(c)) continue;
      picked.push(c.text);
    }
  };
  // Figures first (a price or a duration is what a reader lifts), then the
  // other bolded claims, then anything concrete that is left.
  take((c) => c.bold && c.figure);
  take((c) => c.bold);
  take((c) => c.figure);

  for (const p of picked) {
    if (out.length >= 5) break;
    if (!out.includes(p)) out.push(p);
  }

  // Last resort: the first table's rows, rendered as "Label — value".
  if (out.length < 3) {
    const t = (a.blocks || []).find((b) => b.t === 'table');
    if (t) {
      for (const row of t.rows || []) {
        if (out.length >= 4) break;
        const line = row.map(plain).filter(Boolean).join(' — ');
        if (line && !out.includes(line)) out.push(line);
      }
    }
  }

  return out.slice(0, 5);
}

for (const a of ARTICLES) {
  const meta = {};
  for (const f of INDEX_FIELDS) meta[f] = a[f];
  index.push(meta);

  const article = { ...a, keyTakeaways: deriveTakeaways(a) };

  const body =
    '// AUTO-GENERATED from src/lib/blog.js — do not edit.\n' +
    '// Source of truth: src/lib/blog.js. Regenerate with `npm run gen`.\n' +
    `export default ${JSON.stringify(article, null, 2)};\n`;
  writeFileSync(resolve(articlesDir, `${a.slug}.js`), body);
}

// Metadata index for the listing pages (no body copy, no FAQ answers).
const indexFile =
  '// AUTO-GENERATED from src/lib/blog.js — do not edit.\n' +
  '// Listing-page metadata only: title, description, dates, image, lead, CTA.\n' +
  `export const ARTICLE_INDEX = ${JSON.stringify(index, null, 2)};\n` +
  '\n' +
  'export const ARTICLE_BY_FILE = Object.fromEntries(ARTICLE_INDEX.map((a) => [a.file, a]));\n';
writeFileSync(resolve(outDir, 'article-index.js'), indexFile);

const written = readdirSync(articlesDir).filter((f) => f.endsWith('.js')).length;
console.log(
  `gen-article-modules: ${written} article modules + article-index.js (${ARTICLES.length} articles)`
);
