export default function GuaranteeSection() {
  return (
    <div className="guarantee-section">
      <div className="guarantee-inner fade-up">
        <span className="guarantee-badge">🛡️</span>
        <h2>Our Iron-Clad Satisfaction Guarantee — 3-Day Service Promise</h2>
        <p>We're so confident in our cleaning that you <strong style={{ color: '#fff' }}>don't pay until you're satisfied</strong>. Not happy with any area? We re-clean for free within 24 hours. Still not satisfied? Full refund — no questions asked. Plus <strong style={{ color: '#4ade80' }}>₹10,000 damage protection</strong> on every booking — same as Urban Company.</p>
        <div className="guarantee-pills">
          <span className="gp">✓ Pay After Cleaning</span>
          <span className="gp">✓ Free Re-Clean Within 24hrs</span>
          <span className="gp">✓ 3-Day Service Guarantee</span>
          <span className="gp">✓ ₹10k Damage Insurance</span>
          <span className="gp">✓ No Hidden Charges</span>
          <span className="gp">✓ Verified Professionals</span>
        </div>
        <p style={{ marginTop: '18px', fontSize: '.82rem', color: '#8FA4BE', maxWidth: '720px', marginInline: 'auto' }}>
          <strong style={{ color: '#CBD8EA' }}>What's Not Included:</strong> Repair, plumbing, electrical, appliance servicing or dismantling beyond safe access — we clean, we don't repair. Chimney motor internal repair and natural-stone-safe acids excluded. This keeps our price honest vs “everything” promises.
        </p>
      </div>
    </div>
  );
}