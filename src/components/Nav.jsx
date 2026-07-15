import { useEffect, useState } from 'react';
import { WHATSAPP } from '../lib/site.js';
import ThemeToggle from './ThemeToggle.jsx';

const LINKS = [
  ['index.html', 'Home'],
  ['index.html#services', 'Services'],
  ['index.html#why', 'Why Us'],
  ['index.html#process', 'Process'],
  ['contact.html', 'Contact'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav">
        <a href="index.html" className="logo">
          <span className="logo-icon">🧽</span>
          <span>Sachin <strong>Deep Cleaning</strong></span>
        </a>
        <nav className={`nav-links${open ? ' open' : ''}`} id="navLinks">
          {LINKS.map(([href, label]) => (
            <a key={href + label} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-whatsapp nav-cta">
          WhatsApp Us
        </a>
        <ThemeToggle />
        <button
          className="hamburger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
