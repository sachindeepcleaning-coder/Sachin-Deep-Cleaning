import { GUARANTEE_VARIANTS } from '../lib/trust-variants.js';

function Bold({ text }) {
  return String(text).split(/\*\*(.+?)\*\*/g).map((p, i) => (i % 2 === 1 ? <strong key={i} style={{ color: p.includes('₹') ? '#4ade80' : '#fff' }}>{p}</strong> : p));
}

export default function GuaranteeSection({ variant } = {}) {
  const g = (variant && GUARANTEE_VARIANTS[variant]) || GUARANTEE_VARIANTS.standard;
  return (
    <div className="guarantee-section">
      <div className="guarantee-inner fade-up">
        <span className="guarantee-badge">🛡️</span>
        <h2>{g.title}</h2>
        <p><Bold text={g.body} /></p>
        <div className="guarantee-pills">
          {g.pills.map((pill) => (
            <span key={pill} className="gp">{pill}</span>
          ))}
        </div>
        <p style={{ marginTop: '18px', fontSize: '.82rem', color: '#8FA4BE', maxWidth: '720px', marginInline: 'auto' }}>
          <strong style={{ color: '#CBD8EA' }}>What's Not Included:</strong> Repair, plumbing, electrical, appliance servicing or dismantling beyond safe access — we clean, we don't repair. Chimney motor internal repair and natural-stone-safe acids excluded. This keeps our price honest vs “everything” promises.
        </p>
      </div>
    </div>
  );
}