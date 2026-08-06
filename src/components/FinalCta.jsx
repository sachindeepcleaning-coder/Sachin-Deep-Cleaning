import { PHONE_TEL, waMsg } from '../lib/site.js';
import { track } from '../lib/landing.js';

export default function FinalCta() {
  return (
    <section className="final-cta">
      <div className="final-cta-inner fade-up">
        <h2>Ready for a Spotless Home?</h2>
        <p>Join 5,000+ happy Gurgaon families. Get your free quote in under 30 seconds — no commitment, no hidden charges, pay only after cleaning.</p>
        <div className="final-cta-btns">
          <a
            href={PHONE_TEL}
            className="fcta-call"
            onClick={() => track('call_final', { event_category: 'Lead', event_label: 'Final CTA Call' })}
          >
            📞 Call: +91 92679-05943
          </a>
          <a
            href={waMsg('Hi I want to book deep cleaning in Gurgaon. Please send me a quote.')}
            target="_blank" rel="noopener"
            className="fcta-wa"
            onClick={() => track('wa_final', { event_category: 'Lead', event_label: 'Final CTA WhatsApp' })}
          >
            💬 WhatsApp Us Now
          </a>
        </div>
      </div>
    </section>
  );
}