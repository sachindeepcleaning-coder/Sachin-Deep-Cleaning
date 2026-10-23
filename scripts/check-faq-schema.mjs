// Task 6 — verify every FAQPage schema entry mirrors visible Q&A on its page.
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const f = join(dir, e.name);
    if (e.isDirectory()) walk(f, acc);
    else if (e.name.endsWith('.html')) acc.push(f);
  }
  return acc;
}

const decode = (s) =>
  s
    .replace(/"/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

let mismatched = 0;
let checked = 0;
const problems = [];
for (const f of walk('dist')) {
  const html = readFileSync(f, 'utf8');
  if (!html.includes('"FAQPage"')) continue;
  checked++;
  const schemaQs = new Set();
  for (const m of html.matchAll(/"FAQPage"[\s\S]*?<\/script>/g)) {
    for (const q of m[0].matchAll(/"name":"((?:[^"\\]|\\.)*)"/g)) {
      schemaQs.add(decode(JSON.parse('"' + q[1] + '"')));
    }
  }
  // visible questions: .faq-q accordion items AND .money-qa-h answer headings
  // (ServicePage renders money-page Q&As as visible h2 sections)
  const visible = [];
  for (const m of html.matchAll(/class="faq-q"[^>]*>([\s\S]*?)<span class="faq-arrow"/g)) {
    visible.push(decode(m[1].replace(/<[^>]+>/g, '')));
  }
  for (const m of html.matchAll(/class="money-qa-h"[^>]*>([\s\S]*?)<\/h2>/g)) {
    visible.push(decode(m[1].replace(/<[^>]+>/g, '')));
  }
  // facts.html renders its Q&As as h3 headings inside .facts-faq
  for (const m of html.matchAll(/class="facts-faq"[\s\S]*?<\/div>\s*<\/div>/g)) {
    for (const h of m[0].matchAll(/<h3>([\s\S]*?)<\/h3>/g)) {
      visible.push(decode(h[1].replace(/<[^>]+>/g, '')));
    }
  }
  const missing = [...schemaQs].filter(
    (q) => !visible.some((v) => v.includes(q.slice(0, 40)) || q.includes(v.slice(0, 40)))
  );
  if (!schemaQs.size || missing.length) {
    mismatched++;
    problems.push(
      relative('dist', f) +
        ` | schema:${schemaQs.size} visible:${visible.length}` +
        (missing.length ? ` | NOT VISIBLE: ${missing.slice(0, 2).map((x) => x.slice(0, 60)).join(' ; ')}` : ' | schema unparsed')
    );
  }
}
console.log(`FAQ pages checked: ${checked} | mismatched: ${mismatched}`);
for (const p of problems) console.log('  ', p);
