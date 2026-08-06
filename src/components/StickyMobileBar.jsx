import { PHONE_TEL, waMsg } from '../lib/site.js';
import { phoneCallClick, whatsappClick } from '../lib/landing.js';

export default function StickyMobileBar() {
  return (
    <div className="sticky-mob">
      <a href={PHONE_TEL} className="sm-call" onClick={phoneCallClick}>
        📞 Call Now
      </a>
      <a href={waMsg('Hi I want to book deep cleaning in Gurgaon.')} target="_blank" rel="noopener" className="sm-wa" onClick={whatsappClick}>
        💬 WhatsApp
      </a>
    </div>
  );
}