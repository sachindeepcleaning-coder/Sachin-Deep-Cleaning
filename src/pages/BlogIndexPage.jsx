import { ARTICLES } from '../lib/blog.js';
import { JsonLd, breadcrumbSchema } from '../lib/schema.jsx';
import { pageUrl } from '../lib/site.js';
import TrustBar from '../components/TrustBar.jsx';

export default function BlogIndexPage({ url }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: pageUrl('index') },
          { name: 'Blog', url },
        ])}
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
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="blog-grid">
            {ARTICLES.map((a) => (
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
                  <h2>{a.title}</h2>
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
