import Reveal from '../components/Reveal.jsx';
import LeadForm from '../components/LeadForm.jsx';
import Faq from '../components/Faq.jsx';
import { JsonLd, localBusinessSchema } from '../lib/schema.jsx';
import { WHATSAPP, PHONE_TEL, PHONE, SITE_URL } from '../lib/site.js';
import ThreeHeroSafe from '../components/ThreeHeroSafe.jsx';

const FAQS = [
  { q: 'How quickly can you start?', a: 'Often within 24 hours. WhatsApp us and we’ll confirm a slot.' },
  { q: 'Do you serve my area?', a: 'Yes — all sectors across Gurgaon including DLF, Sohna Road, Golf Course Road.' },
  { q: 'What does it cost?', a: 'Transparent pricing; free estimate on WhatsApp or via the form.' },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema({ url: SITE_URL + '/contact.html' })} />
      <section className="inner-hero">
        <div className="container">
          <p className="breadcrumb"><a href="index.html">Home</a> / Contact</p>
          <h1>Contact Sachin Deep Cleaning</h1>
          <p>Leave your details and we’ll call you back shortly. Or reach us directly.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-whatsapp">WhatsApp</a>
            <a href={PHONE_TEL} className="btn btn-outline">Call {PHONE}</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <h2>Request a Free Quote</h2>
            <p>Tell us about your home and we’ll get back to you with a tailored estimate.</p>
            <LeadForm formName="lead-contact" source="Contact Page" />
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
            <span className="eyebrow">FAQ</span>
            <h2>Common Questions</h2>
          </Reveal>
          <Faq items={FAQS} />
        </div>
      </section>
    </>
  );
}
