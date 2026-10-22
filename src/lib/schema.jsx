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
  PHONE, SITE_URL, BRAND_NAME, MAPS_URL, SAME_AS,
  ADDRESS_PARTS, GEO,
} from './site.js';
import { SERVICE_PRICES, PRICE_BY_BHK } from './service-prices.js';
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

// ─── Entity facts (not in site.js) ──────────────────────────────────────────
// The facts page (src/pages/FactsPage.jsx) quotes these and the schema below
// publishes them, so both read the same strings. They live here rather than in
// site.js because site.js is the site/analytics config and carries no entity
// attributes. Move them into site.js the next time that file is opened — one
// definition per fact, never two.
export const FOUNDING_YEAR = '2015';
export const FOUNDER_NAME = 'Sachin Kumar';
export const OPENING_HOURS = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  opens: '08:00',
  closes: '20:00',
};
export const PAYMENT_ACCEPTED = 'Cash, UPI, Bank Transfer';

// The price span of the deep-cleaning service, read from the one price card
// (src/lib/service-prices.js) so no page can quote a range of its own.
export const DEEP_PRICE_RANGE = {
  low: SERVICE_PRICES.deep.amount,
  high: PRICE_BY_BHK[5],
  offerCount: Object.keys(PRICE_BY_BHK).length + 1,
};

// THE BUSINESS IDENTITY — one object, used by every schema on every page.
//
// Requirement: name, telephone, address, url and sameAs must be byte-identical
// on every page, otherwise a crawler sees several slightly different businesses
// and the local/entity signal is split. Building them from one function makes
// that structural rather than a thing to remember.
function identity() {
  return {
    name: BRAND_NAME,
    telephone: PHONE,
    url: `${SITE_URL}/`,
    address: { '@type': 'PostalAddress', ...ADDRESS_PARTS },
    sameAs: [...SAME_AS],
  };
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
  const id = identity();
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': IDS.business,
    name: id.name,
    description:
      'Professional home deep cleaning services in Gurgaon — sofas, bathrooms, kitchens, carpets, offices and full-house makeovers. Eco-friendly products, trained staff, pay after satisfaction.',
    telephone: id.telephone,
    email: 'contact@sachindeepcleaning.shop',
    // A multi-page business advertises its HOME page here, not the current URL.
    url: id.url,
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
    address: id.address,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
    foundingDate: '2015',
    // Where the business is. A brand + address Maps search, which resolves to
    // this listing without depending on a second brand name.
    hasMap: MAPS_URL,
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
    sameAs: id.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['Hindi', 'English'],
    },
  };
}

// ─── AggregateOffer (the price range of a service) ───────────────────────────
// A price is quoted in two places: the single `Offer` (one number, the one a
// customer is asked to pay) and the `AggregateOffer` (the range the service
// spans — ₹2,000 for a 1 RK up to ₹9,000 for a 5 BHK). Answer engines quote
// the range, so it has to be machine-readable too.
//
// schema.org does NOT nest an AggregateOffer inside an Offer, so the two are
// siblings on the Service node: `offers` and `aggregateOffer`.
function numericPrice(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const cleaned = String(value).replace(/[^0-9.]/g, ''); // '₹2,500' → '2500'
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function aggregateOfferSchema({ url, prices, low, high, offerCount }) {
  const nums = (Array.isArray(prices) ? prices : [])
    .map(numericPrice)
    .filter((n) => n !== null);
  const lo = numericPrice(low) ?? (nums.length ? Math.min(...nums) : undefined);
  const hi = numericPrice(high) ?? (nums.length ? Math.max(...nums) : undefined);
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    ...(lo !== undefined ? { lowPrice: lo } : {}),
    ...(hi !== undefined ? { highPrice: hi } : {}),
    offerCount: offerCount ?? nums.length,
    url,
  };
}

