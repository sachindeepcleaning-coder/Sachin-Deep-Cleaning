import { WHATSAPP, PHONE_TEL, PHONE } from '../lib/site.js';

export default function ThankYouPage() {
  return (
    <section className="inner-hero" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 56 }}>✅</div>
        <h1>Thank You!</h1>
        <p>We’ve received your request and will call you back shortly to confirm your booking.</p>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-whatsapp">WhatsApp Us</a>
          <a href={PHONE_TEL} className="btn btn-outline">Call {PHONE}</a>
        </div>
        <p style={{ marginTop: 24 }}>
          <a href="index.html">← Back to home</a>
        </p>
      </div>
    </section>
  );
}
