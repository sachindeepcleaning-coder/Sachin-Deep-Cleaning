// Content for data-driven service pages. Keyed by `serviceKey` from pages.config.mjs.
// `fullhome` supports a `bhk` number (1–5) for tailored copy/pricing.

const base = {
  deep: {
    name: 'Deep Cleaning Services in Gurgaon',
    tagline: 'A top-to-bottom refresh for every corner of your home.',
    intro:
      'Our deep cleaning service goes far beyond routine sweeping — we scrub, descale, sanitize and detail every surface so your home feels genuinely new.',
    includes: [
      'Floor & tile scrubbing and polishing',
      'Wall, ceiling and fixture dusting',
      'Furniture and fixture detailing',
      'Anti-viral sanitization of touch points',
    ],
    process: [
      { step: 1, title: 'Inspection', desc: 'We assess surfaces and pick safe products.' },
      { step: 2, title: 'Deep Clean', desc: 'Every room is cleaned top-to-bottom.' },
      { step: 3, title: 'Sanitize', desc: 'Touch points are disinfected.' },
      { step: 4, title: 'Final Check', desc: 'We walk through with you for sign-off.' },
    ],
    faqs: [
      { q: 'How long does deep cleaning take?', a: 'Typically 4–8 hours depending on home size.' },
      { q: 'Do you bring your own equipment?', a: 'Yes — machines, eco-friendly products and tools are included.' },
    ],
    price: { label: 'Starting from', amount: '₹2,999' },
  },
  house: {
    name: 'House Cleaning Services in Gurgaon',
    tagline: 'Reliable, affordable cleaning for a healthier home.',
    intro:
      'From quick refreshes to scheduled deep cleans, our house cleaning plans keep your Gurgaon home consistently spotless.',
    includes: ['Regular dusting & vacuuming', 'Kitchen & bathroom upkeep', 'Eco-friendly products', 'Flexible scheduling'],
    process: [
      { step: 1, title: 'Book', desc: 'Pick a slot that suits you.' },
      { step: 2, title: 'Clean', desc: 'Our team cleans thoroughly.' },
      { step: 3, title: 'Relax', desc: 'Enjoy a fresh home.' },
    ],
    faqs: [
      { q: 'Can I schedule recurring cleaning?', a: 'Yes — weekly, bi-weekly or monthly plans available.' },
      { q: 'Are products pet-safe?', a: 'We use non-toxic, eco-friendly solutions.' },
    ],
    price: { label: 'Starting from', amount: '₹1,999' },
  },
  kitchen: {
    name: 'Kitchen Deep Cleaning in Gurgaon',
    tagline: 'A hygienic, grease-free cooking space.',
    intro:
      'We degrease chimneys, cabinets, countertops and appliances so your kitchen is safe and sparkling.',
    includes: ['Chimney & exhaust degreasing', 'Cabinet & countertop cleaning', 'Appliance detailing', 'Floor & tile scrub'],
    process: [
      { step: 1, title: 'Prep', desc: 'Clear and protect surfaces.' },
      { step: 2, title: 'Degrease', desc: 'Heavy grease is removed.' },
      { step: 3, title: 'Sanitize', desc: 'Final disinfection.' },
    ],
    faqs: [
      { q: 'Do you clean the chimney filter?', a: 'Yes — filters are degreased and washed.' },
      { q: 'How long does it take?', a: 'Usually 3–4 hours for a standard kitchen.' },
    ],
    price: { label: 'Starting from', amount: '₹1,499' },
  },
  bathroom: {
    name: 'Bathroom Deep Cleaning in Gurgaon',
    tagline: 'Germ-free, sparkling bathrooms.',
    intro:
      'Descaling tiles, faucets, commodes and exhaust fans — we leave your bathroom hygienic and fresh.',
    includes: ['Tile & faucet descaling', 'Commode & basin sanitization', 'Exhaust fan cleaning', 'Floor & grout scrub'],
    process: [
      { step: 1, title: 'Descale', desc: 'Hard-water stains removed.' },
      { step: 2, title: 'Sanitize', desc: 'Germs eliminated.' },
      { step: 3, title: 'Shine', desc: 'Final polish.' },
    ],
    faqs: [
      { q: 'Do you remove hard-water stains?', a: 'Yes — professional descalers are used.' },
      { q: 'Is it safe for kids?', a: 'We use non-toxic, rinse-safe products.' },
    ],
    price: { label: 'Starting from', amount: '₹999' },
  },
  sofa: {
    name: 'Sofa Shampoo Cleaning in Gurgaon',
    tagline: 'Revive your upholstery.',
    intro:
      'Steam and shampoo cleaning removes stains, dust mites and odors from sofas, mattresses and cushions.',
    includes: ['Stain removal', 'Odor control', 'Fabric-safe shampoo', 'Dust-mite treatment'],
    process: [
      { step: 1, title: 'Vacuum', desc: 'Loose dirt removed.' },
      { step: 2, title: 'Shampoo', desc: 'Foam cleaning applied.' },
      { step: 3, title: 'Extract', desc: 'Dirt & moisture pulled out.' },
    ],
    faqs: [
      { q: 'How long to dry?', a: 'Typically 4–6 hours.' },
      { q: 'Is it safe for all fabrics?', a: 'We assess fabric and use suitable methods.' },
    ],
    price: { label: 'Starting from', amount: '₹699 (per seat)' },
  },
  carpet: {
    name: 'Carpet Shampoo Cleaning in Gurgaon',
    tagline: 'Deep clean for brighter carpets.',
    intro:
      'We extract embedded dirt, stains and allergens so your carpets look and feel new.',
    includes: ['Deep stain removal', 'Allergen extraction', 'Odor neutralization', 'Quick drying'],
    process: [
      { step: 1, title: 'Pre-treat', desc: 'Stains spotted.' },
      { step: 2, title: 'Shampoo', desc: 'Agitated clean.' },
      { step: 3, title: 'Extract', desc: 'Rinsed & dried.' },
    ],
    faqs: [
      { q: 'Do you clean rugs too?', a: 'Yes — rugs and carpets both.' },
      { q: 'How long to dry?', a: 'About 4–6 hours.' },
    ],
    price: { label: 'Starting from', amount: '₹999' },
  },
  office: {
    name: 'Office Deep Cleaning in Gurgaon',
    tagline: 'Clean workspaces, fewer sick days.',
    intro:
      'Cabins, pantries, washrooms and floors — we clean with minimal disruption to your business.',
    includes: ['Workstation sanitization', 'Pantry & washroom cleaning', 'Floor scrubbing', 'Glass & partition cleaning'],
    process: [
      { step: 1, title: 'Plan', desc: 'Off-hours scheduling.' },
      { step: 2, title: 'Clean', desc: 'Zones cleaned.' },
      { step: 3, title: 'Verify', desc: 'Quality check.' },
    ],
    faqs: [
      { q: 'Can you clean after hours?', a: 'Yes — we schedule around your operations.' },
      { q: 'Do you sign NDAs?', a: 'Background-checked staff; NDAs available.' },
    ],
    price: { label: 'Quote on', amount: 'request' },
  },
  move: {
    name: 'Move-In / Move-Out Cleaning in Gurgaon',
    tagline: 'Leave it spotless — or move into one.',
    intro:
      'End-to-end cleaning for tenants and owners: every room detailed so you hand over or settle in with confidence.',
    includes: ['Full empty-home clean', 'Kitchen & bathroom sanitization', 'Cabinet interior wipe', 'Floor & wall wash'],
    process: [
      { step: 1, title: 'Assess', desc: 'Scope confirmed.' },
      { step: 2, title: 'Clean', desc: 'Top-to-bottom.' },
      { step: 3, title: 'Handover', desc: 'Ready for keys.' },
    ],
    faqs: [
      { q: 'Do you provide a checklist?', a: 'Yes — for landlord/owner sign-off.' },
      { q: 'How long does it take?', a: '4–8 hours depending on size.' },
    ],
    price: { label: 'Starting from', amount: '₹3,499' },
  },
  fullhome: {
    name: 'Full Home Deep Cleaning',
    tagline: 'Every room, floor to ceiling.',
    intro:
      'A complete deep cleaning of your entire home — bedrooms, living areas, kitchen and bathrooms.',
    includes: ['All rooms cleaned', 'Kitchen & bathroom detail', 'Furniture & fixture care', 'Sanitization'],
    process: [
      { step: 1, title: 'Quote', desc: 'Share your BHK size.' },
      { step: 2, title: 'Schedule', desc: 'Pick a slot.' },
      { step: 3, title: 'Clean', desc: 'Whole home detailed.' },
      { step: 4, title: 'Relax', desc: 'Enjoy a fresh home.' },
    ],
    faqs: [
      { q: 'How long for a 2 BHK?', a: 'Usually 6–8 hours with a 2-person team.' },
      { q: 'Do you move furniture?', a: 'Light furniture is shifted; heavy items on request.' },
    ],
    priceByBhk: { 1: '₹2,499', 2: '₹3,499', 3: '₹4,499', 4: '₹5,499', 5: '₹6,499' },
  },
};

export function getService(serviceKey, bhk) {
  const s = base[serviceKey] || base.deep;
  const out = { ...s };
  if (serviceKey === 'fullhome' && bhk) {
    out.name = `${bhk} BHK Full Home Deep Cleaning`;
    out.price = { label: 'Starting from', amount: s.priceByBhk?.[bhk] || '₹3,499' };
    out.intro = `Complete deep cleaning of your ${bhk} BHK home — bedrooms, living areas, kitchen and bathrooms, done top to bottom.`;
  }
  return out;
}
