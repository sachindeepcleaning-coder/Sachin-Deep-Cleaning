import { PHONE_TEL } from '../lib/site.js';

export default function Footer() {
  return (
    <footer>
      <p><strong>Sachin Deep Cleaning Services</strong> — Professional Deep Cleaning in Gurgaon</p>
      <p>📍 Serving all of Gurgaon, Haryana &nbsp;|&nbsp; 📞 <a href={PHONE_TEL}>+91 92679-05943</a></p>
      <p style={{ marginTop: '10px' }}>© {new Date().getFullYear()} Sachin Deep Cleaning. All rights reserved.</p>
      <p style={{ marginTop: '6px' }}><a href="/sitemap.xml" style={{ color: '#8FA4BE', textDecoration: 'none' }}>Sitemap</a></p>
    </footer>
  );
}