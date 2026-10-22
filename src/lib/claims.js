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
//      makes it safe to state — and it is shown where it matters.
//
// The Google listing is NOT cited anywhere on this site: the listing cannot be
// renamed, so no rating, star score or review count is published here. The
// only claims left are the ones this business can evidence itself.

// The one approved wording for the police-verification claim. Every badge,
// pill and sentence on the site uses this — never "every member", never
// "all cleaners", and always with the proof line next to it.
export const POLICE_VERIFIED_CLAIM =
  'Police-verified team: ID and background check shown on request';
export const POLICE_VERIFIED_PROOF_LINE = 'ID and background check shown on request.';

export const CLAIMS = {
  policeVerified: {
    label: 'Police-verified team',
    proof: 'ID and background check shown to the customer on request before the visit',
    verified: true,
    // The text that must not be rendered anywhere while this claim is
    // unproven. scripts/preflight.mjs fails the build if it appears.
    marker: 'Police-Verified Team',
  },
};

// Canonical badge copy for the police-verification claim. One definition, so
// there is a single place to confirm or reword that claim.
export const POLICE_VERIFIED_BADGE = {
  icon: '👮',
  title: 'Police-Verified Team',
  sub: POLICE_VERIFIED_PROOF_LINE,
};

// The variant badges used on service pages. Same claim, same proof line.
export const POLICE_VERIFIED_VARIANTS = {
  care: ['👮', 'Police-Verified Team', POLICE_VERIFIED_PROOF_LINE],
  commercial: ['👮', 'Police-Verified Team', POLICE_VERIFIED_PROOF_LINE],
  standard: ['🛡️', 'Police-Verified Team', POLICE_VERIFIED_PROOF_LINE],
  handover: ['👮', 'Police-Verified Team', POLICE_VERIFIED_PROOF_LINE],
  move: ['👮', 'Police-Verified Team', POLICE_VERIFIED_PROOF_LINE],
};
