// Prerenders every page's React content into static HTML inside dist/.
//
// Run AFTER `vite build`. For each dist/*.html shell this:
//   1. renders the page component to an HTML string with ReactDOMServer
//   2. injects it into <div id="root"> so Google/Bing/social scrapers see
//      the real content, headings, text and JSON-LD without running JS
//   3. rewrites the dist file
//
// The browser still hydrates the same tree at runtime (src/bootstrap.jsx),
// so interactivity (countdown, forms, reels) is unchanged.

import { writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve, join, relative, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { pages } from '../pages.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist');
const ssrOut = resolve(root, 'dist-ssr');
const ssrEntry = resolve(ssrOut, 'prerender.js');

// Collect every *.html under a directory (recursively) with its relative path
// so blog/ subdirectory pages are prerendered too.
function collectHtmlFiles(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectHtmlFiles(full, acc);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      acc.push(full);
    }
  }
  return acc;
}

// 1) Bundle the SSR entry with Vite (transpiles JSX).
await build({
  configFile: false,
  root,
  logLevel: 'error',
  plugins: [react()],
  build: {
    ssr: 'src/prerender-entry.jsx',
    outDir: 'dist-ssr',
    emptyOutDir: true,
    minify: false,
    target: 'node18',
    rollupOptions: {
      output: { format: 'es', entryFileNames: 'prerender.js' },
    },
  },
});

// 2) Load the bundle and render each page.
const { renderPage } = await import(pathToFileURL(ssrEntry).href);

// 3) Inject rendered content into every entry shell produced by the build.
let injected = 0;
for (const path of collectHtmlFiles(distDir)) {
  let html = readFileSync(path, 'utf8');

  const relPath = relative(distDir, path).split(sep).join('/');
  const cfg = pages.find((p) => `${p.file}.html` === relPath);
  if (!cfg) {
    console.log('skip (no config):', relPath);
    continue;
  }

  const body = renderPage({
    page: cfg.page,
    file: cfg.file,
    serviceKey: cfg.serviceKey,
    bhk: cfg.bhk,
  });

  if (html.includes('<div id="root"></div>')) {
    html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    writeFileSync(path, html);
    injected++;
    console.log('prerendered:', relPath, `(${body.length} chars)`);
  } else {
    console.warn('root not found in', relPath);
  }
}

console.log(`\nPrerendered ${injected}/${pages.length} pages.`);
