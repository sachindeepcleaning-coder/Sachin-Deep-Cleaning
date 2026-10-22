// Cross-links between every service page. Each row links to the other service
// pages, which helps Google crawl and understand the site structure.
//
// The list is GENERATED from pages.config.mjs (scripts/gen-article-modules.mjs),
// so a new service page is never an orphan. An orphan — a page with no
// inbound internal link — is not crawled, so it cannot rank, no matter how
// good its content is.
import { SERVICE_LINKS } from '../generated/service-links.js';

export default function RelatedServices({ currentHref }) {
  const links = SERVICE_LINKS.filter((l) => l.href !== currentHref);

  return (
    <section className="section section-alt">
      <div className="section-inner">
        <div style={{ textAlign: 'center' }} className="fade-up">
          <div className="section-tag">Explore More</div>
          <h2 className="section-title">Related Deep Cleaning Services in Gurgaon</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Every service is available across all Gurgaon sectors with the same police-verified team and pay-after-cleaning policy.</p>
        </div>
        <div className="areas-list" style={{ marginTop: '28px' }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="area-tag" style={{ color: 'var(--green)', fontWeight: 700 }}>
              {l.label} →
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
