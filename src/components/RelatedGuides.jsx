// Internal links from each service page to the most relevant blog guides.
// Helps Google crawl the articles and builds topical authority (service → guide).
const GUIDES = [
  { serviceKey: 'deep', title: 'Deep Cleaning Cost in Gurgaon 2026', href: 'blog/deep-cleaning-cost-gurgaon-2026.html' },
  { serviceKey: 'deep', title: 'How Often Should You Deep Clean Your Home?', href: 'blog/how-often-deep-clean-home-india.html' },
  { serviceKey: 'house', title: 'How Often Should You Deep Clean Your Home?', href: 'blog/how-often-deep-clean-home-india.html' },
  { serviceKey: 'house', title: 'Kitchen Deep Cleaning vs Regular Cleaning', href: 'blog/kitchen-vs-regular-cleaning.html' },
  { serviceKey: 'fullhome', title: 'Deep Cleaning Cost in Gurgaon 2026', href: 'blog/deep-cleaning-cost-gurgaon-2026.html' },
  { serviceKey: 'fullhome', title: 'Move-In / Move-Out Cleaning Checklist', href: 'blog/move-in-move-out-cleaning-checklist-gurgaon.html' },
  { serviceKey: 'kitchen', title: 'Kitchen Chimney Cleaning Guide', href: 'blog/kitchen-chimney-cleaning-guide.html' },
  { serviceKey: 'kitchen', title: 'Kitchen Deep Cleaning vs Regular Cleaning', href: 'blog/kitchen-vs-regular-cleaning.html' },
  { serviceKey: 'bathroom', title: 'How to Remove Hard Water Stains in Gurgaon Bathrooms', href: 'blog/hard-water-bathroom-stains-gurgaon.html' },
  { serviceKey: 'sofa', title: 'Sofa Shampoo Cleaning in Gurgaon — Complete Guide', href: 'blog/sofa-cleaning-gurgaon-guide.html' },
  { serviceKey: 'carpet', title: 'Sofa Shampoo Cleaning in Gurgaon — Complete Guide', href: 'blog/sofa-cleaning-gurgaon-guide.html' },
  { serviceKey: 'move', title: 'Move-In / Move-Out Cleaning Checklist', href: 'blog/move-in-move-out-cleaning-checklist-gurgaon.html' },
  { serviceKey: 'move', title: 'Deep Cleaning Cost in Gurgaon 2026', href: 'blog/deep-cleaning-cost-gurgaon-2026.html' },
];

export default function RelatedGuides({ serviceKey }) {
  const guides = GUIDES.filter((g) => g.serviceKey === serviceKey);
  if (guides.length === 0) return null;

  return (
    <section className="section">
      <div className="section-inner">
        <div style={{ textAlign: 'center' }} className="fade-up">
          <div className="section-tag">Guides & Tips</div>
          <h2 className="section-title">Read Our Cleaning Guides</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Practical, expert guides written for Gurgaon homes — costs, frequency and how it's done.</p>
        </div>
        <div className="areas-list" style={{ marginTop: '28px' }}>
          {guides.map((g) => (
            <a key={g.href} href={g.href} className="area-tag" style={{ color: 'var(--green)', fontWeight: 700 }}>
              {g.title} →
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
