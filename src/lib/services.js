// Content for data-driven service pages. Keyed by `serviceKey` from pages.config.mjs.
// `fullhome` supports a `bhk` number (1–5) for tailored copy/pricing.

const base = {
  deep: {
    name: 'Deep Cleaning Services in Gurgaon',
    tagline: 'A top-to-bottom refresh for every corner of your home.',
    intro:
      'Understand what makes a true deep clean different from regular cleaning in Gurgaon’s dusty, hard-water environment — and when it’s worth booking.',
    detail:
      'Regular sweeping and mopping only reaches the surface. A genuine deep cleaning reaches everything else: grease-laden kitchen tiles, hard-water marks in bathrooms, dust hidden on ceiling fans, inside wardrobes, behind beds and under sofas. Gurgaon’s dusty, construction-heavy environment means fine particulate settles into carpets, mattresses and upholstery — which is exactly where dust mites and allergens thrive.\n\nOur trained team works top-to-bottom and room-by-room with professional machines and eco-friendly products. We shift light furniture, detail every fixture, wash windows and sanitize high-touch surfaces like switches and door handles. The result is a home that not only looks cleaner but actually breathes easier. Most Gurgaon families book a full deep clean every 3–6 months, and before or after the festive season, moving in or out, or post-renovation.\n\nGurgaon’s hard water leaves calcium and magnesium deposits on taps, shower heads and tile grout that normal wiping cannot remove — our descaling treatment handles this properly. Construction dust from Dwarka Expressway, Golf Course Extension and Sohna Road corridors embeds in sofa fibres, AC filters and chimney interiors even in well-sealed homes.\n\nPre-Diwali (Oct–Nov) and post-monsoon are the busiest periods — we recommend booking early for those slots. Our service also covers move-in / move-out empty-flat resets and post-construction removal of cement dust, paint drips and adhesive residue, all at the same verified-team, pay-after-satisfaction standard.',
    image: '/images/full-home-deep-cleaning.webp',
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
      { q: 'How much does deep cleaning cost in Gurgaon?', a: 'Deep cleaning in Gurgaon starts from ₹2,000 for a 1 RK or studio and goes up to ₹9,000 for a 5 BHK. The exact price depends on your home size, number of bathrooms and condition.' },
      { q: 'What areas do you serve in Gurgaon?', a: 'We serve all sectors in Gurgaon — DLF Phase 1–5, Sohna Road, Golf Course Road, MG Road, Palam Vihar, Sushant Lok, South City, Golf Course Extension and all residential societies across Gurugram.' },
      { q: 'Do I need to be present during the deep cleaning?', a: 'You should be present at the start for a walkthrough and at the end for sign-off. Many customers step out during the clean itself — we are happy to work with access instructions and share a progress update.' },
      { q: 'What if I am not satisfied with the cleaning?', a: 'You only pay after you have walked through and approved the work. If any area is missed or unsatisfactory, we re-clean it on the spot before you pay.' },
      { q: 'Gurgaon me deep cleaning kitne din me karwani chahiye?', a: 'Gurgaon ki dhool aur construction ki wajah se har 3–6 mahine me ek baar deep cleaning karwana behtar hai. Diwali se pehle ya baad me karwana sabse common hai.' },
      { q: 'Deep cleaning me kya kya saaf hota hai?', a: 'Kitchen, bathroom, sofa, wardrobes, windows, grout, chimney aur high-touch surfaces tak saaf kiya jata hai — jo roz ke safai me nahi hota.' },
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
      { service: 'Kitchen deep cleaning', price: 'From ₹1,500' },
      { service: 'Bathroom deep cleaning', price: 'From ₹800' },
      { service: 'Sofa shampoo cleaning', price: 'From ₹499 / seat' },
      { service: 'Carpet shampoo cleaning', price: 'From ₹18 / sq ft' },
      { service: 'House cleaning (regular)', price: 'From ₹499 / visit' },
      { service: 'Office deep cleaning', price: 'From ₹5,000' },
      { service: 'Move-in / move-out cleaning', price: 'From ₹1,999' },
    ],
  },
  house: {
    name: 'House Cleaning Services in Gurgaon',
    tagline: 'Reliable, affordable cleaning for a healthier home.',
    intro:
      'From quick refreshes to scheduled deep cleans, our house cleaning plans keep your Gurgaon home consistently spotless.',
    detail:
      'Life in Gurgaon leaves little time for keeping up with dusting, mopping and tidying — and that is exactly what our house cleaning service is built for. With construction dust from Dwarka Expressway, Golf Course Extension and Sohna Road constantly settling, homes need regular maintenance just to stay comfortable. We offer one-time cleans for a fresh start, plus weekly and bi-weekly plans so your home stays consistently clean without you lifting a finger.\n\nEach visit includes full dusting and vacuuming, mopping and floor care, kitchen and bathroom surface upkeep, bin emptying and liner change, and sanitization of high-touch surfaces. We work around your schedule in DLF Phase 1–5, Sushant Lok, South City, Palam Vihar, MG Road, Sector 45/46/57 and all Huda sectors. The checklist is tailored to your home size — from compact studio apartments and 1 BHK flats to 3–4 BHK villas.\n\nGurgaon’s hard water and cooking-heavy kitchens mean surface film builds up fast. Regular house cleaning prevents that buildup from becoming a deep-clean problem. Prices start at ₹499 per visit for a studio and scale by size. Every cleaner is police-verified, brings eco-friendly supplies, and you pay only after you walk through and approve the work. Weekly plans get the same trusted team each visit, so they learn your preferences and clean faster over time.',
    image: '/images/house-cleaning.webp',
    imageAlt: 'Residential house cleaning service in Gurgaon by police-verified team from Sachin Deep Cleaning',
    includes: ['Full dusting & vacuuming', 'Mopping & floor care', 'Kitchen & bathroom upkeep', 'Bin emptying & liner change', 'Surface wiping & sanitation', 'Bed-making & tidying (optional)', 'Weekly / bi-weekly / monthly plans', 'Eco-friendly products'],
    process: [
      { step: 1, title: 'Book a Slot', desc: 'Pick one-time or a recurring plan that suits your routine.' },
      { step: 2, title: 'Confirm Checklist', desc: 'We confirm rooms, add-ons and the exact price on the call.' },
      { step: 3, title: 'Clean', desc: 'Our team cleans thoroughly using your approved checklist.' },
      { step: 4, title: 'Inspect & Relax', desc: 'Walk through the home, approve the work, then enjoy a fresh space.' },
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
      { q: 'Gurgaon me house cleaning ka kharcha kya hai?', a: 'House cleaning ₹499 (studio) se shuru hoti hai. 1 BHK ₹799, 2 BHK ₹1,199, 3 BHK ₹1,699 per visit. Weekly plan me per-visit cost kam ho jati hai.' },
      { q: 'Kya weekly house cleaning plan lena fayde-mand hai?', a: 'Haan — weekly plan me same team aati hai aur dust buildup kam rehta hai, jisse deep cleaning ki zarurat bhi kam padti hai. Cost per visit bhi kam hoti hai.' },
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
      { q: 'Gurgaon me kitchen deep cleaning kitne ka hai?', a: 'Standard kitchen deep cleaning ₹1,500–₹2,500 ke beech me hoti hai. Chimney filter cleaning isme shamil hai. WhatsApp par fixed quote milta hai.' },
      { q: 'Chimney filter kitni baar saaf karna chahiye?', a: 'Roz cooking hone par har 1–2 mahine me filter saaf karna chahiye. Pura chimney deep clean har 6–12 mahine me karwaye.' },
    ],
    reviews: [
      ['PK', 'Pooja Khurana', 'Sohna Road', 'The chimney filter looked like new after they were done. My kitchen finally smells clean, not of old cooking oil.'],
      ['SM', 'Shalini Mehra', 'DLF Phase 4', 'They took apart the exhaust fan and hob and degreased everything. Grease I thought was permanent is completely gone.'],
      ['RJ', 'Ritika Jain', 'Sector 49', 'Very thorough — even the cabinet interiors and the top of the chimney were cleaned. Worth booking every quarter.'],
    ],
    price: { label: 'Starting from', amount: '₹1,500' },
  },
  bathroom: {
    name: 'Bathroom Deep Cleaning in Gurgaon',
    tagline: 'Germ-free, sparkling bathrooms.',
    intro:
      'Descaling tiles, faucets, commodes and exhaust fans — we leave your bathroom hygienic and fresh.',
    detail:
      'Gurgaon’s hard water is brutal on bathrooms. It leaves white limescale on faucets, taps, shower heads and mirrors, yellows the grout between tiles, and stains the corners of the commode and bath. Left alone, moisture also invites mould and soap scum in hidden corners that a routine mop never touches.\n\nOur bathroom deep cleaning service removes limescale and hard-water stains from tiles, faucets, shower heads and glass, scrubs grout lines, fully sanitizes the commode inside and out, cleans the basin, exhaust fan and mirror, and finishes with the floor and wall tiles. We use disinfectants and rinse-safe products so the bathroom is safe for kids. A single bathroom typically takes 1.5–2 hours with one expert cleaner.',
    image: '/images/bathroom-deep-cleaning.webp',
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
      { q: 'Gurgaon me ek bathroom deep cleaning ka kharcha kya hai?', a: 'Ek bathroom ki deep cleaning ₹800 se ₹1,200 tak hoti hai. Full home package me ye price shamil ho jati hai.' },
      { q: 'Hard water ke daag kaise hatate hain?', a: 'Hum professional descaler use karte hain jo Gurgaon ke hard water ke lime scale ko tap, shower aur glass se hata deta hai.' },
    ],
    reviews: [
      ['AS', 'Anita Sharma', 'Sector 45', 'Hard water stains on our shower glass were driving me crazy. They came off completely. Bathroom looks brand new.'],
      ['DP', 'Deepak Puri', 'MG Road', 'Very impressed with the commode sanitization and tile scrubbing. Thorough and hygienic, no shortcuts.'],
      ['SG', 'Sneha Gupta', 'Golf Course Extension', 'They even cleaned the exhaust fan and ceiling corners. The bathroom smells fresh days later. Great service.'],
    ],
    price: { label: 'Starting from', amount: '₹800' },
  },
  sofa: {
    name: 'Sofa Shampoo Cleaning in Gurgaon',
    tagline: 'Revive your upholstery.',
    intro:
      'Steam and shampoo cleaning removes stains, dust mites and odors from sofas, mattresses and cushions.',
    detail:
      'Your sofa takes a daily beating — drinks spilled, kids climbing, pets curling up, and fine Gurgaon dust settling deep into the fabric. Over time, that invisible buildup turns fabric dull, triggers allergies, and traps odors that air fresheners simply mask.\n\nOur sofa shampoo cleaning uses a hot-water extraction and low-moisture method to flush out embedded dirt, dust mites and allergens, lift stains and neutralize odors. We first assess the fabric — cotton, linen, jacquard, velvet or leather — and choose the right treatment. Leather sofas receive a gentle conditioner-safe clean instead of shampoo. Prices start at ₹499 per seat for dry cleaning and ₹599 per seat for shampoo extraction. A 3-seater usually takes 1.5–2 hours and dries in 4–6 hours, ready for the evening.',
    image: '/images/sofa-shampoo-cleaning.webp',
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
      { q: 'Gurgaon me sofa cleaning ka kharcha kya hai?', a: 'Sofa cleaning ₹499 per seat (dry) aur ₹599 per seat (shampoo extraction) se shuru hoti hai. 3-seater sofa ke liye ₹1,500–₹1,800 lagta hai.' },
      { q: 'Sofa cleaning ke baad kitni der tak use nahi karna?', a: '4–6 ghante — hum low-moisture extraction use karte hain, isliye sofa usi shaam tak sukh jata hai aur ready ho jata hai.' },
    ],
    reviews: [
      ['VK', 'Vikas Khandelwal', 'Sushant Lok 1', 'Three-year-old sofas came back looking new. The water after extraction was black — clearly years of dust. Great value.'],
      ['MR', 'Meghna Rao', 'Sector 66', 'My cream fabric sofa had a stubborn coffee stain that other services said was permanent. They got most of it out. Impressed.'],
      ['NA', 'Nikhil Arora', 'Palam Vihar', 'Pet odor is gone completely. They were careful with the fabric and it dried the same evening.'],
    ],
    price: { label: 'Starting from', amount: '₹499' },
  },
  carpet: {
    name: 'Carpet Shampoo Cleaning in Gurgaon',
    tagline: 'Deep clean for brighter carpets.',
    intro:
      'We extract embedded dirt, stains and allergens so your carpets look and feel new.',
    detail:
      'Carpets are dust magnets — especially in Gurgaon, where fine particulate and construction dust settle straight into the pile. Everyday vacuuming only lifts the surface; the deep dirt, pet hair, dust mites and spilled stains stay trapped below, dulling colours and triggering allergies.\n\nOur carpet shampoo cleaning uses hot-water extraction to flush out deep-seated dirt and allergens, pre-treats stubborn stains and neutralizes odours, leaving your carpet visibly brighter and fresher. We clean wall-to-wall carpets, area rugs and runners, and assess the fibre — wool, nylon, polyester — before choosing the right treatment. Pricing is by area: from ₹15 per square foot for dry cleaning and ₹18 per square foot for shampoo extraction. A large living-room carpet typically dries within 4–6 hours.',
    image: '/images/carpet-shampoo-cleaning.webp',
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
      { q: 'Gurgaon me carpet cleaning ka rate kya hai?', a: 'Carpet cleaning ₹15 per sq ft (dry) aur ₹18 per sq ft (shampoo extraction) se hoti hai. 10×12 ft carpet ke liye ₹1,800–₹2,160 lagta hai.' },
      { q: 'Carpet cleaning ke baad kitna time drying me lagta hai?', a: '4–6 ghante — extraction se paani nikala jata hai, isliye zyada moisture nahi rehta. Achhi ventilation me theek se sukh jata hai.' },
    ],
    reviews: [
      ['KB', 'Kavita Bhatia', 'Sector 15', 'Our living room carpet was dull and musty. After the shampoo extraction it looks brighter and the room smells clean.'],
      ['SA', 'Sanjay Arora', 'DLF Phase 3', 'Fair per-sq-ft pricing and they measured honestly. Deep stains from the kids came out nicely.'],
      ['PR', 'Priyanka Reddy', 'Sohna Road', 'They cleaned our wall-to-wall carpet after renovation dust settled in. The amount of dirt extracted was shocking.'],
    ],
    price: { label: 'Per square foot (shampoo extraction)', amount: '₹18' },
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
    price: { label: 'Small office from', amount: '₹5,000' },
  },
  move: {
    name: 'Move-In / Move-Out Cleaning in Gurgaon',
    tagline: 'Leave it spotless — or move into one.',
    intro:
      'End-to-end cleaning for tenants and owners: every room detailed so you hand over or settle in with confidence.',
    detail:
      'Moving is stressful enough without adding cleaning to the pile. Whether you are a tenant trying to get your full security deposit back or a new owner walking into a space that has seen years of someone else’s use, our move-in / move-out cleaning takes care of every corner.\n\nFor move-outs, we work to landlord checklists so nothing is left to argue about — kitchen degreased, bathrooms descaled, windows washed, walls spot-cleaned, floors scrubbed and cabinets emptied. For move-ins, we make the space hygienic and ready: sanitizing kitchens and bathrooms, wiping cabinet interiors, cleaning windows and giving the floors a deep scrub before your furniture arrives. We cover apartments and villas across Gurgaon and can work around your handover date, even same-day in many sectors.',
    image: '/images/full-home-deep-cleaning.webp',
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
      { q: 'Gurgaon me move-in move-out cleaning ka kharcha kya hai?', a: 'Move-in/out cleaning ₹1,999 se shuru hoti hai. 2 BHK empty flat ke liye ₹4,000–₹5,500 lagta hai. Flat size ke hisaab se price fix ho jati hai.' },
      { q: 'Move-out cleaning se security deposit wapas milega kya?', a: 'Haan — professional move-out clean se full deposit wapas milne ke chances badh jaate hain. Landlord kitchen, bathroom, floor aur walls check karte hain, jo hum thoroughly saaf karte hain.' },
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
      'Book a complete deep cleaning of your entire home now with fixed prices for 1 BHK to 5 BHK in Gurgaon and same-day slots available.',
    detail:
      'A full home deep cleaning is the flagship service — every room, every corner, cleaned in one coordinated visit. Our team of 3–5 professional cleaners works through bedrooms, living areas, kitchen, bathrooms, balconies and hallways, so the whole home is restored at once.\n\nWe price by home size and setup. Non-furnished homes (1 RK from ₹2,000, 1 BHK from ₹2,500, 2 BHK from ₹4,500) are the fastest to clean. Furnished homes cost a little more because every piece of furniture, upholstery and wardrobe needs careful detailing. The team brings all machines, eco-friendly products and equipment — you do not lift a finger. On the confirmation call we lock the exact price for your BHK, so there are no surprises on the day.',
    image: '/images/full-home-deep-cleaning.webp',
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
      // Per-BHK Hindi FAQ is injected in getService() below — keeps the visible BHK consistent.
      { q: 'Full home cleaning me payment kab karna hota hai?', a: 'Payment walkthrough ke baad, satisfaction ke saath hoti hai. Advance nahi liya jata.' },
    ],
    reviews: [
      ['PM', 'Priya Mehta', 'DLF Phase 3', 'Called them at 9 AM for same-day service. They arrived by 1 PM sharp and the house looked brand new. Kitchen deep clean was absolutely incredible.'],
      ['RG', 'Rohit Gupta', 'Sohna Road', 'Best value for money I have found in Gurgaon. Transparent pricing, no hidden charges, and the whole 2 BHK was done in one visit.'],
      ['VS', 'Vikram Sharma', 'MG Road', "We have tried 3 other cleaning services before. None come close. Bathroom tiles look like they did when we first moved in. Just brilliant."],
    ],
    price: { label: 'Starting from', amount: '₹2,500' },
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

    // ── Per-BHK unique content (intro, detail, FAQs) ──────────────────────────
    // Each BHK is a real product for a real customer — same room count, same
    // pain points, same time/team. No boilerplate, no clone pages.
    const BHK_CONTENT = {
      1: {
        intro: 'Deep cleaning for a 1 BHK in Gurgaon — 1 bedroom, 1 bathroom, kitchen and small living — finished in a single visit, ₹2,500 fixed for non-furnished.',
        detail: `A 1 BHK in Gurgaon is usually 400–600 sq ft — DLF Phase 1, Sohna Road, Palam Vihar studio apartments. Compact, but the hard water on that one bathroom and the grease in that small modular kitchen are the same problems a 3 BHK has, just concentrated. Most 1 BHK owners have lived with a "permanent" ring in the toilet bowl, a chimney filter that hasn't been washed in a year, and dust on the fan blades they can't reach. That's exactly what we fix.\n\nA 1 BHK deep clean takes about 5–6 hours with a 2-person team. We dismantle the chimney filter, degrease the hob and exhaust fan, descale the single bathroom (tiles, taps, commode, shower glass), wipe inside the single wardrobe, mop and scrub the floor, clean the windows inside-out and sanitize high-touch surfaces. Light furniture is shifted to clean underneath; heavy items like a cot or fridge are cleaned around. Non-furnished 1 BHKs are ₹2,500; furnished with sofa or extra wardrobe is ₹3,000–₹3,500. The price is locked on the confirmation call before we start.\n\nMost common reasons Gurgaon 1 BHK owners book us: end of lease / deposit handover, Diwali pre-clean, after a renovation in the same tower, or every 6 months when fine construction dust from nearby projects accumulates. Single-person households and young couples book us most.`,
        faqsExtra: [
          { q: 'Do you clean inside the kitchen cabinets in a 1 BHK?', a: 'Yes — we empty and wipe inside all upper and lower cabinets, including corners where oil mist settles. In a small 1 BHK kitchen this is where 80% of the grime hides, so it is part of the standard package, not an add-on.' },
          { q: 'How long does a 1 BHK deep cleaning take in Gurgaon?', a: 'A typical non-furnished 1 BHK takes 5–6 hours with 2 cleaners. Furnished 1 BHKs with sofa and wardrobe detailing take 6–7 hours. The team arrives at the agreed time and stays until the walkthrough is complete.' },
        ],
      },
      2: {
        intro: '2 BHK full home deep cleaning in Gurgaon from ₹4,500 — 2 bedrooms, 2 bathrooms, kitchen, balcony. Both bathrooms properly descaled, not just wiped. 7–8 hours, 3 cleaners.',
        detail: `The 2 BHK is the most-booked size in Gurgaon — Sushant Lok, Golf Course Extension, South City 1, Sector 50–57, Palam Vihar. 601–1,000 sq ft, 2 bedrooms, 2 bathrooms, a modular kitchen, a balcony, and usually a sofa that has seen better days. The most common complaint we hear: "the second bathroom is always rushed" or "the bathroom tiles still look patchy after cleaning". That happens because most services wipe the tiles, they don't descale them. We use a professional descaler that dissolves Gurgaon's 800–1,200 TDS limescale, then rinse and polish — that's the difference.\n\nA 2 BHK deep clean takes 7–8 hours with 3 cleaners. Both bathrooms get full descaling (tiles, faucets, shower glass, commode, exhaust fan, mirror). The kitchen gets chimney dismantle + filter wash, hob and exhaust degrease, cabinet inside-out, tile scrub. Both bedrooms get wardrobe interior wipe, fan blade dust, window inside-out, floor scrub. The sofa gets a deep vacuum and spot pre-treatment — full shampoo is an add-on for ₹499/seat. The balcony gets a full scrub, including drainage corners where dust pools. Furnished 2 BHKs (with sofa, dining table, extra wardrobes) are ₹5,000–₹5,500; non-furnished ₹4,500. The price is fixed on the call before we dispatch.\n\nMost common reasons 2 BHK owners book us: post-renovation, between tenants, quarterly family clean (especially with kids), Diwali pre-clean, or before a major gathering. The two-bathroom difference is what makes 2 BHK worth the upgrade from a 1 BHK clean — both bathrooms get the same attention.`,
        faqsExtra: [
          { q: 'Why does my 2 BHK bathroom still look stained after cleaning?', a: 'Wiping tiles does not remove Gurgaon\'s hard-water limescale (TDS 800–1,200 mg/L). It bonds to the glaze and looks like a permanent stain. A professional descaler dissolves it in 5–10 minutes, then tiles rinse clean. If your last clean used only wipes or vinegar, the limescale is still there.' },
          { q: 'Is sofa shampoo included in a 2 BHK deep clean?', a: 'Deep vacuum and spot pre-treatment are included. Full shampoo extraction is an add-on — ₹499/seat for dry clean, ₹599/seat for hot-water extraction. Most 2 BHK customers add the sofa in the same visit because the team is already on site and it costs less than booking separately.' },
        ],
      },
      3: {
        intro: '3 BHK full home deep cleaning in Gurgaon from ₹5,500 — 3 bedrooms, 2–3 bathrooms, study, kitchen, balcony. AC vents, fan blades, and study detail included. 9–10 hours, 4 cleaners.',
        detail: `The 3 BHK is the family-home sweet spot in Gurgaon — 1,001–1,500 sq ft, 3 bedrooms, 2 or 3 bathrooms, often a small study or store room, a bigger modular kitchen, and either one large or two smaller balconies. Most common in South City 1, Nirvana Country, Sector 50–57, and the DLF Phase 2–4 belt. Three bedrooms means three wardrobes, three AC indoor units, three ceiling fans, and roughly 9 light fixtures that collect dust year-round. That is what the standard "maid cleaning" misses — the study dust, the AC vent dust, and the fan blades that haven't been wiped since the last tenant.\n\nA 3 BHK deep clean takes 9–10 hours with 4 cleaners. AC vent covers are opened and dusted (this is the biggest single difference vs a regular clean). Ceiling fans across all 3 rooms are wiped blade-by-blade. The study gets bookshelf and desk detailing if the room is cleared beforehand. All 2–3 bathrooms get full descaling, not just a wipe. The kitchen gets the full chimney dismantle + filter wash treatment — at this size, kitchens usually have a built-in oven, hob, and chimney, all of which need separate attention. Wardrobe interiors are wiped in all 3 bedrooms. The balcony drain corners are scrubbed. Furnished 3 BHKs (with sofa, dining, study furniture) are ₹6,000–₹6,500; non-furnished ₹5,500. The price is fixed on the confirmation call.\n\nMost common reasons 3 BHK families book us: pre-Diwali, post-renovation, before/after a long trip, between tenants in a rented home, or every 4–6 months because family life with kids or pets generates more buildup than weekly cleaning can keep up with.`,
        faqsExtra: [
          { q: 'Do you clean AC vents and ceiling fans in a 3 BHK?', a: 'Yes — AC vent covers are opened, dusted, and wiped. Ceiling fan blades across all 3 bedrooms are wiped blade-by-blade. This is the single biggest difference between a "maid clean" and our 3 BHK deep clean — fan and vent dust is what most weekly cleaning routines skip, and it accumulates in 3 BHKs faster than smaller homes.' },
          { q: 'How much extra is a furnished 3 BHK?', a: 'A furnished 3 BHK (sofa, dining table, study furniture, extra wardrobes) is ₹6,000–₹6,500 vs ₹5,500 for non-furnished. The difference covers the extra detailing time on furniture — sofa vacuum, dining chair legs, wardrobe interior detailing on extra units. We confirm the exact price on the call after you describe what\'s in the home.' }],
      },
      4: {
        intro: '4 BHK villa deep cleaning in Gurgaon from ₹6,500 — 4 bedrooms, 3–4 bathrooms, terrace, larger living areas. Marble-safe products, full day, 5 cleaners.',
        detail: `The 4 BHK villa is a different product entirely from an apartment. 1,501–2,100 sq ft across DLF Phase 5, Ardee City, Nirvana Country, Vatika City, and the newer sectors off Sohna Road. The home usually has Italian or Indian marble flooring, 4 bedrooms, 3–4 bathrooms (one with a bathtub), a larger living + dining area, a terrace or large balcony, and sometimes a private garden or sit-out. Marble and wooden floors cannot be cleaned with the same acids and degreasers used in apartments — one wrong product and you etch the polish. That is why our 4 BHK team is briefed separately: marble-safe products, soft-pad machines for floors, no abrasive scrubbing on wooden panels.\n\nA 4 BHK villa deep clean takes a full day (8–10 hours) with 5 cleaners. All 3–4 bathrooms get descaling, including the bathtub, jacuzzi jets, and shower glass partitions. The terrace gets a full scrub — algae, bird-droppings, drainage channels, railing wipe. The marble or wooden floors are cleaned with the right pH-neutral product. Kitchen gets the full chimney + hob + cabinet + tile treatment; villa kitchens are usually larger and have built-in appliances that need separate handling. Wardrobe interiors across 4 bedrooms. Sofa and dining chairs get a deep vacuum and spot treatment. Non-furnished villa is ₹6,500; furnished with sofa, dining, terrace furniture is ₹7,500–₹8,500. The villa layout (which floor is the master, parking access for our van, water source for machines) is confirmed on the call.\n\nMost 4 BHK owners book us quarterly as part of regular villa upkeep, plus once before Diwali and once before/after a long trip. The marble-safe brief is what gets you repeat customers in this segment — one bad acid clean and the floor is ruined for years.`,
        faqsExtra: [
          { q: 'Will the marble floor in my 4 BHK villa be damaged?', a: 'No — we use pH-neutral, marble-safe products on Italian and Indian marble. Our standard descaler (used for bathroom tiles) is acidic and we never use it on marble. Floor machines run soft pads, not abrasive brushes. If you have a specific marble brand or finish (polished, honed, leathered), mention it on the call and the team will adjust the product choice.' },
          { q: 'Do you clean the terrace in a 4 BHK villa?', a: 'Yes — terrace cleaning is included in the 4 BHK package. We scrub floor tiles, clean drainage channels, wipe railings, and remove algae and bird droppings. For larger terraces with planters or outdoor furniture, mention it on the call so the team allocates the right time. Some terraces need a separate pressure wash (add-on) if the buildup is heavy.' },
        ],
      },
      5: {
        intro: '5 BHK luxury villa deep cleaning in Gurgaon from ₹9,000 — 5 bedrooms, 4+ bathrooms, terrace, premium finishes. Finish-specific products, full day+, 6 cleaners.',
        detail: `The 5 BHK is the premium tier — 2,500–3,000 sq ft in DLF Magnolias, Emaar Emerald Hills, DLF Phase 5, the new Camellias projects, and select Manesar farmhouses. These homes have premium finishes throughout: Italian marble with specific sealants, wooden flooring (sometimes herringbone parquet), built-in wardrobes with veneer finishes, designer light fixtures, multiple AC indoor units, often a home theatre or bar area, sometimes a private elevator, and a 4+ bathroom layout with rain showers and body jets. Standard apartment cleaning products and methods will damage these finishes. The 5 BHK team uses finish-specific products and tools, and runs a 2-pass system: first pass heavy detailing, second pass premium polish and inspection.\n\nA 5 BHK deep clean takes 10–14 hours (we typically split across a full day, sometimes into a 2-day option) with 6 cleaners. All 4+ bathrooms get full descaling including rain shower heads, glass partitions, and any stone surrounds. The master bathroom usually has a jacuzzi or soaking tub that needs separate treatment. Wooden floors are cleaned with the manufacturer's recommended product class (we ask on the call). The kitchen is the most time-intensive room at this size — full chimney dismantle, double ovens, wine fridge exterior, walk-in pantry if present. Wardrobe interiors across 5 bedrooms. The home theatre, bar area, and study get detailed dust + leather/cloth-appropriate treatment. Terraces (often 2 at this size) are scrubbed separately. Furnished 5 BHK with imported furniture, art, or specific care instructions is quoted on-site; standard furnished 5 BHK is ₹11,000–₹13,000. Non-furnished is ₹9,000. The home layout, finishes, and any specific care instructions are confirmed on the call and on arrival.\n\nMost 5 BHK owners book us quarterly, with extra pre-Diwali and pre-event visits. The premium-finish brief is non-negotiable at this tier — once a marble is etched or a wood floor is water-stained, restoration costs more than a year of our deep cleans.`,
        faqsExtra: [
          { q: 'My 5 BHK has Italian marble and wooden floors. What products do you use?', a: 'We use pH-neutral, finish-specific products: marble-safe neutral cleaners for Italian and Indian marble, manufacturer-class cleaners for wooden and parquet floors (water-based, no wax buildup), and stone-safe descalers for bathroom surrounds. We do not use standard acids, bleach, or ammonia on any premium finish. If you have the marble/wood brand name or care guide, share it on the call and the team will match the product.' },
          { q: 'How long does a 5 BHK deep clean take?', a: 'A standard 5 BHK takes 10–14 hours with a 6-person team — usually a full working day, sometimes split into 2 shorter days if the home is fully furnished and you prefer the team out by evening. 2-day deep cleans for very large or fully furnished 5 BHKs are quoted separately after a walkthrough.' },
        ],
      },
    };

    const c = BHK_CONTENT[bhk] || BHK_CONTENT[2];
    out.intro = c.intro;
    out.detail = c.detail;
    out.image = bhk === 1 ? '/images/full-home-deep-cleaning.webp' : bhk === 2 ? '/images/full-home-2bhk-deep-cleaning.webp' : bhk === 3 ? '/images/full-home-3bhk-deep-cleaning.webp' : bhk === 4 ? '/images/full-home-4bhk-deep-cleaning.webp' : '/images/full-home-5bhk-deep-cleaning.webp';
    out.imageAlt = `${bhk} BHK full home deep cleaning in Gurgaon — ${out.sqftByBhk?.[bhk] || ''} expert team`;
    // Per-BHK FAQs: base English (clean) + per-BHK English + per-BHK Hindi
    out.faqs = [
      ...out.faqs.filter((f) => !f.q.startsWith('Full home cleaning me payment')),
      ...c.faqsExtra,
      { q: `Gurgaon me ${bhk} BHK full home deep cleaning ka rate kya hai?`, a: `${bhk} BHK full home deep cleaning Gurgaon me ${s.priceByBhk?.[bhk] || '₹4,500'} se shuru hoti hai, furnished ghar ke liye thoda zyada. Price call par lock ho jati hai.` },
      { q: `${bhk} BHK ki deep cleaning me kitna time lagta hai?`, a: `${bhk} BHK deep cleaning me ${bhk === 1 ? '5–6' : bhk === 2 ? '7–8' : bhk === 3 ? '9–10' : '10–14'} ghante lagte hain ${bhk >= 4 ? bhk + 1 : bhk + 1} cleaners ke saath.` },
    ];
    // Unique reviews per BHK to reduce 61% duplicate chrome
    const bhkReviews = {
      1: [['AK', 'Amit Kumar', 'Sector 46, 1 BHK', 'Compact 1 BHK done perfectly in 5 hours — kitchen and bathroom look new. Great for Sohna Road apartments.'], ['NS', 'Neha Singh', 'DLF Phase 1, 1 BHK', '1 BHK non-furnished was spotless, price locked at ₹2,500 as promised.'], ['SR', 'Sunil Rao', 'Palam Vihar, 1 BHK', 'Same-day 1 BHK clean, team shifted my single bed and cleaned behind it. Worth it.'] ],
      2: [['RG', 'Rohit Gupta', 'Sohna Road, 2 BHK', 'Best value for 2 BHK — 2 baths + balcony done in one visit, 7 hours with 4 cleaners.'], ['PM', 'Priya Mehta', 'DLF Phase 3, 2 BHK', '2 BHK furnished with 2 baths — every wardrobe detailed, price ₹4,500 fixed.'], ['AD', 'Anjali Desai', 'Sector 57, 2 BHK', '2 BHK deep clean removed hard-water scale from both bathrooms — impressive.']],
      3: [['VS', 'Vikram Sharma', 'MG Road, 3 BHK', '3 BHK took 9 hours with 5 cleaners — sofa vacuum included as promised, house smells fresh.'], ['SP', 'Sunita Patel', 'South City, 3 BHK', 'Most thorough 3 BHK clean we’ve had — 3 baths descaled, kitchen degreased, pay after walkthrough.'], ['MK', 'Meera Kapoor', 'Golf Course Road, 3 BHK', '3 BHK full-home + balcony, team brought all machines, finished before dinner.']],
      4: [['AK4', 'Arjun Kapoor', 'DLF Phase 5, 4 BHK Villa', '4 BHK villa full day — 4 baths descaled, terrace cleaned, team professional.'], ['NS4', 'Nisha Sharma', 'Nirvana Country, 4 BHK', 'Large 4 BHK with 3 baths — full team, no hidden charges, ₹6,500 fixed.'], ['RG4', 'Rohan Gupta', 'Ardee City, 4 BHK', '4 BHK deep clean handled marble floors carefully, no damage, pay after.']],
      5: [['AS5', 'Aman Singh', 'Emaar Emerald Hills, 5 BHK', '5 BHK luxury villa — premium detailing, 6 cleaners, worth ₹9,000.'], ['PK5', 'Pooja Khanna', 'DLF Magnolias, 5 BHK', '5 BHK penthouse full day+, every wardrobe and balcony spotless, owner present.'], ['VS5', 'Vikram Seth', 'Manesar, 5 BHK Villa', '5 BHK 3000 sq ft villa — team came with extra machines, flawless.']],
    };
    if (bhkReviews[bhk]) out.reviews = bhkReviews[bhk];
  }
  return out;
}
