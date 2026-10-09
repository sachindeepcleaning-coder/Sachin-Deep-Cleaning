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
import UpdatedNote from '../components/UpdatedNote.jsx';
import { JsonLd, websiteSchema, localBusinessSchema, faqSchema, webpageSchema } from '../lib/schema.jsx';
import { FAQS } from '../lib/landing.js';
import { CONTENT_UPDATED } from '../lib/site.js';

export default function IndexPage({ url }) {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={localBusinessSchema({ url })} />
      <JsonLd data={faqSchema(FAQS.map(([q, a]) => ({ q, a })))} />
      <JsonLd data={webpageSchema({ title: 'Sachin Deep Cleaning — Home Deep Cleaning in Gurgaon', description: 'Full-home, kitchen, bathroom, sofa and carpet deep cleaning in Gurgaon with fixed prices and pay-after-satisfaction.', url, dateModified: CONTENT_UPDATED })} />

      <Hero />
      <TrustBar />
      <UpdatedNote />
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