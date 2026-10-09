// Central site + analytics config for Sachin Deep Cleaning.
// Single source of truth shared across all React components.

export const SITE_URL = 'https://sachindeepcleaning.shop';
export const SITE_NAME = 'Sachin Deep Cleaning';

// Canonical URL for a page. The homepage is served from the root path.
export function pageUrl(file = 'index') {
  return file === 'index' ? `${SITE_URL}/` : `${SITE_URL}/${file}.html`;
}

export const PHONE = '+91 9560739281';
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

// Core business claims (from the high-converting landing page).
// Legacy Formspree (kept for older pages accepting leads until migrated).
export const FORMSPREE_ID = 'xdaqkbwa';

export const STARTING_PRICE = '₹2,000';
export const PHONE_HREF = PHONE_TEL;
export const ADDRESS = 'Serving all areas of Gurgaon, Haryana';

// ─── Entity (NAP) — single source of truth ──────────────────────────────────
// Must match the Google Business Profile exactly. If the GBP changes, change it here.
export const BRAND_NAME = 'Sachin Deep Cleaning';
// Sachin Deep Cleaning is the primary company. Balaji Cleaning Services and
// A One Deep Cleaning are its sub-companies. GBP_LISTING_NAME is the name the
// Google Maps listing currently shows.
export const GBP_LISTING_NAME = 'Balaji Cleaning Services';
export const SECOND_SITE = 'https://balajicleaningservice.shop/';
export const SUB_BRANDS = [
  { name: 'Balaji Cleaning Services', url: SECOND_SITE },
  { name: 'A One Deep Cleaning' },
];
export const SUB_BRANDS_TEXT = 'Balaji Cleaning Services and A One Deep Cleaning';

// Address exactly as shown on the Google Business Profile (checked 2026-10-09).
export const ADDRESS_PARTS = {
  streetAddress: 'Shop No-B, 747B, Sushant Lok Rd, Block D, Sector 27, Sector 43',
  addressLocality: 'Gurugram',
  addressRegion: 'Haryana',
  postalCode: '122009',
  addressCountry: 'IN',
};
export const ADDRESS_FULL =
  'Shop No-B, 747B, Sushant Lok Rd, Block D, Sector 27, Sector 43, Gurugram, Haryana 122009';
export const PLUS_CODE = 'F33H+G7 Gurugram';

// Derived from the GBP plus code F33H+G7 (approx. 14 m). Confirm in Google Maps
// (right-click the pin) and update if it differs.
export const GEO = { latitude: 28.4538, longitude: 77.0782 };

// Google rating — copy from the live GBP, never estimate. Every on-page claim,
// the JSON-LD and llms.txt read from here; scripts/content-lint.mjs fails the
// build if copy states a different review count.
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
export const SOCIAL = {
  facebook: 'https://www.facebook.com/profile.php?id=61577737535478',
  instagram: 'https://www.instagram.com/cleaning_service_in_gurgaon',
  youtube: 'https://www.youtube.com/@Cleaning_service_in_Gurgaon',
  twitter: 'https://x.com/sachindeepclean',
  whatsapp: WHATSAPP,
};

export const AREAS = [
  'DLF Phase 1-5', 'Sohna Road', 'Golf Course Road', 'Cyber City', 'MG Road',
  'Palam Vihar', 'Sector 14 - 57', 'Vatika City', 'South City',
  'Nirvana Country', 'Ardee City', 'New Colony', 'Huda Sectors', 'Manesar',
];