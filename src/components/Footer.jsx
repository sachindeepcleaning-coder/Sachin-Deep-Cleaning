import { PHONE_TEL } from '../lib/site.js';
import { phoneCallClick } from '../lib/landing.js';

export default function Footer() {
  return (
    <footer>
      <p><strong>Sachin Deep Cleaning Services</strong> — Professional Deep Cleaning in Gurgaon</p>
      <p>📍 Serving all of Gurgaon, Haryana &nbsp;|&nbsp; 📞 <a href={PHONE_TEL} onClick={phoneCallClick}>+91 92679-05943</a></p>
      <p style={{ marginTop: '10px' }}>© {new Date().getFullYear()} Sachin Deep Cleaning. All rights reserved.</p>
      <p style={{ marginTop: '6px' }}>
        <a href="/all-pages.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>All Pages</a>
        <a href="/blog.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Blog</a>
        <a href="/sitemap.xml" style={{ color: '#8FA4BE', textDecoration: 'none' }}>Sitemap</a>
      </p>
    </footer>
  );
}