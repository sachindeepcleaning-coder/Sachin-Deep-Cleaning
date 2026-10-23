// Task 8 — every internal link in dist/ must resolve to a real file.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const f = join(dir, e.name);
    if (e.isDirectory()) walk(f, acc);
    else if (e.name.endsWith('.html')) acc.push(f);
  }
  return acc;
}

const dist = 'dist';
const broken = new Map();
for (const f of walk(dist)) {
  const html = readFileSync(f, 'utf8');
  const pageDir = dirname(f);
  for (const m of html.matchAll(/href="([^"#?]+)"/g)) {
    const href = m[1];
    if (/^(https?:|\/\/|tel:|mailto:|data:)/i.test(href)) continue;
    // "/" and any trailing-slash path resolve to that directory's index.html
    const path = href.startsWith('/') ? href.slice(1) : href;
    const target =
      path === '' || path.endsWith('/')
        ? join(dist, path, 'index.html')
        : join(dist, path);
    if (!existsSync(target) || !statSync(target).isFile()) {
      const key = relative(dist, target);
      if (!broken.has(key)) broken.set(key, []);
      broken.get(key).push(relative(dist, f));
    }
  }
}
if (!broken.size) {
  console.log('internal links: all resolve (no 404s)');
} else {
  console.log('BROKEN internal links:', broken.size);
  for (const [target, pages] of broken) {
    console.log(' ', target, '<-', pages.slice(0, 4).join(', '), pages.length > 4 ? `+${pages.length - 4}` : '');
  }
}