// ─── Service ────────────────────────────────────────────────────────────────
// `priceRange` is optional: pass { low, high, offerCount } when the caller
// knows the span of the service and an `aggregateOffer` is emitted next to
// the single `offers` figure. Callers that only know one price (the current
// signature) are unaffected.
export function serviceSchema({ name, description, url, price, image, priceRange }) {
  const id = identity();
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
  // The price span, when the caller knows it. The '@context' is dropped here
  // because the node is embedded in the Service graph, where the context is
  // already declared on the root node.
  let aggregateOffer = null;
  if (priceRange) {
    const { '@context': _context, ...offer } = aggregateOfferSchema({
      url,
      prices: [priceRange.low, priceRange.high],
      low: priceRange.low,
      high: priceRange.high,
      ...(priceRange.offerCount ? { offerCount: priceRange.offerCount } : {}),
    });
    aggregateOffer = offer;
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
      name: id.name,
      telephone: id.telephone,
      url: id.url,
      address: id.address,
      sameAs: [...id.sameAs],
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
    // The span of the price, as a sibling of `offers` (never nested inside it).
    ...(aggregateOffer && { aggregateOffer }),
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
  const id = identity();
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
      sameAs: [...id.sameAs],
    },
    publisher: {
      '@id': IDS.business,
      '@type': 'LocalBusiness',
      name: id.name,
      telephone: id.telephone,
      url: id.url,
      address: id.address,
      sameAs: [...id.sameAs],
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

// ─── CollectionPage + ItemList (an index a machine can read) ────────────────
// A collection page is the machine-readable shape of an index: the page itself
// plus the list of the things it holds. Without it, an index page is prose an
// answer engine has to guess the contents of.
//
// Both nodes carry their @type inline, so a crawler that fetches only this
// document still reads a complete graph (see the rules at the top of the file).
export function collectionPageSchema({ url, title, description, breadcrumb }) {
  // `breadcrumb` takes [{ name, url }] items. They are inlined so the node is
  // self-describing; a dangling @id would not be.
  const crumb = Array.isArray(breadcrumb)
    ? {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumb.map((i, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: i.name,
          item: i.url,
        })),
      }
    : { '@id': `${url}#crumb`, '@type': 'BreadcrumbList' };
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    name: title,
    url,
    description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': IDS.website, '@type': 'WebSite' },
    breadcrumb: crumb,
  };
}

// `items` takes [{ name, url }] entries, in the order the page lists them.
export function itemListSchema({ url, name, items }) {
  const list = Array.isArray(items) ? items : [];
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#itemlist`,
    name,
    numberOfItems: list.length,
    itemListElement: list.map((it, idx) => {
      const entry = typeof it === 'string' ? { name: it } : it;
      return {
        '@type': 'ListItem',
        position: idx + 1,
        name: entry.name,
        ...(entry.url ? { url: entry.url } : {}),
      };
    }),
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
      cssSelector: ['.hero-sub', '.blog-lead', '.key-takeaways', '.money-qa-a', '.money-qa-h', 'h1'],
    },
  };
}

// ─── Organization + Person (About page) ─────────────────────────────────────
// `#organization` is the legal entity; `#business` is the LocalBusiness the
// rest of the site points at. They must never share an @id.
export function organizationSchema() {
  const id = identity();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': IDS.organization,
    name: id.name,
    url: id.url,
    telephone: id.telephone,
    address: id.address,
    areaServed: 'Gurgaon, Haryana, India',
    foundingDate: '2015',
    description: 'Police-verified, eco-friendly deep cleaning team serving Gurgaon. Full-home, kitchen, bathroom, sofa and carpet deep cleaning with pay-after-satisfaction.',
    sameAs: [...id.sameAs],
  };
}

