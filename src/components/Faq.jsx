import { useState } from 'react';

// FAQ accordion with live search/filter.
export default function Faq({ items }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(null);
  const filtered = items.filter((it) =>
    (it.q + ' ' + it.a).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <input
        className="faq-search"
        type="search"
        placeholder="Search FAQs…"
        aria-label="Search FAQs"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="faq">
        {filtered.map((it, idx) => {
          const isOpen = open === idx;
          return (
            <div className={`faq-item${isOpen ? ' open' : ''}`} key={idx}>
              <button
                className="faq-q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : idx)}
              >
                {it.q}
              </button>
              <div className="faq-a">
                <p>{it.a}</p>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-muted" style={{ textAlign: 'center' }}>
            No results found. Call us — we’re happy to help!
          </p>
        )}
      </div>
    </div>
  );
}
