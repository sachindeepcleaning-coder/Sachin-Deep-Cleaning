import { TRUST_VARIANTS } from '../lib/trust-variants.js';

export default function TrustBar({ variant } = {}) {
  const items = (variant && TRUST_VARIANTS[variant]) || TRUST_VARIANTS.standard;
  return (
    <div className="trust-bar">
      <div className="trust-bar-inner">
        {items.map(([icon, main, sub]) => (
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