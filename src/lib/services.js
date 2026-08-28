// Content for data-driven service pages. Keyed by `serviceKey` from pages.config.mjs.
// `fullhome` supports a `bhk` number (1–5) for tailored copy/pricing.

const base = {
  deep: {
    name: 'Deep Cleaning Services in Gurgaon',
    tagline: 'A top-to-bottom refresh for every corner of your home.',
    intro:
      'Our deep cleaning service goes far beyond routine sweeping — we scrub, descale, sanitize and detail every surface so your home feels genuinely new.',
    detail:
      'Regular sweeping and mopping only reaches the surface. A genuine deep cleaning reaches everything else: grease-laden kitchen tiles, hard-water marks in bathrooms, dust hidden on ceiling fans, inside wardrobes, behind beds and under sofas. Gurgaon’s dusty, construction-heavy environment means fine particulate settles into carpets, mattresses and upholstery — which is exactly where dust mites and allergens thrive.\n\nOur trained team works top-to-bottom and room-by-room with professional machines and eco-friendly products. We shift light furniture, detail every fixture, wash windows and sanitize high-touch surfaces like switches and door handles. The result is a home that not only looks cleaner but actually breathes easier. Most Gurgaon families book a full deep clean every 3–6 months, and before or after the festive season, moving in or out, or post-renovation.\n\nGurgaon’s hard water leaves calcium and magnesium deposits on taps, shower heads and tile grout that normal wiping cannot remove — our descaling treatment handles this properly. Construction dust from Dwarka Expressway, Golf Course Extension and Sohna Road corridors embeds in sofa fibres, AC filters and chimney interiors even in well-sealed homes.\n\nPre-Diwali (Oct–Nov) and post-monsoon are the busiest periods — we recommend booking early for those slots. Our service also covers move-in / move-out empty-flat resets and post-construction removal of cement dust, paint drips and adhesive residue, all at the same verified-team, pay-after-satisfaction standard.',
    image: '/images/full-home-deep-cleaning.jpg',
    imageAlt: 'Deep cleaning services in Gurgaon — trained team scrubbing floors, tiles and furniture top to bottom',
    includes: [
      'Floor & tile scrubbing and polishing',
      'Wall, ceiling and fixture dusting',
      'Furniture, wardrobe and cupboard detailing',
      'Kitchen degreasing — countertops, stove, chimney, cabinets',
      'Bathroom descaling — tiles, faucets, commode, grout',
      'Windows, sills and glass cleaning',
      'Anti-viral sanitization of touch points',
      'Cobweb removal and under-furniture vacuuming',
    ],
    process: [
      { step: 1, title: 'Walkthrough & Quote', desc: 'We assess your home, note problem areas and lock the exact price on the confirmation call.' },
      { step: 2, title: 'Deep Clean', desc: 'Every room is degreased, descrubbed and detailed top-to-bottom.' },
      { step: 3, title: 'Sanitize', desc: 'Switches, handles and touch points are disinfected.' },
      { step: 4, title: 'Final Check', desc: 'We walk through every room with you for sign-off.' },
    ],
    faqs: [
      { q: 'How long does deep cleaning take?', a: 'Typically 4–10 hours depending on home size — a 1 BHK takes 5–6 hours, a 2 BHK 7–8 hours, and a 3 BHK about 9–10 hours with a larger team.' },
      { q: 'How often should a home be deep cleaned in Gurgaon?', a: 'Because of dust and construction activity, most Gurgaon homes benefit from a deep clean every 3–6 months. After that, regular house cleaning keeps it maintained.' },
      { q: 'Do you bring your own equipment?', a: 'Yes — professional machines, eco-friendly products and all tools are included in the price. You do not need to arrange anything.' },
      { q: 'Do you move furniture?', a: 'Light furniture is shifted to clean behind and under it. Heavy items like wardrobes can be moved on request, and we place everything back exactly as it was.' },
      { q: 'What is the difference between regular and deep cleaning?', a: 'Regular cleaning dusts and mops visible surfaces. Deep cleaning scrubs grout, descales taps, degreases kitchens, shampoos sofas and cleans areas that daily cleaning cannot reach.' },
      { q: 'Is deep cleaning safe for kids and pets?', a: 'Yes — we use non-toxic, eco-friendly, ISO-certified cleaning solutions that are safe for children, elderly and pets, with no harsh chemical residue.' },
      { q: 'How much does deep cleaning cost in Gurgaon?', a: 'Deep cleaning in Gurgaon starts from ₹2,000 for a 1 RK or studio and goes up to ₹14,500 for a 5 BHK. The exact price depends on your home size, number of bathrooms and condition.' },
      { q: 'What areas do you serve in Gurgaon?', a: 'We serve all sectors in Gurgaon — DLF Phase 1–5, Sohna Road, Golf Course Road, MG Road, Palam Vihar, Sushant Lok, South City, Golf Course Extension and all residential societies across Gurugram.' },
      { q: 'Do I need to be present during the deep cleaning?', a: 'You should be present at the start for a walkthrough and at the end for sign-off. Many customers step out during the clean itself — we are happy to work with access instructions and share a progress update.' },
      { q: 'What if I am not satisfied with the cleaning?', a: 'You only pay after you have walked through and approved the work. If any area is missed or unsatisfactory, we re-clean it on the spot before you pay.' },
    ],
    reviews: [
      ['SR', 'Sunita Rao', 'DLF Phase 2', "Booked a full home deep clean before Diwali. The team scrubbed grout I'd given up on and the kitchen looked brand new. Worth every rupee."],
      ['AD', 'Arjun Desai', 'Sector 57', 'They found and cleaned things I never even noticed — behind the fridge, under the beds, inside the wardrobes. Genuinely top-to-bottom.'],
      ['MK', 'Meera Kapoor', 'Golf Course Road', 'Pay-after-cleaning gave me full confidence. The house smelled fresh and the team was respectful and on time. Highly recommend.'],
    ],
    price: { label: 'Starting from', amount: '₹2,000' },
    pricingTable: [
      { service: 'Full home deep cleaning — 1 BHK', price: 'From ₹2,500' },
      { service: 'Full home deep cleaning — 2 BHK', price: 'From ₹4,500' },
      { service: 'Full home deep cleaning — 3 BHK', price: 'From ₹5,500' },
      { service: 'Full home deep cleaning — 4 BHK', price: 'From ₹6,500' },
      { service: 'Full home deep cleaning — 5 BHK', price: 'From ₹9,000' },
      { service: 'Kitchen deep cleaning', price: 'On request' },
      { service: 'Bathroom deep cleaning', price: 'On request' },
      { service: 'Sofa shampoo cleaning', price: 'From ₹499 / seat' },
      { service: 'Carpet shampoo cleaning', price: 'From ₹15 / sq ft' },
      { service: 'House cleaning (regular)', price: 'From ₹499 / visit' },
      { service: 'Office deep cleaning', price: 'On request' },
      { service: 'Move-in / move-out cleaning', price: 'From ₹1,999' },
    ],
  },
  house: {
    name: 'House Cleaning Services in Gurgaon',
    tagline: 'Reliable, affordable cleaning for a healthier home.',
    intro:
      'From quick refreshes to scheduled deep cleans, our house cleaning plans keep your Gurgaon home consistently spotless.',
    detail:
      'Life in Gurgaon leaves little time for keeping up with dusting, mopping and tidying — and that is exactly what our house cleaning service is built for. We offer one-time cleans for a fresh start, plus weekly and bi-weekly plans so your home stays consistently clean without you lifting a finger.\n\nEach visit includes dusting, vacuuming, mopping, kitchen and bathroom upkeep, bin emptying and surface sanitation. Our plans are tailored to your home size — from compact studio apartments and 1 BHK flats in sectors like DLF Phase 1–5 and Sohna Road to large 4 BHK villas. Prices start at ₹499 per visit for a studio and scale by size. Every cleaner is police-verified, brings eco-friendly supplies, and you pay only after you walk through and approve the work.',
    image: '/images/house-cleaning.jpg',
    imageAlt: 'Residential house cleaning service in Gurgaon by police-verified team from Sachin Deep Cleaning',
    includes: ['Full dusting & vacuuming', 'Mopping & floor care', 'Kitchen & bathroom upkeep', 'Bin emptying & liner change', 'Surface wiping & sanitation', 'Bed-making & tidying (optional)', 'Weekly / bi-weekly / monthly plans', 'Eco-friendly products'],
    process: [
      { step: 1, title: 'Book a Slot', desc: 'Pick one-time or a recurring plan that suits your routine.' },
      { step: 2, title: 'Clean', desc: 'Our team cleans thoroughly using your approved checklist.' },
      { step: 3, title: 'Inspect & Relax', desc: 'Walk through the home, approve the work, then enjoy a fresh space.' },
    ],
    faqs: [
      { q: 'How much does house cleaning cost in Gurgaon?', a: 'House cleaning starts at ₹499 per visit for a studio apartment. A 1 BHK is around ₹799, a 2 BHK ₹1,199 and a 3 BHK ₹1,699. Weekly plans work out cheaper per visit.' },
      { q: 'Can I schedule recurring cleaning?', a: 'Yes — we offer weekly, bi-weekly and monthly house cleaning plans across Gurgaon, with the same trusted team assigned to your home every time.' },
      { q: 'Are products pet-safe?', a: 'We use non-toxic, eco-friendly solutions that are completely safe around pets and children.' },
      { q: 'Do I need to be present during cleaning?', a: 'Not necessarily. Many customers leave a key with us or share access instructions. We do a final walkthrough together so you can approve the work.' },
      { q: 'Do you clean balconies and utility areas?', a: 'Yes — balconies, utility areas, stairwells and passages inside the home are included in the standard house cleaning checklist.' },
      { q: 'What is included in a standard house cleaning visit?', a: 'A standard house cleaning visit includes full dusting and vacuuming, mopping all floors, kitchen surface wiping, bathroom cleaning, bin emptying, and surface sanitation. Bed-making and dish washing are available as add-ons.' },
      { q: 'How long does a house cleaning visit take?', a: 'A 1 BHK takes approximately 1.5–2 hours. A 2 BHK takes 2–3 hours. A 3 BHK takes 3–4 hours. The exact time depends on the current state of the home.' },
      { q: 'Is house cleaning different from deep cleaning?', a: 'Yes. House cleaning covers regular visible surfaces — sweeping, mopping, wiping and bathroom upkeep. Deep cleaning is a thorough one-time or quarterly service that reaches behind furniture, inside cabinets, grout lines and every surface including those cleaning routinely misses.' },
      { q: 'Can I get the same cleaner every time?', a: 'On weekly and bi-weekly plans, we assign the same team to your home so they know your preferences and you build familiarity. Occasional cancellations may require a substitute — we always inform you in advance.' },
    ],
    reviews: [
      ['NV', 'Nisha Verma', 'Sector 56', 'Weekly house cleaning plan — the same two cleaners every time, and the flat is always spotless when I come home.'],
      ['RK', 'Rahul Khanna', 'Palam Vihar', 'Booked a one-time deep clean then switched to the monthly plan. Great value and very consistent quality.'],
      ['TM', 'Tanya Malhotra', 'Sushant Lok 1', 'They clean around my schedule and my dog loves them. Eco-friendly products, no strong smells.'],
    ],
    price: { label: 'Starting from', amount: '₹499' },
  },
  kitchen: {
    name: 'Kitchen Deep Cleaning in Gurgaon',
    tagline: 'A hygienic, grease-free cooking space.',
    intro:
      'We degrease chimneys, cabinets, countertops and appliances so your kitchen is safe and sparkling.',
    detail:
      'A kitchen is the hardest-working room in any Gurgaon home — and the most neglected during routine cleaning. Daily cooking leaves a stubborn layer of grease on chimney filters, exhaust fans, stove burners, cabinet doors and the tiles behind the hob. That sticky film collects dust and can turn into tough, baked-on grime over just a few months.\n\nOur kitchen deep cleaning service dismantles and degreases the chimney and exhaust fan, scrubs every cabinet inside and out, descales the sink and taps, cleans the stove, hob and microwave, wipes splashback tiles and grout, and finishes with the kitchen floor. We use food-safe, eco-friendly degreasers so your cooking surfaces stay hygienic for your family. A standard kitchen takes 3–4 hours with a 1–2 cleaner team.',
    image: '/images/kitchen-deep-cleaning.webp',
    imageAlt: 'Kitchen deep cleaning in Gurgaon — professional chimney degreasing and cabinet cleaning by Sachin Deep Cleaning',
    includes: ['Chimney filter degreasing & washing', 'Exhaust fan dismantle & clean', 'Stove & hob scrub', 'Cabinet interiors & exteriors', 'Sink & tap descaling', 'Splashback tile & grout scrub', 'Microwave & countertop detail', 'Kitchen floor degreasing'],
    process: [
      { step: 1, title: 'Clear & Protect', desc: 'We clear counters and protect surfaces before starting.' },
      { step: 2, title: 'Degrease', desc: 'Chimney, exhaust, hob and tiles are degreased with food-safe products.' },
      { step: 3, title: 'Detail', desc: 'Cabinets, drawers, sink and appliances are scrubbed inside and out.' },
      { step: 4, title: 'Sanitize', desc: 'Surfaces are wiped down with a hygienic final disinfection.' },
    ],
    faqs: [
      { q: 'Do you clean the chimney filter?', a: 'Yes — we dismantle the filter and wash it with a powerful degreaser so suction is restored, not just wiped over.' },
      { q: 'How long does kitchen deep cleaning take?', a: 'A standard Gurgaon kitchen takes about 3–4 hours. Larger modular kitchens or heavy grease buildup may take longer.' },
      { q: 'Are the cleaning products food-safe?', a: 'Yes — we only use food-safe, eco-friendly degreasers and disinfectants on all cooking and food-contact surfaces.' },
      { q: 'How often should I deep clean my kitchen?', a: 'Every 2–3 months for daily-cooking kitchens. Chimney filters should be cleaned even more regularly to prevent grease buildup and keep the exhaust working.' },
      { q: 'Do you clean inside the refrigerator?', a: 'Fridge deep cleaning is available as an add-on. The standard kitchen package covers the chimney, hob, cabinets, sink, tiles and countertops.' },
      { q: 'How much does kitchen deep cleaning cost in Gurgaon?', a: 'Kitchen deep cleaning in Gurgaon costs approximately ₹1,500–₹2,500 depending on kitchen size and the level of grease buildup. The chimney filter clean is included. WhatsApp us for a fixed quote.' },
      { q: 'Do you clean inside kitchen cabinets?', a: 'Yes — inside and outside of all cabinets and drawers are cleaned as part of the kitchen deep clean package. Expired items you want removed should be cleared before the team arrives.' },
      { q: 'Can you clean a modular kitchen?', a: 'Yes — we have experience with modular kitchens including tall units, pull-out drawers, basket inserts and built-in chimneys. We clean carefully without disturbing fittings or mechanisms.' },
      { q: 'Is kitchen deep cleaning the same as chimney servicing?', a: 'No. Kitchen deep cleaning includes a thorough chimney filter clean and body wipe-down, but does not include motor servicing or warranty-covered repair work. For motor or electrical issues, contact your chimney brand\'s service center.' },
    ],
    reviews: [
      ['PK', 'Pooja Khurana', 'Sohna Road', 'The chimney filter looked like new after they were done. My kitchen finally smells clean, not of old cooking oil.'],
      ['SM', 'Shalini Mehra', 'DLF Phase 4', 'They took apart the exhaust fan and hob and degreased everything. Grease I thought was permanent is completely gone.'],
      ['RJ', 'Ritika Jain', 'Sector 49', 'Very thorough — even the cabinet interiors and the top of the chimney were cleaned. Worth booking every quarter.'],
    ],
    price: { label: 'Custom quote', amount: 'request' },
  },
  bathroom: {
    name: 'Bathroom Deep Cleaning in Gurgaon',
    tagline: 'Germ-free, sparkling bathrooms.',
    intro:
      'Descaling tiles, faucets, commodes and exhaust fans — we leave your bathroom hygienic and fresh.',
    detail:
      'Gurgaon’s hard water is brutal on bathrooms. It leaves white limescale on faucets, taps, shower heads and mirrors, yellows the grout between tiles, and stains the corners of the commode and bath. Left alone, moisture also invites mould and soap scum in hidden corners that a routine mop never touches.\n\nOur bathroom deep cleaning service removes limescale and hard-water stains from tiles, faucets, shower heads and glass, scrubs grout lines, fully sanitizes the commode inside and out, cleans the basin, exhaust fan and mirror, and finishes with the floor and wall tiles. We use disinfectants and rinse-safe products so the bathroom is safe for kids. A single bathroom typically takes 1.5–2 hours with one expert cleaner.',
    image: '/images/bathroom-deep-cleaning.jpg',
    imageAlt: 'Bathroom deep cleaning removing hard water stains from tiles and taps in a Gurgaon home',
    includes: ['Tile & grout descaling', 'Faucet, shower & tap de-scaling', 'Commode sanitization inside & out', 'Basin & mirror polishing', 'Exhaust fan cleaning', 'Mould & soap scum removal', 'Glass & shower panel cleaning', 'Floor scrub & disinfection'],
    process: [
      { step: 1, title: 'Descale', desc: 'Hard-water stains and limescale are dissolved off fixtures and tiles.' },
      { step: 2, title: 'Scrub', desc: 'Grout, corners and the commode are scrubbed clean.' },
      { step: 3, title: 'Sanitize', desc: 'Every surface is disinfected with rinse-safe products.' },
      { step: 4, title: 'Shine', desc: 'Glass, mirrors and chrome are polished to finish.' },
    ],
    faqs: [
      { q: 'Do you remove hard-water stains?', a: 'Yes — we use professional descalers that dissolve Gurgaon’s limescale from taps, shower heads, glass and tiles.' },
      { q: 'How long does a bathroom deep clean take?', a: 'Around 1.5–2 hours per bathroom with one expert cleaner. Larger bathrooms or heavy staining can take longer.' },
      { q: 'Is it safe for kids?', a: 'Absolutely — we use non-toxic, rinse-safe products that leave no harsh chemical residue.' },
      { q: 'Can you remove mould from bathroom corners?', a: 'Yes — mould and soap scum are treated and scrubbed off grout, silicone and tile corners as part of the deep clean.' },
      { q: 'Do you clean the exhaust fan and ventilation?', a: 'Yes, the exhaust fan grill and blades are cleaned and the vent wiped down during the deep clean.' },
      { q: 'How much does bathroom deep cleaning cost in Gurgaon?', a: 'Bathroom deep cleaning in Gurgaon costs approximately ₹800–₹1,200 per bathroom. If you book bathroom cleaning as part of a full-home deep clean, it is included in the overall home price.' },
      { q: 'Why do bathroom tiles get stained so fast in Gurgaon?', a: 'Gurgaon\'s water supply has a very high TDS (Total Dissolved Solids) level — often 800–1,200 mg/L. Every drop of water that evaporates leaves mineral deposits behind. This is why tiles, faucets and shower glass in Gurgaon show hard water stains faster than in most other Indian cities.' },
      { q: 'Do you clean the inside of the commode tank?', a: 'The standard bathroom deep clean covers the commode bowl, rim, base and seat. The inside of the water tank is available as an add-on — request it when booking.' },
      { q: 'How long after bathroom cleaning can I use it?', a: 'Usually 30–60 minutes after cleaning is complete. We use rinse-safe products and always do a final water rinse, so the bathroom is safe to use immediately once surfaces are dry.' },
    ],
    reviews: [
      ['AS', 'Anita Sharma', 'Sector 45', 'Hard water stains on our shower glass were driving me crazy. They came off completely. Bathroom looks brand new.'],
      ['DP', 'Deepak Puri', 'MG Road', 'Very impressed with the commode sanitization and tile scrubbing. Thorough and hygienic, no shortcuts.'],
      ['SG', 'Sneha Gupta', 'Golf Course Extension', 'They even cleaned the exhaust fan and ceiling corners. The bathroom smells fresh days later. Great service.'],
    ],
    price: { label: 'Custom quote', amount: 'request' },
  },
  sofa: {
    name: 'Sofa Shampoo Cleaning in Gurgaon',
    tagline: 'Revive your upholstery.',
    intro:
      'Steam and shampoo cleaning removes stains, dust mites and odors from sofas, mattresses and cushions.',
    detail:
      'Your sofa takes a daily beating — drinks spilled, kids climbing, pets curling up, and fine Gurgaon dust settling deep into the fabric. Over time, that invisible buildup turns fabric dull, triggers allergies, and traps odors that air fresheners simply mask.\n\nOur sofa shampoo cleaning uses a hot-water extraction and low-moisture method to flush out embedded dirt, dust mites and allergens, lift stains and neutralize odors. We first assess the fabric — cotton, linen, jacquard, velvet or leather — and choose the right treatment. Leather sofas receive a gentle conditioner-safe clean instead of shampoo. Prices start at ₹499 per seat for dry cleaning and ₹599 per seat for shampoo extraction. A 3-seater usually takes 1.5–2 hours and dries in 4–6 hours, ready for the evening.',
    image: '/images/sofa-shampoo-cleaning.jpg',
    imageAlt: 'Sofa shampoo cleaning in Gurgaon — stain removal and fabric-safe extraction by Sachin Deep Cleaning',
    includes: ['Deep vacuum before treatment', 'Stain pre-treatment & removal', 'Fabric-safe shampoo & extraction', 'Dust-mite & allergen removal', 'Odor neutralization', 'Leather-safe conditioning option', 'Cushion & pillow cover care', 'Quick-dry low-moisture finish'],
    process: [
      { step: 1, title: 'Vacuum', desc: 'Loose dirt and dust are extracted from the fabric.' },
      { step: 2, title: 'Pre-treat', desc: 'Stains are treated with fabric-appropriate solutions.' },
      { step: 3, title: 'Shampoo & Extract', desc: 'Foam is worked in and dirt and moisture are extracted.' },
      { step: 4, title: 'Dry & Protect', desc: 'The sofa is dried and, if needed, protected.' },
    ],
    faqs: [
      { q: 'How much does sofa cleaning cost in Gurgaon?', a: 'Sofa cleaning starts at ₹499 per seat for dry cleaning and ₹599 per seat for shampoo/steam extraction. A 3-seater is typically ₹1,500–1,800.' },
      { q: 'How long to dry?', a: 'Typically 4–6 hours in normal room conditions. We use a low-moisture extraction so your sofa is usually ready by the evening.' },
      { q: 'Is it safe for all fabrics?', a: 'We assess the fabric first and use the right method — shampoo extraction for cotton and polyester blends, gentle methods for silk, velvet and leather.' },
      { q: 'Will it remove old stains?', a: 'We pre-treat and extract most set-in stains. Very old or permanent marks (like ink or bleach) may lighten but cannot always be fully removed — we will tell you honestly before starting.' },
      { q: 'Does cleaning remove dust mites?', a: 'Yes — the deep vacuum plus extraction removes dust mites, their droppings and allergens, which helps with allergy symptoms.' },
      { q: 'Is shampoo cleaning better than dry cleaning for sofas?', a: 'For embedded dirt, strong odors or significant stains, hot-water extraction (shampoo method) is more effective. Dry cleaning is a good choice for routine maintenance or for delicate fabrics that should not get wet.' },
      { q: 'Can you clean a leather sofa?', a: 'Yes — leather sofas are cleaned with a leather-safe conditioner cleaner, not shampoo or water. The process removes surface dirt, conditions the leather and helps prevent cracking. Please mention leather when booking.' },
      { q: 'Do you clean mattresses too?', a: 'Yes — mattress steam cleaning removes dust mites, allergens and bacteria. It is available as an add-on to sofa cleaning. Booking both together on the same visit is the most cost-effective option.' },
      { q: 'How often should I get my sofa professionally cleaned in Gurgaon?', a: 'Once a year for households without pets or children. Every 6 months for families with children or pets. Every 3–4 months for high-allergy households or homes with multiple pets.' },
    ],
    reviews: [
      ['VK', 'Vikas Khandelwal', 'Sushant Lok 1', 'Three-year-old sofas came back looking new. The water after extraction was black — clearly years of dust. Great value.'],
      ['MR', 'Meghna Rao', 'Sector 66', 'My cream fabric sofa had a stubborn coffee stain that other services said was permanent. They got most of it out. Impressed.'],
      ['NA', 'Nikhil Arora', 'Palam Vihar', 'Pet odor is gone completely. They were careful with the fabric and it dried the same evening.'],
    ],
    price: { label: 'Custom quote', amount: 'request' },
  },
  carpet: {
    name: 'Carpet Shampoo Cleaning in Gurgaon',
    tagline: 'Deep clean for brighter carpets.',
    intro:
      'We extract embedded dirt, stains and allergens so your carpets look and feel new.',
    detail:
      'Carpets are dust magnets — especially in Gurgaon, where fine particulate and construction dust settle straight into the pile. Everyday vacuuming only lifts the surface; the deep dirt, pet hair, dust mites and spilled stains stay trapped below, dulling colours and triggering allergies.\n\nOur carpet shampoo cleaning uses hot-water extraction to flush out deep-seated dirt and allergens, pre-treats stubborn stains and neutralizes odours, leaving your carpet visibly brighter and fresher. We clean wall-to-wall carpets, area rugs and runners, and assess the fibre — wool, nylon, polyester — before choosing the right treatment. Pricing is by area: from ₹15 per square foot for dry cleaning and ₹18 per square foot for shampoo extraction. A large living-room carpet typically dries within 4–6 hours.',
    image: '/images/carpet-shampoo-cleaning.jpg',
    imageAlt: 'Carpet shampoo cleaning Gurgaon — deep extraction of dirt, stains and allergens',
    includes: ['Deep pre-vacuum', 'Stain pre-treatment', 'Hot-water shampoo extraction', 'Allergen & dust-mite removal', 'Odor neutralization', 'Wall-to-wall & area rugs', 'Fibre-safe treatment', 'Quick-dry finish'],
    process: [
      { step: 1, title: 'Pre-treat', desc: 'Stains are spotted and treated with fibre-safe solutions.' },
      { step: 2, title: 'Agitate', desc: 'Shampoo is worked into the pile to lift dirt.' },
      { step: 3, title: 'Extract', desc: 'Dirty water and residue are rinsed and extracted.' },
      { step: 4, title: 'Dry', desc: 'Air flow speeds up drying so your carpet is ready sooner.' },
    ],
    faqs: [
      { q: 'Do you clean rugs too?', a: 'Yes — wall-to-wall carpets, area rugs, runners and dhurries are all covered.' },
      { q: 'How much does carpet cleaning cost?', a: 'From ₹15 per square foot for dry cleaning and ₹18 per square foot for shampoo extraction. The exact quote is confirmed after measuring the carpet.' },
      { q: 'How long to dry?', a: 'About 4–6 hours depending on carpet thickness and room ventilation. We use extraction methods that leave minimal moisture.' },
      { q: 'Can you remove pet stains and odours?', a: 'Yes — pet stains are pre-treated and odours are neutralized with enzyme-safe solutions during extraction.' },
      { q: 'Is it safe for wool carpets?', a: 'Yes — we adjust the pH and cleaning method for natural fibres like wool so they are cleaned without shrinking or damage.' },
      { q: 'What is the carpet cleaning rate per square foot in Gurgaon?', a: 'Carpet cleaning rates in Gurgaon are ₹15 per square foot for dry cleaning and ₹18 per square foot for shampoo hot-water extraction. A 10×12 ft carpet (120 sq ft) costs ₹1,800–₹2,160.' },
      { q: 'Can you clean Kashmiri or Persian carpets?', a: 'High-value handmade carpets like Kashmiri, Persian or silk rugs require specialist care. We assess the fibre and dye stability before cleaning. For very valuable rugs, we recommend professional rug washers who specialize in antique pieces.' },
      { q: 'How do you prevent colour bleeding during carpet cleaning?', a: 'We test for colour bleeding on a small hidden area before treating the full carpet. For carpets with vibrant or dark colours, we use a pH-neutral, colour-safe extraction solution.' },
      { q: 'How often should carpets be professionally cleaned in Gurgaon?', a: 'Every 6–12 months for regularly vacuumed carpets. Every 4–6 months for homes with pets or young children. After any significant soiling event (flood, spill, construction dust) — immediately.' },
    ],
    reviews: [
      ['KB', 'Kavita Bhatia', 'Sector 15', 'Our living room carpet was dull and musty. After the shampoo extraction it looks brighter and the room smells clean.'],
      ['SA', 'Sanjay Arora', 'DLF Phase 3', 'Fair per-sq-ft pricing and they measured honestly. Deep stains from the kids came out nicely.'],
      ['PR', 'Priyanka Reddy', 'Sohna Road', 'They cleaned our wall-to-wall carpet after renovation dust settled in. The amount of dirt extracted was shocking.'],
    ],
    price: { label: 'Custom quote', amount: 'request' },
  },
  office: {
    name: 'Office Deep Cleaning in Gurgaon',
    tagline: 'Clean workspaces, fewer sick days.',
    intro:
      'A top-to-bottom deep clean for offices in Gurgaon — workstations, pantries, washrooms, carpets and glass partitions. Scheduled around your business hours with minimal disruption.',
    detail:
      'First impressions matter. The condition of your office — sticky desks, stained carpets, grimy pantry and washrooms — says something about your company before a client says a word. More importantly, shared surfaces are the fastest way for germs to move through a team, and a deep clean every quarter measurably cuts sick days.\n\nOur office deep cleaning service is built around your schedule. We work after hours, early mornings or weekends so your team never has to vacate mid-day. We clean and sanitize workstations (desks, monitors, keyboards, chairs), pantries and kitchens, restrooms, glass partitions, reception and conference rooms, and shampoo carpets or scrub tile floors. Our background-checked staff can sign NDAs if your policy requires it. Pricing depends on floor area and scope — we give you an itemized quote before we start.',
    image: '/images/office-deep-cleaning.jpg',
    imageAlt: 'Office deep cleaning after hours in Gurgaon — workstations, pantry and washrooms cleaned',
    includes: [
      'Workstation deep clean — desks, monitors, keyboards, chairs',
      'Pantry & kitchen area — degreasing, countertops, sinks, exhaust fan',
      'Restrooms — tile & grout scrub, WC descaling, mirror polish',
      'Floor care — tile scrub or carpet shampoo / hot-water extraction',
      'Glass & partition cleaning — cabins, conference rooms, entrance doors',
      'Ceiling & walls — AC vents, fan blades, cobwebs, switchboards',
      'Reception & lobby — desk, waiting-area upholstery, high-dusting',
      'Waste management — bin sanitising & liner replacement',
    ],
    process: [
      { step: 1, title: 'Survey & Quote', desc: 'We survey the floor area and give an itemized, fixed quote.' },
      { step: 2, title: 'Schedule Off-Hours', desc: 'Cleaning is booked after hours or at weekends.' },
      { step: 3, title: 'Deep Clean', desc: 'Zones are cleaned top-to-bottom with commercial equipment.' },
      { step: 4, title: 'Verify', desc: 'A supervisor checks quality before your walkthrough.' },
    ],
    faqs: [
      { q: 'Can you clean after hours?', a: 'Yes — early morning, evening/night, and weekend slots at no extra charge. Your employees never need to vacate mid-day.' },
      { q: 'Do you sign NDAs?', a: 'Background-checked staff; NDAs available if your company policy requires it.' },
      { q: 'How often should an office be deep cleaned?', a: 'Every 3 months for most Gurgaon offices. High-traffic offices with 100+ people benefit from monthly deep cleaning.' },
      { q: 'Do you clean server rooms and IT areas?', a: 'We clean around server rooms using dry, anti-static methods only. We never use liquids near electrical or IT equipment unless your IT team supervises it.' },
      { q: 'What is the difference from daily housekeeping?', a: 'Daily housekeeping sweeps, mops and empties bins. Deep cleaning scrubs grout, descales taps, shampoos carpets, cleans AC vents and degreases kitchen exhausts — a full reset.' },
      { q: 'How much does office deep cleaning cost in Gurgaon?', a: 'Office deep cleaning in Gurgaon is priced by area and scope. A small office under 1,000 sq ft typically costs ₹5,000–₹8,000. Larger commercial spaces are assessed on-site for a custom quote.' },
      { q: 'Do you clean computer monitors, keyboards and electronics?', a: 'We clean external surfaces of monitors, keyboards, phones and desk equipment with anti-static, electronics-safe wipes. We do not clean internal components or open equipment casings.' },
      { q: 'Can you handle post-renovation office cleaning?', a: 'Yes — post-renovation office cleaning removes construction dust from HVAC vents, false ceilings, flooring, glass and all surfaces. This is priced separately from standard office deep cleaning due to the extra scope.' },
      { q: 'Do you provide regular office cleaning contracts?', a: 'Yes — we offer weekly, bi-weekly and monthly housekeeping contracts for offices in Gurgaon. WhatsApp +91 9267905943 to discuss a custom contract for your workspace.' },
    ],
    reviews: [
      ['HG', 'Hitesh Gupta', 'Corporate Office, Cyber City', 'They cleaned our 2-floor office on a Sunday with zero disruption. Carpets and washrooms were spotless by Monday morning.'],
      ['LS', 'Lata Srivastava', 'Startup Office, Udyog Vihar', 'NDA signed, team professional, and the pantry grease was finally gone. Booked them again for the quarterly clean.'],
      ['AC', 'Anuj Chawla', 'Clinic, Sector 44', 'For a medical setup hygiene is everything. Their sanitization of our waiting area and washrooms was thorough and documented.'],
    ],
    price: { label: 'Quote on', amount: 'request' },
  },
  move: {
    name: 'Move-In / Move-Out Cleaning in Gurgaon',
    tagline: 'Leave it spotless — or move into one.',
    intro:
      'End-to-end cleaning for tenants and owners: every room detailed so you hand over or settle in with confidence.',
    detail:
      'Moving is stressful enough without adding cleaning to the pile. Whether you are a tenant trying to get your full security deposit back or a new owner walking into a space that has seen years of someone else’s use, our move-in / move-out cleaning takes care of every corner.\n\nFor move-outs, we work to landlord checklists so nothing is left to argue about — kitchen degreased, bathrooms descaled, windows washed, walls spot-cleaned, floors scrubbed and cabinets emptied. For move-ins, we make the space hygienic and ready: sanitizing kitchens and bathrooms, wiping cabinet interiors, cleaning windows and giving the floors a deep scrub before your furniture arrives. We cover apartments and villas across Gurgaon and can work around your handover date, even same-day in many sectors.',
    image: '/images/full-home-deep-cleaning.jpg',
    imageAlt: 'Move-in move-out deep cleaning checklist complete — spotless empty apartment in Gurgaon',
    includes: ['Full empty-home deep clean', 'Kitchen degreasing & sanitization', 'Bathroom descaling & disinfection', 'Cabinet & cupboard interior wipe', 'Windows, sills & glass cleaning', 'Wall spot-cleaning & cobweb removal', 'Floor & tile deep scrub', 'Landlord checklist sign-off'],
    process: [
      { step: 1, title: 'Assess', desc: 'We confirm the scope and your handover date.' },
      { step: 2, title: 'Deep Clean', desc: 'Every room is cleaned top-to-bottom to a checklist.' },
      { step: 3, title: 'Handover', desc: 'The space is ready for keys — or ready to live in.' },
    ],
    faqs: [
      { q: 'How far in advance should I book?', a: '24–48 hours is ideal. We often have same-day slots available — WhatsApp to check.' },
      { q: 'Is move-out cleaning the same as deep cleaning?', a: 'Move-out cleaning is a specific type of deep clean focused on restoring the flat to handover condition — every surface, every room, every fixture. It is typically more thorough than a standard deep clean because the flat is empty.' },
      { q: 'Do you clean empty flats only?', a: 'Move-in and move-out cleaning is designed for empty or near-empty flats. We can work around furniture but an empty flat gives the team full access for the most thorough result.' },
      { q: 'How much does move-out cleaning cost in Gurgaon?', a: 'Move-in and move-out cleaning in Gurgaon costs ₹3,000–₹8,000 depending on flat size. A 2 BHK empty flat typically costs ₹4,000–₹5,500. WhatsApp for a fixed quote based on your flat size.' },
      { q: 'Will move-out cleaning help me get my security deposit back?', a: 'A professional move-out clean significantly improves your chances of a full deposit return. Landlords and property managers primarily inspect the kitchen, bathrooms, floors and walls — all of which are thoroughly cleaned in our move-out service.' },
      { q: 'What does move-in cleaning include?', a: 'Move-in cleaning covers the full flat: kitchen (chimney, cabinets, hob, sink, tiles), all bathrooms (tile descaling, commode sanitization), all rooms (floor to ceiling dusting, mopping), balconies, windows and all fixtures. We leave the flat genuinely clean before your belongings arrive.' },
      { q: 'Can you clean a flat that has been vacant for a long time?', a: 'Yes — long-vacant flats with accumulated dust, pest evidence or water damage are assessed first. We advise on scope and provide a full quote. This may require more time and specialized treatment for certain areas.' },
      { q: 'Do you offer same-day move-in cleaning in Gurgaon?', a: 'Yes — same-day slots are available subject to team availability. For move-in cleaning where timing is tight, WhatsApp +91 9267905943 first thing in the morning for the best chance of a same-day slot.' },
    ],
    reviews: [
      ['RV', 'Rohan Vashist', 'Rented out 2 BHK, Sector 70', 'Got my full security deposit back thanks to their checklist-driven clean. Landlord even complimented the handover.'],
      ['PD', 'Pallavi Dua', 'Moved into 3 BHK, Golf Course Rd', 'Moved into a home that smelled of previous owners. Their move-in clean made it feel brand new.'],
      ['AS', 'Arvind Singh', 'Sector 82', 'Booked on the day of handover — they finished before the landlord arrived. Efficient and thorough.'],
    ],
    price: { label: 'Starting from', amount: '₹1,999' },
  },
  fullhome: {
    name: 'Full Home Deep Cleaning',
    tagline: 'Every room, floor to ceiling.',
    intro:
      'A complete deep cleaning of your entire home — bedrooms, living areas, kitchen and bathrooms.',
    detail:
      'A full home deep cleaning is the flagship service — every room, every corner, cleaned in one coordinated visit. Our team of 3–5 professional cleaners works through bedrooms, living areas, kitchen, bathrooms, balconies and hallways, so the whole home is restored at once.\n\nWe price by home size and setup. Non-furnished homes (1 RK from ₹2,000, 1 BHK from ₹2,500, 2 BHK from ₹4,500) are the fastest to clean. Furnished homes cost a little more because every piece of furniture, upholstery and wardrobe needs careful detailing. The team brings all machines, eco-friendly products and equipment — you do not lift a finger. On the confirmation call we lock the exact price for your BHK, so there are no surprises on the day.',
    image: '/images/full-home-deep-cleaning.jpg',
    imageAlt: 'Full home deep cleaning in Gurgaon — every room cleaned floor to ceiling by Sachin Deep Cleaning team',
    includes: ['All bedrooms & living areas', 'Kitchen deep cleaning', 'All bathrooms sanitized', 'Balconies & hallways', 'Furniture & fixture care', 'Window & glass cleaning', 'Sanitization of touch points', 'Eco-friendly products & equipment'],
    process: [
      { step: 1, title: 'Quote', desc: 'Share your BHK size and setup — we confirm the exact price.' },
      { step: 2, title: 'Schedule', desc: 'Pick a slot that suits you, same-day often available.' },
      { step: 3, title: 'Clean', desc: 'The whole home is detailed top-to-bottom by the full team.' },
      { step: 4, title: 'Relax', desc: 'Walk through, approve, and enjoy a fresh home.' },
    ],
    faqs: [
      { q: 'How much does full home deep cleaning cost in Gurgaon?', a: 'From ₹2,000 for a 1 RK (non-furnished). 1 BHK starts at ₹2,500, 2 BHK at ₹4,500, 3 BHK at ₹5,500, 4 BHK at ₹6,500 and 5 BHK at ₹9,000. Furnished homes cost slightly more.' },
      { q: 'How long for a 2 BHK?', a: 'Usually 7–8 hours with a 4-person team. Bigger homes need more time and cleaners.' },
      { q: 'Do you move furniture?', a: 'Light furniture is shifted to clean under and behind it; heavy items on request.' },
      { q: 'What is the difference between furnished and non-furnished pricing?', a: 'Furnished homes include careful cleaning of every sofa, wardrobe, shelf and fixture, which takes more time — hence a slightly higher price than a non-furnished home of the same size.' },
      { q: 'Do I need to be home during the cleaning?', a: 'Not for the whole visit — many customers leave access instructions. We do a final walkthrough together when you return.' },
    ],
    reviews: [
      ['PM', 'Priya Mehta', 'DLF Phase 3', 'Called them at 9 AM for same-day service. They arrived by 1 PM sharp and the house looked brand new. Kitchen deep clean was absolutely incredible.'],
      ['RG', 'Rohit Gupta', 'Sohna Road', 'Best value for money I have found in Gurgaon. Transparent pricing, no hidden charges, and the whole 2 BHK was done in one visit.'],
      ['VS', 'Vikram Sharma', 'MG Road', "We have tried 3 other cleaning services before. None come close. Bathroom tiles look like they did when we first moved in. Just brilliant."],
    ],
    priceByBhk: { 1: '₹2,500', 2: '₹4,500', 3: '₹5,500', 4: '₹6,500', 5: '₹9,000' },
    sqftByBhk: { 1: '400–600 sq ft', 2: '601–1,000 sq ft', 3: '1,001–1,500 sq ft', 4: '1,501–2,100 sq ft', 5: '2,500–3,000 sq ft' },
  },
};

