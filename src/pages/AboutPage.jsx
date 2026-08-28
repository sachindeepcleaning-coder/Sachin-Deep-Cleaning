import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import FinalCta from '../components/FinalCta.jsx';
import { JsonLd, breadcrumbSchema } from '../lib/schema.jsx';
import { SITE_URL, PHONE, WHATSAPP, SOCIAL, pageUrl, waMsg, AREAS } from '../lib/site.js';
import { phoneCallClick, whatsappClick } from '../lib/landing.js';

const TEAM = [
  'Police-verified and identity-checked',
  'Professionally trained on our processes and products',
  'Equipped with the right tools for the job',
];

const PROCESS = [
  { title: 'Call or WhatsApp', desc: 'Reach us at +91 9267905943 or fill the form — we confirm scope, exact price and slot, often same-day if booked before noon.' },
  { title: 'We Arrive Equipped', desc: 'Our team arrives with all machines and eco-friendly, food-safe products.' },
  { title: 'We Deep Clean', desc: 'Every area is cleaned systematically — kitchen, bathrooms, rooms, floors and fixtures.' },
  { title: 'You Inspect', desc: 'We walk through every area together so you can see the result.' },
  { title: 'Pay When Happy', desc: 'You pay only when satisfied. If anything is not right, we return and fix it free of charge.' },
];

const PRICING = [
  ['1 BHK full home deep clean', 'from ₹2,500'],
  ['2 BHK full home deep clean', 'from ₹4,500'],
  ['3 BHK full home deep clean', 'from ₹5,500'],
  ['Kitchen deep clean', 'from ₹1,499'],
  ['Bathroom deep clean', 'from ₹999'],
  ['Sofa shampoo cleaning', 'from ₹150 per seat'],
];

