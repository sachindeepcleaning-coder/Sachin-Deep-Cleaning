export default function ServiceCard({ icon, title, text, href }) {
  return (
    <a className="card" href={href} style={{ display: 'block' }}>
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </a>
  );
}
