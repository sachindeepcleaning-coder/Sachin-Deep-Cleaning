import { JsonLd, breadcrumbSchema, collectionPageSchema, itemListSchema, webpageSchema } from '../lib/schema.jsx';
import { SERVICE_LINKS } from '../generated/service-links.js';
import { pageUrl, CONTENT_UPDATED, SITE_URL } from '../lib/site.js';
import { getService } from '../lib/services.js';
import TrustBar from '../components/TrustBar.jsx';
import FinalCta from '../components/FinalCta.jsx';
import { MONEY_QA } from '../lib/money-page-qa.js';

// The services hub.
//
// WHY: "cleaning services gurgaon" and "cleaning service gurgaon" both sit
// around position 17 — the queries are too broad for a single service page to
// win, but they are the highest-volume generic terms in the set. A hub that
// lists every service with its published price is the page those queries
// actually want, and it is the crawl hub for every service URL.
//
// The list is generated from pages.config.mjs, so it can never fall behind
// the page list.
export default function ServicesHub({ url }) {
  const items = SERVICE_LINKS.map((l) => {
    const svc = l.key && l.key !== 'residential' && l.key !== 'partners' && l.key !== 'landing'
      ? (() => { try { return getService(l.key); } catch { return null; } })()
      : null;
    const price = svc && svc.price ? svc.price.amount : null;
    const priceLabel = svc && svc.price ? svc.price.label : null;
    const qa = MONEY_QA[l.key];
    return {
      ...l,
      price,
      priceLabel,
      // One plain sentence per service, taken from the money-page answer that
      // already opens with the figure.
      answer: qa && qa.qa && qa.qa.length ? qa.qa[0].a : null,
    };
  });

  return (
    <>
      <JsonLd data={webpageSchema({
        title: 'Cleaning Services in Gurgaon — Full List & Price List',
        description: 'Every cleaning service we offer in Gurgaon with its published starting price — full home, kitchen, bathroom, sofa, carpet, office, water tank, lift, window and more.',
        url,
        dateModified: CONTENT_UPDATED,
      })} />
      <JsonLd data={collectionPageSchema({
        url,
        title: 'Cleaning Services in Gurgaon — Full List & Price List',
        description: 'Every cleaning service we offer in Gurgaon with its published starting price.',
        breadcrumb: [
          { name: 'Home', url: pageUrl('index') },
          { name: 'All Cleaning Services', url },
        ],
      })} />
      <JsonLd data={itemListSchema({
        url,
        name: 'All Cleaning Services in Gurgaon',
        items: items.map((i, idx) => ({
          position: idx + 1,
          name: i.label,
          url: `${SITE_URL}/${i.href}`,
        })),
      })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: pageUrl('index') },
          { name: 'All Cleaning Services', url },
        ], url)}
      />

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
              Complete service list
            </div>
            <h1>
              <span className="hl">Cleaning Services</span> in Gurgaon —<br />
              every service, every published price
            </h1>
            <p className="hero-sub">
              {items.length} services across every Gurgaon sector, from a ₹299 single-room clean to a
              full-home deep clean. Each price below is the published rate card — fixed on the call
              before the crew is booked, and paid only after the walkthrough.
            </p>
            <div className="hero-pills">
              <span className="pill"><span className="pi">✓</span> Published price list</span>
              <span className="pill"><span className="pi">✓</span> Same team across all sectors</span>
              <span className="pill"><span className="pi">✓</span> Pay after walkthrough</span>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="section-tag">Price list</div>
            <h2 className="section-title">All Cleaning Services in Gurgaon with Prices</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Every service, its starting price and what that price covers. Scroll to the one you
              need — each card links to the full scope, the time on site and the answers to the
              questions people ask before booking.
            </p>
          </div>

          <div className="blog-table-wrap" style={{ marginTop: '32px' }}>
            <table className="blog-table">
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Starting price</th>
                  <th scope="col">Priced by</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.href}>
                    <td>
                      <a href={i.href} style={{ color: 'var(--primary)', fontWeight: 700 }}>{i.label} →</a>
                    </td>
                    <td>{i.price ? `${i.price}` : 'On call'}</td>
                    <td>{i.priceLabel || 'Fixed package'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="section-tag">In detail</div>
            <h2 className="section-title">What Each Service Costs and What It Covers</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              The direct answer for every service — the price, the time on site and what changes
              the figure.
            </p>
          </div>
          <div style={{ marginTop: '32px' }}>
            {items.filter((i) => i.answer).map((i) => (
              <div key={i.href} className="money-qa-item">
                <h3 className="blog-h3" style={{ marginTop: '26px' }}>
                  <a href={i.href} style={{ color: 'var(--primary)' }}>{i.label}</a>
                </h3>
                <p className="money-qa-a">{i.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
