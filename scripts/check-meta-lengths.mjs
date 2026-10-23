// Task 8 — title (<=60) and meta description (110-160) length audit.
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

function walk(d, a = []) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const f = join(d, e.name);
    if (e.isDirectory()) walk(f, a);
    else if (e.name.endsWith('.html')) a.push(f);
  }
  return a;
}
const dec = (s) =>
  s
    .replace(/"/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>');

let longT = 0, shortD = 0, longD = 0, checked = 0;
for (const f of walk('dist')) {
  const h = readFileSync(f, 'utf8');
  if (h.includes('http-equiv="refresh"') || h.includes('google4bc4a68e1ff9b7f5')) continue;
  checked++;
  const t = dec((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  const d = dec((h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  if (t.length > 60) {
    longT++;
    console.log(`TITLE>60 (${t.length}) ${relative('dist', f)} | ${t.slice(0, 70)}`);
  }
  if (d.length < 110 || d.length > 160) {
    if (d.length < 110) shortD++; else longD++;
    console.log(`DESC ${d.length} ${relative('dist', f)}`);
  }
}
console.log(`checked ${checked} | titles>60: ${longT} | desc<110: ${shortD} | desc>160: ${longD}`);
