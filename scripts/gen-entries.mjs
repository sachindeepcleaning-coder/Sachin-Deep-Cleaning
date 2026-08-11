// Generates one minimal HTML entry shell per page in pages.config.mjs.
// Each shell carries SEO meta + a data-page / data-service attribute that
// src/bootstrap.jsx reads to mount the correct React component.
// Re-run with `npm run gen` after editing pages.config.mjs.
//
// SEO fixes (from the FINAL SEO package):
//   - lang="en-IN"
//   - <meta name="robots" noindex> when page.noindex === true
//   - og:image:alt / width / height
//   - hreflang alternates (en-IN / en)
//   - geo.region / geo.placename / geo.position / ICBM
//   - og:type="article" for blog articles
//   - hero-image preload on service pages
//   - supports nested paths (blog/... creates subdirectories)

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, SITE_URL, SITE_NAME, OG_IMAGE } from '../pages.config.mjs';
import { GTM_ID, NETLIFY_FORM_NAME } from '../src/lib/site.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const gtm = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');</script>
<!-- End Google Tag Manager -->`;

const gtmNoscript = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;

// Netlify Forms: a real (static) form in the served HTML so the build
// auto-detects the lead form ("lead-quote"). Field values are copied to the
// hidden inputs before submission by src/components/QuoteForm.jsx.
const netlifyForm = `<form name="${NETLIFY_FORM_NAME}" method="POST" data-netlify="true" class="netlify-hidden" hidden aria-hidden="true">
  <input type="text" name="name" />
  <input type="tel" name="phone" />
</form>`;

// Hero image per service key for above-fold preload (LCP).
const HERO_IMAGES = {
  deep: '/images/full-home-deep-cleaning.jpg',
  house: '/images/house-cleaning.jpg',
  fullhome: '/images/full-home-deep-cleaning.jpg',
  kitchen: '/images/kitchen-deep-cleaning.webp',
  bathroom: '/images/bathroom-deep-cleaning.jpg',
  sofa: '/images/sofa-shampoo-cleaning.jpg',
  carpet: '/images/carpet-shampoo-cleaning.jpg',
  office: '/images/office-deep-cleaning.jpg',
  move: '/images/full-home-deep-cleaning.jpg',
};

for (const p of pages) {
  const url = p.file === 'index' ? `${SITE_URL}/` : `${SITE_URL}/${p.file}.html`;
  const dataAttrs = `data-page="${p.page}" data-file="${p.file}"${p.serviceKey ? ` data-service="${p.serviceKey}"` : ''}${p.bhk ? ` data-bhk="${p.bhk}"` : ''}`;

  const noindex = p.noindex ? '  <meta name="robots" content="noindex, nofollow" />\n' : '';
  const ogType = p.page === 'article' ? 'article' : 'website';
  const preload = p.page === 'service' && p.serviceKey && HERO_IMAGES[p.serviceKey]
    ? `  <link rel="preload" as="image" href="${HERO_IMAGES[p.serviceKey]}" />\n`
    : '';

  const html = `<!DOCTYPE html>
<html lang="en-IN" data-theme="light" ${dataAttrs}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0a1628" />
  <title>${p.title}</title>
  <meta name="description" content="${p.description}" />
${noindex}  <meta name="geo.region" content="IN-HR" />
  <meta name="geo.placename" content="Gurgaon" />
  <meta name="geo.position" content="28.4595;77.0266" />
  <meta name="ICBM" content="28.4595, 77.0266" />
  <link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="en-IN" href="${url}" />
  <link rel="alternate" hreflang="en" href="${url}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:title" content="${p.title}" />
  <meta property="og:description" content="${p.description}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta property="og:image:alt" content="Sachin Deep Cleaning — professional deep cleaning services in Gurgaon" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${p.title}" />
  <meta name="twitter:description" content="${p.description}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
${preload}  ${gtm}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />
  <noscript><link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" /></noscript>
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
  const outPath = resolve(root, `${p.file}.html`);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log('wrote', `${p.file}.html`);
}
console.log(`\nGenerated ${pages.length} HTML entry shells.`);
