import { ARTICLE_INDEX } from '../generated/article-index.js';
import { CONTENT_UPDATED } from '../lib/site.js';
import { JsonLd, breadcrumbSchema, collectionPageSchema, itemListSchema, serviceSchema, DEEP_PRICE_RANGE, webpageSchema } from '../lib/schema.jsx';
import { pageUrl } from '../lib/site.js';
import { SERVICE_PRICES } from '../lib/service-prices.js';
import TrustBar from '../components/TrustBar.jsx';

const FEATURED_FILES = [
  'blog/deep-cleaning-cost-gurgaon-2026',
  'blog/full-home-deep-cleaning-packages-gurgaon',
  'blog/best-deep-cleaning-services-gurgaon',
  'blog/urban-company-vs-sachin-deep-cleaning',
  'blog/2bhk-deep-cleaning-price-gurgaon',
  'blog/3bhk-deep-cleaning-price-gurgaon',
  'blog/kitchen-cleaning-price-gurgaon-chimney',
  'blog/bathroom-deep-cleaning-gurgaon-best',
  'blog/sofa-cleaning-gurgaon-guide',
  'blog/dlf-phase-3-deep-cleaning-gurgaon',
  'blog/sohna-road-deep-cleaning-gurgaon',
  'blog/full-home-deep-cleaning-gurgaon-guide',
];

// The title and description of the collection the index holds.
const COLLECTION_TITLE = 'Deep Cleaning Blog & Guides — Sachin Deep Cleaning';
const COLLECTION_DESCRIPTION =
  'Deep cleaning guides for Gurgaon homes: costs by BHK, cleaning frequency, kitchen chimney care, hard water removal, sofa and carpet maintenance, and move-in / move-out checklists.';

// The ItemList order matches the order the page renders: the 12 featured
// guides first, then the rest of the collection in index order. Every guide is
// listed once, even though the featured grid is repeated in the full grid.
const FEATURED = FEATURED_FILES.map((f) => ARTICLE_INDEX.find((a) => a.file === f)).filter(Boolean);
const REST = ARTICLE_INDEX.filter((a) => !FEATURED_FILES.includes(a.file));
const LISTED = [...FEATURED, ...REST];

export default function BlogIndexPage({ url }) {
  const breadcrumb = [
    { name: 'Home', url: pageUrl('index') },
    { name: 'Blog', url },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumb)} />
      <JsonLd
        data={webpageSchema({
          title: 'Blog — Cleaning Guides & Tips | Sachin Deep Cleaning',
          description: 'Deep cleaning guides for Gurgaon homes: costs by BHK, cleaning frequency, kitchen chimney care, hard water removal and sofa maintenance. Expert tips.',
          url,
          dateModified: CONTENT_UPDATED,
        })}
      />
      <JsonLd
        data={collectionPageSchema({
          url,
          title: COLLECTION_TITLE,
          description: COLLECTION_DESCRIPTION,
          breadcrumb,
        })}
      />
      <JsonLd
        data={itemListSchema({
          url,
          name: 'Deep cleaning guides for Gurgaon homes',
          items: LISTED.map((a) => ({ name: a.title, url: pageUrl(a.file) })),
        })}
      />
      {/* The subject of the collection, with the price span the guides quote.
          The node carries the service page's own @id and url, so it is the
          same entity described here — not a second one. */}
      <JsonLd
        data={serviceSchema({
          name: 'Deep Cleaning Services in Gurgaon',
          description: `The service every guide in this collection covers: home deep cleaning in Gurgaon priced by home size, from ${SERVICE_PRICES.deep.amount} for a 1 RK or studio.`,
          url: pageUrl('deep-cleaning-services-in-gurgaon'),
          price: SERVICE_PRICES.deep,
          priceRange: DEEP_PRICE_RANGE,
        })}
      />

      <section className="blog-hero">
        <div className="section-inner">
          <div className="blog-meta">
            <span>Cleaning guides for Gurgaon homes</span>
          </div>
          <h1>Deep Cleaning Blog & Guides</h1>
          <p className="blog-lead">
            Practical, expert-written guides on deep cleaning in Gurgaon — real prices,
            how often to clean, chimney care, hard water and upholstery maintenance.
          </p>
          <p className="blog-lead" style={{ marginTop: '12px' }}>
            Start with your intent: <strong>prices</strong> (cost guides by BHK and service),
            <strong> booking</strong> (near-me dispatch, packages, how to verify a cleaner — <strong>and Urban Company vs us</strong>),
            <strong> know-how</strong> (chimney, hard-water, sofa and carpet methods), or
            <strong> festive</strong> (Diwali, Dussehra and Navratri playbooks from 10+ seasons since 2015).
            Every guide ends with a fixed-price quote path — no “call for price” dead-ends.
            Festive playbooks (Diwali, Dussehra, Navratri) follow the real October–November rush calendar;
            comparison guides (best services, Mr Deep Cleaning vs us) show their scoring openly so you can audit us.
            New here? Read the cost guide for your BHK first, then the booking guide for your situation — you will know exactly what to order before you ever message us.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="section-tag">Top Guides</div>
            <h2 className="section-title">Start with these 12 featured guides</h2>
          </div>
          <div className="blog-grid" style={{ marginTop: 24 }}>
            {FEATURED_FILES.map((f) => {
              const a = ARTICLE_INDEX.find((x) => x.file === f);
              if (!a) return null;
              return (
                <a key={a.slug} className="blog-card" href={`${a.file}.html`}>
                  <div className="blog-card-body">
                    <h3>{a.title}</h3>
                    <p>{a.description}</p>
                    <span className="blog-card-link">Read guide →</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="section-tag">Every guide</div>
            <h2 className="section-title">All {ARTICLE_INDEX.length} Cleaning Guides</h2>
          </div>
          <div className="blog-grid" style={{ marginTop: '28px' }}>
            {ARTICLE_INDEX.map((a) => (
              <a key={a.slug} className="blog-card" href={`${a.file}.html`}>
                <img
                  src={a.image}
                  alt={a.imageAlt}
                  loading="lazy"
                  width="1200"
                  height="675"
                />
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span>{a.dateModified}</span>
                    <span>·</span>
                    <span>Guide</span>
                  </div>
                  <h3>{a.title}</h3>
                  <p>{a.description}</p>
                  <span className="blog-card-link">Read guide →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <TrustBar />
    </>
  );
}
