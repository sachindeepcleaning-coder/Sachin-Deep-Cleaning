import ReelEmbed from './ReelEmbed.jsx';
import YtShortsSection from './YtShortsSection.jsx';

export default function ReelSection() {
  return (
    <section className="section">
      <div className="section-inner">
        <div style={{ textAlign: 'center' }} className="fade-up">
          <div className="section-tag">Real Work</div>
          <h2 className="section-title">See Our Cleaning in Action</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Watch real deep-cleaning jobs done by our team in Gurgaon.</p>
        </div>
        <div style={{ margin: '36px auto 0' }}>
          <ReelEmbed />
        </div>
      </div>
      <YtShortsSection />
    </section>
  );
}