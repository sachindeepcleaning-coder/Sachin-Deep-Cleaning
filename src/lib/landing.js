import { GTM_ID, WHATSAPP_NUMBER, waMsg, AREAS } from './site.js';
import { POLICE_VERIFIED_BADGE } from './claims.js';

// ---- Analytics: GTM custom-event pushes (matches GTM Custom Event triggers) ----
// GTM triggers expect: dataLayer.push({ event: 'phone_call_click' })
// NOTE: never push gtag-style arrays (['event', name, {...}]) here — GTM
// Custom Event triggers ignore arrays. Also: never include PII
// (phone numbers, names) in events. Exactly one object push per call.
function pushEvent(name) {
  try {
    // Route through the shared delegation helper when present so the
    // 250ms dedup window prevents double-firing (React onClick + the
    // document-level listener in public/tracking.js see the same click).
    if (typeof window !== 'undefined' && typeof window.__sachinPush === 'function') {
      window.__sachinPush(name);
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name });
  } catch (_) { /* no-op */ }
}

// Kept for import compatibility: converts gtag-style calls to the same
// single object push. No array/arguments push, no window.gtag forwarding.
export function gtag(...args) {
  try {
    if (args[0] === 'event' && typeof args[1] === 'string') pushEvent(args[1]);
  } catch (_) { /* no-op */ }
}

export function track(event, params = {}) {
  // Keep the same (event) => { event } signature used by forms, but only
  // forward the event name — extra params are dropped to avoid PII leaks.
  void params;
  pushEvent(event);
}

// Phone click → GTM "phone_call_click" custom event (matches GTM trigger).
export function phoneCallClick() {
  pushEvent('phone_call_click');
}

// WhatsApp click → GTM "whatsapp_click" custom event (matches GTM trigger).
export function whatsappClick() {
  pushEvent('whatsapp_click');
}

export const ANALYTICS = { GTM_ID };

// ---- WhatsApp nudge ----
export function waNudgeLink(name, phone) {
  return waMsg(
    `Hi! 👋 My name is ${name} (+91${phone}). I just submitted a quote on your website. Please share pricing for deep cleaning. Thanks!`
  );
}

// ---- Landing content data (from deep-cleaning2.html) ----

export const SERVICES = [
  {
    icon: '🏠',
    name: 'Full Home Deep Cleaning',
    desc: 'Expert cleaning of every room, every corner. Bedrooms, living area, kitchen, bathrooms, halls, floors, walls, windows & more.',
    price: 'Starting ₹2,000',
  },
];

export const CHECKLIST = [
  ['Bedrooms', 'Dusting, vacuuming, bed cleaning, wardrobe organization, wall & floor cleaning'],
  ['Kitchen', 'Chimney cleaning, stove deep clean, cabinet interior, tiles, exhaust fan, floor grease removal'],
  ['Bathrooms', 'Tiles, grout cleaning, toilet sanitization, mirror polish, exhaust fan, anti-bacterial treatment'],
  ['Living Areas', 'Sofa cleaning, carpet shampooing, window washing, wall wiping, floor polishing'],
  ['Hallways & Passages', 'Thorough sweeping, mopping, wall cleaning, corner dust removal'],
  ['Final Inspection', "Final walkthrough before you pay. Pay only when you're completely happy with the work"],
];

export const HOW_IT_WORKS = [
  ['1', 'Choose your service', 'Pick from 8 deep cleaning services — full home, kitchen, bathroom, sofa, carpet and more.'],
  ['2', 'Confirm your slot', 'Share your name, number and preferred date. Price is locked in before booking is confirmed.'],
  ['3', 'Get a verified pro', 'Police-verified team: ID and background check shown on request. You get the same trained crew near you.'],
  ['4', "Pay after service", 'UPI, cards or wallets — pay only after the job is complete to your satisfaction.'],
];


export const WHY_US = [
  [POLICE_VERIFIED_BADGE.icon, POLICE_VERIFIED_BADGE.title, POLICE_VERIFIED_BADGE.sub],
  ['💰', 'Pay After Cleaning Only', 'Zero advance. You inspect the results and pay only when completely satisfied. No risk whatsoever.'],
  ['⚡', 'Same-Day Service', 'Book before noon and get same-day service. Emergency bookings also available at no extra cost.'],
  ['🌿', 'Safe Eco-Friendly Products', 'Non-toxic cleaning agents. Safe for children, elderly, and pets. No harsh chemical smell.'],
  ['🔄', 'Free Re-Clean Guarantee', "Not happy? Tell us within 3 days and we re-clean the affected area free."],
  ['📋', 'Transparent Pricing', 'Quoted upfront on call. What we say is what you pay. No hidden charges, no surprise additions.'],
];

export const PRICING = [
  {
    size: '1 BHK Deep Clean',
    price: '2,500',
    items: ['Kitchen + 1 Bathroom', 'All rooms & living area', 'Fans, switches & doors', 'Floor mopping', '~4-5 hours · 2 cleaners'],
    pop: false,
  },
  {
    size: '2 BHK Deep Clean',
    price: '4,500',
    items: ['Kitchen + 2 Bathrooms', 'All rooms & living areas', 'Balcony cleaning', 'Fans, switches & doors', '~5-6 hours · 2-3 cleaners'],
    pop: true,
  },
  {
    size: '3 BHK Deep Clean',
    price: '5,500',
    items: ['Kitchen + 2-3 Bathrooms', 'All rooms, study & balcony', 'Sofa vacuum included', 'Fans, switches & doors', '~6-7 hours · 3-4 cleaners'],
    pop: false,
  },
];

export const FAQS = [
  ['How long does a full home deep clean take?', 'Typically 5–10 hours depending on home size. 1BHK: ~4–5 hrs, 2BHK: ~5–6 hrs, 3BHK: ~6–7 hrs. We\u2019ll give you an accurate estimate on the confirmation call.'],
  ['Do I need to arrange equipment or cleaning supplies?', 'No — we bring everything. Professional machines, high-grade tools, and eco-friendly cleaning products are all included in the price. You don\u2019t need to arrange anything.'],
  ['Do I really pay only after the cleaning?', 'Absolutely. We confirm the booking on call, arrive at your scheduled time, complete the cleaning, and you pay only after inspecting the results to your satisfaction. Zero advance payment — ever.'],
  ['Can I book same-day service?', 'Yes! We offer same-day service based on slot availability. Call or fill the form now and we\u2019ll confirm a same-day slot if available. Book before noon for best availability.'],
  ['Is the cleaning team background-verified?', 'Yes. Police-verified team: ID and background check shown on request before the visit, and the team is professionally trained. We take your home\u2019s security as seriously as the quality of cleaning.'],
  ["What if I'm not happy with the cleaning?", "If any area isn't up to your expectation, tell us within 3 days and we'll re-clean the affected area free. Simple as that."],
];

export const AREAS_SERVED = AREAS;

// NOTE: the fake-booking popup, the hourly "slots left" scarcity map and the
// randomised callback-time promise were removed. They were template
// placeholders that generated fake booking notifications and fake scarcity —
// a deceptive-pricing pattern under Google's "Deceptive Pricing" and "Fake
// Urgency" policies, and a trust risk. Real availability is confirmed on the
// call, never faked on the page.

export { WHATSAPP_NUMBER };