export function getService(serviceKey, bhk) {
  const s = base[serviceKey] || base.deep;
  const out = { ...s };
  if (serviceKey === 'fullhome' && bhk) {
    out.name = `${bhk} BHK Full Home Deep Cleaning`;
    out.price = { label: 'Starting from', amount: s.priceByBhk?.[bhk] || '₹2,500' };
    out.intro = `Complete deep cleaning of your ${bhk} BHK home — bedrooms, living areas, kitchen and bathrooms, done top to bottom.`;
    out.detail = `${bhk} BHK ${bhk >= 4 ? 'homes' : 'apartments'} across Gurgaon get the full deep-cleaning treatment from our team: every bedroom, the living area, kitchen, bathrooms, balconies and hallways. We price by size, so a ${bhk} BHK is a fixed, confirmed price with no surprises.\n\nOur ${bhk} BHK deep clean package covers floors and tiles, walls and ceilings, kitchen degreasing, bathroom descaling, furniture and wardrobe detailing, windows, and sanitization of high-touch surfaces. The team brings all equipment and eco-friendly products. Whether your home is furnished or non-furnished, we tailor the effort to the surfaces inside — and you pay only after you walk through and approve the result.`;
    out.image = bhk === 1 ? '/images/full-home-deep-cleaning.jpg' : bhk === 2 ? '/images/full-home-2bhk-deep-cleaning.jpg' : '/images/full-home-3bhk-deep-cleaning.jpg';
    out.imageAlt = `${bhk} BHK full home deep cleaning in Gurgaon`;
  }
  return out;
}
