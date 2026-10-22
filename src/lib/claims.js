// Public claims register.
//
// Every checkable claim the site makes lives here with its PROOF. A claim
// with no proof is flagged, and scripts/preflight.mjs reports it on every
// build — so nothing is asserted silently.
//
// Two rules:
//   1. Never invent a count, rating or certificate. If a claim cannot be
//      sourced, `proof` stays null and the claim is flagged [VERIFY].
//   2. A claim with a proof may be stated on the page. The proof is what
//      makes it safe to state — and it is shown where it matters (the
//      rating carries its as-of date on the page).

import { RATING, formatDate } from './site.js';

export const CLAIMS = {
  googleRating: {
    label: 'Google rating',
    value: RATING.value,
    count: RATING.count,
    asOf: RATING.asOf,
    proof: `Google Business Profile, checked ${RATING.asOf}`,
    verified: true,
    // [VERIFY] Third-party aggregators currently report 4.5 from 74 reviews
    // for this shop under a different listing name. Re-read the live Google
    // Business Profile before each deploy and update RATING in
    // src/lib/site.js only — never here, never anywhere else.
  },

  policeVerified: {
    label: 'Police-verified team',
    proof: null,
    verified: false,
    // [VERIFY] This is an operational commitment, not a third-party
    // certificate: every crew member on the roster should hold a current
    // police verification, and the customer can ask to see ID before the
    // visit. Confirm the roster is current, then set `proof` to the wording
    // below and `verified` to true.
    proofWhenConfirmed:
      'ID and background check shown to the customer on request before the visit',
  },
};

// Canonical badge copy for the police-verification claim. One definition, so
// there is a single place to confirm or reword it.
export const POLICE_VERIFIED_BADGE = {
  icon: '👮',
  title: 'Police-Verified Team',
  sub: 'Background-checked, ID-verified cleaners. Team details shared on WhatsApp before arrival.',
};

// The variant badges used on service pages. Same claim, contextual wording.
export const POLICE_VERIFIED_VARIANTS = {
  care: ['👮', 'Police-Verified Specialists', 'Background-checked, ID-verified staff. The person quoted is the crew that arrives.'],
  commercial: ['👮', 'Police-Verified Staff', 'Background-checked teams, uniformed on site, same faces on repeat schedules.'],
  standard: ['🛡️', 'Police Verified', 'Every team member'],
  handover: ['👮', 'Police Verified', 'Every team member'],
  move: ['👮', 'Police Verified', 'Uniformed on site'],
};

// "Oct 2026" — the short form used next to a rating on the page.
export function ratingAsOf() {
  const [, m, y] = RATING.asOf.split('-').map(Number);
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${MONTHS[m - 1]} ${y}`;
}

// The rating as it appears on the page, with its proof attached.
export function ratingLabel() {
  return `${RATING.value} ★ on Google (${RATING.count} reviews · checked ${ratingAsOf()})`;
}
