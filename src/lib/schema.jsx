// schema.jsx — upgraded for SEO / AI search (GEO).
// Replaces the older minimal schema. Adds:
//   1. localBusinessSchema — expanded areaServed with Gurgaon sectors
//   2. serviceSchema — added telephone + offers + image
//   3. howToSchema — for kitchen/bathroom/sofa/carpet/deep service pages
//   4. articleSchema — for blog articles
//   (reviewsSchema was removed: its Review dates were generated, not real.)

import {
  PHONE, SOCIAL, SITE_URL, BRAND_NAME, GBP_LISTING_NAME, SUB_BRANDS, SECOND_SITE,
  ADDRESS_PARTS, GEO, RATING, PLUS_CODE,
} from './site.js';
import { imageDims } from './image-dims.js';

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Expanded list of Gurgaon service sectors — improves local pack matching.
const SERVICE_AREAS = [
  { '@type': 'City', name: 'Gurgaon' },
  { '@type': 'City', name: 'Gurugram' },
  { '@type': 'AdministrativeArea', name: 'DLF Phase 1' },
  { '@type': 'AdministrativeArea', name: 'DLF Phase 2' },
  { '@type': 'AdministrativeArea', name: 'DLF Phase 3' },
  { '@type': 'AdministrativeArea', name: 'DLF Phase 4' },
  { '@type': 'AdministrativeArea', name: 'DLF Phase 5' },
  { '@type': 'AdministrativeArea', name: 'Sohna Road' },
  { '@type': 'AdministrativeArea', name: 'Golf Course Road' },
  { '@type': 'AdministrativeArea', name: 'Golf Course Extension Road' },
  { '@type': 'AdministrativeArea', name: 'MG Road' },
  { '@type': 'AdministrativeArea', name: 'Sector 14' },
  { '@type': 'AdministrativeArea', name: 'Sector 15' },
  { '@type': 'AdministrativeArea', name: 'Sector 22' },
  { '@type': 'AdministrativeArea', name: 'Sector 45' },
  { '@type': 'AdministrativeArea', name: 'Sector 46' },
  { '@type': 'AdministrativeArea', name: 'Sector 47' },
  { '@type': 'AdministrativeArea', name: 'Sector 49' },
  { '@type': 'AdministrativeArea', name: 'Sector 50' },
  { '@type': 'AdministrativeArea', name: 'Sector 56' },
  { '@type': 'AdministrativeArea', name: 'Sector 57' },
  { '@type': 'AdministrativeArea', name: 'Palam Vihar' },
  { '@type': 'AdministrativeArea', name: 'Sushant Lok' },
  { '@type': 'AdministrativeArea', name: 'South City' },
  { '@type': 'AdministrativeArea', name: 'Vatika City' },
  { '@type': 'AdministrativeArea', name: 'Manesar' },
];

// ─── WebSite (site name for Google Search) ─────────────────────────────────
// Google's site-name system reads the `name` here on the HOMEPAGE only.
// Keep it identical to the brand everywhere (titles, og:site_name, GBP).
// Emitted solely by IndexPage.jsx — never add to other pages.
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'Sachin Deep Cleaning',
    publisher: {
      '@id': `${SITE_URL}/#business`,
    },
  };
}

