const ITEMS = [
  ['🛡️', 'Police Verified', 'Every team member'],
  ['💰', 'Pay After Cleaning', 'Zero advance payment'],
  ['🔄', 'Free Re-Clean', "If you're not satisfied"],
  ['⚡', 'Same-Day Available', 'Book before 12 PM'],
  ['🌿', 'Eco-Friendly Products', 'Safe for kids & pets'],
];

export default function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-bar-inner">
        {ITEMS.map(([icon, main, sub]) => (
          <div key={main} className="trust-item">
            <span className="trust-icon">{icon}</span>
            <div className="trust-text">
              <div className="trust-main">{main}</div>
              <div className="trust-sub">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}