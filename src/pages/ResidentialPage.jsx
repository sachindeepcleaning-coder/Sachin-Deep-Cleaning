import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import PricingSection from '../components/PricingSection.jsx';
import AreasSection from '../components/AreasSection.jsx';
import FaqSection from '../components/FaqSection.jsx';
import FinalCta from '../components/FinalCta.jsx';
import { JsonLd, localBusinessSchema, faqSchema, serviceSchema } from '../lib/schema.jsx';
import { SITE_URL } from '../lib/site.js';

const NEAR_ME = [
  ['📍', 'Closest Available Team', 'We route your request to the cleaning crew already working nearest to your sector — not a team crossing the whole city.'],
  ['⏱️', 'Faster Arrival Windows', 'Local dispatch means shorter travel time, which usually means a same-day or next-morning slot instead of a multi-day wait.'],
  ['🏢', 'Familiar With Local Societies', 'Our teams already have visitor-pass experience with most major RWAs and gated societies across Gurgaon.'],
  ['👮', 'Still Fully Verified', 'Nearby never means less vetted — every cleaner, local or not, is police-verified and ID-checked before entering your home.'],
];

const FAQS = [
  ['How do you decide which cleaning team is nearest to me?', 'We match your area or sector to the crew already working closest to it that day. This is why we ask for your area in the quote form — it directly affects your arrival time.'],
  ['Is a local team as reliable as a citywide company?', 'Yes — every cleaner, regardless of which zone they are dispatched from, goes through the same police verification, training, and satisfaction guarantee.'],
  ['Can I get same-day residential cleaning near me?', 'In most Gurgaon sectors, yes — especially if you book before noon. We will confirm exact same-day availability for your specific area on the callback.'],
  ['Do you cover gated societies and RWAs?', 'Yes. Our teams regularly work across Gurgaon major societies and are used to standard visitor-entry and ID-verification processes.'],
  ['What if my exact locality is not listed?', 'Our listed areas are not exhaustive. Call us directly — we cover most of Gurgaon and can usually confirm coverage in under a minute.'],
];

const PILLS = [
  'Nearby Team Dispatch',
  'Police-Verified',
  'Pay After Cleaning',
  'Same-Day Slots',
];

const STATS = [
  ['5,000', '+', 'Homes Cleaned'],
  ['4.9', '★', 'Average Rating'],
  ['30', '+', 'Sectors Covered'],
  ['₹999', '+', 'Starting Price'],
];

export default function ResidentialPage() {
  const url = typeof window !== 'undefined' ? window.location.href : SITE_URL + '/residential-cleaners-near-me.html';

  return (
    <>
      <JsonLd data={localBusinessSchema({ url })} />
      <JsonLd data={serviceSchema({ name: 'Residential Cleaners Near Me in Gurgaon', description: 'Local, police-verified residential cleaners dispatched from the team nearest to your Gurgaon area. Pay only after cleaning.', url })} />
      <JsonLd data={faqSchema(FAQS.map(([q, a]) => ({ q, a })))} />

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
              Local Team · Gurgaon · 4.9★ Rated
            </div>
            <h1>
              <span className="hl">Residential Cleaners Near Me?</span><br />
              You've Found Gurgaon's<br />
              <span className="hl2">Local, Verified Team</span>
            </h1>
            <p className="hero-sub">
              No matter which sector or society you're in, our nearest available team can reach your home <strong>today</strong>. Police-verified residential cleaners, transparent pricing, and <strong>pay only after cleaning</strong>.
            </p>
            <div className="hero-pills">
              {PILLS.map((p) => (
                <span key={p} className="pill"><span className="pi">✓</span> {p}</span>
              ))}
            </div>
            <div className="hero-stats">
              {STATS.map(([num, suffix, label]) => (
                <div key={label} className="hs">
                  <div className="hs-num">{num}<span>{suffix}</span></div>
                  <div className="hs-lbl">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <TrustBar />

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Local Coverage</div>
            <h2 className="section-title">Why "Residential Cleaners Near Me" Actually Matters</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>A nearby team means faster arrival, lower travel delays, and someone who already knows your building or society's access rules.</p>
          </div>
          <div className="whyus-grid">
            {NEAR_ME.map(([icon, title, desc]) => (
              <div key={title} className="why-card fade-up">
                <div className="why-icon">{icon}</div>
                <div>
                  <div className="why-title">{title}</div>
                  <div className="why-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />

      <ReviewsSection />

      <AreasSection />

      <section className="section section-alt">
        <div className="section-inner">
          <div className="faq-wrap">
            <div style={{ textAlign: 'center' }} className="fade-up">
              <div className="section-tag">FAQ</div>
              <h2 className="section-title">Residential Cleaners Near Me — Common Questions</h2>
            </div>
            <FaqSection faqs={FAQS} />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
