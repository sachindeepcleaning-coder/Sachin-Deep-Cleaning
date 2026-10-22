import { useEffect, useState } from 'react';
import { FAQS } from '../lib/landing.js';

// Each question is a real <h3> wrapping the accordion button. Google expects
// an FAQ question to be a heading, and LLM extractors key off heading
// structure — a bare <button> gives them nothing to hang the answer on.
export default function FaqSection({ faqs = FAQS }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="section">
      <div className="section-inner">
        <div style={{ textAlign: 'center' }} className="fade-up">
          <div className="section-tag">FAQ</div>
          <h2 className="section-title">Common Questions Answered</h2>
        </div>
        <div className="faq-wrap">
          {faqs.map(([q, a], i) => {
            const isOpen = open === i;
            const answerId = `faq-a-${i}`;
            return (
              <div key={q} className={`faq-item${isOpen ? ' open' : ''}`}>
                <h3 className="faq-h3">
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {q}
                    <span className="faq-arrow" aria-hidden="true">▼</span>
                  </button>
                </h3>
                <div className="faq-a" id={answerId}>{a}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
