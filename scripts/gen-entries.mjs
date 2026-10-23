// Generates one minimal HTML entry shell per page in pages.config.mjs.
// Each shell carries SEO meta + a data-page / data-service attribute that
// src/bootstrap.jsx reads to mount the correct React component.
// Re-run with `npm run gen` after editing pages.config.mjs.
//
// SEO fixes (from the FINAL SEO package):
//   - lang="en-IN"
//   - <meta name="robots" noindex> when page.noindex === true
//   - og:image:alt / width / height
//   - geo.region / geo.placename / geo.position / ICBM (single source: site.js)
//   - og:type="article" for blog articles + the article:* properties
//   - hero-image preload on service pages (srcset-matched, no double fetch)
//   - supports nested paths (blog/... creates subdirectories)
//
// NOTE on hreflang: the site is single-locale (lang="en-IN"). The old
// x-default/en-IN/en cluster pointed all three alternates at the SAME url,
// which Google ignores as a self-referential annotation. A single-language
// site does not need hreflang at all, so it was removed rather than faked.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, SITE_URL, SITE_NAME, OG_IMAGE } from '../pages.config.mjs';
import { GTM_ID, CLARITY_ID, GEO } from '../src/lib/site.js';
import { ARTICLES } from '../src/lib/blog.js';
import { getService } from '../src/lib/services.js';
import { imageDims, srcSetFor } from '../src/lib/image-dims.js';
import { BRAND_NAME, PHONE } from '../src/lib/site.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const gtm = `<!-- Google Tag Manager (on-interaction: analytics must not cost INP) -->
<script>(function(){var id='${GTM_ID}';function load(){if(window.__gtmLoaded)return;window.__gtmLoaded=true;window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=document.getElementsByTagName('script')[0],j=document.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+id;f.parentNode.insertBefore(j,f);}function arm(){var evs=['scroll','click','touchstart','keydown'];evs.forEach(function(e){window.addEventListener(e,load,{once:true,passive:true});});setTimeout(load,10000);}if(document.readyState==='complete'||document.readyState==='interactive'){arm();}else{window.addEventListener('DOMContentLoaded',arm,{once:true});}})();</script>
<!-- End Google Tag Manager -->`;

const gtmNoscript = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;

// Standard (immediate) GTM snippet — used ONLY on thank-you.html so the
// lead conversion fires on page view without waiting for user interaction.
const gtmStd = `<!-- Google Tag Manager (thank-you: immediate, conversion must fire) -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');</script>
<!-- End Google Tag Manager -->`;

// Once-per-session repeat guard for thank-you.html. Must run BEFORE the GTM
// snippet: on a repeat view in the same tab session it pushes
// {thankyou_repeat:true} so a GTM exception (to be added) can skip the
// conversion; first visit only sets the flag and changes nothing.
const tyGuard = `<script>try{window.dataLayer=window.dataLayer||[];if(window.sessionStorage&&sessionStorage.getItem('ty_seen')){window.dataLayer.push({thankyou_repeat:true});}else if(window.sessionStorage){sessionStorage.setItem('ty_seen','1');}}catch(_){}</script>`;

const clarity = `<!-- Microsoft Clarity (on-interaction: must not cost INP) -->
<script type="text/javascript">
// Mask every form field in session recordings: Clarity captures text typed
// into inputs by default, and a name, a phone number and a message are not
// something we need in a heat map. The command is queued before the tag
// loads, so it applies from the first session.
window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
window.clarity('set', 'mask', 'input, textarea, select');
</script>
<script type="text/javascript">
(function(){function load(){if(window.__clarityLoaded)return;window.__clarityLoaded=true;(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${CLARITY_ID}");}function arm(){var evs=['scroll','click','touchstart','keydown'];evs.forEach(function(e){window.addEventListener(e,load,{once:true,passive:true});});setTimeout(load,10000);}if(document.readyState==='complete'||document.readyState==='interactive'){arm();}else{window.addEventListener('DOMContentLoaded',arm,{once:true});}})();
</script>
<!-- End Microsoft Clarity -->`;

// The generated Open Graph price cards that exist for a service key.
const OG_CARDS = new Set([
  'deep','house','fullhome','kitchen','bathroom','sofa','carpet','office','move',
  'watertank','toilettank','facade','commonarea','sweeper','lift','windowgrill',
  'utensils','road','chandelier','washingmachine','chairclean','curtain','basement',
  'instantclean','balconyclean','sqftrate','kitchenplatform','postconstruction',
  'roomclean',
  'residential', 'society', 'bookcleaning', 'about', 'blog',
]);

// Hero image per service key for above-fold preload (LCP).
const HERO_IMAGES = {
  deep: '/images/full-home-deep-cleaning.webp',
  house: '/images/house-cleaning.webp',
  fullhome: '/images/full-home-deep-cleaning.webp',
  kitchen: '/images/kitchen-deep-cleaning.webp',
  bathroom: '/images/bathroom-deep-cleaning.webp',
  sofa: '/images/sofa-shampoo-cleaning.webp',
  carpet: '/images/carpet-shampoo-cleaning.webp',
  office: '/images/office-deep-cleaning.jpg',
  move: '/images/full-home-deep-cleaning.webp',
};

for (const p of pages) {
  const url = p.file === 'index' ? `${SITE_URL}/` : `${SITE_URL}/${p.file}.html`;
  const dataAttrs = `data-page="${p.page}" data-file="${p.file}"${p.serviceKey ? ` data-service="${p.serviceKey}"` : ''}${p.bhk ? ` data-bhk="${p.bhk}"` : ''}`;

  // Merge-stub pages: two near-identical URLs cannibalising one query resolve
  // here. GitHub Pages cannot send a real 301, so we emit a minimal
  // meta-refresh + canonical stub. Excluded from the sitemap by gen-sitemap.mjs.
  if (p.redirectTo) {
    const target = `${SITE_URL}/${p.redirectTo}.html`;
    const stub = `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="${target}" />
  <meta http-equiv="refresh" content="0; url=/${p.redirectTo}.html" />
  <meta name="description" content="${p.description || `This page has moved to ${target}.`}" />
  <title>${p.title}</title>
</head>
<body>
  <p>This page has moved to <a href="/${p.redirectTo}.html">${target}</a>.</p>
</body>
</html>
`;
    const stubPath = resolve(root, `${p.file}.html`);
    mkdirSync(dirname(stubPath), { recursive: true });
    writeFileSync(stubPath, stub);
    console.log('wrote (merge stub)', `${p.file}.html → ${p.redirectTo}.html`);
    continue;
  }

  const noindex = p.noindex
    ? '  <meta name="robots" content="noindex, follow" />\n'
    : '  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />\n';
  const ogType = p.page === 'article' ? 'article' : 'website';

  // LCP preload must match the element the browser actually paints first.
  //
  // Service pages: the hero is text + a lead form — the only image sits in
  // the "About" section far below the fold and is loading="lazy". Preloading
  // it burned bandwidth without helping LCP, so the preload was removed.
  //
  // Article pages: the hero image IS the LCP element (loading="eager",
  // fetchpriority="high"). Preload it with the SAME srcset + sizes the <img>
  // uses, otherwise the browser downloads the base file as the preload and
  // then the chosen variant again — a double fetch of the LCP image.
  const HERO_SIZES = '(max-width: 600px) 400px, (max-width: 1000px) 800px, 860px';
  let preload = '';
  if (p.page === 'article') {
    const art0 = ARTICLES.find((a) => a.file === p.file);
    if (art0 && art0.image) {
      const srcset = srcSetFor(art0.image);
      const href = srcset.split(', ').pop().split(' ')[0];
      preload = `  <link rel="preload" as="image" href="${href}" imagesrcset="${srcset}" imagesizes="${HERO_SIZES}" fetchpriority="high" />\n`;
    }
  }
  // Page-specific OG image + alt + TRUE dimensions (2026-09-20 seo-images
  // audit: tags claimed 1200x630 for files as small as 390px — emit measured).
  let ogImage = OG_IMAGE;
  let ogAlt = 'Sachin Deep Cleaning — professional deep cleaning services in Gurgaon';
  let art = null;
  if (p.page === 'service') {
    // A dedicated price card per service. 43 of the service pages were
    // sharing one generic cover, so every WhatsApp/Facebook link preview
    // looked identical and carried no price.
    const card = `/images/og/${p.serviceKey}.jpg`;
    if (OG_CARDS.has(p.serviceKey)) {
      ogImage = SITE_URL + card;
      try {
        const svc = getService(p.serviceKey, p.bhk);
        if (svc && svc.price) {
          ogAlt = `${svc.name} in Gurgaon — from ${svc.price.amount}. ${BRAND_NAME}, ${PHONE}.`;
        }
      } catch {}
    } else if (HERO_IMAGES[p.serviceKey]) {
      ogImage = SITE_URL + HERO_IMAGES[p.serviceKey];
      try {
        const svc = getService(p.serviceKey, p.bhk);
        if (svc && svc.imageAlt) ogAlt = svc.imageAlt;
      } catch {}
    }
  } else if (p.page === 'services' || p.page === 'facts' || p.page === 'about' || p.page === 'contact' || p.page === 'index') {
    const card = p.page === 'index' ? 'home' : p.page;
    ogImage = SITE_URL + `/images/og/${card}.jpg`;
    ogAlt = `${p.title} — Sachin Deep Cleaning, Gurgaon. Call +91 95607 39281.`;
  } else if (p.page === 'residential' || p.page === 'partners' || p.page === 'landing') {
    const card = { residential: 'residential', partners: 'society', landing: 'bookcleaning' }[p.page];
    ogImage = SITE_URL + `/images/og/${card}.jpg`;
    ogAlt = `${p.title} — Sachin Deep Cleaning, Gurgaon.`;
  } else if (p.page === 'article') {
    art = ARTICLES.find((a) => a.file === p.file);
    if (art && art.image) ogImage = SITE_URL + art.image;
    if (art && art.imageAlt) ogAlt = art.imageAlt;
  }
  // blog-seo-check Step 8: social cards need ≥1000px width — small heroes
  // (carpet 390px, sofa 500px…) fall back to the 1200x630 OG cover.
  let [ogW, ogH] = imageDims(ogImage.replace(SITE_URL, ''));
  if (ogW < 1000) {
    ogImage = OG_IMAGE;
    ogAlt = 'Sachin Deep Cleaning — professional deep cleaning services in Gurgaon';
    [ogW, ogH] = imageDims(ogImage.replace(SITE_URL, ''));
  }
  // og:type="article" pages should carry the article:* properties — without
  // them the card is treated as a generic website card by Facebook/LinkedIn.
  const articleMeta = p.page === 'article' && art
    ? `  <meta property="article:published_time" content="${art.datePublished}" />\n` +
      `  <meta property="article:modified_time" content="${art.dateModified}" />\n` +
      `  <meta property="article:author" content="${SITE_URL}/about.html#sachin-kumar" />\n` +
      `  <meta property="article:section" content="Cleaning Guides" />\n`
    : '';

  const html = `<!DOCTYPE html>
<html lang="en-IN" data-theme="light" ${dataAttrs}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0a1628" />
  <link rel="icon" type="image/png" sizes="32x32" href="${SITE_URL}/favicon-32.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="${SITE_URL}/apple-touch-icon.png" />
  <link rel="llms" type="text/plain" href="${SITE_URL}/llms.txt" />
  <title>${p.title}</title>
  <meta name="description" content="${p.description}" />
${noindex}  <meta name="geo.region" content="IN-HR" />
  <meta name="geo.placename" content="Gurgaon" />
  <meta name="geo.position" content="${GEO.latitude};${GEO.longitude}" />
  <meta name="ICBM" content="${GEO.latitude}, ${GEO.longitude}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:title" content="${p.title}" />
  <meta property="og:description" content="${p.description}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:alt" content="${ogAlt}" />
  <meta property="og:image:width" content="${ogW}" />
  <meta property="og:image:height" content="${ogH}" />
  <meta property="og:image:type" content="${ogImage.endsWith('.webp') ? 'image/webp' : 'image/jpeg'}" />
${articleMeta}  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@sachindeepclean" />
  <meta name="twitter:creator" content="@sachindeepclean" />
  <meta name="twitter:title" content="${p.title}" />
  <meta name="twitter:description" content="${p.description}" />
  <meta name="twitter:image" content="${ogImage}" />
  <meta name="twitter:image:alt" content="${ogAlt}" />
${preload}  <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
  <link rel="preconnect" href="https://www.clarity.ms" crossorigin />
  <link rel="dns-prefetch" href="https://www.clarity.ms" />
  ${p.file === 'thank-you' ? tyGuard + '\n  ' + gtmStd : gtm}
  ${clarity}
  <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/dm-sans-400.woff2" />
  <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/syne-800.woff2" />
  <link rel="stylesheet" href="/src/styles/global.css" />
  <script src="/tracking.js" defer></script>
<script src="/beacon.js" defer></script>
</head>
<body>
  ${gtmNoscript}
  <div id="root"></div>
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