export function personSchema() {
  const id = identity();
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': IDS.person,
    name: 'Sachin Kumar',
    jobTitle: 'Founder & Lead Cleaning Specialist',
    url: IDS.person,
    image: `${SITE_URL}/images/cleaning-1.webp`,
    sameAs: [...id.sameAs],
    worksFor: { '@id': IDS.organization, '@type': 'Organization', name: id.name },
    knowsAbout: ['Deep Cleaning', 'House Cleaning', 'Bathroom Descaling', 'Kitchen Degreasing', 'Gurgaon'],
    description: `Founder of Sachin Deep Cleaning, 10+ years hands-on deep cleaning in Gurgaon — DLF to Sohna Road, police-verified team lead, published fixed BHK prices and pay after the walkthrough.`,
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

  // ── Added 2026-10-22 — one config per new service page ───────────────────
  // estimatedCost is omitted for the per-sq-ft services: a single figure would
  // be meaningless without the area, so the Offer node carries the rate instead.
  watertank: {
    name: 'How to Clean a Water Tank in Gurgaon',
    description: 'Step-by-step overhead and underground water tank cleaning — scrub, descale, disinfect and rinse, with a final water-level check.',
    totalTime: 'PT1H30M',
    estimatedCost: '399',
  },
  toilettank: {
    name: 'How to Clean a Toilet Tank',
    description: 'Step-by-step flush tank cleaning — lid off, mechanism out, interior scrubbed and descaled, then reassembled and flushed.',
    totalTime: 'PT1H',
    estimatedCost: '499',
  },
  facade: {
    name: 'How to Clean Window Glass and Facade',
    description: 'Step-by-step external glass and facade cleaning with a squeegee finish, including frames, tracks and sills.',
    totalTime: 'PT3H',
  },
  commonarea: {
    name: 'How to Clean a Society Common Area',
    description: 'Step-by-step common-area cleaning for lobbies, staircases, lift lobbies, parking aprons and clubhouses.',
    totalTime: 'PT2H',
    estimatedCost: '499',
  },
  sweeper: {
    name: 'How to Sweep and Mop a Home',
    description: 'Step-by-step sweep and mop method — dust, HEPA vacuum, multi-surface mop, kitchen and bathroom surface upkeep, bin change.',
    totalTime: 'PT2H',
    estimatedCost: '499',
  },
  lift: {
    name: 'How to Clean a Lift Cabin and Landing',
    description: 'Step-by-step lift cleaning — cabin panels, floor, door tracks, ceiling and the landing lobby.',
    totalTime: 'PT3H',
    estimatedCost: '1499',
  },
  windowgrill: {
    name: 'How to Clean a Window Grill',
    description: 'Step-by-step window grill cleaning — bars scrubbed on both faces, mesh washed, sill and track cleared.',
    totalTime: 'PT1H',
    estimatedCost: '399',
  },
  utensils: {
    name: 'How to Clean Kitchen Utensils',
    description: 'Step-by-step utensil cleaning — scrub, descale, disinfect, dry, then pack back into the same storage.',
    totalTime: 'PT2H',
    estimatedCost: '409',
  },
  road: {
    name: 'How to Sweep a Road or Street',
    description: 'Step-by-step road sweeping — mechanical pass, manual edges, drain-edge clearing and licensed disposal.',
    totalTime: 'PT4H',
  },
  chandelier: {
    name: 'How to Clean a Chandelier',
    description: 'Step-by-step chandelier cleaning — piece by piece where safe, dried and re-hung, with access arranged for high units.',
    totalTime: 'PT4H',
    estimatedCost: '1499',
  },
  washingmachine: {
    name: 'How to Deep Clean a Washing Machine',
    description: 'Step-by-step washing machine cleaning — drum, pump filter, door seal, gasket and the detergent drawer.',
    totalTime: 'PT2H',
    estimatedCost: '799',
  },
  chairclean: {
    name: 'How to Clean an Office Chair',
    description: 'Step-by-step chair cleaning — pre-treatment, shampoo extraction, armrests, seams, base and castors.',
    totalTime: 'PT1H',
    estimatedCost: '199',
  },
  curtain: {
    name: 'How to Clean Curtains',
    description: 'Step-by-step curtain cleaning — vacuum, spot treatment, deodorise, and a wet shampoo where the fabric allows.',
    totalTime: 'PT1H30M',
    estimatedCost: '499',
  },
  basement: {
    name: 'How to Clean an Unfinished Basement',
    description: 'Step-by-step basement and godown cleaning — debris, HEPA fine dust, cobwebs, corners and floor mop.',
    totalTime: 'PT6H',
  },
  instantclean: {
    name: 'How to Do a Same-Day Deep Clean',
    description: 'Step-by-step same-day cleaning method — a fixed scope, a two to four person crew, and a walkthrough before handover.',
    totalTime: 'PT4H',
    estimatedCost: '999',
  },
  balconyclean: {
    name: 'How to Clean a Balcony',
    description: 'Step-by-step balcony cleaning — pressure wash, joint scrub, drain flush, glass panels and railing.',
    totalTime: 'PT1H',
    estimatedCost: '399',
  },
  sqftrate: {
    name: 'How to Price a Deep Clean by Area',
    description: 'How a deep clean is priced per square foot in Gurgaon, and how it maps to the fixed BHK card.',
    totalTime: 'PT8H',
  },
  kitchenplatform: {
    name: 'How to Deep Clean a Kitchen Platform',
    description: 'Step-by-step kitchen platform cleaning — platform, edges, backsplash joints, sink base and cabinet interiors.',
    totalTime: 'PT3H',
    estimatedCost: '999',
  },
  postconstruction: {
    name: 'How to Clean After Construction',
    description: 'The three-phase post-construction method — rough debris, then high surfaces, then the final HEPA fine-dust pass.',
    totalTime: 'PT8H',
    estimatedCost: '2499',
  },
  roomclean: {
    name: 'How to Clean a Single Room',
    description: 'Step-by-step single-room cleaning — dust, HEPA vacuum, mop, skirting, window glass and tracks.',
    totalTime: 'PT1H30M',
    estimatedCost: '299',
  },
};
