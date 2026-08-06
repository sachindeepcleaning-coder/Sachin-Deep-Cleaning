// Generates one minimal HTML entry shell per page in pages.config.mjs.
// Each shell carries SEO meta + a data-page / data-service attribute that
// src/bootstrap.jsx reads to mount the correct React component.
// Re-run with `npm run gen` after editing pages.config.mjs.

import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, SITE_URL, SITE_NAME, OG_IMAGE } from '../pages.config.mjs';
import { GTM_ID, GA_ID, NETLIFY_FORM_NAME } from '../src/lib/site.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const noFlash = ``;

const gtm = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');</script>
<!-- End Google Tag Manager -->`;

const ga4 = `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>`;

const gtmNoscript = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;

// Netlify Forms: a real (static) form in the served HTML so the build
// auto-detects the lead form ("lead-quote"). Field values are copied to the
// hidden inputs before submission by src/components/QuoteForm.jsx.
const netlifyForm = `<form name="${NETLIFY_FORM_NAME}" method="POST" data-netlify="true" class="netlify-hidden" hidden aria-hidden="true">
  <input type="text" name="name" />
  <input type="tel" name="phone" />
</form>`;

for (const p of pages) {
  const url = `${SITE_URL}/${p.file}.html`;
  const dataAttrs = `data-page="${p.page}"${p.serviceKey ? ` data-service="${p.serviceKey}"` : ''}${p.bhk ? ` data-bhk="${p.bhk}"` : ''}`;
  const html = `<!DOCTYPE html>
<html lang="en" ${dataAttrs}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0a1628" />
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
  ${gtm}
  ${ga4}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/src/styles/global.css" />
</head>
<body>
  ${gtmNoscript}
  <div id="root"></div>
  ${netlifyForm}
  <script type="module" src="/src/bootstrap.jsx"></script>
</body>
</html>
`;
  writeFileSync(resolve(root, `${p.file}.html`), html);
  console.log('wrote', `${p.file}.html`);
}
console.log(`\nGenerated ${pages.length} HTML entry shells.`);
