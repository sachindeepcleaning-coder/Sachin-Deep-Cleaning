import SkipLink from './SkipLink.jsx';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import { WHATSAPP, PHONE_TEL } from '../lib/site.js';

export default function Layout({ children }) {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <div className="mobile-bar">
        <a href={PHONE_TEL} className="mb-btn mb-call" aria-label="Call Sachin Deep Cleaning">
          <span className="mb-icon">📞</span><span>Call</span>
        </a>
        <a href={WHATSAPP} target="_blank" rel="noopener" className="mb-btn mb-wa" aria-label="Chat on WhatsApp">
          <span className="mb-icon">💬</span><span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}
