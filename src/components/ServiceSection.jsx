import { track } from '../lib/landing.js';

const SERVICES = [
  { icon: '🏠', name: 'Full Home Deep Cleaning', url: '/full-home-deep-cleaning-1bhk-gurgaon.html', price: 'From ₹2,500', desc: 'Every room, floor to ceiling — bedrooms, kitchen, bathrooms, balconies. Priced by BHK.' },
  { icon: '🔬', name: 'Deep Cleaning Services', url: '/deep-cleaning-services-in-gurgaon.html', price: 'From ₹2,000', desc: 'A top-to-bottom refresh beyond routine sweeping — scrubbed, sanitized, detailed.' },
  { icon: '🏡', name: 'House Cleaning', url: '/house-cleaning-services-in-gurgaon.html', price: 'From ₹499', desc: 'One-time or weekly plans to keep your Gurgaon home consistently spotless.' },
  { icon: '🍳', name: 'Kitchen Deep Cleaning', url: '/kitchen-deep-cleaning-gurgaon.html', price: 'From ₹1,500', desc: 'Chimney, exhaust, hob, cabinets and tiles — fully degreased and hygienic.' },
  { icon: '🚿', name: 'Bathroom Deep Cleaning', url: '/bathroom-deep-cleaning-gurgaon.html', price: 'From ₹800', desc: 'Hard-water stains, grout and mould removed; fully sanitized and polished.' },
  { icon: '🛋️', name: 'Sofa Shampoo Cleaning', url: '/sofa-shampoo-cleaning-gurgaon.html', price: 'From ₹499/seat', desc: 'Stain, dust-mite and odor removal — dry or shampoo extraction per seat.' },
  { icon: '🧼', name: 'Carpet Shampoo Cleaning', url: '/carpet-shampoo-cleaning-gurgaon.html', price: 'From ₹18/sq ft', desc: 'Deep extraction for carpets and rugs.' },
  { icon: '🏢', name: 'Office Deep Cleaning', url: '/office-deep-cleaning-gurgaon.html', price: 'From ₹5,000', desc: 'Workstations, pantries, washrooms and carpets — cleaned after hours.' },
  { icon: '📦', name: 'Move-In / Move-Out Cleaning', url: '/move-in-move-out-cleaning-gurgaon.html', price: 'From ₹1,999', desc: 'Spotless handovers and move-in ready homes — checklist sign-off included.' },
];

export default function ServiceSection() {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="services-head fade-up">
          <div className="section-tag">Our Services</div>
          <h2 className="section-title">Deep Cleaning Services in Gurgaon</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Complete, professional deep cleaning for homes and offices across Gurgaon — eco-friendly products, police-verified team, ₹200 OFF today.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <a key={s.name} href={s.url} className="service-card fade-up" onClick={() => track('service_select', { event_category: 'Engagement', event_label: s.name })}>
              <div className="sc-icon">{s.icon}</div>
              <div className="sc-name">{s.name}</div>
              <div className="sc-desc">{s.desc}</div>
              <div className="sc-price">{s.price}</div>
              <div className="sc-cta">View Details →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
