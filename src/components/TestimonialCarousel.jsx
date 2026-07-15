import { useEffect, useState } from 'react';

const TESTIMONIALS = [
  { name: 'Rahul Sharma', role: 'DLF Phase 2', stars: 5, text: 'Booked a 3 BHK deep clean. Team was punctual, polite and the home looked brand new. Highly recommend!' },
  { name: 'Priya Menon', role: 'Sector 56', stars: 5, text: 'Sofa and carpet shampoo done perfectly. Stains I thought were permanent are gone. Great service.' },
  { name: 'Amit Verma', role: 'Golf Course Road', stars: 5, text: 'Kitchen hadn’t been this clean in years. Reasonable pricing and no hidden charges.' },
  { name: 'Sneha Kapoor', role: 'Sohna Road', stars: 5, text: 'Move-out cleaning helped me get my deposit back. Thorough and hassle-free.' },
];

export default function TestimonialCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[i];
  return (
    <div className="testimonials">
      <div className="t-card">
        <div className="t-stars">{'★'.repeat(t.stars)}</div>
        <p className="t-text">“{t.text}”</p>
        <div className="t-author">
          <div className="t-avatar">{t.name[0]}</div>
          <div>
            <div className="t-name">{t.name}</div>
            <div className="t-role">{t.role}</div>
          </div>
        </div>
      </div>
      <div className="t-controls">
        {TESTIMONIALS.map((_, idx) => (
          <button
            key={idx}
            className={`t-dot${idx === i ? ' active' : ''}`}
            aria-label={`Go to testimonial ${idx + 1}`}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </div>
  );
}