export default function AboutPage({ url }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sachin Deep Cleaning',
    url: SITE_URL,
    telephone: PHONE,
    address: { '@type': 'PostalAddress', addressLocality: 'Gurgaon', addressRegion: 'Haryana', addressCountry: 'IN' },
    areaServed: 'Gurgaon, Haryana, India',
    foundingDate: '2024',
    description: 'Police-verified, eco-friendly deep cleaning team serving Gurgaon. Full-home, kitchen, bathroom, sofa and carpet deep cleaning with pay-after-satisfaction.',
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, WHATSAPP],
  };
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sachin Kumar',
    jobTitle: 'Founder & Lead Cleaning Specialist',
    url: `${SITE_URL}/about.html#sachin-kumar`,
    image: `${SITE_URL}/images/cleaning-1.webp`,
    sameAs: [SOCIAL.facebook, SOCIAL.instagram],
    worksFor: { '@id': `${SITE_URL}/#business` },
    knowsAbout: ['Deep Cleaning', 'House Cleaning', 'Bathroom Descaling', 'Kitchen Degreasing', 'Gurgaon'],
    description: 'Founder of Sachin Deep Cleaning, 5+ years hands-on deep cleaning in Gurgaon — DLF to Sohna Road, 247 verified reviews, police-verified team lead.',
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      <JsonLd data={personSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: pageUrl('index') },
          { name: 'About Us', url },
        ])}
      />

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
              About Sachin Deep Cleaning
            </div>
            <h1>
              <span className="hl">The Police-Verified</span><br />
              Deep Cleaning Team<br />
              <span className="hl2">Gurgaon Trusts</span>
            </h1>
            <p className="hero-sub">
              A professional home and office deep cleaning service based in Gurgaon, Haryana. Transparent pricing, pay after satisfaction, same-day service across DLF, Sohna Road and all sectors.
            </p>
            <div className="hero-pills">
              <span className="pill"><span className="pi">✓</span> Pay After Satisfaction</span>
              <span className="pill"><span className="pi">✓</span> Police-Verified Team</span>
              <span className="pill"><span className="pi">✓</span> Eco-Friendly Products</span>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <TrustBar />

      <section className="section section-alt">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Who We Are</div>
            <h2 className="section-title">Specialists in Deep, Not Just Clean</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              We focus exclusively on deep, specialised cleaning tasks using professional equipment and eco-friendly, non-toxic products that are safe for children, elderly family members and pets. Our promise is simple: <strong>you only pay after you are completely satisfied</strong> with the result. No advance payment. Free re-clean within 24 hours if any area does not meet your expectation.
            </p>
          </div>
          <div className="services-grid" style={{ marginTop: '36px' }}>
            <div className="card">
              <div className="card-icon">🏠</div>
              <h3>Full-Home Deep Cleaning</h3>
              <p>Top-to-bottom refresh for apartments and independent houses across Gurugram.</p>
            </div>
            <div className="card">
              <div className="card-icon">🍳</div>
              <h3>Kitchen Degreasing</h3>
              <p>Chimneys, exhausts, cabinets and hobs freed of sticky grease build-up.</p>
            </div>
            <div className="card">
              <div className="card-icon">🚿</div>
              <h3>Bathroom Descaling</h3>
              <p>Hard-water scale and mould removed from tiles, taps and glass.</p>
            </div>
            <div className="card">
              <div className="card-icon">🛋️</div>
              <h3>Sofa & Carpet Shampoo</h3>
              <p>Stain removal and dust-mite extraction that refreshes upholstery.</p>
            </div>
            <div className="card">
              <div className="card-icon">📦</div>
              <h3>Move-In / Move-Out</h3>
              <p>Handover-ready cleaning for flats, offices and empty homes.</p>
            </div>
            <div className="card">
              <div className="card-icon">🏢</div>
              <h3>Office Cleaning</h3>
              <p>Workstations, pantries and washrooms cleaned around your business hours.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Why Gurgaon Needs Us</div>
            <h2 className="section-title">Cleaning Challenges Only Professionals Can Solve</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Gurgaon's combination of construction dust, hard water and heavy Indian cooking creates cleaning challenges that regular housekeeping cannot solve. Hard-water scale builds on bathroom tiles and taps within weeks. Kitchen chimneys and exhausts accumulate sticky grease. Sofas and carpets trap dust mites and allergens. This is why we exist.
            </p>
          </div>
          <div className="hiw-wrap" style={{ marginTop: '36px' }}>
            <div className="hiw-step fade-up">
              <div className="hiw-num">1</div>
              <div className="hiw-title">Hard-Water Scale</div>
              <div className="hiw-desc">Dissolved and scrubbed with professional descalers — not just wiped over.</div>
            </div>
            <div className="hiw-step fade-up">
              <div className="hiw-num">2</div>
              <div className="hiw-title">Sticky Kitchen Grease</div>
              <div className="hiw-desc">Chimney filters dismantled, soaked and degreased until suction is restored.</div>
            </div>
            <div className="hiw-step fade-up">
              <div className="hiw-num">3</div>
              <div className="hiw-title">Dust Mites & Allergens</div>
              <div className="hiw-desc">Deep vacuuming and extraction remove them from sofas and carpets.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Our Team</div>
            <h2 className="section-title">Trained. Verified. Trusted.</h2>
          </div>
          <div className="areas-list" style={{ marginTop: '24px', justifyContent: 'center', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {TEAM.map((t) => (
              <span key={t} className="area-tag" style={{ color: 'var(--green)', fontWeight: 700 }}>
                ✓ {t}
              </span>
            ))}
          </div>
          <p className="section-sub" style={{ margin: '28px auto 0', textAlign: 'center' }}>
            We treat your home with the same care we would give our own.
          </p>
        </div>
      </section>

      <section className="section" id="sachin-kumar">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Meet the Founder</div>
            <h2 className="section-title">Sachin Kumar — Hands-On in Every Gurgaon Home</h2>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', marginTop: 32, maxWidth: 800, marginInline: 'auto' }} className="fade-up">
            <img src="/images/cleaning-1.webp" alt="Sachin Kumar, founder of Sachin Deep Cleaning, Gurgaon — police-verified lead specialist" width="180" height="180" style={{ borderRadius: '50%', width: 140, height: 140, objectFit: 'cover', border: '3px solid var(--primary)' }} loading="lazy" />
            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 800, marginBottom: 8 }}>Sachin Kumar — Founder & Lead Specialist</h3>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 12 }}>5+ years cleaning Gurgaon homes from DLF Phase 5 to Sector 92. Police-verified, owner-present on every 3 BHK+ job, 247 verified reviews. Trained in descaling, extraction and food-safe degreasing. <a href="/blog/best-deep-cleaning-services-gurgaon.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>See how we compare →</a></p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href={SOCIAL.facebook} target="_blank" rel="noopener" style={{ color: 'var(--primary)', fontWeight: 700 }}>Facebook →</a>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener" style={{ color: 'var(--primary)', fontWeight: 700 }}>Instagram →</a>
                <a href={WHATSAPP} target="_blank" rel="noopener" style={{ color: 'var(--primary)', fontWeight: 700 }}>WhatsApp →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Our Process</div>
            <h2 className="section-title">From Call to Sparkling Home</h2>
          </div>
          <div className="hiw-wrap" style={{ marginTop: '36px' }}>
            {PROCESS.map((p, i) => (
              <div key={p.title} className="hiw-step fade-up">
                <div className="hiw-num">{i + 1}</div>
                <div className="hiw-title">{p.title}</div>
                <div className="hiw-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Areas We Serve</div>
            <h2 className="section-title">All of Gurgaon / Gurugram</h2>
          </div>
          <div className="areas-list" style={{ marginTop: '24px' }}>
            {AREAS.map((a) => (
              <span key={a} className="area-tag">{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Transparent Pricing</div>
            <h2 className="section-title">What We Say Is What You Pay</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              We quote the final amount on the confirmation call based on your home size and condition. No hidden charges.
            </p>
          </div>
          <div className="blog-table-wrap" style={{ marginTop: '32px' }}>
            <table className="blog-table">
              <thead>
                <tr><th>Service (2026)</th><th>Starting Price</th></tr>
              </thead>
              <tbody>
                {PRICING.map(([s, p]) => (
                  <tr key={s}><td>{s}</td><td>{p}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title">Let's Make Your Home Genuinely Clean</h2>
            <div style={{ marginTop: '28px', display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={waMsg('Hi, I want a free quote for deep cleaning in Gurgaon.')} target="_blank" rel="noopener" className="btn-wa-form" style={{ margin: 0 }} onClick={whatsappClick}>
                💬 WhatsApp: {PHONE}
              </a>
              <a href="tel:+919267905943" className="fcta-call" style={{ margin: 0, textAlign: 'center' }} onClick={phoneCallClick}>
                📞 Call: {PHONE}
              </a>
            </div>
            <p className="section-sub" style={{ margin: '20px auto 0' }}>Hours: Monday–Sunday, 8:00 AM – 8:00 PM</p>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
