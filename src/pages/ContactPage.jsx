import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import AreasSection from '../components/AreasSection.jsx';
import FaqSection from '../components/FaqSection.jsx';
import ReelSection from '../components/ReelSection.jsx';
import { JsonLd, localBusinessSchema } from '../lib/schema.jsx';
import { waMsg } from '../lib/site.js';
import { phoneCallClick, whatsappClick } from '../lib/landing.js';

const FAQS = [
  ['How quickly can you start?', 'Often within 24 hours. WhatsApp us and we\u2019ll confirm a slot.'],
  ['Do you serve my area?', 'Yes — all sectors across Gurgaon including DLF, Sohna Road, Golf Course Road.'],
  ['What does it cost?', 'Transparent pricing; free estimate on WhatsApp or via the form.'],
];

export default function ContactPage({ url }) {
  return (
    <>
      <JsonLd data={localBusinessSchema({ url })} />

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
              <a href={waMsg('Hi, I would like to get a quote for cleaning in Gurgaon.')} target="_blank" rel="noopener" className="btn-wa-form" style={{ margin: 0 }} onClick={whatsappClick}>
                💬 WhatsApp Us Now — Instant Reply
              </a>
              <a href="tel:+919267905943" className="fcta-call" style={{ margin: 0, textAlign: 'center' }} onClick={phoneCallClick}>
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

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Find Us</div>
            <h2 className="section-title">We Serve Every Sector of Gurgaon</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Service-area business — no single shop counter, team dispatched to your sector. Call +91 92679-05943 to confirm nearest slot.</p>
          </div>
          <div style={{ marginTop: 32, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', height: 360 }} className="fade-up">
            <iframe
              title="Sachin Deep Cleaning — Gurgaon service area"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112173.022785!2d77.0266!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e96c9e92ab!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1753660000000"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: '.92rem', color: 'var(--muted)' }}>
            <strong style={{ color: 'var(--dark)' }}>Sachin Deep Cleaning</strong> — Serving all areas of Gurgaon, Haryana &nbsp;|&nbsp; <a href="tel:+919267905943" style={{ color: 'var(--primary)', fontWeight: 700 }}>+91 92679-05943</a>
          </div>
        </div>
      </section>

      <ReelSection />
      <FaqSection faqs={FAQS} />
    </>
  );
}