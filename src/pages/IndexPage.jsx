import Hero from '../components/Hero.jsx';
import TrustBar from '../components/TrustBar.jsx';
import ReelSection from '../components/ReelSection.jsx';
import CountdownStrip from '../components/CountdownStrip.jsx';
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
import { JsonLd, localBusinessSchema, faqSchema, reviewsSchema } from '../lib/schema.jsx';
import { FAQS, REVIEWS } from '../lib/landing.js';

export default function IndexPage({ url }) {
  return (
    <>
      <JsonLd data={localBusinessSchema({ url })} />
      <JsonLd data={faqSchema(FAQS.map(([q, a]) => ({ q, a })))} />
      <JsonLd data={reviewsSchema(REVIEWS, 'Deep Cleaning Services in Gurgaon')} />

      <Hero />
      <TrustBar />
      <ReelSection />
      <CountdownStrip />
      <ServiceSection />
      <ChecklistSection />
      <HowItWorks />
      <ReviewsSection />
      <WhyUsSection />
      <PricingSection />
      <GuaranteeSection />
      <AreasSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}