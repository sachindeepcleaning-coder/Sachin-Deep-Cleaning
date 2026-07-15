// Single source of truth for all 16 pages (MPA entries).
// `page` tells src/bootstrap.jsx which React component to mount.
// `serviceKey` (for page === 'service') maps to content in src/lib/services.js.

// Canonical base used for <link rel="canonical"> and OG url.
// Swap to your custom domain (e.g. https://sachindeepcleaning.com) when ready.
export const SITE_URL = 'https://sachindeepcleaning-coder.github.io/Sachin-Deep-Cleaning';
export const SITE_NAME = 'Sachin Deep Cleaning';
export const OG_IMAGE = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80';

export const pages = [
  {
    file: 'index', page: 'index',
    title: 'Sachin Deep Cleaning — Home Deep Cleaning Services in Gurgaon',
    description: 'Professional home deep cleaning in Gurgaon: sofas, bathrooms, kitchens & full-house makeovers. Trained staff, eco-friendly products, 100% satisfaction. Book on WhatsApp.',
  },
  {
    file: 'contact', page: 'contact',
    title: 'Contact Sachin Deep Cleaning — Book Deep Cleaning in Gurgaon',
    description: 'Get a free quote for home deep cleaning in Gurgaon. Call or WhatsApp +91 9267905943. Serving all sectors across Gurgaon, Haryana.',
  },
  {
    file: 'thank-you', page: 'thank-you',
    title: 'Thank You — Sachin Deep Cleaning',
    description: 'Thanks for contacting Sachin Deep Cleaning. We will call you back shortly to confirm your booking.',
  },
  {
    file: 'deep-cleaning-services-in-gurgaon', page: 'service', serviceKey: 'deep',
    title: 'Deep Cleaning Services in Gurgaon | Sachin Deep Cleaning',
    description: 'Comprehensive deep cleaning services across Gurgaon — floors, walls, furniture, sanitization. Trusted local professionals. Book via WhatsApp.',
  },
  {
    file: 'house-cleaning-services-in-gurgaon', page: 'service', serviceKey: 'house',
    title: 'House Cleaning Services in Gurgaon | Sachin Deep Cleaning',
    description: 'Regular & deep house cleaning services in Gurgaon. Reliable, affordable, eco-friendly. Get a free estimate on WhatsApp.',
  },
  {
    file: 'full-home-deep-cleaning-1bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 1,
    title: '1 BHK Full Home Deep Cleaning in Gurgaon | Sachin Deep Cleaning',
    description: '1 BHK full-home deep cleaning in Gurgaon — every room, floor to ceiling. Transparent pricing, trained cleaners. Book now.',
  },
  {
    file: 'full-home-deep-cleaning-2bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 2,
    title: '2 BHK Full Home Deep Cleaning in Gurgaon | Sachin Deep Cleaning',
    description: '2 BHK full-home deep cleaning in Gurgaon — kitchens, bathrooms, bedrooms & living areas. Book via WhatsApp.',
  },
  {
    file: 'full-home-deep-cleaning-3bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 3,
    title: '3 BHK Full Home Deep Cleaning in Gurgaon | Sachin Deep Cleaning',
    description: '3 BHK full-home deep cleaning in Gurgaon. Thorough, eco-friendly, on-time. Get a free quote today.',
  },
  {
    file: 'full-home-deep-cleaning-4bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 4,
    title: '4 BHK Full Home Deep Cleaning in Gurgaon | Sachin Deep Cleaning',
    description: '4 BHK full-home deep cleaning in Gurgaon. Big homes, spotless results. Trained team, satisfaction guarantee.',
  },
  {
    file: 'full-home-deep-cleaning-5bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 5,
    title: '5 BHK Full Home Deep Cleaning in Gurgaon | Sachin Deep Cleaning',
    description: '5 BHK full-home deep cleaning in Gurgaon. Comprehensive service for large homes. Book on WhatsApp.',
  },
  {
    file: 'kitchen-deep-cleaning-gurgaon', page: 'service', serviceKey: 'kitchen',
    title: 'Kitchen Deep Cleaning in Gurgaon | Sachin Deep Cleaning',
    description: 'Kitchen deep cleaning in Gurgaon — chimney degreasing, cabinets, countertops & appliances. Hygienic cooking space.',
  },
  {
    file: 'bathroom-deep-cleaning-gurgaon', page: 'service', serviceKey: 'bathroom',
    title: 'Bathroom Deep Cleaning in Gurgaon | Sachin Deep Cleaning',
    description: 'Bathroom deep cleaning in Gurgaon — descaling tiles, faucets, commodes & exhaust fans. Germ-free, sparkling.',
  },
  {
    file: 'sofa-shampoo-cleaning-gurgaon', page: 'service', serviceKey: 'sofa',
    title: 'Sofa Shampoo Cleaning in Gurgaon | Sachin Deep Cleaning',
    description: 'Sofa & upholstery shampoo cleaning in Gurgaon. Stain removal, odor control, fabric-safe. Book via WhatsApp.',
  },
  {
    file: 'carpet-shampoo-cleaning-gurgaon', page: 'service', serviceKey: 'carpet',
    title: 'Carpet Shampoo Cleaning in Gurgaon | Sachin Deep Cleaning',
    description: 'Carpet shampoo cleaning in Gurgaon — deep stain & dust-mite removal. Revive your carpets today.',
  },
  {
    file: 'office-deep-cleaning-gurgaon', page: 'service', serviceKey: 'office',
    title: 'Office Deep Cleaning in Gurgaon | Sachin Deep Cleaning',
    description: 'Office & commercial deep cleaning in Gurgaon. Cabins, pantries, washrooms & floors. Minimal business disruption.',
  },
  {
    file: 'move-in-move-out-cleaning-gurgaon', page: 'service', serviceKey: 'move',
    title: 'Move-In / Move-Out Cleaning in Gurgaon | Sachin Deep Cleaning',
    description: 'Move-in & move-out deep cleaning in Gurgaon. Leave or enter a spotless home. End-to-end service.',
  },
];
