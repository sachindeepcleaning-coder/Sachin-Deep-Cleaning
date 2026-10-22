import { PHONE_TEL, ADDRESS_FULL } from '../lib/site.js';
import { phoneCallClick } from '../lib/landing.js';
import { SERVICE_LINKS } from '../generated/service-links.js';

// The footer is the one link block every page passes through, so it is the
// site's crawl backbone. The service list is GENERATED from pages.config.mjs
// (scripts/gen-article-modules.mjs) — a hardcoded list silently dropped the
// 20 new service pages, leaving them with no inbound link at all.
const FOOTER_LINKS = [
  { label: 'All Cleaning Services', href: '/services.html' },
  ...SERVICE_LINKS.map((l) => ({ label: l.label, href: `/${l.href}` })),
];

export default function Footer() {
  return (
    <footer>
      <p><strong>Sachin Deep Cleaning</strong> — Professional Deep Cleaning in Gurgaon</p>
      <p>📍 {ADDRESS_FULL} — serving all of Gurgaon &nbsp;|&nbsp; 📞 <a href={PHONE_TEL} onClick={phoneCallClick}>+91 95607 39281</a></p>
      <p style={{ marginTop: '10px' }}>© {new Date().getFullYear()} Sachin Deep Cleaning. All rights reserved.</p>
      <p style={{ marginTop: '6px' }}>
        {FOOTER_LINKS.map((l) => (
          <a key={l.href} href={l.href} style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>{l.label}</a>
        ))}
      </p>
      <p style={{ marginTop: '6px' }}>
        <span style={{ color: '#8FA4BE', marginRight: '16px' }}>Top Guides:</span>
        <a href="/blog/deep-cleaning-cost-gurgaon-2026.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Deep Cleaning Cost Guide</a>
        <a href="/blog/urban-company-vs-sachin-deep-cleaning.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Urban Company vs Sachin</a>
        <a href="/blog/nobroker-cleaning-vs-sachin-deep-cleaning.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>NoBroker vs Sachin</a>
        <a href="/blog/safaiwale-vs-sachin-deep-cleaning.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Safaiwale vs Sachin</a>
        <a href="/blog/diwali-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Diwali Cleaning Gurgaon</a>
        <a href="/blog/full-home-deep-cleaning-packages-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Full Home Packages</a>
        <a href="/blog/bathroom-deep-cleaning-gurgaon-best.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Bathroom Best ₹800</a>
        <a href="/blog/kitchen-cleaning-price-gurgaon-chimney.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Kitchen Price Chimney</a>
        <a href="/blog/2bhk-deep-cleaning-price-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>2BHK Price</a>
        <a href="/blog/3bhk-deep-cleaning-price-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>3BHK Price</a>
        <a href="/blog/dlf-phase-3-deep-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>DLF Phase 3</a>
        <a href="/blog/sohna-road-deep-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Sohna Road</a>
      </p>
      <p style={{ marginTop: '6px' }}>
        <a href="/services.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>All Services</a>
        <a href="/facts.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Facts &amp; Price List</a>
        <a href="/all-pages.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>All Pages</a>
        <a href="/about.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>About Us</a>
        <a href="/blog.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Blog</a>
        <a href="/contact.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Contact</a>
        <a href="/privacy.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Privacy</a>
        <a href="/sitemap.xml" style={{ color: '#8FA4BE', textDecoration: 'none' }}>Sitemap</a>
      </p>
    </footer>
  );
}