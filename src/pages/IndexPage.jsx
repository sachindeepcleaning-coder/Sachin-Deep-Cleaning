import Hero from '../components/Hero.jsx';
import TrustBar from '../components/TrustBar.jsx';
import ReelSection from '../components/ReelSection.jsx';
import ServiceSection from '../components/ServiceSection.jsx';
import ChecklistSection from '../components/ChecklistSection.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import WhyUsSection from '../components/WhyUsSection.jsx';
import PricingSection from '../components/PricingSection.jsx';
import GuaranteeSection from '../components/GuaranteeSection.jsx';
import AreasSection from '../components/AreasSection.jsx';
import FaqSection from '../components/FaqSection.jsx';
import FinalCta from '../components/FinalCta.jsx';
import UpdatedNote from '../components/UpdatedNote.jsx';
import { JsonLd, websiteSchema, localBusinessSchema, faqSchema, webpageSchema } from '../lib/schema.jsx';
import { FAQS, REVIEWS } from '../lib/landing.js';
import { CONTENT_UPDATED } from '../lib/site.js';

export default function IndexPage({ url }) {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={faqSchema(FAQS.map(([q, a]) => ({ q, a })), url)} />
      <JsonLd data={webpageSchema({ title: 'Sachin Deep Cleaning — Home Deep Cleaning in Gurgaon', description: 'Full-home, kitchen, bathroom, sofa and carpet deep cleaning in Gurgaon with fixed prices and pay-after-satisfaction.', url, dateModified: CONTENT_UPDATED })} />

      <Hero />
      <TrustBar />
      <UpdatedNote />
      <div style={{ textAlign: 'center', padding: '18px 20px 2px' }}>
        <p style={{ margin: 0, fontSize: '.95rem', color: 'var(--muted)' }}>
          Price-first? See <a href="/blog/deep-cleaning-cost-gurgaon-2026.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>every 2026 deep cleaning price</a> — or book online now on <a href="/book-cleaning-online-gurgaon.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>the no-app booking page</a>.
        </p>
      </div>
      <ReelSection />
      <ServiceSection />
      <ChecklistSection />
      <HowItWorks />
      <ReviewsSection reviews={REVIEWS} />
      <WhyUsSection />
      <PricingSection />
      <GuaranteeSection />
      <AreasSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}