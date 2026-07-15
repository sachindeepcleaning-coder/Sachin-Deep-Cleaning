// Generates one minimal HTML entry shell per page in pages.config.mjs.
// Each shell carries SEO meta + a data-page / data-service attribute that
// src/bootstrap.jsx reads to mount the correct React component.
// Re-run with `npm run gen` after editing pages.config.mjs.

import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, SITE_URL, SITE_NAME, OG_IMAGE } from '../pages.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const noFlash = `<script>(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();</script>`;

for (const p of pages) {
  const url = `${SITE_URL}/${p.file}.html`;
  const dataAttrs = `data-page="${p.page}"${p.serviceKey ? ` data-service="${p.serviceKey}"` : ''}${p.bhk ? ` data-bhk="${p.bhk}"` : ''}`;
  const html = `<!DOCTYPE html>
<html lang="en" ${dataAttrs}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.title}</title>
  <meta name="description" content="${p.description}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:title" content="${p.title}" />
  <meta property="og:description" content="${p.description}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${p.title}" />
  <meta name="twitter:description" content="${p.description}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/src/styles/global.css" />
  ${noFlash}
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/bootstrap.jsx"></script>
</body>
</html>
`;
  writeFileSync(resolve(root, `${p.file}.html`), html);
  console.log('wrote', `${p.file}.html`);
}
console.log(`\nGenerated ${pages.length} HTML entry shells.`);
