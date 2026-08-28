import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import PricingSection from '../components/PricingSection.jsx';
import PricingTable from '../components/PricingTable.jsx';
import WhyUsSection from '../components/WhyUsSection.jsx';
import GuaranteeSection from '../components/GuaranteeSection.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import FaqSection from '../components/FaqSection.jsx';
import ReelSection from '../components/ReelSection.jsx';
import OfficeReelSection from '../components/OfficeReelSection.jsx';
import RelatedServices from '../components/RelatedServices.jsx';
import RelatedGuides from '../components/RelatedGuides.jsx';
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema, howToSchema, reviewsSchema, HOW_TO_CONFIGS } from '../lib/schema.jsx';
import { getService } from '../lib/services.js';
import { pageUrl } from '../lib/site.js';

export default function ServicePage({ serviceKey, bhk, url = '' }) {
  const s = getService(serviceKey, bhk);
  const howTo = HOW_TO_CONFIGS[serviceKey];

  return (
    <>
      <JsonLd data={serviceSchema({ name: s.name, description: s.intro, url, price: s.price, image: s.image })} />
      <JsonLd data={faqSchema(s.faqs)} />
      <JsonLd data={reviewsSchema(s.reviews, s.name)} />
      {howTo && (
        <JsonLd data={howToSchema({ ...howTo, steps: s.process, image: s.image })} />
      )}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: pageUrl('index') },
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
            <p className="hero-sub">{s.intro} {s.price.amount !== 'request' && <strong>{s.price.amount} onwards.</strong>}</p>
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

      {/* Competitor-inspired: 8-service grid on deep page — improves topical clustering & internal linking */}
      {serviceKey === 'deep' && (
        <section className="section section-alt">
          <div className="section-inner">
            <div style={{ textAlign: 'center' }} className="fade-up">
              <div className="section-tag">Our services</div>
              <h2 className="section-title">Deep Cleaning Sub-Services in Gurgaon</h2>
              <p className="section-sub" style={{ margin: '0 auto' }}>8 specialised services, each with a confirmed upfront price — no surprises on the day.</p>
            </div>
            <div className="services-grid" style={{ marginTop: 32 }}>
              <a className="service-card" href="/full-home-deep-cleaning-3bhk-gurgaon.html"><div className="sc-icon">🏠</div><div className="sc-name">Full Home Cleaning</div><div className="sc-desc">Every room top to bottom</div><div className="sc-price">From ₹2,000</div></a>
              <a className="service-card" href="/office-deep-cleaning-gurgaon.html"><div className="sc-icon">🏢</div><div className="sc-name">Office &amp; Shop Cleaning</div><div className="sc-desc">Workstations & washrooms</div><div className="sc-price">On request</div></a>
              <a className="service-card" href="/kitchen-deep-cleaning-gurgaon.html"><div className="sc-icon">🍳</div><div className="sc-name">Kitchen Deep Cleaning</div><div className="sc-desc">Chimney & hob degreasing</div><div className="sc-price">On request</div></a>
              <a className="service-card" href="/bathroom-deep-cleaning-gurgaon.html"><div className="sc-icon">🚿</div><div className="sc-name">Bathroom Cleaning</div><div className="sc-desc">Descaling & sanitization</div><div className="sc-price">On request</div></a>
              <a className="service-card" href="/sofa-shampoo-cleaning-gurgaon.html"><div className="sc-icon">🛋️</div><div className="sc-name">Sofa Cleaning</div><div className="sc-desc">Shampoo & extraction</div><div className="sc-price">From ₹499/seat</div></a>
              <a className="service-card" href="/carpet-shampoo-cleaning-gurgaon.html"><div className="sc-icon">🧶</div><div className="sc-name">Carpet Cleaning</div><div className="sc-desc">Hot-water extraction</div><div className="sc-price">From ₹15/sq ft</div></a>
              <a className="service-card" href="/house-cleaning-services-in-gurgaon.html"><div className="sc-icon">✨</div><div className="sc-name">House Cleaning</div><div className="sc-desc">Regular upkeep plans</div><div className="sc-price">From ₹499</div></a>
              <a className="service-card" href="/move-in-move-out-cleaning-gurgaon.html"><div className="sc-icon">📦</div><div className="sc-name">Move-In / Move-Out</div><div className="sc-desc">Empty-flat handover</div><div className="sc-price">From ₹1,999</div></a>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }} className="fade-up">
            <div className="section-tag">Why It Matters</div>
            <h2 className="section-title">About {s.name}</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Here's what a proper deep clean actually involves — and why it matters for your Gurgaon home.</p>
          </div>
          <div className="about-wrap fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', marginTop: '32px' }}>
            <div style={{ flex: '1 1 300px', minWidth: 0 }}>
              {s.detail.split('\n\n').map((p, i) => (
                <p key={i} style={{ margin: '0 0 16px', lineHeight: 1.75, color: 'var(--muted)' }}>{p}</p>
              ))}
            </div>
            <div style={{ flex: '1 1 300px', minWidth: 0 }}>
              <img
                src={s.image}
                alt={s.imageAlt}
                loading="lazy"
                width="600"
                height="400"
                style={{ width: '100%', height: 'auto', borderRadius: '14px', display: 'block' }}
              />
            </div>          </div>
        </div>
      </section>

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

      <WhyUsSection />

      {/* Competitor-inspired transparent pricing table — deep shows full table, others keep cards */}
      {s.pricingTable ? <PricingTable rows={s.pricingTable} /> : (!['kitchen', 'bathroom', 'sofa', 'carpet'].includes(serviceKey) && <PricingSection />)}

      <ReviewsSection reviews={s.reviews} />

      {serviceKey === 'office' ? <OfficeReelSection /> : <ReelSection />}

      <GuaranteeSection />

      <section className="section">
        <div className="section-inner">
          <FaqSection faqs={s.faqs.map((f) => [f.q, f.a])} />
        </div>
      </section>

      <RelatedGuides serviceKey={serviceKey} />
      <RelatedServices currentHref={url.split('/').pop()} />
    </>
  );
}