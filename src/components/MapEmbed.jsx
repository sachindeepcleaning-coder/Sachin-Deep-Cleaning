import { useState } from 'react';
import { MAPS_URL } from '../lib/site.js';

// Click-to-load map facade.
//
// WHY: the contact page embedded a live Google Maps iframe. Even with
// loading="lazy" that is still a third-party fetch on a page whose whole
// point is to load fast, and it breaks the site's own pre-flight rule
// ("zero third-party fetch hosts in the initial HTML"). Every other embed on
// the site already uses this pattern — the YouTube shorts, the reels and the
// Instagram office reels all render a poster and swap in the real iframe on
// tap.
//
// The initial HTML therefore contains NO third-party request at all: just a
// static panel with the address and a button. The map loads only if the
// visitor asks for it.

export default function MapEmbed({ query, address, brand }) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        title={`${brand} — ${address}`}
        src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`}
        width="100%"
        height="360"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div
      style={{
        height: 360,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        textAlign: 'center',
        padding: 24,
        background:
          'linear-gradient(135deg, var(--bg-alt) 0%, var(--card) 100%)',
      }}
    >
      <div style={{ fontSize: '2rem', lineHeight: 1 }} aria-hidden="true">📍</div>
      <div style={{ fontWeight: 800, color: 'var(--dark)', fontFamily: 'Syne, sans-serif' }}>
        {brand}
      </div>
      <div style={{ color: 'var(--muted)', fontSize: '.9rem', maxWidth: 420, lineHeight: 1.6 }}>
        {address}
      </div>
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener"
        className="btn-outline"
        style={{ marginTop: 4 }}
      >
        Open in Google Maps →
      </a>
      <button
        type="button"
        onClick={() => setActive(true)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--muted)',
          fontSize: '.8rem',
          textDecoration: 'underline',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        Show the embedded map on this page
      </button>
    </div>
  );
}
