import Reveal from '../components/Reveal.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import StatsCounter from '../components/StatsCounter.jsx';
import TestimonialCarousel from '../components/TestimonialCarousel.jsx';
import Faq from '../components/Faq.jsx';
import ComparisonTool from '../components/ComparisonTool.jsx';
import BeforeAfter from '../components/BeforeAfter.jsx';
import LeadForm from '../components/LeadForm.jsx';
import MultiStepForm from '../components/MultiStepForm.jsx';
import ThreeHeroSafe from '../components/ThreeHeroSafe.jsx';
import { JsonLd, localBusinessSchema, faqSchema } from '../lib/schema.jsx';
import { WHATSAPP, PHONE_TEL, PHONE, SITE_URL } from '../lib/site.js';

const SERVICES = [
  { icon: '🛋️', title: 'Sofa & Upholstery', text: 'Steam & dry cleaning of sofas, mattresses, carpets and curtains.', href: 'sofa-shampoo-cleaning-gurgaon.html' },
  { icon: '🚿', title: 'Bathroom Deep Clean', text: 'Descaling tiles, faucets, commodes and exhaust fans.', href: 'bathroom-deep-cleaning-gurgaon.html' },
  { icon: '🍳', title: 'Kitchen Deep Clean', text: 'Degreasing chimneys, cabinets and countertops.', href: 'kitchen-deep-cleaning-gurgaon.html' },
  { icon: '🏠', title: 'Full House Cleaning', text: 'End-to-end deep cleaning of every room.', href: 'full-home-deep-cleaning-2bhk-gurgaon.html' },
  { icon: '🪟', title: 'Window & Glass', text: 'Streak-free cleaning of windows and balcony rails.', href: 'deep-cleaning-services-in-gurgaon.html' },
  { icon: '🦠', title: 'Sanitization', text: 'Anti-viral and anti-bacterial fogging.', href: 'deep-cleaning-services-in-gurgaon.html' },
];

const WHY = [
  ['✅', 'Trained Professionals', 'Verified, experienced cleaners who treat your home with care.'],
  ['✅', 'Eco-Friendly Products', 'Safe, non-toxic solutions for kids and pets.'],
  ['✅', 'Affordable Pricing', 'Transparent rates with no hidden charges.'],
  ['✅', 'On-Time Service', 'We respect your schedule and deliver as promised.'],
  ['✅', '100% Satisfaction', 'Not happy? We re-clean at no extra cost.'],
  ['✅', 'All Gurgaon Areas', 'DLF, Sohna Road, Golf Course, Sector 14, 56 and more.'],
];

const FAQS = [
  { q: 'How soon can you schedule a cleaning?', a: 'Often within 24 hours. WhatsApp us your requirements and we’ll confirm a slot.' },
  { q: 'Are your products safe for kids and pets?', a: 'Yes — we use eco-friendly, non-toxic cleaning solutions.' },
  { q: 'Do you provide a quote first?', a: 'Yes, free estimates on WhatsApp or via the form on this page.' },
  { q: 'What if I’m not satisfied?', a: 'We offer a 100% satisfaction guarantee and re-clean free of cost.' },
];

const STATS = [
  { value: 500, suffix: '+', label: 'Homes Cleaned' },
  { value: 4.9, suffix: '★', label: 'Avg Rating' },
  { value: 24, suffix: 'h', label: 'Quick Booking' },
  { value: 100, suffix: '%', label: 'Satisfaction' },
];

const BEFORE = 'https://images.unsplash.com/photo-1527515637462-b27a8971784a?auto=format&fit=crop&w=900&q=70';
const AFTER = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=70';

export default function IndexPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema({ url: SITE_URL + '/index.html' })} />
      <JsonLd data={faqSchema(FAQS)} />

      {/* Hero */}
      <section className="hero" id="home">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="badge">Trusted Home Deep Cleaning in Gurgaon</span>
            <h1>Make Your Home <span className="accent">Spotless &amp; Fresh</span></h1>
            <p>Professional deep cleaning across Gurgaon — sofas, bathrooms, kitchens and full-house makeovers. Trained staff, eco-friendly products, 100% satisfaction.</p>
            <div className="hero-actions">
              <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-whatsapp">Book on WhatsApp</a>
              <a href={PHONE_TEL} className="btn btn-outline">Call {PHONE}</a>
            </div>
            <LeadForm formName="lead-hero" source="Homepage Hero" compact />
            <div className="hero-stats">
              <div><strong>500+</strong><span>Homes Cleaned</span></div>
              <div><strong>4.9★</strong><span>Avg Rating</span></div>
              <div><strong>24h</strong><span>Quick Booking</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="blob" />
            <ThreeHeroSafe />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" id="services">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Our Services</span>
            <h2>Deep Cleaning, Done Right</h2>
            <p>Choose from our most popular home cleaning packages in Gurgaon.</p>
          </Reveal>
          <div className="cards">
            {SERVICES.map((s) => (
              <Reveal key={s.title}><ServiceCard {...s} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section section-alt" id="why">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Why Choose Us</span>
            <h2>Gurgaon’s Reliable Cleaning Partner</h2>
          </Reveal>
          <div className="features">
            {WHY.map(([icon, title, text]) => (
              <Reveal key={title} className="feature">
                <span className="feature-icon">{icon}</span>
                <div><h4>{title}</h4><p>{text}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" id="process">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">How It Works</span>
            <h2>Book in 3 Simple Steps</h2>
          </Reveal>
          <div className="steps">
            {[
              ['1', 'Get a Quote', 'Message us on WhatsApp with your requirements.'],
              ['2', 'Pick a Slot', 'Choose a date and time that suits you.'],
              ['3', 'Relax', 'Our team deep cleans while you sit back.'],
            ].map(([n, t, d]) => (
              <Reveal key={n} className="step">
                <div className="step-num">{n}</div>
                <h4>{t}</h4>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison tool */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Compare &amp; Quote</span>
            <h2>Find the Right Package</h2>
            <p>Filter by home size to see time, price and book instantly.</p>
          </Reveal>
          <Reveal><ComparisonTool /></Reveal>
        </div>
      </section>

      {/* Before / After */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Real Results</span>
            <h2>Before &amp; After</h2>
            <p>Drag the slider to see the difference.</p>
          </Reveal>
          <Reveal><BeforeAfter before={BEFORE} after={AFTER} /></Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Happy Customers</span>
            <h2>What Gurgaon Says</h2>
          </Reveal>
          <Reveal><TestimonialCarousel /></Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <Reveal><StatsCounter stats={STATS} /></Reveal>
        </div>
      </section>

      {/* Multi-step quote */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Book Now</span>
            <h2>Get a Quote in 3 Steps</h2>
          </Reveal>
          <Reveal><MultiStepForm /></Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Common Questions</h2>
          </Reveal>
          <Reveal><Faq items={FAQS} /></Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta" id="contact">
        <div className="container">
          <h2>Ready for a Cleaner Home?</h2>
          <p>Book your deep cleaning in Gurgaon today. Free estimate on WhatsApp.</p>
          <div className="cta-actions">
            <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-whatsapp">Chat on WhatsApp</a>
            <a href={PHONE_TEL} className="btn btn-outline">Call Now</a>
          </div>
          <div className="contact-info">
            <p>📞 <a href={PHONE_TEL}>{PHONE}</a></p>
            <p>📍 Serving all areas of Gurgaon, Haryana</p>
          </div>
        </div>
      </section>
    </>
  );
}
