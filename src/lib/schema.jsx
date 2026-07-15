import { PHONE, WHATSAPP, SOCIAL } from './site.js';

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function localBusinessSchema({ url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Sachin Deep Cleaning',
    description:
      'Professional home deep cleaning services in Gurgaon — sofas, bathrooms, kitchens, full-house makeovers.',
    telephone: PHONE,
    url,
    areaServed: 'Gurgaon, Haryana, India',
    address: { '@type': 'PostalAddress', addressLocality: 'Gurgaon', addressRegion: 'Haryana', addressCountry: 'IN' },
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, WHATSAPP],
  };
}

export function serviceSchema({ name, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: { '@type': 'LocalBusiness', name: 'Sachin Deep Cleaning', telephone: PHONE },
    areaServed: 'Gurgaon, Haryana, India',
  };
}

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
