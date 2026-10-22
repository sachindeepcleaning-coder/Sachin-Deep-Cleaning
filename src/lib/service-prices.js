// Price card — the single source of truth for every service's starting price.
//
// WHY A SEPARATE FILE: services.js is ~75 KB (the per-BHK essays, the FAQs and
// the price-check tables). The cost guide needs exactly one number from it —
// the deep-cleaning starting price — and importing services.js for that pulled
// the whole 75 KB chunk into EVERY article page. The prices live here instead
// and services.js imports from this file, so there is still one source of
// truth and the article chunk stays small.
//
// scripts/content-lint.mjs fails the build if the rendered Service schema
// price and this file disagree.

export const SERVICE_PRICES = {
  deep: { label: 'Starting from', amount: '₹2,000' },
  house: { label: 'Starting from', amount: '₹499' },
  kitchen: { label: 'Starting from', amount: '₹1,500' },
  bathroom: { label: 'Starting from', amount: '₹800' },
  sofa: { label: 'Starting from', amount: '₹499' },
  carpet: { label: 'Per square foot (shampoo extraction)', amount: '₹18' },
  office: { label: 'Small office from', amount: '₹5,000' },
  move: { label: 'Starting from', amount: '₹1,999' },
  fullhome: { label: 'Starting from', amount: '₹2,500' },
};

// Fixed BHK price card (1–5) and the matching sq-ft bands.
export const PRICE_BY_BHK = {
  1: '₹2,500',
  2: '₹4,500',
  3: '₹5,500',
  4: '₹6,500',
  5: '₹9,000',
};

export const SQFT_BY_BHK = {
  1: '400–600 sq ft',
  2: '601–1,000 sq ft',
  3: '1,001–1,500 sq ft',
  4: '1,501–2,100 sq ft',
  5: '2,500–3,000 sq ft',
};
