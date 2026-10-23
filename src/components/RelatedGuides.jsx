// Internal links from each service page to the most relevant blog guides.
// Helps Google crawl the articles and builds topical authority (service → guide).
const GUIDES = [
  { serviceKey: 'deep', title: 'Deep Cleaning Cost in Gurgaon 2026', href: '/blog/deep-cleaning-cost-gurgaon-2026.html' },
  { serviceKey: 'deep', title: 'Urban Company vs Sachin Deep Cleaning — Compared', href: '/blog/urban-company-vs-sachin-deep-cleaning.html' },
  { serviceKey: 'deep', title: 'House Maid vs Deep Cleaning — What’s Actually Worth It', href: '/blog/house-maid-vs-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Book Cleaning Online — No App Needed', href: '/book-cleaning-online-gurgaon.html' },
  { serviceKey: 'deep', title: 'Cleaning Services in Gurgaon — Complete Guide', href: '/blog/cleaning-services-gurgaon-guide.html' },
  { serviceKey: 'deep', title: 'What Is Deep Cleaning? Complete Guide', href: '/blog/what-is-deep-cleaning-guide.html' },
  { serviceKey: 'deep', title: 'Deep Cleaners Near Me — Hire Verified Pros', href: '/blog/deep-cleaning-near-me-gurgaon.html' },
  { serviceKey: 'deep', title: 'NoBroker Cleaning vs Sachin — Compared', href: '/blog/nobroker-cleaning-vs-sachin-deep-cleaning.html' },
  { serviceKey: 'deep', title: 'Safaiwale vs Sachin — Gurgaon Prices', href: '/blog/safaiwale-vs-sachin-deep-cleaning.html' },
  { serviceKey: 'house', title: 'Home Cleaning Services Near Me — Gurgaon Guide', href: '/blog/deep-cleaning-near-me-gurgaon.html' },
  { serviceKey: 'house', title: 'How Often Should You Deep Clean Your Home?', href: '/blog/how-often-deep-clean-home-india.html' },
  { serviceKey: 'house', title: 'Kitchen Deep Cleaning vs Regular Cleaning', href: '/blog/kitchen-vs-regular-cleaning.html' },
  { serviceKey: 'house', title: 'Urban Company vs Sachin Deep Cleaning — Compared', href: '/blog/urban-company-vs-sachin-deep-cleaning.html' },
  { serviceKey: 'house', title: 'House Maid vs Deep Cleaning — What’s Actually Worth It', href: '/blog/house-maid-vs-deep-cleaning-gurgaon.html' },
  { serviceKey: 'house', title: 'Book Cleaning Online — No App Needed', href: '/book-cleaning-online-gurgaon.html' },
  { serviceKey: 'fullhome', title: 'Deep Cleaning Cost in Gurgaon 2026', href: '/blog/deep-cleaning-cost-gurgaon-2026.html' },
  { serviceKey: 'fullhome', title: 'Diwali Cleaning in Gurgaon — Price & Booking', href: '/blog/diwali-cleaning-gurgaon.html' },
  { serviceKey: 'fullhome', title: 'Dussehra Cleaning — Beat Diwali Rush', href: '/blog/dussehra-cleaning-gurgaon.html' },
  { serviceKey: 'fullhome', title: 'Full Home Packages Compared — Prices & Time', href: '/blog/full-home-deep-cleaning-packages-gurgaon.html' },
  { serviceKey: 'fullhome', title: 'Room Cleaning Services — Price Guide', href: '/blog/room-cleaning-services-gurgaon.html' },
  { serviceKey: 'fullhome', title: 'Urban Company vs Sachin Deep Cleaning — Compared', href: '/blog/urban-company-vs-sachin-deep-cleaning.html' },
  { serviceKey: 'fullhome', title: 'House Maid vs Deep Cleaning — What’s Actually Worth It', href: '/blog/house-maid-vs-deep-cleaning-gurgaon.html' },
  { serviceKey: 'kitchen', title: 'Kitchen Chimney Cleaning Guide', href: '/blog/kitchen-chimney-cleaning-guide.html' },
  { serviceKey: 'kitchen', title: 'Navratri Cleaning — Pooja-Ready Homes', href: '/blog/navratri-cleaning-gurgaon.html' },
  { serviceKey: 'kitchen', title: 'Kitchen Deep Cleaning vs Regular Cleaning', href: '/blog/kitchen-vs-regular-cleaning.html' },
  { serviceKey: 'bathroom', title: 'How to Remove Hard Water Stains in Gurgaon Bathrooms', href: '/blog/hard-water-bathroom-stains-gurgaon.html' },
  { serviceKey: 'sofa', title: 'Sofa Shampoo Cleaning in Gurgaon — Complete Guide', href: '/blog/sofa-cleaning-gurgaon-guide.html' },
  { serviceKey: 'carpet', title: 'Carpet Cleaning in Gurgaon — Price & Method', href: '/blog/carpet-cleaning-gurgaon-guide.html' },
  { serviceKey: 'office', title: 'Office Deep Cleaning in Gurgaon — Prices & Checklist', href: '/blog/office-deep-cleaning-gurgaon-guide.html' },
  { serviceKey: 'office', title: 'Best Office Deep Cleaning — Top 5 Compared', href: '/blog/office-deep-cleaning-gurgaon-guide.html' },
  { serviceKey: 'office', title: 'Deep Cleaning Cost in Gurgaon 2026', href: '/blog/deep-cleaning-cost-gurgaon-2026.html' },
  { serviceKey: 'move', title: 'Move-In / Move-Out Cleaning Checklist', href: '/blog/move-in-move-out-cleaning-checklist-gurgaon.html' },
  { serviceKey: 'move', title: 'Deep Cleaning Cost in Gurgaon 2026', href: '/blog/deep-cleaning-cost-gurgaon-2026.html' },
  // ── 2026-09-20 audit: wire new price / micro-local / Udyog inventory ──
  { serviceKey: 'deep', title: 'Deep Cleaning DLF Phase 3 — Same-Day', href: '/blog/dlf-phase-3-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning Sohna Road — All Towers', href: '/blog/sohna-road-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning Golf Course Road — Premium Homes', href: '/blog/golf-course-road-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Dwarka Expressway Deep Cleaning — Sectors 102–113', href: '/blog/dwarka-expressway-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Society Deep Cleaning — Tower Cluster Days', href: '/blog/society-deep-cleaning-day-gurgaon.html' },
  { serviceKey: 'deep', title: 'Monsoon Cleaning Checklist — Gurgaon Homes', href: '/blog/monsoon-cleaning-checklist-gurgaon.html' },
  { serviceKey: 'fullhome', title: '1BHK Deep Cleaning Price — ₹2,500 Itemised', href: '/blog/1bhk-deep-cleaning-price-gurgaon.html' },
  { serviceKey: 'fullhome', title: '2BHK Deep Cleaning Price — Fixed ₹4,500', href: '/blog/2bhk-deep-cleaning-price-gurgaon.html' },
  { serviceKey: 'fullhome', title: '3BHK Deep Cleaning Price — Fixed ₹5,500', href: '/blog/3bhk-deep-cleaning-price-gurgaon.html' },
  { serviceKey: 'fullhome', title: '4BHK Deep Cleaning Price — Fixed ₹6,500', href: '/blog/4bhk-deep-cleaning-price-gurgaon.html' },
  { serviceKey: 'fullhome', title: '5BHK Deep Cleaning Price — Fixed ₹9,000', href: '/blog/5bhk-deep-cleaning-price-gurgaon.html' },
  { serviceKey: 'bathroom', title: 'Bathroom Cleaning Price — ₹800/Bath', href: '/blog/bathroom-cleaning-price-gurgaon-per-bathroom.html' },
  { serviceKey: 'kitchen', title: 'Kitchen Cleaning Price — ₹1,500 Chimney Included', href: '/blog/kitchen-deep-cleaning-cost-gurgaon.html' },
  { serviceKey: 'sofa', title: 'Sofa Cleaning Price — ₹499/Seat Explained', href: '/blog/sofa-cleaning-price-gurgaon-per-seat.html' },
  { serviceKey: 'sofa', title: 'Mattress Cleaning — Steam & Shampoo Guide', href: '/blog/mattress-cleaning-gurgaon.html' },
  { serviceKey: 'house', title: 'What a ₹499 House Cleaning Visit Covers', href: '/blog/house-cleaning-price-gurgaon-per-visit.html' },
  { serviceKey: 'house', title: 'Home Cleaning Service — What It Includes & Costs', href: '/blog/home-deep-cleaning-services-gurgaon.html' },
  { serviceKey: 'move', title: 'End of Tenancy Cleaning — Get the Deposit Back', href: '/blog/end-of-tenancy-cleaning-gurgaon.html' },
  { serviceKey: 'office', title: 'Office Deep Cleaning Udyog Vihar — Phases 1–5', href: '/blog/office-deep-cleaning-udyog-vihar.html' },
  { serviceKey: 'office', title: 'Commercial Office Cleaning Udyog Vihar — AMC & Deep', href: '/blog/office-deep-cleaning-udyog-vihar.html' },
  { serviceKey: 'office', title: 'Sector 44 & Corporate Hubs — Office Cleaning', href: '/blog/office-deep-cleaning-sector-44-gurgaon.html' },
  { serviceKey: 'office', title: 'Cyber City Offices — Tower Playbook', href: '/blog/office-deep-cleaning-cyber-city-gurgaon.html' },
  { serviceKey: 'office', title: 'Golf Course Road — Premium Offices', href: '/blog/office-deep-cleaning-golf-course-road-gurgaon.html' },
  { serviceKey: 'office', title: 'Sector 32 — Weekend-Night Offices', href: '/blog/office-deep-cleaning-sector-32-gurgaon.html' },
  // ── 2026-10-22: the 20 new service pages need their own guide links, or
  // they carry no topical context and the guide corpus gets no service signal.
  { serviceKey: 'watertank', title: 'Monsoon Cleaning Checklist — Gurgaon Homes', href: '/blog/monsoon-cleaning-checklist-gurgaon.html' },
  { serviceKey: 'watertank', title: 'How Often Should You Deep Clean Your Home?', href: '/blog/how-often-deep-clean-home-india.html' },
  { serviceKey: 'watertank', title: 'Hard Water in Gurgaon — What It Does to Fixtures', href: '/blog/hard-water-bathroom-stains-gurgaon.html' },
  { serviceKey: 'toilettank', title: 'How to Remove Hard Water Stains in Gurgaon Bathrooms', href: '/blog/hard-water-bathroom-stains-gurgaon.html' },
  { serviceKey: 'toilettank', title: 'Bathroom Cleaning Price — ₹800/Bath', href: '/blog/bathroom-cleaning-price-gurgaon-per-bathroom.html' },
  { serviceKey: 'facade', title: 'Full House Cleaning Checklist for Gurgaon Homes', href: '/blog/full-home-deep-cleaning-packages-gurgaon.html' },
  { serviceKey: 'facade', title: 'Diwali Cleaning in Gurgaon — Price & Booking', href: '/blog/diwali-cleaning-gurgaon.html' },
  { serviceKey: 'commonarea', title: 'Society Deep Cleaning — Tower Cluster Days', href: '/blog/society-deep-cleaning-day-gurgaon.html' },
  { serviceKey: 'commonarea', title: 'Commercial Cleaning Services in Gurgaon', href: '/blog/commercial-cleaning-services-gurgaon.html' },
  { serviceKey: 'sweeper', title: 'What a ₹499 House Cleaning Visit Covers', href: '/blog/house-cleaning-price-gurgaon-per-visit.html' },
  { serviceKey: 'sweeper', title: 'Home Cleaning Service — What It Includes & Costs', href: '/blog/home-deep-cleaning-services-gurgaon.html' },
  { serviceKey: 'sweeper', title: 'Housekeeping vs Deep Cleaning — Which & When', href: '/blog/housekeeping-vs-deep-cleaning-gurgaon.html' },
  { serviceKey: 'lift', title: 'Office Deep Cleaning Udyog Vihar — Phases 1–5', href: '/blog/office-deep-cleaning-udyog-vihar.html' },
  { serviceKey: 'lift', title: 'Commercial Office Cleaning Udyog Vihar — AMC & Deep', href: '/blog/office-deep-cleaning-udyog-vihar.html' },
  { serviceKey: 'windowgrill', title: 'Full House Cleaning Checklist for Gurgaon Homes', href: '/blog/full-home-deep-cleaning-packages-gurgaon.html' },
  { serviceKey: 'windowgrill', title: 'Monsoon Cleaning Checklist — Gurgaon Homes', href: '/blog/monsoon-cleaning-checklist-gurgaon.html' },
  { serviceKey: 'utensils', title: 'Kitchen Chimney Cleaning Guide', href: '/blog/kitchen-chimney-cleaning-guide.html' },
  { serviceKey: 'utensils', title: 'Kitchen Deep Cleaning vs Regular Cleaning', href: '/blog/kitchen-vs-regular-cleaning.html' },
  { serviceKey: 'road', title: 'Society Deep Cleaning — Tower Cluster Days', href: '/blog/society-deep-cleaning-day-gurgaon.html' },
  { serviceKey: 'road', title: 'Commercial Cleaning Services in Gurgaon', href: '/blog/commercial-cleaning-services-gurgaon.html' },
  { serviceKey: 'chandelier', title: 'Golf Course Road Offices — Premium Towers', href: '/blog/office-deep-cleaning-golf-course-road-gurgaon.html' },
  { serviceKey: 'chandelier', title: 'Full Home Deep Cleaning Packages — 1–5 BHK', href: '/blog/full-home-deep-cleaning-packages-gurgaon.html' },
  { serviceKey: 'washingmachine', title: 'Housekeeping vs Deep Cleaning — Which & When', href: '/blog/housekeeping-vs-deep-cleaning-gurgaon.html' },
  { serviceKey: 'washingmachine', title: 'What Is Deep Cleaning? Complete Guide', href: '/blog/what-is-deep-cleaning-guide.html' },
  { serviceKey: 'chairclean', title: 'Office Deep Cleaning Udyog Vihar — Phases 1–5', href: '/blog/office-deep-cleaning-udyog-vihar.html' },
  { serviceKey: 'chairclean', title: 'Office Deep Cleaning in Gurgaon — Prices & Checklist', href: '/blog/office-deep-cleaning-gurgaon-guide.html' },
  { serviceKey: 'curtain', title: 'What a ₹499 House Cleaning Visit Covers', href: '/blog/house-cleaning-price-gurgaon-per-visit.html' },
  { serviceKey: 'curtain', title: 'Home Cleaning Service — What It Includes & Costs', href: '/blog/home-deep-cleaning-services-gurgaon.html' },
  { serviceKey: 'basement', title: 'Post-Construction Cleaning in Gurgaon', href: '/blog/post-construction-cleaning-services-gurgaon.html' },
  { serviceKey: 'basement', title: 'Commercial Cleaning Services in Gurgaon', href: '/blog/commercial-cleaning-services-gurgaon.html' },
  { serviceKey: 'instantclean', title: 'Deep Cleaning Near Me in Gurgaon', href: '/blog/deep-cleaning-near-me-gurgaon.html' },
  { serviceKey: 'instantclean', title: 'Book Cleaning Online — No App Needed', href: '/book-cleaning-online-gurgaon.html' },
  { serviceKey: 'balconyclean', title: 'Balcony & Terrace Cleaning — Drain Care', href: '/blog/balcony-terrace-cleaning-gurgaon.html' },
  { serviceKey: 'balconyclean', title: 'Monsoon Cleaning Checklist — Gurgaon Homes', href: '/blog/monsoon-cleaning-checklist-gurgaon.html' },
  { serviceKey: 'sqftrate', title: 'Deep Cleaning Cost in Gurgaon (2026): BHK-Wise Rates', href: '/blog/deep-cleaning-cost-gurgaon-2026.html' },
  { serviceKey: 'sqftrate', title: '2BHK Deep Cleaning Price — Fixed ₹4,500', href: '/blog/2bhk-deep-cleaning-price-gurgaon.html' },
  { serviceKey: 'kitchenplatform', title: 'Kitchen Cleaning Price — ₹1,500 Chimney Included', href: '/blog/kitchen-deep-cleaning-cost-gurgaon.html' },
  { serviceKey: 'kitchenplatform', title: 'Kitchen Deep Cleaning vs Regular Cleaning', href: '/blog/kitchen-vs-regular-cleaning.html' },
  { serviceKey: 'postconstruction', title: 'Post-Construction Cleaning in Gurgaon', href: '/blog/post-construction-cleaning-services-gurgaon.html' },
  { serviceKey: 'postconstruction', title: 'Commercial Cleaning Services in Gurgaon', href: '/blog/commercial-cleaning-services-gurgaon.html' },
  { serviceKey: 'roomclean', title: 'Room Cleaning Services in Gurgaon', href: '/blog/room-cleaning-services-gurgaon.html' },
  { serviceKey: 'roomclean', title: 'Full Home Deep Cleaning Packages — 1–5 BHK', href: '/blog/full-home-deep-cleaning-packages-gurgaon.html' },
  // ── 2026-10-22: every remaining guide now has at least one service page
  // linking to it, so the corpus is not reachable only from the blog index.
  { serviceKey: 'deep', title: 'Best Deep Cleaning Services in Gurgaon — 3 Compared', href: '/blog/best-deep-cleaning-services-gurgaon.html' },
  { serviceKey: 'deep', title: 'Mr Deep Cleaning vs Sachin — Honest Compare', href: '/blog/mr-deep-cleaning-vs-sachin-deep-cleaning.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning in Every Gurgaon Sector: the Full Map', href: '/blog/deep-cleaning-all-sectors-gurgaon.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning Services: What’s Included, BHK by BHK', href: '/blog/deep-cleaning-services.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning in DLF Phase 1, Gurgaon: Premium Homes', href: '/blog/dlf-phase-1-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning in DLF Phase 2, Gurgaon: Same-Day Slots', href: '/blog/dlf-phase-2-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning in DLF Phase 4: Galleria & Supermart Belt', href: '/blog/dlf-phase-4-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning in DLF Phase 5 & Sectors 43–53, Gurgaon', href: '/blog/dlf-phase-5-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning in Sector 65, Gurgaon: World Spa & Villas', href: '/blog/sector-65-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning in Sector 66, Gurgaon: Vatika & New Towers', href: '/blog/sector-66-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning in Sector 67, Gurgaon: Ansal & Beyond', href: '/blog/sector-67-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning in Sushant Lok 1, Gurgaon: C-Block to Vyapar', href: '/blog/sushant-lok-1-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning in Sushant Lok 2, Gurgaon: B-Block & Sec 57', href: '/blog/sushant-lok-2-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning in Sushant Lok 3 & Sectors 57–58, Gurgaon', href: '/blog/sushant-lok-3-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Pest Control or Deep Cleaning First? Gurgaon Answer', href: '/blog/pest-control-vs-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Home Deep Cleaning Service in Gurgaon: Book in 5 Minutes', href: '/blog/home-deep-cleaning-services-gurgaon.html' },
  { serviceKey: 'deep', title: 'Home Deep Cleaning Services in Gurgaon: Fixed BHK Rates', href: '/blog/home-deep-cleaning-services-gurgaon.html' },
  { serviceKey: 'fullhome', title: 'Full Home Deep Cleaning in Gurgaon: Cost & Checklist', href: '/blog/full-home-deep-cleaning-packages-gurgaon.html' },
  { serviceKey: 'fullhome', title: 'Full Home Deep Cleaning: Price & Checklist (2026)', href: '/blog/full-home-deep-cleaning-packages-gurgaon.html' },
  { serviceKey: 'house', title: 'Best Home Cleaning Services in Gurgaon: 5 Compared', href: '/blog/home-deep-cleaning-services-gurgaon.html' },
  { serviceKey: 'house', title: 'Home Cleaning Services in Gurgaon: Plans & Pricing', href: '/blog/home-deep-cleaning-services-gurgaon.html' },
  { serviceKey: 'house', title: 'House Cleaning Services in Gurgaon — Complete Guide', href: '/blog/house-cleaning-services-gurgaon-guide.html' },
  { serviceKey: 'house', title: 'Residential Cleaning Services in Gurgaon: Your Options', href: '/blog/deep-cleaning-near-me-gurgaon.html' },
  { serviceKey: 'kitchen', title: 'Kitchen Deep Cleaning Cost in Gurgaon', href: '/blog/kitchen-deep-cleaning-cost-gurgaon.html' },
  { serviceKey: 'bathroom', title: 'Bathroom Deep Cleaning in Gurgaon: the ₹800 Benchmark', href: '/blog/bathroom-deep-cleaning-gurgaon-best.html' },
  { serviceKey: 'bathroom', title: 'Bathroom Deep Cleaning Services in Gurgaon Guide', href: '/blog/bathroom-deep-cleaning-gurgaon-best.html' },
  { serviceKey: 'sofa', title: 'Sofa Cleaning Udyog Vihar — Onsite ₹499/Seat', href: '/blog/sofa-cleaning-udyog-vihar.html' },
  { serviceKey: 'carpet', title: 'Carpet Cleaning in Udyog Vihar: Onsite ₹15/Sq Ft', href: '/blog/carpet-cleaning-udyog-vihar.html' },
  { serviceKey: 'carpet', title: 'Carpet Shampoo Cleaning Udyog Vihar — ₹18/Sq Ft', href: '/blog/carpet-shampoo-cleaning-udyog-vihar.html' },
  { serviceKey: 'chairclean', title: 'Office Chair Cleaning Udyog Vihar — ₹199/Chair', href: '/blog/chair-cleaning-udyog-vihar.html' },
  { serviceKey: 'office', title: 'Office Bathroom Cleaning Udyog Vihar — ₹800/Bath', href: '/blog/office-deep-cleaning-udyog-vihar.html' },
  { serviceKey: 'office', title: 'Office Deep Cleaning in Sector 44 & Corporate Hubs', href: '/blog/office-deep-cleaning-sector-44-gurgaon.html' },
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
