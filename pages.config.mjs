// Single source of truth for all pages (MPA entries).
// `page` tells src/bootstrap.jsx which React component to mount.
// `serviceKey` (for page === 'service') maps to content in src/lib/services.js.
// `noindex` pages get <meta name="robots" content="noindex, nofollow">.
//
// Based on the FINAL SEO package (pages-config-updates.mjs) with the fixes:
//   1. INDEX title differentiated from the deep-cleaning page (was identical)
//   2. Titles under 60 characters, descriptions enriched with prices
//   3. Blog article entries + a blog index page
//   4. thank-you flagged noindex

export const SITE_URL = 'https://sachindeepcleaning.shop';
export const SITE_NAME = 'Sachin Deep Cleaning';
export const OG_IMAGE = 'https://sachindeepcleaning.shop/images/cleaning-1.jpg';

export const pages = [
  {
    file: 'index', page: 'index',
    title: 'Full Home Deep Cleaning Gurgaon | From ₹2,500 | Sachin Deep Cleaning',
    description: 'Trusted deep cleaning in Gurgaon since 2024. Full-home from ₹2,500, kitchen, bathroom, sofa & carpet. Pay after satisfaction. Book on WhatsApp: +91 9267905943.',
  },
  {
    file: 'contact', page: 'contact',
    title: 'Book a Deep Clean in Gurgaon | Sachin Deep Cleaning',
    description: 'Get a free quote for home deep cleaning in Gurgaon. Call or WhatsApp +91 9267905943. All sectors served. Same-day slots available.',
  },
  {
    file: 'thank-you', page: 'thank-you',
    title: 'Booking Confirmed — Sachin Deep Cleaning',
    description: 'Thank you for booking Sachin Deep Cleaning. We will call you back within 30 minutes to confirm your slot.',
    noindex: true,
  },
  {
    file: 'about', page: 'about',
    title: 'About Sachin Deep Cleaning | Trusted Team in Gurgaon',
    description: 'Meet the police-verified deep cleaning team in Gurgaon since 2024. Eco-friendly, pay after satisfaction, same-day across DLF & Sohna Road.',
  },

  // ── Service pages ─────────────────────────────────────────────────────────
  {
    file: 'deep-cleaning-services-in-gurgaon', page: 'service', serviceKey: 'deep',
    title: 'Deep Cleaning Services in Gurgaon — Prices & Process',
    description: 'Top-to-bottom deep cleaning in Gurgaon from ₹2,000. Floors, walls, fixtures & furniture. Trained team, eco-friendly products. Book via WhatsApp.',
  },
  {
    file: 'house-cleaning-services-in-gurgaon', page: 'service', serviceKey: 'house',
    title: 'House Cleaning Services in Gurgaon | From ₹499',
    description: 'Regular & one-time house cleaning in Gurgaon from ₹499. Weekly, bi-weekly or monthly plans. Police-verified team, eco-friendly products. Book now.',
  },
  {
    file: 'full-home-deep-cleaning-1bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 1,
    title: '1 BHK Deep Cleaning Gurgaon | Sachin Deep Cleaning',
    description: '1 BHK full home deep cleaning in Gurgaon. Every room floor to ceiling — kitchen, bathroom, bedroom. Transparent pricing. Book on WhatsApp.',
  },
  {
    file: 'full-home-deep-cleaning-2bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 2,
    title: '2 BHK Deep Cleaning Gurgaon | Price & Booking',
    description: '2 BHK full home deep cleaning in Gurgaon. Both bedrooms, kitchen, 2 bathrooms & living area. Trained cleaners, eco-friendly. Book via WhatsApp.',
  },
  {
    file: 'full-home-deep-cleaning-3bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 3,
    title: '3 BHK Deep Cleaning Gurgaon | Sachin Deep Cleaning',
    description: '3 BHK full home deep cleaning in Gurgaon. Thorough, room-by-room service. Eco-friendly products, pay after satisfaction. Get a free quote today.',
  },
  {
    file: 'full-home-deep-cleaning-4bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 4,
    title: '4 BHK Deep Cleaning Gurgaon | Sachin Deep Cleaning',
    description: '4 BHK full home deep cleaning in Gurgaon. Large homes, spotless results. Full team deployed, satisfaction guaranteed. Book on WhatsApp.',
  },
  {
    file: 'full-home-deep-cleaning-5bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 5,
    title: '5 BHK Deep Cleaning Gurgaon | Premium Full-Home',
    description: '5 BHK full home deep cleaning in Gurgaon. Comprehensive luxury home service. Full professional team. Book on WhatsApp or call +91 9267905943.',
  },
  {
    file: 'kitchen-deep-cleaning-gurgaon', page: 'service', serviceKey: 'kitchen',
    title: 'Kitchen Deep Cleaning Gurgaon | Chimney & Hob',
    description: 'Kitchen deep cleaning in Gurgaon — chimney filter degreasing, hob scrub, cabinets & tiles. Food-safe products. Takes 3–4 hrs. Book via WhatsApp.',
  },
  {
    file: 'bathroom-deep-cleaning-gurgaon', page: 'service', serviceKey: 'bathroom',
    title: 'Bathroom Deep Cleaning Gurgaon | Descaling & Tiles',
    description: 'Remove hard-water stains in Gurgaon bathrooms. Tile descaling, commode sanitization, limescale removal. 1.5–2 hrs per bathroom. Book now.',
  },
  {
    file: 'sofa-shampoo-cleaning-gurgaon', page: 'service', serviceKey: 'sofa',
    title: 'Sofa Shampoo Cleaning Gurgaon | ₹499/seat',
    description: 'Sofa shampoo cleaning in Gurgaon from ₹499 per seat. Stain removal, dust-mite extraction, odor neutralization. Fabric-safe. Book via WhatsApp.',
  },
  {
    file: 'carpet-shampoo-cleaning-gurgaon', page: 'service', serviceKey: 'carpet',
    title: 'Carpet Cleaning Gurgaon | ₹15/sq ft Shampoo',
    description: 'Carpet shampoo cleaning in Gurgaon from ₹15/sq ft. Hot-water extraction, stain removal, allergen treatment. Wall-to-wall & rugs. Book now.',
  },
  {
    file: 'office-deep-cleaning-gurgaon', page: 'service', serviceKey: 'office',
    title: 'Office Deep Cleaning Gurgaon | Commercial Cleaning',
    description: 'Office deep cleaning in Gurgaon — workstations, pantries, washrooms, carpets & glass. Scheduled around business hours. Book a free site visit.',
  },
  {
    file: 'move-in-move-out-cleaning-gurgaon', page: 'service', serviceKey: 'move',
    title: 'Move-In Move-Out Cleaning Gurgaon | Empty Flat',
    description: 'Move-in & move-out deep cleaning in Gurgaon. Leave your old flat spotless or enter a fresh one. End-to-end handover cleaning. Book via WhatsApp.',
  },
  {
    file: 'residential-cleaners-near-me', page: 'residential',
    title: 'Residential Cleaners Near Me — Gurgaon | Same-Day',
    description: 'Local residential cleaners in Gurgaon. Police-verified, same-day slots, pay after job is done. Serving DLF, Sohna Rd, Golf Course Rd & all sectors.',
  },
  {
    file: 'all-pages', page: 'allpages', noindex: true,
    title: 'All Services — Sachin Deep Cleaning Gurgaon',
    description: 'Browse all deep cleaning services in Gurgaon: full home, kitchen, bathroom, sofa, carpet, office and move-in/out cleaning by Sachin Deep Cleaning.',
  },

  // ── Blog ──────────────────────────────────────────────────────────────────
  {
    file: 'blog', page: 'blog',
    title: 'Blog — Cleaning Guides & Tips | Sachin Deep Cleaning',
    description: 'Deep cleaning guides for Gurgaon homes: costs by BHK, cleaning frequency, kitchen chimney care, hard water removal and sofa maintenance. Expert tips.',
  },
  {
    file: 'blog/deep-cleaning-cost-gurgaon-2026', page: 'article',
    title: 'Deep Cleaning Cost in Gurgaon 2026 — Full Price Guide',
    description: 'How much does deep cleaning cost in Gurgaon in 2026? Full price breakdown by BHK, service type and what\'s included. Updated August 2026.',
  },
  {
    file: 'blog/how-often-deep-clean-home-india', page: 'article',
    title: 'How Often Should You Deep Clean Your Home in India?',
    description: 'Expert guide on deep cleaning frequency for Indian homes. Seasonal schedules, pre-Diwali tips and signs your home needs a deep clean now.',
  },
  {
    file: 'blog/kitchen-chimney-cleaning-guide', page: 'article',
    title: 'Kitchen Chimney Cleaning Guide — DIY vs Professional',
    description: 'When to clean your kitchen chimney filter, how professionals do it, and why Gurgaon kitchens need it more often. Full guide with pricing.',
  },
  {
    file: 'blog/hard-water-bathroom-stains-gurgaon', page: 'article',
    title: 'How to Remove Hard Water Stains in Gurgaon Bathrooms',
    description: 'Gurgaon\'s hard water leaves limescale and stains fast. How to remove them from tiles, faucets and glass — DIY tips and when to call professionals.',
  },
  {
    file: 'blog/sofa-cleaning-gurgaon-guide', page: 'article',
    title: 'Sofa Shampoo Cleaning in Gurgaon — Complete Guide 2026',
    description: 'Everything about sofa cleaning in Gurgaon: shampoo vs dry clean, price per seat, drying time and how to maintain upholstery between cleans.',
  },
  {
    file: 'blog/kitchen-vs-regular-cleaning', page: 'article',
    title: 'Kitchen Deep Cleaning vs Regular Cleaning — Difference',
    description: 'The clear difference between regular kitchen cleaning and professional kitchen deep cleaning — and why daily wiping alone is not enough in Gurgaon.',
  },
  {
    file: 'blog/move-in-move-out-cleaning-checklist-gurgaon', page: 'article',
    title: 'Move-In / Move-Out Cleaning Checklist for Gurgaon Apartments',
    description: 'The complete move-in / move-out cleaning checklist for Gurgaon flats: kitchen, bathrooms, bedrooms and everything landlords inspect for the deposit.',
  },
  {
    file: 'blog/full-home-deep-cleaning-gurgaon-guide', page: 'article',
    title: 'Full Home Deep Cleaning in Gurgaon — Cost & Checklist 2026',
    description: 'Full home deep cleaning cost in Gurgaon from ₹2,500 (1BHK) to ₹9,000 (5BHK). Checklist, time & what’s included. Updated Aug 2026.',
  },
  {
    file: 'blog/house-cleaning-services-gurgaon-guide', page: 'article',
    title: 'House Cleaning Services in Gurgaon — Price & Booking Guide',
    description: 'House cleaning in Gurgaon from ₹499/visit. Weekly & one-time plans, what’s included & how to choose right. Updated Aug 2026.',
  },
  {
    file: 'blog/deep-cleaning-near-me-gurgaon', page: 'article',
    title: 'Deep Cleaning Near Me in Gurgaon — Sector-Wise Guide',
    description: 'Find deep cleaning near you in Gurgaon — DLF, Sohna Road, Golf Course, Palam Vihar, all sectors. Same-day slots, fixed prices. Updated Aug 2026.',
  },
  {
    file: 'blog/kitchen-deep-cleaning-cost-gurgaon', page: 'article',
    title: 'Kitchen Deep Cleaning Cost in Gurgaon — What’s Included',
    description: 'Kitchen deep cleaning in Gurgaon — chimney, hob, cabinets & tiles. Price ₹1,500-₹2,500, what’s included & how often. Updated Aug 2026.',
  },
  {
    file: 'blog/office-deep-cleaning-gurgaon-guide', page: 'article',
    title: 'Office Deep Cleaning in Gurgaon — Prices & Checklist 2026',
    description: 'Office deep cleaning in Gurgaon from ₹3/sq ft. Workstations, pantry, washrooms & floors. Price list & booking guide. Updated Aug 2026.',
  },
  {
    file: 'blog/bathroom-deep-cleaning-services-gurgaon-guide', page: 'article',
    title: 'Bathroom Deep Cleaning in Gurgaon — Cost & Process',
    description: 'Bathroom deep cleaning in Gurgaon from ₹800/bathroom. Descaling, grout, commode & glass. Price list & process. Updated Aug 2026.',
  },
  {
    file: 'blog/carpet-cleaning-gurgaon-guide', page: 'article',
    title: 'Carpet Cleaning in Gurgaon — Price & Method Guide',
    description: 'Carpet cleaning in Gurgaon from ₹15/sq ft. Shampoo vs dry clean, drying time & price per sq ft for rugs. Updated Aug 2026.',
  },
  {
    file: 'blog/best-deep-cleaning-services-gurgaon', page: 'article',
    title: 'Best Deep Cleaning Services in Gurgaon — How to Choose',
    description: 'Find the best deep cleaning services in Gurgaon. Checklist, pricing traps & what to verify before booking. Updated Aug 2026.',
  },
  {
    file: 'blog/housekeeping-vs-deep-cleaning-gurgaon', page: 'article',
    title: 'Housekeeping vs Deep Cleaning in Gurgaon — What’s Better?',
    description: 'Housekeeping vs deep cleaning in Gurgaon — daily maid vs quarterly deep clean. Cost, scope & when to choose. Updated Aug 2026.',
  },
  {
    file: 'blog/balcony-terrace-cleaning-gurgaon', page: 'article',
    title: 'Balcony & Terrace Cleaning in Gurgaon — Price Guide',
    description: 'Balcony and terrace cleaning in Gurgaon — floor scrub, railing, drain & facade wash. Price & checklist. Updated Aug 2026.',
  },
  {
    file: 'blog/deep-cleaning-all-sectors-gurgaon', page: 'article',
    title: 'Deep Cleaning in Every Sector of Gurgaon — Full Guide 2026',
    description: 'Deep cleaning in every sector of Gurgaon — DLF 1–5, Sohna Road, Golf Course, Palam Vihar, Sectors 14–92, South City, Manesar. Area-wise guide. Updated Aug 2026.',
  },
  {
    file: 'blog/commercial-cleaning-services-gurgaon', page: 'article',
    title: 'Commercial Cleaning Services in Gurgaon — Office & Shops',
    description: 'Commercial cleaning in Gurgaon — offices, shops, clinics & showrooms. Price ₹3–11/sq ft, checklist & after-hours. Updated Aug 2026.',
  },
  {
    file: 'blog/best-home-cleaning-services-gurgaon', page: 'article',
    title: 'Best Home Cleaning Services in Gurgaon — Top 5 Compared',
    description: 'Best home cleaning services in Gurgaon compared — Urban, Safaiwale, NoBroker vs Sachin. Price, verification & guarantee. Updated Aug 2026.',
  },
  {
    file: 'blog/full-house-cleaning-checklist-gurgaon', page: 'article',
    title: 'Full House Cleaning Checklist for Gurgaon Homes — 2026',
    description: 'Full house cleaning checklist for Gurgaon — room, kitchen, bathroom, balcony & windows. Printable list. Updated Aug 2026.',
  },
];
