// schema.jsx — SEO / AEO / GEO structured data for sachindeepcleaning.shop.
//
// Entity graph (every @id below is stable and cross-referenced):
//   #website      → WebSite            (homepage only, for the Google site name)
//   #business     → LocalBusiness      (homepage + money pages)
//   #organization → Organization       (About page — the legal entity)
//   #person       → Person             (Sachin Kumar, founder)
//   <url>#webpage → WebPage            (every indexable page)
//   <url>#article → BlogPosting        (every guide)
//   <url>#faq     → FAQPage
//   <url>#howto   → HowTo              (service pages)
//   <url>#service → Service
//   <url>#crumb   → BreadcrumbList
//
// Rules that matter:
//   - A referenced @id must either be defined on the same page OR carry its
//     @type inline, so the graph is self-describing to a crawler that only
//     fetches one document.
//   - localBusinessSchema().url is ALWAYS the homepage. A multi-page business
//     must not advertise 18 different `url` values under one @id.
//   - Never invent a second @type for an existing @id (that is how you end up
//     with "Organization" and "LocalBusiness" both claiming #business).

import {
  PHONE, SOCIAL, SITE_URL, BRAND_NAME, GBP_LISTING_NAME,
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

// Stable entity ids.
export const IDS = {
  website: `${SITE_URL}/#website`,
  business: `${SITE_URL}/#business`,
  organization: `${SITE_URL}/#organization`,
  person: `${SITE_URL}/about.html#sachin-kumar`,
};

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

// Sister brands of Sachin Deep Cleaning — disclosed on-page (About, contact
// and the Top-5 comparison guides) and declared here so the entity graph
// does not treat them as unrelated third parties.
const SUB_BRANDS = [
  { '@type': 'Organization', '@id': `${SITE_URL}/#subbrand-balaji`, name: 'Balaji Cleaning Services', url: 'https://balajicleaningservice.shop/' },
  { '@type': 'Organization', '@id': `${SITE_URL}/#subbrand-aone`, name: 'A One Deep Cleaning', url: 'https://aonedeepcleaning.com/' },
];

// ─── WebSite (site name for Google Search) ─────────────────────────────────
// Google's site-name system reads the `name` here on the HOMEPAGE only.
// Keep it identical to the brand everywhere (titles, og:site_name, GBP).
// Emitted solely by IndexPage.jsx — never add to other pages.
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': IDS.website,
    url: `${SITE_URL}/`,
    name: 'Sachin Deep Cleaning',
    inLanguage: 'en-IN',
    publisher: {
      '@id': IDS.business,
      '@type': 'LocalBusiness',
      name: BRAND_NAME,
    },
  };
}

// ─── LocalBusiness ──────────────────────────────────────────────────────────
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': IDS.business,
    name: BRAND_NAME,
    description:
      'Professional home deep cleaning services in Gurgaon — sofas, bathrooms, kitchens, carpets, offices and full-house makeovers. Eco-friendly products, trained staff, pay after satisfaction.',
    telephone: PHONE,
    email: 'contact@sachindeepcleaning.shop',
    // A multi-page business advertises its HOME page here, not the current URL.
    url: `${SITE_URL}/`,
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
    foundingDate: '2015',
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
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.youtube, SOCIAL.twitter],
    subOrganization: SUB_BRANDS,
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
    '@id': `${url}#service`,
    name,
    description,
    url,
    image: image ? `${SITE_URL}${image}` : `${SITE_URL}/images/cleaning-1.jpg`,
    provider: {
      '@id': IDS.business,
      '@type': 'LocalBusiness',
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
export function faqSchema(items, url = '') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(url ? { '@id': `${url}#faq` } : {}),
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
export function howToSchema({ name, description, steps, totalTime, estimatedCost, image, serviceKey, url = '' }) {
  const tools = (HOW_TO_TOOLS[serviceKey] || HOW_TO_TOOLS.deep).map((t) => ({ '@type': 'HowToTool', name: t }));
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    ...(url ? { '@id': `${url}#howto` } : {}),
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
      '@id': IDS.business,
      '@type': 'LocalBusiness',
      name: BRAND_NAME,
    },
  };
}

// ─── Article ────────────────────────────────────────────────────────────────
// Use on: blog articles — BlogPosting with Person (E-E-A-T).
export function articleSchema({ title, description, url, datePublished, dateModified, image }) {
  const [w, h] = imageDims(image || '/images/cleaning-1.jpg');
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
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
      '@id': IDS.person,
      '@type': 'Person',
      name: 'Sachin Kumar',
      url: IDS.person,
      sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.youtube, SOCIAL.twitter],
    },
    publisher: {
      '@id': IDS.business,
      '@type': 'LocalBusiness',
      name: 'Sachin Deep Cleaning',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/app_icon.png`,
      },
    },
    // Must point at the WebPage node that actually exists on this page.
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${url}#webpage` },
    isPartOf: { '@id': IDS.website, '@type': 'WebSite' },
    inLanguage: 'en-IN',
  };
}

// ─── Breadcrumb ─────────────────────────────────────────────────────────────
export function breadcrumbSchema(items, url = '') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    ...(url ? { '@id': `${url}#crumb` } : {}),
    itemListElement: items.map((i, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: i.name,
      item: i.url,
    })),
  };
}

// ─── WebPage + Speakable (GEO / voice) ──────────────────────────────────────
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
    isPartOf: { '@id': IDS.website, '@type': 'WebSite', name: 'Sachin Deep Cleaning' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.hero-sub', '.blog-lead', '.key-takeaways', 'h1'],
    },
  };
}

// ─── Organization + Person (About page) ─────────────────────────────────────
// `#organization` is the legal entity; `#business` is the LocalBusiness the
// rest of the site points at. They must never share an @id.
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': IDS.organization,
    name: BRAND_NAME,
    url: `${SITE_URL}/`,
    telephone: PHONE,
    address: { '@type': 'PostalAddress', ...ADDRESS_PARTS },
    areaServed: 'Gurgaon, Haryana, India',
    foundingDate: '2015',
    description: 'Police-verified, eco-friendly deep cleaning team serving Gurgaon. Full-home, kitchen, bathroom, sofa and carpet deep cleaning with pay-after-satisfaction.',
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.youtube, SOCIAL.twitter],
    subOrganization: SUB_BRANDS,
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': IDS.person,
    name: 'Sachin Kumar',
    jobTitle: 'Founder & Lead Cleaning Specialist',
    url: IDS.person,
    image: `${SITE_URL}/images/cleaning-1.webp`,
    sameAs: [SOCIAL.facebook, SOCIAL.instagram],
    worksFor: { '@id': IDS.organization, '@type': 'Organization', name: BRAND_NAME },
    knowsAbout: ['Deep Cleaning', 'House Cleaning', 'Bathroom Descaling', 'Kitchen Degreasing', 'Gurgaon'],
    description: `Founder of Sachin Deep Cleaning, 10+ years hands-on deep cleaning in Gurgaon — DLF to Sohna Road, rated ${RATING.value} on Google from ${RATING.count} reviews, police-verified team lead.`,
  };
}

// ─── HowTo configs for each service ─────────────────────────────────────────
// Consumed by ServicePage.jsx — `process` steps map 1:1 onto HowToStep.
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
