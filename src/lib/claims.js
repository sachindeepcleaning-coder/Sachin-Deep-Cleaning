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

export const CLAIMS = {
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
