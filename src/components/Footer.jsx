import { PHONE_TEL } from '../lib/site.js';
import { phoneCallClick } from '../lib/landing.js';

export default function Footer() {
  return (
    <footer>
      <p><strong>Sachin Deep Cleaning Services</strong> — Professional Deep Cleaning in Gurgaon</p>
      <p>📍 Serving all of Gurgaon, Haryana &nbsp;|&nbsp; 📞 <a href={PHONE_TEL} onClick={phoneCallClick}>+91 92679-05943</a></p>
      <p style={{ marginTop: '10px' }}>© {new Date().getFullYear()} Sachin Deep Cleaning. All rights reserved.</p>
      <p style={{ marginTop: '6px' }}>
        <a href="/full-home-deep-cleaning-2bhk-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Full Home Deep Cleaning Gurgaon</a>
        <a href="/kitchen-deep-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Kitchen Deep Cleaning Gurgaon</a>
        <a href="/bathroom-deep-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Bathroom Deep Cleaning Gurgaon</a>
        <a href="/sofa-shampoo-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Sofa Cleaning Gurgaon</a>
        <a href="/office-deep-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Office Deep Cleaning Gurgaon</a>
        <a href="/move-in-move-out-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Move-In Move-Out Gurgaon</a>
      </p>
      <p style={{ marginTop: '6px' }}>
        <a href="/all-pages.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>All Pages</a>
        <a href="/about.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>About Us</a>
        <a href="/blog.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Blog</a>
        <a href="/contact.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Contact</a>
        <a href="/sitemap.xml" style={{ color: '#8FA4BE', textDecoration: 'none' }}>Sitemap</a>
      </p>
    </footer>
  );
}