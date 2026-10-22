// Central site + analytics config for Sachin Deep Cleaning.
// Single source of truth shared across all React components.

export const SITE_URL = 'https://sachindeepcleaning.shop';
export const SITE_NAME = 'Sachin Deep Cleaning';

// Canonical URL for a page. The homepage is served from the root path.
export function pageUrl(file = 'index') {
  return file === 'index' ? `${SITE_URL}/` : `${SITE_URL}/${file}.html`;
}

export const PHONE = '+91 95607 39281';
export const PHONE_TEL = 'tel:+919560739281';
export const WHATSAPP_NUMBER = '919560739281';
export const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`;

// Pre-filled WhatsApp links for the template CTAs.
export const WA_BOOK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi I want to book deep cleaning service in Gurgaon.')}`;
export function waMsg(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// Analytics — Google Tag Manager only (GA4 removed; old project had GTM only).
export const GTM_ID = 'GTM-P4KVBGRK';

// Microsoft Clarity (Sachin project) — heatmaps + session recordings.
export const CLARITY_ID = 'xmhey9airm';

// Netlify Forms handles lead capture (works when deployed to Netlify).
export const NETLIFY_FORM_NAME = 'lead-quote';

// Lead delivery — Web3Forms (replaces Netlify Forms + Formspree on GitHub Pages).
// Public client-side key (see Web3Forms FAQ: access keys are public by design).
export const WEB3FORMS_KEY = '4e6c6104-b943-4aa8-a9c1-e052336ec4c0';

// Lead gateway (Cloudflare Worker) — tried first, Web3Forms is the fallback.
export const GATEWAY_URL = 'https://lead-gateway.sachindeepcleaning.workers.dev';
export const SITE_KEY = 'SACHIN-SHOP';

// Core business claims (from the high-converting landing page).
// Rollback: the previous Formspree form ID was 'xdaqkbwa'.
// export const FORMSPREE_ID = 'xdaqkbwa';

export const STARTING_PRICE = '₹2,000';
export const PHONE_HREF = PHONE_TEL;
export const ADDRESS = 'Serving all areas of Gurgaon, Haryana';

// ─── Entity (NAP) — single source of truth ──────────────────────────────────
// Must match the Google Business Profile exactly. If the GBP changes, change it here.
//
// SINGLE BRAND: Sachin Deep Cleaning is the only brand this site represents.
// There is no second trading name anywhere on the domain — a second brand name
// splits the Knowledge Graph into two entities and halves the local signal
// for both.
//
// The address below is the ONE address used everywhere on the site (footer,
// contact, About, JSON-LD, llms.txt, sitemap captions, Maps links). The earlier
// "Sector 27, Sector 43" double was removed because a single shop cannot be in
// two sectors, and the block letter is Block B (confirmed 2026-10-22).
// Change it here only — every other file reads from here.
export const BRAND_NAME = 'Sachin Deep Cleaning';

// Address exactly as shown on the Google Business Profile.
export const ADDRESS_PARTS = {
  streetAddress: 'Shop No-B, 747B, Sushant Lok Rd, Block B, Sector 43',
  addressLocality: 'Gurugram',
  addressRegion: 'Haryana',
  postalCode: '122009',
  addressCountry: 'IN',
};
// Derived from ADDRESS_PARTS — one address, one place, no drift.
export const ADDRESS_FULL =
  `${ADDRESS_PARTS.streetAddress}, ${ADDRESS_PARTS.addressLocality}, ` +
  `${ADDRESS_PARTS.addressRegion} ${ADDRESS_PARTS.postalCode}`;

// Coordinates — one place, used by the meta geo tags and the JSON-LD.
export const GEO = { latitude: 28.4538, longitude: 77.0782 };

// Google rating — copy from the live GBP, never estimate. Every on-page claim,
// the JSON-LD and llms.txt read from here; scripts/content-lint.mjs fails the
// build if copy states a different review count.
//
// [VERIFY] Re-check this against the live GBP before each deploy. If the live
// count has moved, update `count` here and nothing else — do NOT edit the
// number anywhere else, and never invent a count.
export const RATING = {
  value: '4.4',
  count: 80,
  asOf: '2026-10-09',
  source: 'Google Business Profile',
};

// Date the money-page content (prices, rating, address) was last reviewed.
// Bump this ONLY when that content really changes. It drives the visible
// "Updated" line, WebPage.dateModified and sitemap lastmod for non-article pages.
export const CONTENT_UPDATED = '2026-10-09';
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
// Google Maps link for the business.
//
// This is a SEARCH for the brand name plus the single street address — not a
// place URL and not a review URL. It is used for `hasMap` and for the
// "open in Google Maps" button, both of which need to resolve to a location.
//
// There is deliberately NO "Review us on Google" link. A review CTA that is
// built from a search can land on a different business's listing, which sends
// the customer to the wrong place and confirms a second Knowledge Graph
// entity. If a review link is wanted later, it must be the real GBP review
// URL for this listing — add it here and use it in one place.
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BRAND_NAME} ${ADDRESS_FULL}`)}`;

export const SOCIAL = {
  facebook: 'https://www.facebook.com/profile.php?id=61577737535478',
  instagram: 'https://www.instagram.com/cleaning_service_in_gurgaon',
  youtube: 'https://www.youtube.com/@Cleaning_service_in_Gurgaon',
  twitter: 'https://x.com/sachindeepclean',
  whatsapp: WHATSAPP,
};

// The profiles that identify this business on the web, in the order they
// should appear in schema.org `sameAs`.
//
// [VERIFY] When the Google Business Profile URL is available, add it as the
// first entry — `sameAs` is how a crawler confirms that the website and the
// social profiles all describe ONE business. Until then the list carries the
// three profiles that are confirmed to be ours, and nothing else.
export const SAME_AS = [
  SOCIAL.facebook,
  SOCIAL.instagram,
  SOCIAL.youtube,
];

export const AREAS = [
  'DLF Phase 1-5', 'Sohna Road', 'Golf Course Road', 'Cyber City', 'MG Road',
  'Palam Vihar', 'Sector 14 - 57', 'Vatika City', 'South City',
  'Nirvana Country', 'Ardee City', 'New Colony', 'Huda Sectors', 'Manesar',
];