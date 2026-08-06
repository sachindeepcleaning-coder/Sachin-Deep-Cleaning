import { SERVICES } from '../lib/landing.js';
import { track } from '../lib/landing.js';

export default function ServiceSection() {
  const scrollToForm = () => {
    document.getElementById('formCard')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    track('service_select', { event_category: 'Engagement', event_label: 'Full Home Deep Cleaning' });
  };
  return (
    <section className="section">
      <div className="section-inner">
        <div className="services-head fade-up">
          <div className="section-tag">Our Main Service</div>
          <h2 className="section-title">Full Home Deep Cleaning Service in Gurgaon</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>We provide complete, professional deep cleaning for your entire home — interior and exterior. Eco-friendly products, police-verified team, ₹200 OFF today.</p>
        </div>
        <div className="services-grid" style={{ maxWidth: '400px', margin: '40px auto' }}>
          {SERVICES.map((s) => (
            <div key={s.name} className="service-card featured fade-up" onClick={scrollToForm}>
              <div className="sc-icon">{s.icon}</div>
              <div className="sc-name">{s.name}</div>
              <div className="sc-desc">{s.desc}</div>
              <div className="sc-price">{s.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}