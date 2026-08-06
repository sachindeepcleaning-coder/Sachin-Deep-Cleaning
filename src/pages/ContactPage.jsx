import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import AreasSection from '../components/AreasSection.jsx';
import FaqSection from '../components/FaqSection.jsx';
import { JsonLd, localBusinessSchema } from '../lib/schema.jsx';
import { SITE_URL } from '../lib/site.js';
import { waMsg } from '../lib/site.js';

const FAQS = [
  ['How quickly can you start?', 'Often within 24 hours. WhatsApp us and we\u2019ll confirm a slot.'],
  ['Do you serve my area?', 'Yes — all sectors across Gurgaon including DLF, Sohna Road, Golf Course Road.'],
  ['What does it cost?', 'Transparent pricing; free estimate on WhatsApp or via the form.'],
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema({ url: SITE_URL + '/contact.html' })} />

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
              Contact Sachin Deep Cleaning
            </div>
            <h1>
              <span className="hl">Get Your Free Quote</span><br />
              in Gurgaon<br />
              <span className="hl2">Same-Day</span> Booking
            </h1>
            <p className="hero-sub">
              Leave your details and we’ll call you back in under 5 minutes. Or reach us directly on WhatsApp — instant reply from our work manager.
            </p>
            <div className="hero-pills">
              <span className="pill"><span className="pi">✓</span> 5-Min Callback</span>
              <span className="pill"><span className="pi">✓</span> Free Estimate</span>
              <span className="pill"><span className="pi">✓</span> No Advance Pay</span>
            </div>
            <div style={{ marginTop: '26px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href={waMsg('Hi, I would like to get a quote for cleaning in Gurgaon.')} target="_blank" rel="noopener" className="btn-wa-form" style={{ margin: 0 }}>
                💬 WhatsApp Us Now — Instant Reply
              </a>
              <a href="tel:+919267905943" className="fcta-call" style={{ margin: 0, textAlign: 'center' }}>
                📞 Call: +91 92679-05943
              </a>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <TrustBar />

      <section className="section section-alt">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Request a Quote</div>
            <h2 className="section-title">Tell Us About Your Home</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Fill the form above or reach out directly — no commitment, no hidden charges.</p>
          </div>
          <div className="hiw-wrap" style={{ marginTop: '36px' }}>
            <div className="hiw-step fade-up">
              <div className="hiw-num">1</div>
              <div className="hiw-title">Call or WhatsApp</div>
              <div className="hiw-desc">Share your requirements with our team.</div>
            </div>
            <div className="hiw-step fade-up">
              <div className="hiw-num">2</div>
              <div className="hiw-title">Get a Free Quote</div>
              <div className="hiw-desc">Transparent pricing confirmed on the call.</div>
            </div>
            <div className="hiw-step fade-up">
              <div className="hiw-num">3</div>
              <div className="hiw-title">We Clean</div>
              <div className="hiw-desc">Pay only after you inspect the results.</div>
            </div>
          </div>
        </div>
      </section>

      <AreasSection />
      <FaqSection faqs={FAQS} />
    </>
  );
}