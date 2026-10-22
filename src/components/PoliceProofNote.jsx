import { POLICE_VERIFIED_CLAIM } from '../lib/claims.js';

// The approved wording for the police-verification claim.
//
// The claim is only honest if the visitor can see how to check it, so this
// line sits next to every "Police-Verified" pill or badge. scripts/preflight.mjs
// fails the build if a page carries the claim without this line.
export default function PoliceProofNote({ style }) {
  return (
    <p style={{ fontSize: '.86rem', color: 'var(--muted)', margin: '10px 0 0', ...style }}>
      {POLICE_VERIFIED_CLAIM}.
    </p>
  );
}
