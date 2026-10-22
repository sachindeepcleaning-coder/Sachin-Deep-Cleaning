// Single source of truth for all pages (MPA entries).
// `page` tells src/bootstrap.jsx which React component to mount.
// `serviceKey` (for page === 'service') maps to content in src/lib/services.js.
// `noindex` pages get <meta name="robots" content="noindex, nofollow">.
//
// Based on the FINAL SEO package (pages-config-updates.mjs) with the fixes:
//   1. INDEX title differentiated from the deep-cleaning page (was identical)
//   2. Titles under 60 characters, descriptions enriched with prices
//   3. Blog article entries + a blog index page
//   4. thank-you flagged noindex

export const SITE_URL = 'https://sachindeepcleaning.shop';
export const SITE_NAME = 'Sachin Deep Cleaning';
export const OG_IMAGE = 'https://sachindeepcleaning.shop/images/og-cover.jpg';

export const pages = [
  {
    file: 'index', page: 'index',
    title: 'Full Home Deep Cleaning Gurgaon | From ₹2,500',
    description: 'Trusted deep cleaning in Gurgaon since 2015. Full-home from ₹2,500, kitchen, bathroom, sofa & carpet. Pay after. WhatsApp +91 95607 39281.',
  },
  {
    file: 'contact', page: 'contact',
    title: 'Book a Deep Clean in Gurgaon | Sachin Deep Cleaning',
    description: 'Get a free quote for home deep cleaning in Gurgaon. Call or WhatsApp +91 95607 39281. All sectors served. Same-day slots available.',
  },
  {
    file: 'thank-you', page: 'thank-you',
    title: 'Booking Confirmed — Sachin Deep Cleaning',
    description: 'Thank you for booking Sachin Deep Cleaning in Gurgaon. We will call you back within 30 minutes to confirm your slot and fixed price.',
    noindex: true,
  },
  {
    file: '404', page: 'notfound',
    title: 'Page Not Found — Sachin Deep Cleaning Gurgaon',
    description: 'This page moved or never existed. Find deep cleaning services in Gurgaon — fixed prices, same-day slots, pay after satisfaction.',
    noindex: true,
  },
  {
    file: 'about', page: 'about',
    title: 'About Sachin Deep Cleaning | Trusted Team in Gurgaon',
    description: 'Meet the police-verified deep cleaning team in Gurgaon since 2015. Eco-friendly, pay after satisfaction, same-day across DLF & Sohna Road.',
  },

  // ── Service pages ─────────────────────────────────────────────────────────
  {
    file: 'deep-cleaning-services-in-gurgaon', page: 'service', serviceKey: 'deep',
    title: 'Deep Cleaning Services in Gurgaon | From ₹2,000',
    description: 'Deep cleaning services in Gurgaon from ₹2,000 (1 RK) to ₹9,000 (villa). Fixed BHK price, 5–6 hrs for a 1 BHK, police-verified crew, pay after walkthrough.',
  },
  {
    file: 'house-cleaning-services-in-gurgaon', page: 'service', serviceKey: 'house',
    title: 'House Cleaning Services in Gurgaon | From ₹499',
    description: 'Regular & one-time house cleaning in Gurgaon from ₹499. Weekly, bi-weekly or monthly plans. Police-verified team, eco-friendly products. Book now.',
  },
  {
    file: 'full-home-deep-cleaning-1bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 1,
    title: '1 BHK Deep Cleaning Gurgaon | ₹2,500 Fixed',
    description: '1 BHK deep cleaning in Gurgaon at a fixed ₹2,500 — kitchen, bathroom, bedroom, living area, floors and balcony. 5–6 hrs, 2 cleaners, pay after walkthrough.',
  },
  {
    file: 'full-home-deep-cleaning-2bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 2,
    title: '2 BHK Deep Cleaning Gurgaon | ₹4,500 Fixed',
    description: '2 BHK deep cleaning in Gurgaon at a fixed ₹4,500 — both bathrooms descaled, kitchen degreased, wardrobes in and out, floors polished. 7–8 hrs, pay after.',
  },
  {
    file: 'full-home-deep-cleaning-3bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 3,
    title: '3 BHK Deep Cleaning Gurgaon | ₹5,500 Fixed',
    description: '3 BHK deep cleaning in Gurgaon at a fixed ₹5,500 — three bathrooms, full kitchen degrease, balcony, machine scrub and a checklist you audit before paying.',
  },
  {
    file: 'full-home-deep-cleaning-4bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 4,
    title: '4 BHK Deep Cleaning Gurgaon | ₹6,500 Fixed',
    description: '4 BHK deep cleaning in Gurgaon at a fixed ₹6,500 — four bedrooms, three baths, lounge, kitchen degrease and balconies. 8–10 hrs, pay after.',
  },
  {
    file: 'full-home-deep-cleaning-5bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 5,
    title: '5 BHK Deep Cleaning Gurgaon | ₹9,000 Fixed',
    description: '5 BHK and villa deep cleaning in Gurgaon from ₹9,000 — five bedrooms, four-plus baths, terrace, kitchen degrease and a checklist you audit before paying.',
  },
  {
    file: 'kitchen-deep-cleaning-gurgaon', page: 'service', serviceKey: 'kitchen',
    title: 'Kitchen Deep Cleaning Gurgaon | ₹1,500 Chimney In',
    description: 'Kitchen deep cleaning in Gurgaon from ₹1,500 with the chimney filter dismantled, hob and cabinets degreased, 3–4 hrs. Fixed price on the call.',
  },
  {
    file: 'bathroom-deep-cleaning-gurgaon', page: 'service', serviceKey: 'bathroom',
    title: 'Bathroom Deep Cleaning Gurgaon | ₹800 per Bath',
    description: 'Bathroom deep cleaning in Gurgaon at ₹800 per bathroom — tile descaling, grout scrub, commode sanitisation, mirror polish. 45–60 min per bath, pay after.',
  },
  {
    file: 'sofa-shampoo-cleaning-gurgaon', page: 'service', serviceKey: 'sofa',
    title: 'Sofa Shampoo Cleaning Gurgaon | ₹499/seat',
    description: 'Sofa shampoo cleaning in Gurgaon from ₹499 per seat. Stain removal, dust-mite extraction, odor neutralization. Fabric-safe. Book via WhatsApp.',
  },
  {
    file: 'carpet-shampoo-cleaning-gurgaon', page: 'service', serviceKey: 'carpet',
    title: 'Carpet Cleaning Gurgaon | ₹18/sq ft Shampoo',
    description: 'Carpet shampoo cleaning in Gurgaon from ₹18/sq ft (dry clean ₹15). Hot-water extraction, stain removal, allergen treatment. Wall-to-wall & rugs. Book now.',
  },
  {
    file: 'office-deep-cleaning-gurgaon', page: 'service', serviceKey: 'office',
    title: 'Office Deep Cleaning Gurgaon | Small Office ₹5,000',
    description: 'Office deep cleaning in Gurgaon: small office from ₹5,000, larger sites from ₹3 per sq ft — 9-area scope, GST invoice, pay after sign-off.',
  },
  {
    file: 'move-in-move-out-cleaning-gurgaon', page: 'service', serviceKey: 'move',
    title: 'Move-In Move-Out Cleaning Gurgaon | From ₹1,999',
    description: 'Move-in and move-out cleaning in Gurgaon from ₹1,999 — full empty-flat clean, kitchen degreased, bathrooms descaled, landlord sign-off. Pay after.',
  },
  {
    file: 'watertank', page: 'service', serviceKey: 'watertank',
    title: 'Water Tank Cleaning in Gurgaon | From ₹399',
    description: 'Water tank cleaning in Gurgaon from ₹399 for an overhead tank, ₹999 underground. Scrub, descale, disinfect and rinse, 60–90 min, same-day slots.',
  },
  {
    file: 'toilettank', page: 'service', serviceKey: 'toilettank',
    title: 'Toilet Tank Cleaning in Gurgaon | ₹499 per Tank',
    description: 'Toilet tank cleaning in Gurgaon at ₹499 per tank — flush tank interior, seat, hinges and lever, scrubbed and disinfected. 45–60 min, pay after walkthrough.',
  },
  {
    file: 'facade', page: 'service', serviceKey: 'facade',
    title: 'Window & Facade Cleaning in Gurgaon | From ₹3/sq Ft',
    description: 'Window and facade cleaning in Gurgaon from ₹3 per sq ft for external glass, ₹4 for both panes. Frames, sills and grills at ₹149 per window.',
  },
  {
    file: 'commonarea', page: 'service', serviceKey: 'commonarea',
    title: 'Common Area Cleaning in Gurgaon | From ₹499',
    description: 'Common area cleaning in Gurgaon from ₹499 a visit — lobby, stairs, lift lobby, parking apron and clubhouse for RWAs and societies. Pay after.',
  },
  {
    file: 'sweeper', page: 'service', serviceKey: 'sweeper',
    title: 'Sweeper & Mop Cleaning Gurgaon | From ₹499 a Visit',
    description: 'Sweeper and mop cleaning in Gurgaon from ₹499 a visit — studio ₹499, 1 BHK ₹799, 2 BHK ₹1,199, 3 BHK ₹1,699. Weekly plans are cheaper per visit.',
  },
  {
    file: 'lift', page: 'service', serviceKey: 'lift',
    title: 'Lift & Elevator Cleaning in Gurgaon | ₹1,499 per Lift',
    description: 'Lift and elevator cleaning in Gurgaon at ₹1,499 per cabin — panels, floor, door tracks and ceiling, landing lobby at ₹1,999. 2–3 hrs, after-hours slots.',
  },
  {
    file: 'windowgrill', page: 'service', serviceKey: 'windowgrill',
    title: 'Window Grill Cleaning in Gurgaon | ₹399 per Window',
    description: 'Window grill cleaning in Gurgaon at ₹399 per window — bars and corners scrubbed both faces, mesh washed, sill and track cleared. 30–45 min, same-day slots.',
  },
  {
    file: 'utensils', page: 'service', serviceKey: 'utensils',
    title: 'Kitchen Utensils Cleaning in Gurgaon | From ₹299',
    description: 'Kitchen utensil cleaning in Gurgaon from ₹299 (cutlery wash), ₹409 for 20 pieces, ₹699 for 20–50. Scrub, descale, disinfect, dry and pack back.',
  },
  {
    file: 'road', page: 'service', serviceKey: 'road',
    title: 'Road & Street Sweeping in Gurgaon | From ₹6/sq Ft',
    description: 'Road and street sweeping in Gurgaon from ₹6 per sq ft — dust lift, grit, drain edges and licensed disposal. Commercial lane ₹7, construction lane ₹8.',
  },
  {
    file: 'chandelier', page: 'service', serviceKey: 'chandelier',
    title: 'Chandelier & High-Reach Cleaning Gurgaon | ₹999',
    description: 'Chandelier and high-reach cleaning in Gurgaon from ₹999 per unit — crystal, glass and metal, cleaned piece by piece where safe. Access quoted in advance.',
  },
  {
    file: 'washingmachine', page: 'service', serviceKey: 'washingmachine',
    title: 'Washing Machine Cleaning Gurgaon | ₹799 per Unit',
    description: 'Washing machine deep cleaning in Gurgaon at ₹799 per unit — drum, pump filter, door seal and gasket. 90–120 min, front-load and top-load, same-day slots.',
  },
  {
    file: 'chairclean', page: 'service', serviceKey: 'chairclean',
    title: 'Chair & Recliner Cleaning in Gurgaon | ₹199',
    description: 'Chair and recliner cleaning in Gurgaon at ₹199 per chair — office, recliner and gaming chairs, fabric-safe with base and castor clean. 45–60 min per chair.',
  },
  {
    file: 'curtain', page: 'service', serviceKey: 'curtain',
    title: 'Curtain Vacuum & Shampoo Cleaning Gurgaon | ₹499',
    description: 'Curtain vacuum and shampoo cleaning in Gurgaon at ₹499 per set of up to 4 panels — on-site, dust-mite and allergen removal, dried in place. 3–4 hrs.',
  },
  {
    file: 'basement', page: 'service', serviceKey: 'basement',
    title: 'Unfinished Basement Cleaning Gurgaon | ₹12/sq Ft',
    description: 'Unfinished basement and godown cleaning in Gurgaon from ₹12 per sq ft — debris haul, HEPA fine dust, cobwebs, corners, floor mop. 1,000 sq ft in 5–6 hrs',
  },
  {
    file: 'instantclean', page: 'service', serviceKey: 'instantclean',
    title: 'Instant & Same-Day Cleaning in Gurgaon | ₹799',
    description: 'Instant and same-day cleaning in Gurgaon from ₹799 (one bathroom) and ₹999 for a 1 BHK — crew within 4 hours, fixed scope, walkthrough before you pay.',
  },
  {
    file: 'balconyclean', page: 'service', serviceKey: 'balconyclean',
    title: 'Balcony Cleaning in Gurgaon | ₹399 per Balcony',
    description: 'Balcony cleaning in Gurgaon at ₹399 per balcony — pressure wash, joint scrub, drain flush, glass panels and railing. 45–60 min, pay after walkthrough.',
  },
  {
    file: 'sqftrate', page: 'service', serviceKey: 'sqftrate',
    title: 'Deep Cleaning Rate Per Square Foot Gurgaon | ₹3',
    description: 'Deep cleaning in Gurgaon works out to about ₹3 per sq ft, pro-rata from a fixed BHK card — 1 BHK ₹2,500, 2 BHK ₹4,500, 3 BHK ₹5,500, villa ₹9,000.',
  },
  {
    file: 'kitchenplatform', page: 'service', serviceKey: 'kitchenplatform',
    title: 'Kitchen Platform Deep Cleaning Gurgaon | ₹999',
    description: 'Kitchen platform deep cleaning in Gurgaon at ₹999 — platform, edges, backsplash joints and sink base, cabinet interiors at ₹1,399. 2–3 hrs.',
  },
  {
    file: 'postconstruction', page: 'service', serviceKey: 'postconstruction',
    title: 'Post-Construction Cleaning Gurgaon | From ₹2,499',
    description: 'Post-construction cleaning in Gurgaon from ₹2,499 (1 BHK up to 600 sq ft) — three phases: rough debris, high surfaces and a final HEPA pass. 1–2 days.',
  },
  {
    file: 'roomclean', page: 'service', serviceKey: 'roomclean',
    title: 'Single Room Cleaning in Gurgaon | ₹299 per Room',
    description: 'Single room cleaning in Gurgaon at ₹299 per room — one bedroom, kitchenette or bathroom, windows and tracks included. 60–90 min, same-day slots.',
  },
  {
    file: 'residential-cleaners-near-me', page: 'residential',
    title: 'Residential Cleaners Near Me Gurgaon | From ₹499',
    description: 'Residential cleaners near you in Gurgaon from ₹499 a visit. Police-verified, same team each visit, nearest-crew dispatch to your sector, pay after.',
  },
  {
    file: 'society-cleaning-services-gurgaon', page: 'partners',
    title: 'Society Cleaning Services in Gurgaon | RWA & Bulk',
    description: 'Society and bulk cleaning in Gurgaon for RWAs and towers — cluster days, gate-pass handling, GST invoice, per-zone tick sheet. Every sector since 2015.',
  },
  {
    file: 'services', page: 'services',
    title: 'Cleaning Services in Gurgaon — Full List & Price List',
    description: 'Every cleaning service in Gurgaon with its published starting price — full home, kitchen, bathroom, sofa, carpet, office, water tank, lift and more.',
  },
  {
    file: 'facts', page: 'facts',
    title: 'Facts & Price List — Sachin Deep Cleaning Gurgaon',
    description: 'The verifiable facts about Sachin Deep Cleaning in Gurgaon: price card by BHK, what is and is not included, service area, hours and the shop address.',
  },
  {
    file: 'privacy', page: 'privacy',
    title: 'Privacy — What We Collect and Who Sees It',
    description: 'What this site collects when you call, WhatsApp or fill a form, who receives it, and how to ask us to delete it.',
  },
  {
    file: 'all-pages', page: 'allpages',
    title: 'All Services — Sachin Deep Cleaning Gurgaon',
    description: 'Browse all deep cleaning services in Gurgaon: full home, kitchen, bathroom, sofa, carpet, office and move-in/out cleaning by Sachin Deep Cleaning.',
    noindex: true,
  },

  // ── Blog ──────────────────────────────────────────────────────────────────
  {
    file: 'blog', page: 'blog',
    title: 'Blog — Cleaning Guides & Tips | Sachin Deep Cleaning',
    description: 'Deep cleaning guides for Gurgaon homes: costs by BHK, cleaning frequency, kitchen chimney care, hard water removal and sofa maintenance. Expert tips.',
  },
  {
    file: 'blog/deep-cleaning-cost-gurgaon-2026', page: 'article',
    title: "Deep Cleaning Cost in Gurgaon (2026): BHK-Wise Rates",
    description: "Every deep cleaning price in Gurgaon in one table: 1 BHK ₹2,500 to 5 BHK ₹9,000, kitchen ₹1,500, sofa ₹499/seat. What changes a quote plus exclusions.",
  },
  {
    file: 'blog/how-often-deep-clean-home-india', page: 'article',
    title: "How Often Should You Deep Clean Your Home in India?",
    description: "A season-by-season deep cleaning schedule for Indian homes — when to book, why monsoon and pre-Diwali matter most, and the signs that say book now.",
  },
  {
    file: 'blog/kitchen-chimney-cleaning-guide', page: 'article',
    title: "Kitchen Chimney Cleaning in Gurgaon | From ₹1,500",
    description: "Kitchen chimney cleaning in Gurgaon from ₹1,500 — when a filter needs a professional degrease instead of a DIY wash, and what it costs.",
  },
  {
    file: 'blog/hard-water-bathroom-stains-gurgaon', page: 'article',
    title: "Removing Hard Water Stains from Gurgaon Bathrooms",
    description: "Gurgaon water leaves white scale on tiles, taps and glass within weeks. What actually removes it, what damages chrome, and when to call a descaling crew.",
  },
  {
    file: 'blog/sofa-cleaning-gurgaon-guide', page: 'article',
    title: "Sofa Shampoo Cleaning in Gurgaon — ₹499/Seat & Drying",
    description: "Sofa shampooing in Gurgaon costs ₹499 per seat. How hot-water extraction works, the 4–6 hour drying window, fabric cautions and upkeep between cleans.",
  },
  {
    file: 'blog/kitchen-vs-regular-cleaning', page: 'article',
    title: "Kitchen Deep Cleaning vs Regular Cleaning: the Real Gap",
    description: "Daily wiping keeps a kitchen tidy; it never touches the degrease a hob, chimney and tiles need. What a deep clean adds and when it is worth ₹1,500.",
  },
  {
    file: 'blog/move-in-move-out-cleaning-checklist-gurgaon', page: 'article',
    title: "Move-In Move-Out Cleaning in Gurgaon | From ₹1,999",
    description: "Move-in and move-out cleaning in Gurgaon from ₹1,999 — the handover checklist landlords inspect, kitchen degrease, descaled floors and photo proof.",
  },
  {
    file: 'blog/full-home-deep-cleaning-gurgaon-guide', page: 'article',
    title: "Full Home Deep Cleaning in Gurgaon: Cost & Checklist",
    description: "Full home deep cleaning in Gurgaon from ₹2,500 (1BHK) to ₹9,000 (villa): the room-by-room checklist, how long it takes and the walkthrough before you pay.",
  },
  {
    file: 'blog/house-cleaning-services-gurgaon-guide', page: 'article',
    title: "House Cleaning Services in Gurgaon | From ₹499 a Visit",
    description: "House cleaning services in Gurgaon from ₹499 a visit — what a weekly, bi-weekly or monthly plan covers, what it costs per home size, and how it differs.",
  },
  {
    file: 'blog/deep-cleaning-near-me-gurgaon', page: 'article',
    title: "Deep Cleaning Near Me in Gurgaon | From ₹2,000, Same Day",
    description: "Deep cleaning near me in Gurgaon from ₹2,000 — same-day slots when you book before noon, crew rosters for DLF, Sushant Lok and Sohna Road. Pay after.",
  },
  {
    file: 'blog/kitchen-deep-cleaning-cost-gurgaon', page: 'article',
    title: "What Kitchen Deep Cleaning Costs in Gurgaon (₹1,500+)",
    description: "Kitchen deep cleaning in Gurgaon runs ₹1,500–₹2,500 by size: chimney dismantling, hob detailing, cabinets in and out, degreasing and descaling included.",
  },
  {
    file: 'blog/office-deep-cleaning-gurgaon-guide', page: 'article',
    title: "Office Deep Cleaning Gurgaon | Small Office ₹5,000",
    description: "Office deep cleaning in Gurgaon from ₹3 per sq ft (small office ₹5,000) — 9-area scope, after-hours crews, GST invoice, photo logs, pay after sign-off.",
  },
  {
    file: 'blog/bathroom-deep-cleaning-services-gurgaon-guide', page: 'article',
    title: "Bathroom Deep Cleaning in Gurgaon from ₹800/Bath",
    description: "Bathroom deep cleaning in Gurgaon at ₹800 per bathroom: acid descaling, grout scrubbing, commode sanitisation and glass polish — 45–60 minutes per bath.",
  },
  {
    file: 'blog/carpet-cleaning-gurgaon-guide', page: 'article',
    title: "Carpet Cleaning in Gurgaon from ₹18/Sq Ft — Method & Drying",
    description: "Carpet and rug cleaning in Gurgaon from ₹15 per sq ft — shampoo versus dry cleaning, 6–8 hour drying, and how the method is picked for each fibre.",
  },
  {
    file: 'blog/best-deep-cleaning-services-gurgaon', page: 'article',
    title: "Best Deep Cleaning Services in Gurgaon: 3 Compared",
    description: "Three Gurgaon deep cleaning services compared on BHK pricing, scope, staff verification and guarantees — including where Sachin Deep Cleaning wins.",
  },
  {
    file: 'blog/housekeeping-vs-deep-cleaning-gurgaon', page: 'article',
    title: "Housekeeping vs Deep Cleaning in Gurgaon: Which & When",
    description: "A maid keeps the house running; a deep clean resets it. What each covers in a Gurgaon home, what they cost and why most homes need both on a schedule.",
  },
  {
    file: 'blog/balcony-terrace-cleaning-gurgaon', page: 'article',
    title: "Balcony & Terrace Cleaning in Gurgaon: Prices & Drain Care",
    description: "Balcony and terrace cleaning in Gurgaon from ₹300: pigeon-dropping removal, drain flushing, tile scrubbing and the monsoon prep most bookings skip.",
  },
  {
    file: 'blog/deep-cleaning-all-sectors-gurgaon', page: 'article',
    title: "Deep Cleaning in Every Gurgaon Sector: the Full Map",
    description: "Which sectors our deep cleaning crews cover daily, typical building access in each, and the fixed 1–5BHK prices that apply everywhere in Gurgaon.",
  },
  {
    file: 'blog/commercial-cleaning-services-gurgaon', page: 'article',
    title: "Commercial Cleaning in Gurgaon: Offices, Shops & Clinics",
    description: "Commercial cleaning in Gurgaon for offices, shops and clinics: AMC housekeeping, quarterly deep cleans, after-hours scheduling and per-sq-ft pricing.",
  },
  {
    file: 'blog/best-home-cleaning-services-gurgaon', page: 'article',
    title: "Best Home Cleaning Services in Gurgaon: 5 Compared",
    description: "Five home cleaning services in Gurgaon compared on visit pricing, staff checks, deep-clean depth and rescheduling terms — with the honest differences.",
  },
  {
    file: 'blog/full-house-cleaning-checklist-gurgaon', page: 'article',
    title: "Full House Cleaning Checklist for Gurgaon Homes",
    description: "The 40-point checklist our crews tick room by room in Gurgaon homes — use it to audit any cleaning service before you pay the final instalment.",
  },
  {
    file: 'blog/deep-cleaners-near-me-gurgaon', page: 'article',
    title: "Hiring Deep Cleaners Near You in Gurgaon: a Vetting Guide",
    description: "How to vet deep cleaners in Gurgaon: police verification, equipment, written scope and pay-after terms — plus the red flags that predict a bad job.",
  },
  {
    file: 'blog/residential-cleaning-services-near-me-gurgaon', page: 'article',
    title: "Residential Cleaning Services in Gurgaon: Your Options",
    description: "Every type of residential cleaning in Gurgaon — one-time deep, weekly upkeep, move-out, festive — with prices and the right choice for each situation.",
  },
  {
    file: 'blog/home-cleaning-services-near-me-gurgaon', page: 'article',
    title: "What Home Cleaning Near You in Gurgaon Should Cost",
    description: "What home cleaning near you in Gurgaon should cost — ₹499 visits, ₹2,500+ deep cleans — and the three questions that separate pros from hourly gig workers.",
  },
  {
    file: 'blog/what-is-deep-cleaning-guide', page: 'article',
    title: "What Is Deep Cleaning? the Difference You Can Feel",
    description: "Deep cleaning explained: the machines, chemicals and dwell times that separate it from regular cleaning, room by room, and when an Indian home needs one.",
  },
  {
    file: 'blog/diwali-cleaning-gurgaon', page: 'article',
    title: "Diwali Cleaning in Gurgaon: Book Before the Rush",
    description: "Diwali deep cleaning in Gurgaon books out two weeks early. Rates, the pre-festive checklist and the dates that still have morning slots.",
  },
  {
    file: 'blog/dussehra-cleaning-gurgaon', page: 'article',
    title: "Dussehra Cleaning in Gurgaon: Get Ahead of Diwali",
    description: "Dussehra is the smart window for festive cleaning in Gurgaon — crews are free, prices are standard and the deep clean carries you through Diwali.",
  },
  {
    file: 'blog/navratri-cleaning-gurgaon', page: 'article',
    title: "Navratri Cleaning in Gurgaon: Pooja-Ready in One Day",
    description: "A one-day pooja-ready deep clean for Navratri in Gurgaon: kitchen degrease, bathroom descaling, pooja-room detailing and same-day slots.",
  },
  {
    file: 'blog/cleaning-services-gurgaon-guide', page: 'article',
    title: "Cleaning Services in Gurgaon | Full Price List ₹499–₹9,000",
    description: "Every cleaning service in Gurgaon with its price — house from ₹499, bathroom ₹800, kitchen ₹1,500, sofa ₹499 a seat, full home ₹2,500–₹9,000.",
  },
  {
    file: 'blog/full-home-deep-cleaning-packages-gurgaon', page: 'article',
    title: "Full Home Deep Cleaning Packages in Gurgaon (1–5BHK+)",
    description: "Full home packages for Gurgaon: 1BHK ₹2,500, 2BHK ₹4,500, 3BHK ₹5,500, 4–5BHK and villas by survey — each with the same written checklist.",
  },
  {
    file: 'blog/room-cleaning-services-gurgaon', page: 'article',
    title: "Room Cleaning Services in Gurgaon, Priced per Room",
    description: "Single-room cleaning in Gurgaon from ₹299: when a one-room deep makes sense, what it includes and when the full-home rate works out cheaper.",
  },
  {
    file: 'blog/mr-deep-cleaning-vs-sachin-deep-cleaning', page: 'article',
    title: "Mr. Deep Cleaning vs Sachin Deep Cleaning: Honest Compare",
    description: "Mr. Deep Cleaning and Sachin Deep Cleaning compared on BHK rates, checklist depth, verification and guarantee — including the two categories where we lose.",
  },
  {
    file: 'blog/best-office-deep-cleaning-services-gurgaon', page: 'article',
    title: "Best Office Deep Cleaning Gurgaon | Top 5, From ₹5,000",
    description: "Five office deep cleaning providers in Gurgaon compared on per-sq-ft rates, after-hours crews, AMC terms and washroom work — and who wins what.",
  },
  {
    file: 'blog/urban-company-vs-sachin-deep-cleaning', page: 'article',
    title: "Urban Company vs Local Deep Cleaners in Gurgaon",
    description: "Urban Company vs local deep cleaners in Gurgaon on app booking, fixed prices, exclusions, verification and damage cover — plus a how-to-choose checklist.",
  },
  {
    file: 'blog/house-maid-vs-deep-cleaning-gurgaon', page: 'article',
    title: "House Maid vs Deep Cleaning in Gurgaon: the Cost Math",
    description: "A full-time maid costs ₹12,000–₹18,000 a month; a quarterly deep clean costs ₹4,500. What each actually buys in a Gurgaon home and where they overlap.",
  },
  {
    file: 'book-cleaning-online-gurgaon', page: 'landing',
    title: 'Book Cleaning Online in Gurgaon | No App Needed',
    description: 'Book cleaning online in Gurgaon without an app — WhatsApp your BHK and society for a fixed price and a same-day slot. No advance, pay after.',
    lastmod: '2026-10-19',
  },
  {
    file: 'blog/nobroker-cleaning-vs-sachin-deep-cleaning', page: 'article',
    title: "NoBroker Cleaning vs Sachin Deep Cleaning: Gurgaon Rates",
    description: "NoBroker cleaning and Sachin Deep Cleaning compared for Gurgaon homes — pricing model, crew vetting, scope depth and rescheduling terms.",
  },
  {
    file: 'blog/safaiwale-vs-sachin-deep-cleaning', page: 'article',
    title: "Safaiwale vs Sachin Deep Cleaning: Gurgaon Prices Compared",
    description: "Safaiwale and Sachin Deep Cleaning side by side for Gurgaon: rate cards, checklist depth, machine use and the guarantee difference that matters.",
  },
  // ── New: Price-intent blogs (Batch 1 — 1/2/3BHK + sofa per-seat, complete) ──
  {
    file: 'blog/1bhk-deep-cleaning-price-gurgaon', page: 'article',
    title: "1BHK Deep Cleaning in Gurgaon: ₹2,500, Itemised",
    description: "What the ₹2,500 1BHK deep clean in Gurgaon covers room by room, how long it takes and when a 1BHK booking needs the villa checklist instead.",
  },
  {
    file: 'blog/2bhk-deep-cleaning-price-gurgaon', page: 'article',
    title: "2BHK Deep Cleaning in Gurgaon for a Fixed ₹4,500",
    description: "The fixed ₹4,500 2BHK deep clean in Gurgaon: both bathrooms, kitchen degrease, wardrobes in and out, machine-polished floors and a pay-after walkthrough.",
  },
  {
    file: 'blog/3bhk-deep-cleaning-price-gurgaon', page: 'article',
    title: "3BHK Deep Cleaning in Gurgaon for a Fixed ₹5,500",
    description: "The fixed ₹5,500 3BHK deep clean in Gurgaon: three bathrooms, full kitchen degrease, balcony, machine scrub and a checklist you audit before paying.",
  },
  {
    file: 'blog/sofa-cleaning-price-gurgaon-per-seat', page: 'article',
    title: "Sofa Cleaning Price in Gurgaon — ₹499/Seat Explained",
    description: "What ₹499 per seat buys in Gurgaon sofa cleaning: hot-water extraction, fabric testing, 4–6 hour drying and why three-seat quotes vary.",
  },
  // ── Batch 2 — bathroom/kitchen price + micro-local (complete) ──
  {
    file: 'blog/bathroom-cleaning-price-gurgaon-per-bathroom', page: 'article',
    title: "Bathroom Cleaning Price in Gurgaon | ₹800 per Bathroom",
    description: "Bathroom cleaning in Gurgaon at ₹800 per bathroom — the nine descaling and sanitisation steps inside the price, and the timing per bath.",
  },
  {
    file: 'blog/kitchen-cleaning-price-gurgaon-chimney', page: 'article',
    title: "Kitchen Cleaning Price in Gurgaon | ₹1,500, Chimney In",
    description: "Kitchen cleaning in Gurgaon from ₹1,500 with the chimney included — the size brackets, what pushes it to ₹2,500, and the 2-hour process behind the price.",
  },
  {
    file: 'blog/dlf-phase-3-deep-cleaning-gurgaon', page: 'article',
    title: "Same-Day Deep Cleaning in DLF Phase 3, Gurgaon",
    description: "Same-day deep cleaning in DLF Phase 3 Gurgaon — tower access, market-facing flat quirks and the fixed ₹2,500–₹5,500 BHK rates.",
  },
  {
    file: 'blog/sohna-road-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning on Sohna Road, Gurgaon: All Towers Served",
    description: "Deep cleaning across Sohna Road high-rises — Central Park, Vatika, Uniworld: service-lift bookings, fixed BHK prices and evening slots after work.",
  },
  // ── Batch 3 — Golf + house price + end-tenancy + pest vs (complete) ──
  {
    file: 'blog/golf-course-road-deep-cleaning-gurgaon', page: 'article',
    title: "Golf Course Road Deep Cleaning for Premium Gurgaon Homes",
    description: "Deep cleaning for Golf Course Road apartments and builder floors: marble-safe chemistry, concierge coordination and villa-grade checklists.",
  },
  {
    file: 'blog/house-cleaning-price-gurgaon-per-visit', page: 'article',
    title: "What a ₹499 House Cleaning Visit in Gurgaon Covers",
    description: "What a ₹499 house cleaning visit in Gurgaon covers, what it never covers, and when upgrading to a ₹2,500+ deep clean is the cheaper decision.",
  },
  {
    file: 'blog/end-of-tenancy-cleaning-gurgaon', page: 'article',
    title: "End of Tenancy Cleaning in Gurgaon: Get the Deposit Back",
    description: "End-of-tenancy cleaning in Gurgaon from ₹2,500: the deposit-costing items landlords check, day-before-move handover timing and photo documentation.",
  },
  {
    file: 'blog/pest-control-vs-deep-cleaning-gurgaon', page: 'article',
    title: "Pest Control or Deep Cleaning First? Gurgaon Answer",
    description: "Book deep cleaning first, pest control two or three days after — the sequencing logic, what each removes, and the combined booking most Gurgaon homes want.",
  },
  // ── Batch 4 — Top 11 work areas: Sushant Lok 1-3, DLF 1,2,4,5, Sector 65-67 (complete) ──
  {
    file: 'blog/sushant-lok-1-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in Sushant Lok 1, Gurgaon: C-Block to Vyapar",
    description: "Deep cleaning across Sushant Lok 1 Gurgaon — builder floors and the Vyapar Kendra side: access notes, fixed BHK prices and same-day slots.",
  },
  {
    file: 'blog/sushant-lok-2-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in Sushant Lok 2, Gurgaon: B-Block & Sec 57",
    description: "Deep cleaning in Sushant Lok 2 and the Sector 57 edge: builder-floor stairs, parking for equipment and the same fixed BHK rate card.",
  },
  {
    file: 'blog/sushant-lok-3-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in Sushant Lok 3 & Sectors 57–58, Gurgaon",
    description: "Deep cleaning for Sushant Lok 3 and Sectors 57–58: newer towers, society gate passes and the fixed ₹2,500–₹5,500 BHK pricing.",
  },
  {
    file: 'blog/dlf-phase-1-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in DLF Phase 1, Gurgaon: Premium Homes",
    description: "Deep cleaning in DLF Phase 1 — independent houses and older builder floors: uptime for machines on upper floors, fixed rates, same-day slots.",
  },
  {
    file: 'blog/dlf-phase-2-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in DLF Phase 2, Gurgaon: Same-Day Slots",
    description: "Same-day deep cleaning in DLF Phase 2 Gurgaon: colony access, typical home types and the unchanged ₹2,500–₹5,500 fixed BHK price card.",
  },
  {
    file: 'blog/dlf-phase-4-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in DLF Phase 4: Galleria & Supermart Belt",
    description: "Deep cleaning around Galleria and Supermart 1 in DLF Phase 4 — tower rules, market-facing flat issues and fixed BHK prices with same-day slots.",
  },
  {
    file: 'blog/dlf-phase-5-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in DLF Phase 5 & Sectors 43–53, Gurgaon",
    description: "Deep cleaning in DLF Phase 5 and the Sector 43–53 belt: large flats and villas, society scheduling and villa-grade checklists at fixed rates.",
  },
  {
    file: 'blog/sector-65-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in Sector 65, Gurgaon: World Spa & Villas",
    description: "Deep cleaning in Sector 65 — World Spa apartments and villa lanes: premium-society norms, marble-safe cleaning and the standard fixed BHK rates.",
  },
  {
    file: 'blog/sector-66-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in Sector 66, Gurgaon: Vatika & New Towers",
    description: "Deep cleaning in Sector 66 Gurgaon — Vatika City and the newer towers: move-in dust, society scheduling and the fixed 1–5BHK price card.",
  },
  {
    file: 'blog/sector-67-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in Sector 67, Gurgaon: Ansal & Beyond",
    description: "Deep cleaning in Sector 67 — Ansal floor, Housing Board and new societies: varied home types, one fixed price card, same-day slots when open.",
  },
  // ── guide to answers better than Urban/a marketplace listing/a national aggregator for bare "full home deep cleaning" (search results #4) & a company site #6 ──
  {
    file: 'blog/full-home-deep-cleaning', page: 'article',
    title: "Full Home Deep Cleaning in Gurgaon (2026) | ₹2,500–₹9,000",
    description: "Full home deep cleaning in Gurgaon from ₹2,500 (1 BHK) to ₹9,000 (villa) — the room-by-room checklist, how long it takes and the walkthrough before you pay",
  },
  {
    file: 'blog/home-deep-cleaning-service-gurgaon', page: 'article',
    title: "Home Deep Cleaning Service in Gurgaon: Book in 5 Minutes",
    description: "WhatsApp three photos and get a fixed 1–5BHK deep cleaning price in five minutes — checklist, timing and pay-after-approval terms in writing.",
  },
  {
    file: 'blog/bathroom-deep-cleaning-gurgaon-best', page: 'article',
    title: "Bathroom Deep Cleaning in Gurgaon: the ₹800 Benchmark",
    description: "What the best bathroom deep cleaning in Gurgaon looks like at ₹800 a bath — descaling dwell times, grout work and the glass finish you should expect.",
  },
  // ── 3 high-volume 0-click Instagram queries (skip mr brand) ──
  {
    file: 'blog/deep-cleaning-services', page: 'article',
    title: "Deep Cleaning Services in Gurgaon | BHK Prices ₹2,500–₹9,000",
    description: "What deep cleaning services include in Gurgaon, BHK by BHK — 1 BHK ₹2,500, 2 BHK ₹4,500, 3 BHK ₹5,500, villa ₹9,000, with the exclusions written out.",
  },
  {
    file: 'blog/home-cleaning-services-gurgaon', page: 'article',
    title: "Home Cleaning Services in Gurgaon | From ₹499 a Visit",
    description: "Home cleaning services in Gurgaon from ₹499 a visit — studio ₹499, 1 BHK ₹799, 2 BHK ₹1,199, 3 BHK ₹1,699. Weekly, bi-weekly and monthly plans.",
  },
  {
    file: 'blog/home-deep-cleaning-services-gurgaon', page: 'article',
    title: "Home Deep Cleaning Services in Gurgaon | ₹2,500–₹9,000",
    description: "Home deep cleaning in Gurgaon from ₹2,500 (1 BHK) to ₹9,000 (villa) — fixed BHK rates, an hour-by-hour account of the crew’s day, and what moves the price.",
  },
  {
    file: 'blog/post-construction-cleaning-services-gurgaon', page: 'article',
    title: "Post-Construction Cleaning in Gurgaon: the 3-Phase Method",
    description: "Post-construction cleaning in Gurgaon in three phases — debris, fine dust, detail: why paint and cement residue need different chemistry and 1–2 days.",
  },
  {
    file: 'blog/office-deep-cleaning-udyog-vihar', page: 'article',
    title: "Office Deep Cleaning in Udyog Vihar: Phases 1–5, After-Hours",
    description: "After-hours office deep cleaning across Udyog Vihar Phases 1–5: ₹3/sq ft, 9-area scope, weekend nights for large floors, no workday lost.",
  },
  {
    file: 'blog/carpet-cleaning-udyog-vihar', page: 'article',
    title: "Onsite Carpet Cleaning in Udyog Vihar at ₹15/Sq Ft",
    description: "Onsite carpet cleaning for Udyog Vihar offices at ₹15 per sq ft — low-moisture method for cubicle carpets, night work, dry by morning.",
  },
  {
    file: 'blog/carpet-shampoo-cleaning-udyog-vihar', page: 'article',
    title: "Carpet Shampoo Cleaning in Udyog Vihar — ₹18/Sq Ft",
    description: "Deep carpet shampooing for Udyog Vihar offices at ₹18 per sq ft — hot-water extraction for heavily soiled carpets, sectioned so work never stops.",
  },

  {
    file: 'blog/sofa-cleaning-udyog-vihar', page: 'article',
    title: "Office Sofa Cleaning in Udyog Vihar — ₹499/Seat Onsite",
    description: "Onsite office sofa cleaning in Udyog Vihar at ₹499 per seat — reception and lounge upholstery cleaned after hours, dry by next morning.",
  },
  {
    file: 'blog/chair-cleaning-udyog-vihar', page: 'article',
    title: "Office Chair Cleaning in Udyog Vihar from ₹199/Chair",
    description: "Office chair cleaning in Udyog Vihar from ₹199 a chair — mesh, fabric and leather care, volume rates for 50+ chairs, done overnight.",
  },
  {
    file: 'blog/office-bathroom-cleaning-udyog-vihar', page: 'article',
    title: "Office Bathroom Cleaning in Udyog Vihar — ₹800/Bath",
    description: "Office bathroom cleaning in Udyog Vihar at ₹800 a bath: urinal descaling, drain and trap treatment, high-touch disinfection — 1–2 hours per bath.",
  },
  {
    file: 'blog/commercial-office-cleaning-udyog-vihar', page: 'article',
    title: "Commercial Office Cleaning in Udyog Vihar: AMC & Deep",
    description: "Commercial office cleaning in Udyog Vihar: daily housekeeping AMCs priced per sq ft plus quarterly deep cleans from ₹3,999 — after-hours, survey-quoted.",
  },
  {
    file: 'blog/office-deep-cleaning-sector-44-gurgaon', page: 'article',
    title: "Office Deep Cleaning in Sector 44 & Corporate Hubs",
    description: "Office deep cleaning in Sector 44 from ₹3/sq ft — after-hours crews for Cyber City, Golf Course Rd & Udyog Vihar. GST invoice, pay after sign-off.",
  },
  {
    file: 'blog/sector-44-office-deep-cleaning-gurgaon', page: 'article',
    title: "Sector 44 Office Deep Cleaning: Full Guide",
    description: "Office deep cleaning in Sector 44 from ₹3/sq ft — metro-side crews, coworking turnover, night shifts. GST invoice, NDA, pay after sign-off.",
    redirectTo: 'blog/office-deep-cleaning-sector-44-gurgaon',
  },
  {
    file: 'blog/office-deep-cleaning-cyber-city-gurgaon', page: 'article',
    title: "Cyber City Office Deep Cleaning, Gurgaon",
    description: "Cyber City office deep cleaning from ₹3/sq ft — tower passes, dock slots, 9 PM night windows. Density crews. GST invoice, pay after sign-off.",
  },
  {
    file: 'blog/office-deep-cleaning-golf-course-road-gurgaon', page: 'article',
    title: "Golf Course Road Office Deep Cleaning",
    description: "Premium office deep cleaning on Golf Course Road from ₹3/sq ft — marble-safe chemistry, concierge slots. GST invoice, pay after sign-off.",
  },
  {
    file: 'blog/office-deep-cleaning-sector-32-gurgaon', page: 'article',
    title: "Sector 32 Office Deep Cleaning, Gurgaon",
    description: "Sector 32 office deep cleaning from ₹3/sq ft — weekend-night crews for managed workspaces. Shared scope in writing. GST invoice, pay after sign-off.",
  },
  {
    file: 'blog/home-cleaning-service-guide', page: 'article',
    title: "Home Cleaning Service: What It Includes & Costs",
    description: "What a home cleaning service includes, the four booking types, India-typical costs per visit, and how to choose between a service, a maid and a deep clean.",
  },
  // ── Batch 4 — 4/5BHK price + mattress + Dwarka + society + monsoon ──
  {
    file: 'blog/4bhk-deep-cleaning-price-gurgaon', page: 'article',
    title: "4BHK Deep Cleaning in Gurgaon for a Fixed ₹6,500",
    description: "Fixed ₹6,500 4BHK deep cleaning in Gurgaon: four bedrooms, three baths, lounge, kitchen degrease, balconies and a written checklist audited before you pay.",
  },
  {
    file: 'blog/5bhk-deep-cleaning-price-gurgaon', page: 'article',
    title: "5BHK Deep Cleaning in Gurgaon for a Fixed ₹9,000",
    description: "Fixed ₹9,000 5BHK and villa deep cleaning in Gurgaon: five bedrooms, four-plus baths, terrace, kitchen degrease and a checklist you audit before paying.",
  },
  {
    file: 'blog/mattress-cleaning-gurgaon', page: 'article',
    title: "Mattress Cleaning in Gurgaon — Steam & Shampoo Guide",
    description: "Mattress cleaning in Gurgaon by steam and shampoo extraction: dust mites, stains, odour, drying time and how mattress jobs bundle with sofa service.",
  },
  {
    file: 'blog/dwarka-expressway-deep-cleaning-gurgaon', page: 'article',
    title: "Dwarka Expressway Deep Cleaning in Gurgaon",
    description: "Deep cleaning on Dwarka Expressway in Gurgaon — Sectors 102–113, new towers, move-in dust, service-lift bookings and fixed BHK prices.",
  },
  {
    file: 'blog/society-deep-cleaning-day-gurgaon', page: 'article',
    title: "Society Deep Cleaning in Gurgaon: Cluster Days",
    description: "Society deep cleaning in Gurgaon through tower cluster days: RWA coordination, gate passes, lift slots, the same BHK card and pay-after walkthrough.",
  },
  {
    file: 'blog/monsoon-cleaning-checklist-gurgaon', page: 'article',
    title: "Monsoon Cleaning Checklist for Gurgaon Homes",
    description: "Monsoon cleaning checklist for Gurgaon homes: drains, balconies, grout, damp corners, drying, and the post-monsoon deep clean that resets it all.",
  },
];
