import { WHY_US } from '../lib/landing.js';

export default function WhyUsSection() {
  return (
    <section className="section section-alt">
      <div className="section-inner">
        <div style={{ textAlign: 'center', marginBottom: 0 }} className="fade-up">
          <div className="section-tag">Why Choose Us</div>
          <h2 className="section-title">6 Reasons Gurgaon Trusts Us</h2>
        </div>
        <div className="whyus-grid" style={{ marginTop: '36px' }}>
          {WHY_US.map(([icon, title, desc]) => (
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
  );
}