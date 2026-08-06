import { PHONE_TEL, waMsg } from '../lib/site.js';
import { track } from '../lib/landing.js';

export default function StickyMobileBar() {
  return (
    <div className="sticky-mob">
      <a href={PHONE_TEL} className="sm-call" onClick={() => track('call_sticky', { event_category: 'Lead', event_label: 'Sticky Call' })}>
        📞 Call Now
      </a>
      <a href={waMsg('Hi I want to book deep cleaning in Gurgaon.')} target="_blank" rel="noopener" className="sm-wa" onClick={() => track('wa_sticky', { event_category: 'Lead', event_label: 'Sticky WhatsApp' })}>
        💬 WhatsApp
      </a>
    </div>
  );
}