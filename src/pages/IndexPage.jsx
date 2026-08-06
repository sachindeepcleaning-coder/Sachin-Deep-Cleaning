import Hero from '../components/Hero.jsx';
import TrustBar from '../components/TrustBar.jsx';
import VideoSection from '../components/VideoSection.jsx';
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
import { JsonLd, localBusinessSchema, faqSchema } from '../lib/schema.jsx';
import { FAQS } from '../lib/landing.js';
import { SITE_URL } from '../lib/site.js';

export default function IndexPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema({ url: SITE_URL + '/index.html' })} />
      <JsonLd data={faqSchema(FAQS.map(([q, a]) => ({ q, a })))} />

      <Hero />
      <TrustBar />
      <VideoSection />
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