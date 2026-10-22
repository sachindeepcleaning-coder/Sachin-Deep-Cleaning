import { REVIEWS } from '../lib/landing.js';
import { RATING } from '../lib/site.js';
import { ratingAsOf } from '../lib/claims.js';

export default function ReviewsSection({ reviews = REVIEWS }) {
  // A page with no testimonials must not imply it has any. Show the sourced
  // Google rating on its own, and only add the "What Gurgaon Families Say"
  // headline when there are real quotes to put under it.
  const hasQuotes = reviews && reviews.length > 0;

  return (
    <section className="section">
      <div className="section-inner">
        <div className="reviews-head fade-up">
          {hasQuotes && (
            <>
              <div className="section-tag">Customer Reviews</div>
              <h2 className="section-title">What Gurgaon Families Say</h2>
            </>
          )}
          {!hasQuotes && <div className="section-tag">Google reviews</div>}
          <div style={{ marginTop: '14px' }}>
            <div className="rating-summary">
              <span className="rs-stars">⭐⭐⭐⭐⭐</span>
              <span className="rs-num">{RATING.value}</span>
              <span className="rs-count">/ 5 · {RATING.count} Google reviews (checked {ratingAsOf()})</span>
            </div>
          </div>
        </div>
        {hasQuotes && (
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
        )}
      </div>
    </section>
  );
}