// ─── LocalBusiness ──────────────────────────────────────────────────────────
export function localBusinessSchema({ url }) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${SITE_URL}/#business`,
    name: BRAND_NAME,
    subOrganization: SUB_BRANDS.map((b) => ({ '@type': 'Organization', name: b.name, ...(b.url ? { url: b.url } : {}) })),
    description:
      'Professional home deep cleaning services in Gurgaon — sofas, bathrooms, kitchens, carpets, offices and full-house makeovers. Eco-friendly products, trained staff, pay after satisfaction.',
    telephone: PHONE,
    email: 'contact@sachindeepcleaning.shop',
    url,
    logo: `${SITE_URL}/images/app_icon.png`,
    image: [
      `${SITE_URL}/images/cleaning-1.jpg`,
      `${SITE_URL}/images/full-home-deep-cleaning.jpg`,
      `${SITE_URL}/images/kitchen-deep-cleaning.webp`,
    ],
    priceRange: '₹499 - ₹9,000',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Bank Transfer',
    areaServed: SERVICE_AREAS,
    address: {
      '@type': 'PostalAddress',
      ...ADDRESS_PARTS,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: RATING.value,
      reviewCount: String(RATING.count),
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
    // Replace with the official share link from the Google Maps listing when available.
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${GBP_LISTING_NAME} ${PLUS_CODE}`)}`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Deep Cleaning Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Deep Cleaning', description: 'Full home deep cleaning service in Gurgaon' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kitchen Deep Cleaning', description: 'Chimney degreasing and kitchen sanitization' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bathroom Deep Cleaning', description: 'Tile descaling and commode sanitization' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sofa Shampoo Cleaning', description: 'Upholstery shampoo and steam extraction' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Carpet Shampoo Cleaning', description: 'Hot water extraction carpet cleaning' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Office Deep Cleaning', description: 'Commercial office cleaning Gurgaon' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Move-In Move-Out Cleaning', description: 'Handover deep cleaning for empty flats' } },
      ],
    },
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.youtube, SOCIAL.twitter, SECOND_SITE],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['Hindi', 'English'],
    },
  };
}

// ─── Service ────────────────────────────────────────────────────────────────
export function serviceSchema({ name, description, url, price, image }) {
  const hasOffer = price && price.amount !== 'request';
  // Parse '₹499 / seat' -> value '499', unit 'seat'; '₹18 / sq ft' -> '18' / 'sq ft'.
  // Plain amounts ('₹2,000') yield value only, no unitText.
  let parsed = null;
  if (hasOffer) {
    const [pricePart, unitPart] = price.amount.split('/').map((s) => s.trim());
    parsed = {
      value: pricePart.replace('₹', '').replace(/,/g, '').trim(),
      unit: unitPart || null,
    };
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    image: image ? `${SITE_URL}${image}` : `${SITE_URL}/images/cleaning-1.jpg`,
    provider: {
      '@id': `${SITE_URL}/#business`,
      name: BRAND_NAME,
      telephone: PHONE,
    },
    areaServed: SERVICE_AREAS,
    serviceType: name,
    ...(hasOffer && {
      offers: {
        '@type': 'Offer',
        price: parsed.value,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url,
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: parsed.value,
          priceCurrency: 'INR',
          description: price.label,
          ...(parsed.unit ? { unitText: parsed.unit } : {}),
        },
      },
    }),
  };
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

// ─── HowTo ──────────────────────────────────────────────────────────────────
// Use on: kitchen, bathroom, sofa, carpet, deep-cleaning service pages.
// Each step maps directly to the service's `process` array.
const HOW_TO_TOOLS = {
  deep: ['Microfiber cloths', 'Floor scrubbing machine', 'Extension pole & duster', 'HEPA vacuum cleaner'],
  fullhome: ['Microfiber cloths', 'Floor scrubbing machine', 'Extension pole & duster', 'HEPA vacuum cleaner'],
  kitchen: ['Food-safe degreaser', 'Steam extraction machine', 'Microfiber cloths', 'Chimney dismantle tools'],
  bathroom: ['Professional descaling solution', 'Grout brush', 'Microfiber cloths', 'Mould remover'],
  sofa: ['Fabric-safe shampoo', 'Hot-water extraction machine', 'Stain pre-treatment spray', 'Low-moisture dryer'],
  carpet: ['Fibre-safe shampoo', 'Hot-water extraction machine', 'Stain pre-treatment spray', 'Air movers for drying'],
  house: ['Microfiber cloths', 'HEPA vacuum cleaner', 'Multi-surface mop', 'Eco-friendly spray bottles'],
  office: ['Commercial vacuum', 'Glass cleaning kit', 'Disinfectant spray', 'Floor scrubber'],
  move: ['Heavy-duty degreaser', 'Wall spot-cleaning kit', 'Floor scrubbing machine', 'Window cleaning kit'],
};
export function howToSchema({ name, description, steps, totalTime, estimatedCost, image, serviceKey }) {
  const tools = (HOW_TO_TOOLS[serviceKey] || HOW_TO_TOOLS.deep).map((t) => ({ '@type': 'HowToTool', name: t }));
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime,
    ...(estimatedCost ? {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'INR',
        value: estimatedCost,
      },
    } : {}),
    image: image ? `${SITE_URL}${image}` : `${SITE_URL}/images/cleaning-1.jpg`,
    tool: tools,
    step: steps.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.title,
      text: s.desc,
    })),
    performer: {
      '@id': `${SITE_URL}/#business`,
    },
  };
}

