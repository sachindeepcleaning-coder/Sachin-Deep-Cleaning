import { WHATSAPP, PHONE_TEL, PHONE, SOCIAL } from '../lib/site.js';

const RELATED = [
  ['deep-cleaning-services-in-gurgaon.html', 'Deep Cleaning Gurgaon'],
  ['house-cleaning-services-in-gurgaon.html', 'House Cleaning Gurgaon'],
  ['full-home-deep-cleaning-1bhk-gurgaon.html', '1 BHK Cleaning'],
  ['full-home-deep-cleaning-2bhk-gurgaon.html', '2 BHK Cleaning'],
  ['full-home-deep-cleaning-3bhk-gurgaon.html', '3 BHK Cleaning'],
  ['full-home-deep-cleaning-4bhk-gurgaon.html', '4 BHK Cleaning'],
  ['full-home-deep-cleaning-5bhk-gurgaon.html', '5 BHK Cleaning'],
  ['kitchen-deep-cleaning-gurgaon.html', 'Kitchen Cleaning'],
  ['bathroom-deep-cleaning-gurgaon.html', 'Bathroom Cleaning'],
  ['sofa-shampoo-cleaning-gurgaon.html', 'Sofa Shampoo'],
  ['carpet-shampoo-cleaning-gurgaon.html', 'Carpet Shampoo'],
  ['office-deep-cleaning-gurgaon.html', 'Office Cleaning'],
  ['move-in-move-out-cleaning-gurgaon.html', 'Move-In/Out Cleaning'],
  ['contact.html', 'Contact'],
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="index.html" className="logo">
            <span className="logo-icon">🧽</span>
            <span>Sachin <strong>Deep Cleaning</strong></span>
          </a>
          <p>Your trusted home deep cleaning partner in Gurgaon.</p>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <a href={SOCIAL.facebook} target="_blank" rel="noopener">Facebook</a>
          <a href={SOCIAL.instagram} target="_blank" rel="noopener">Instagram</a>
          <a href={SOCIAL.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p><a href={PHONE_TEL}>{PHONE}</a></p>
          <p>Gurgaon, Haryana</p>
        </div>
      </div>
      <div className="container" style={{ marginTop: '30px' }}>
        <div className="related">
          {RELATED.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {year} Sachin Deep Cleaning. All rights reserved.</p>
      </div>
    </footer>
  );
}
