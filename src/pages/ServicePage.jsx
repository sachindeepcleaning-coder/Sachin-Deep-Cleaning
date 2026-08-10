import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import PricingSection from '../components/PricingSection.jsx';
import GuaranteeSection from '../components/GuaranteeSection.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import FaqSection from '../components/FaqSection.jsx';
import ReelSection from '../components/ReelSection.jsx';
import OfficeReelSection from '../components/OfficeReelSection.jsx';
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from '../lib/schema.jsx';
import { getService } from '../lib/services.js';
import { SITE_URL } from '../lib/site.js';

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

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
              {s.tagline}
            </div>
            <h1>
              <span className="hl">{s.name}</span>
            </h1>
            <p className="hero-sub">{s.intro} <strong>{s.price.amount} onwards.</strong></p>
            <div className="hero-pills">
              <span className="pill"><span className="pi">✓</span> Same-Day Service</span>
              <span className="pill"><span className="pi">✓</span> Police-Verified Team</span>
              <span className="pill"><span className="pi">✓</span> Pay After Cleaning</span>
              <span className="pill"><span className="pi">✓</span> Eco-Friendly</span>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <TrustBar />

      <section className="section section-alt">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">What's Included</div>
            <h2 className="section-title">Everything We Cover</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Every service comes with expert attention to detail and eco-friendly products.</p>
          </div>
          <div className="checklist-grid">
            {s.includes.map((i) => (
              <div key={i} className="checklist-item fade-up">
                <div className="checklist-icon">✓</div>
                <div>
                  <div className="checklist-title">{i.split('\u2013')[0]}</div>
                  <div className="checklist-desc">{i}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <PricingSection />

      <ReviewsSection />

      {serviceKey === 'office' ? <OfficeReelSection /> : <ReelSection />}

      <GuaranteeSection />

      <section className="section">
        <div className="section-inner">
          <FaqSection faqs={s.faqs.map((f) => [f.q, f.a])} />
        </div>
      </section>
    </>
  );
}