// ─── Article ────────────────────────────────────────────────────────────────
// Use on: blog articles — BlogPosting with Person (E-E-A-T, audit 70→90)
export function articleSchema({ title, description, url, datePublished, dateModified, image }) {
  const [w, h] = imageDims(image || '/images/cleaning-1.jpg');
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    image: {
      '@type': 'ImageObject',
      url: image ? `${SITE_URL}${image}` : `${SITE_URL}/images/cleaning-1.jpg`,
      width: w,
      height: h,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: 'Sachin Kumar',
      url: `${SITE_URL}/about.html#sachin-kumar`,
      sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.youtube, SOCIAL.twitter],
    },
    publisher: {
      '@id': `${SITE_URL}/#business`,
      name: 'Sachin Deep Cleaning',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/app_icon.png`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

// ─── Breadcrumb ─────────────────────────────────────────────────────────────
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((i, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: i.name,
      item: i.url,
    })),
  };
}

// ─── WebPage + Speakable (GEO / voice) ──────────────────────────────────────
// Exported helper only — NOT wired into pages (another agent handles wiring).
export function webpageSchema({ title, description, url, dateModified }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'en-IN',
    ...(dateModified ? { dateModified } : {}),
    isPartOf: { '@id': `${SITE_URL}/#website` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.hero-sub', '.blog-lead', 'h1'],
    },
  };
}

// ─── HowTo configs for each service ─────────────────────────────────────────
// Import in ServicePage.jsx and pass to howToSchema() based on serviceKey.
export const HOW_TO_CONFIGS = {
  deep: {
    name: 'How to Deep Clean a Home in Gurgaon',
    description: 'Step-by-step professional deep cleaning process used by Sachin Deep Cleaning for Gurgaon homes.',
    totalTime: 'PT8H',
    estimatedCost: '2000',
  },
  fullhome: {
    name: 'How to Deep Clean a Full Home in Gurgaon',
    description: 'Complete step-by-step full home deep cleaning process by BHK size — Sachin Deep Cleaning Gurgaon.',
    totalTime: 'PT8H',
    estimatedCost: '2500',
  },
  house: {
    name: 'How to Clean a House Professionally',
    description: 'The standard house cleaning process followed by Sachin Deep Cleaning in Gurgaon.',
    totalTime: 'PT3H',
    estimatedCost: '499',
  },
  kitchen: {
    name: 'How to Deep Clean a Kitchen in Gurgaon',
    description: 'Professional kitchen deep cleaning — chimney, hob, cabinets and tiles — step by step.',
    totalTime: 'PT4H',
    estimatedCost: '1500',
  },
  bathroom: {
    name: 'How to Deep Clean a Bathroom',
    description: 'Remove hard-water stains, limescale and mould — professional bathroom deep cleaning process.',
    totalTime: 'PT2H',
    estimatedCost: '800',
  },
  sofa: {
    name: 'How to Shampoo Clean a Sofa',
    description: 'Professional sofa shampoo cleaning and stain removal process using hot-water extraction.',
    totalTime: 'PT2H',
    estimatedCost: '499',
  },
  carpet: {
    name: 'How to Shampoo Clean a Carpet',
    description: 'Hot-water extraction carpet cleaning — step-by-step professional process.',
    totalTime: 'PT3H',
  },
  office: {
    name: 'How to Deep Clean an Office',
    description: 'Professional office deep cleaning process — workstations, pantry, washrooms and floors.',
    totalTime: 'PT6H',
    estimatedCost: '5000',
  },
  move: {
    name: 'How to Clean a Home for Move-In or Move-Out',
    description: 'End-to-end handover deep cleaning process for empty flats in Gurgaon.',
    totalTime: 'PT6H',
    estimatedCost: '3000',
  },
};
