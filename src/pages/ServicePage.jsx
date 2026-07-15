import { Suspense } from 'react';
import Reveal from '../components/Reveal.jsx';
import LeadForm from '../components/LeadForm.jsx';
import Faq from '../components/Faq.jsx';
import ComparisonTool from '../components/ComparisonTool.jsx';
import BeforeAfter from '../components/BeforeAfter.jsx';
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from '../lib/schema.jsx';
import { getService } from '../lib/services.js';
import { SITE_URL } from '../lib/site.js';
import ThreeHeroSafe from '../components/ThreeHeroSafe.jsx';

const BEFORE = 'https://images.unsplash.com/photo-1527515637462-b27a8971784a?auto=format&fit=crop&w=900&q=70';
const AFTER = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=70';

export default function ServicePage({ serviceKey, bhk }) {
  const s = getService(serviceKey, bhk);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <JsonLd data={serviceSchema({ name: s.name, description: s.intro, url })} />
      <JsonLd data={faqSchema(s.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL + '/index.html' },
          { name: s.name, url },
        ])}
      />

      <section className="inner-hero">
        <div className="container">
          <p className="breadcrumb"><a href="index.html">Home</a> / {s.name}</p>
          <h1>{s.name}</h1>
          <p>{s.tagline}</p>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <h2>About This Service</h2>
            <p>{s.intro}</p>
            <ul className="service-list">
              {s.includes.map((i) => (
                <li key={i}><span>✓</span>{i}</li>
              ))}
            </ul>
          </div>
          <div className="hero-visual" style={{ minHeight: 300 }}>
            <div className="blob" />
            <ThreeHeroSafe />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Our Process</span>
            <h2>How We Do It</h2>
          </Reveal>
          <div className="steps">
            {s.process.map((p) => (
              <Reveal key={p.step} className="step">
                <div className="step-num">{p.step}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Compare</span>
            <h2>Packages &amp; Pricing</h2>
          </Reveal>
          <ComparisonTool />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Results</span>
            <h2>Before &amp; After</h2>
          </Reveal>
          <BeforeAfter before={BEFORE} after={AFTER} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Questions</h2>
          </Reveal>
          <Faq items={s.faqs} />
        </div>
      </section>

      <section className="section cta">
        <div className="container">
          <h2>Book {s.name}</h2>
          <p>{s.price.label} {s.price.amount}. Get a free quote in seconds.</p>
          <div style={{ maxWidth: 520, margin: '0 auto' }}>
            <LeadForm formName={`lead-${serviceKey}`} source={s.name} />
          </div>
        </div>
      </section>
    </>
  );
}
