// Central site + analytics config for Sachin Deep Cleaning.
// Single source of truth shared across all React components.

export const SITE_URL = 'https://sachindeepcleaning.shop';
export const SITE_NAME = 'Sachin Deep Cleaning';

export const PHONE = '+91 92679-05943';
export const PHONE_TEL = 'tel:+919267905943';
export const WHATSAPP_NUMBER = '919267905943';
export const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`;

// Pre-filled WhatsApp links for the template CTAs.
export const WA_BOOK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi I want to book deep cleaning service in Gurgaon.')}`;
export function waMsg(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// Analytics — Google Tag Manager only (GA4 removed; old project had GTM only).
export const GTM_ID = 'GTM-P4KVBGRK';

// Netlify Forms handles lead capture (works when deployed to Netlify).
export const NETLIFY_FORM_NAME = 'lead-quote';

// Core business claims (from the high-converting landing page).
// Legacy Formspree (kept for older pages accepting leads until migrated).
export const FORMSPREE_ID = 'xdaqkbwa';

export const STARTING_PRICE = '₹1,999';
export const PHONE_HREF = PHONE_TEL;
export const ADDRESS = 'Serving all areas of Gurgaon, Haryana';
export const SOCIAL = {
  facebook: 'https://www.facebook.com/profile.php?id=61577737535478',
  instagram: 'https://www.instagram.com/cleaning_service_in_gurgaon',
  whatsapp: WHATSAPP,
};

export const AREAS = [
  'DLF Phase 1-5', 'Sohna Road', 'Golf Course Road', 'Cyber City', 'MG Road',
  'Palam Vihar', 'Sector 14 - 57', 'Vatika City', 'South City',
  'Nirvana Country', 'Ardee City', 'New Colony', 'Huda Sectors', 'Manesar',
];