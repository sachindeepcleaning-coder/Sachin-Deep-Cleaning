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
  office: { label: 'Small office from ₹5,000; larger sites from ₹3/sq ft', amount: '₹5,000' },
  move: { label: 'Starting from', amount: '₹1,999' },
  fullhome: { label: 'Starting from', amount: '₹2,500' },

  // ── New service pages added 2026-10-22 (queries we already rank top-8 for) ──
  watertank: { label: 'Starting from', amount: '₹399' },
  toilettank: { label: 'Per tank', amount: '₹499' },
  facade: { label: 'Per sq ft', amount: '₹3' },
  commonarea: { label: 'Per visit', amount: '₹499' },
  sweeper: { label: 'Per visit', amount: '₹499' },
  lift: { label: 'Per lift', amount: '₹1,499' },
  windowgrill: { label: 'Per window', amount: '₹399' },
  utensils: { label: 'Starting from', amount: '₹299' },
  road: { label: 'Per sq ft', amount: '₹6' },
  chandelier: { label: 'Per unit', amount: '₹999' },
  washingmachine: { label: 'Per unit', amount: '₹799' },
  chairclean: { label: 'Per chair', amount: '₹199' },
  curtain: { label: 'Per set of up to 4 panels', amount: '₹499' },
  basement: { label: 'Per sq ft', amount: '₹12' },
  instantclean: { label: 'Same-day package', amount: '₹799' },
  balconyclean: { label: 'Per balcony', amount: '₹399' },
  sqftrate: { label: 'Per sq ft', amount: '₹3' },
  kitchenplatform: { label: 'Starting from', amount: '₹999' },
  postconstruction: { label: 'Starting from', amount: '₹2,499' },
  roomclean: { label: 'Per room', amount: '₹299' },
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

// The published price SPAN per service, used for the schema.org
// AggregateOffer (lowPrice / highPrice / offerCount). One place, so the
// aggregate offer can never drift from the rate card above.
export const PRICE_RANGES = {
  deep: { low: '2000', high: '9000', offerCount: 6 },
  house: { low: '499', high: '1699', offerCount: 4 },
  kitchen: { low: '1500', high: '2500', offerCount: 3 },
  bathroom: { low: '800', high: '1200', offerCount: 3 },
  sofa: { low: '499', high: '1800', offerCount: 3 },
  carpet: { low: '15', high: '18', offerCount: 2 },
  office: { low: '3000', high: '5000', offerCount: 3 },
  move: { low: '1999', high: '8000', offerCount: 4 },
  fullhome: { low: '2000', high: '9000', offerCount: 6 },

  watertank: { low: '399', high: '1299', offerCount: 4 },
  toilettank: { low: '499', high: '1299', offerCount: 4 },
  facade: { low: '3', high: '4', offerCount: 2 },
  commonarea: { low: '499', high: '2499', offerCount: 5 },
  sweeper: { low: '499', high: '1699', offerCount: 4 },
  lift: { low: '1499', high: '2299', offerCount: 3 },
  windowgrill: { low: '399', high: '549', offerCount: 3 },
  utensils: { low: '299', high: '999', offerCount: 4 },
  road: { low: '4', high: '8', offerCount: 3 },
  chandelier: { low: '999', high: '1999', offerCount: 3 },
  washingmachine: { low: '799', high: '1199', offerCount: 3 },
  chairclean: { low: '199', high: '349', offerCount: 3 },
  curtain: { low: '499', high: '999', offerCount: 3 },
  basement: { low: '12', high: '18', offerCount: 3 },
  instantclean: { low: '799', high: '1999', offerCount: 4 },
  balconyclean: { low: '399', high: '799', offerCount: 3 },
  sqftrate: { low: '3', high: '3', offerCount: 6 },
  kitchenplatform: { low: '999', high: '1599', offerCount: 4 },
  postconstruction: { low: '2499', high: '4499', offerCount: 3 },
  roomclean: { low: '299', high: '499', offerCount: 3 },
};
