import { CONTENT_UPDATED, formatDate } from '../lib/site.js';

// Visible freshness signal for money pages (deterministic: no locale/Date calls,
// so prerender and hydration output are identical).
export default function UpdatedNote() {
  return (
    <p className="updated-note" style={{ textAlign: 'center', margin: '10px 0 0', fontSize: '.85rem', color: 'var(--muted)' }}>
      Prices and details last updated: <time dateTime={CONTENT_UPDATED}>{formatDate(CONTENT_UPDATED)}</time>
    </p>
  );
}
