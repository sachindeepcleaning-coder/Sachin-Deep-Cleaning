import { REVIEWS } from '../lib/landing.js';

export default function ReviewsSection({ reviews = REVIEWS }) {
  // A page with no testimonials must not imply it has any, and no rating or
  // review count is published anywhere on this site — so a page without
  // quotes shows no review section at all.
  const hasQuotes = reviews && reviews.length > 0;
  if (!hasQuotes) return null;

  return (
    <section className="section">
      <div className="section-inner">
        <div className="reviews-head fade-up">
          <div className="section-tag">Customer Reviews</div>
          <h2 className="section-title">What Gurgaon Families Say</h2>
        </div>
        <div className="reviews-grid">
          {reviews.map(([initials, name, loc, text]) => (
            <div key={initials + name} className="review-card fade-up">
              <div className="review-stars">⭐⭐⭐⭐⭐</div>
              <p className="review-text">&ldquo;{text}&rdquo;</p>
              <div className="reviewer">
                <div className="reviewer-av">{initials}</div>
                <div>
                  <div className="reviewer-name">{name}</div>
                  <div className="reviewer-loc">{loc}</div>
                </div>
                <span className="review-verified">✓ Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}