import QuoteForm from './QuoteForm.jsx';

const PILLS = [
  'Same-Day Service',
  'Police-Verified Team',
  'Pay After Cleaning',
  '100% Satisfaction',
  'Eco-Friendly Products',
];

const STATS = [
  ['5,000', '+', 'Homes Cleaned'],
  ['4.9', '★', 'Average Rating'],
  ['98', '%', 'Happy Customers'],
  ['₹999', '+', 'Starting Price'],
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid"></div>
      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
            Gurgaon's #1 Deep Cleaning Service · 4.9★ Rated
          </div>
          <h1>
            <span className="hl">Full Home Deep Cleaning</span><br />
            in Gurgaon<br />
            <span className="hl2">Pay Only After</span> We Finish
          </h1>
          <p className="hero-sub">
            Expert deep cleaning for your entire home — bedroom, living room, kitchen, bathrooms, floors, walls & more. Professional, police-verified team. <strong>₹200 OFF today.</strong> Same-day booking available in all Gurgaon areas.
          </p>
          <div className="hero-pills">
            {PILLS.map((p) => (
              <span key={p} className="pill"><span className="pi">✓</span> {p}</span>
            ))}
          </div>
          <div className="hero-stats">
            {STATS.map(([num, suffix, label]) => (
              <div key={label} className="hs">
                <div className="hs-num">{num}<span>{suffix}</span></div>
                <div className="hs-lbl">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}