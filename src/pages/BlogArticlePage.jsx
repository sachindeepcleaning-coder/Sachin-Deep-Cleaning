import { JsonLd, articleSchema, faqSchema, breadcrumbSchema } from '../lib/schema.jsx';
import { getArticle } from '../lib/blog.js';
import { pageUrl } from '../lib/site.js';
import QuoteForm from '../components/QuoteForm.jsx';
import FaqSection from '../components/FaqSection.jsx';
import TrustBar from '../components/TrustBar.jsx';

// Renders inline **bold** markdown in article text.
function Rich({ text }) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : p));
}

function renderBlock(b, key) {
  switch (b.t) {
    case 'p': return <p key={key} className="blog-p"><Rich text={b.x} /></p>;
    case 'lead': return <p key={key} className="blog-lead"><Rich text={b.x} /></p>;
    case 'h2': return <h2 key={key} className="blog-h2">{b.x}</h2>;
    case 'h3': return <h3 key={key} className="blog-h3">{b.x}</h3>;
    case 'table':
      return (
        <div key={key} className="blog-table-wrap">
          <table className="blog-table">
            <thead>
              <tr>{b.head.map((h, i) => <th key={i}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {b.rows.map((r, ri) => (
                <tr key={ri}>{r.map((c, ci) => <td key={ci}><Rich text={c} /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'ul': return <ul key={key} className="blog-ul">{b.items.map((it, i) => <li key={i}><Rich text={it} /></li>)}</ul>;
    case 'ol': return <ol key={key} className="blog-ol">{b.items.map((it, i) => <li key={i}><Rich text={it} /></li>)}</ol>;
    case 'tip': return <div key={key} className="blog-tip"><Rich text={b.x} /></div>;
    default: return null;
  }
}

function readingMinutes(article) {
  let words = 0;
  for (const b of article.blocks) {
    if (b.x) words += String(b.x).split(/\s+/).length;
    if (b.items) words += b.items.join(' ').split(/\s+/).length;
    if (b.rows) words += b.rows.flat().join(' ').split(/\s+/).length;
  }
  return Math.max(3, Math.round(words / 200));
}

export default function BlogArticlePage({ file = 'blog', url = '' }) {
  const article = getArticle(file);

  if (!article) {
    return (
      <section className="section">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <h1>Article not found</h1>
          <p style={{ color: 'var(--muted)' }}>This guide does not exist. <a href="blog.html" style={{ color: 'var(--primary)' }}>Browse all guides</a>.</p>
        </div>
      </section>
    );
  }

  const mins = readingMinutes(article);
  const faqs = article.faqs;

  return (
    <>
      <JsonLd data={articleSchema({ title: article.title, description: article.description, url, datePublished: article.datePublished, dateModified: article.dateModified, image: article.image })} />
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: pageUrl('index') },
          { name: 'Blog', url: pageUrl('blog') },
          { name: article.title, url },
        ])}
      />

      <section className="blog-hero">
        <div className="section-inner">
          <div className="blog-meta">
            <a href="blog.html" className="blog-back">← All guides</a>
            <span>Updated {article.dateModified}</span>
            <span>·</span>
            <span>{mins} min read</span>
          </div>
          <h1>{article.title}</h1>
          <img
            src={article.image}
            alt={article.imageAlt}
            width="1200"
            height="675"
            className="blog-hero-img"
          />
        </div>
      </section>

      <section className="section">
        <div className="section-inner blog-content">
          <QuoteForm />
          <article>
            {article.blocks.map((b, i) => renderBlock(b, `${b.t}-${i}`))}
          </article>
          {faqs.length > 0 && (
            <div className="blog-faq">
              <FaqSection faqs={faqs.map((f) => [f.q, f.a])} />
            </div>
          )}
          <p className="blog-end" style={{ textAlign: 'center', marginTop: '40px' }}>
            <a href="blog.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>More cleaning guides for Gurgaon homes →</a>
          </p>
        </div>
      </section>

      <TrustBar />
    </>
  );
}
