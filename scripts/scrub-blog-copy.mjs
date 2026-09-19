// One-time content migration (Sep 2026).
//
// Removes internal SEO-planning language, competitor names/phone numbers and
// "beat the thin competitor" framing from the blog copy, and regenerates the
// formulaic "You searched X and got Y" opening paragraphs as customer-facing
// intros. scripts/content-lint.mjs enforces that none of it returns.
//
// Run once:      node scripts/scrub-blog-copy.mjs
// Safe to re-run (already-clean text stops matching).

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const FILES = ['src/lib/blog.js', 'pages.config.mjs'];

// ── Ordered regex rules (brand- and phrase-specific first) ───────────────────

const RULES = [
  // competitor brands → neutral descriptors
  [/\bAKS Facilities\b/g, 'a facilities company'],
  [/\bSmart City Care\b/g, 'a facilities company'],
  [/\bA One Deep Cleaning\b/g, 'a local listing'],
  [/\bMaidsinGurgaon\b/g, 'a maid-service site'],
  [/\bDustBusters\b/g, 'another local brand'],
  [/\bTumbledry\b/g, 'a laundry-pickup brand'],
  [/\bKleanhomz(?:.s)?\b/g, 'a company site'],
  [/\bTechSquad(?:Team)?\b/g, 'a national aggregator'],
  [/\bProsAdda\b/g, 'one Gurgaon listing'],
  [/\bBusyBucket\b/g, 'a marketplace listing'],
  [/\bZoopgo\b/g, 'a marketplace listing'],
  [/\bFavorz\b/g, 'another listing'],
  [/\bBalaji\/Favorz\b/g, 'many of those pages'],
  [/\bBalaji\b/g, 'a large local brand'],
  [/\bSPFM card\b/g, 'their card'],
  [/\bSPFM\b/g, 'a facilities company'],
  [/\bSKKS\b/g, 'another Gurgaon listing'],
  [/\bAone\b/g, 'a local listing'],
  [/\bAKS\b/g, 'a facilities company'],
  [/\bgodaddy\b/gi, 'outdated'],

  // competitor phone numbers
  [/\u20b97303133245/g, ''],
  [/\s*7303133245/g, ''],
  [/Call 9115550011 \(AYS\) or \+91 9267905943 \(us\)/, 'Call +91 9267905943'],

  // "thin competitor" framing
  [/\(Not Thin, \d[\d,+]* words\)/g, ''],
  [/\(Not Thin\)/g, ''],
  [/\(Not a Thin Template\)/g, '(Not a Generic Template)'],
  [/\(Thin, \d+ words\)/g, ''],
  [/\bthin pages\b/gi, 'generic pages'],
  [/\bthin page\b/gi, 'generic page'],
  [/\bthin content\b/gi, 'generic content'],
  [/\bthin (site|domain|profile|social|quotes?|cards?|listings?|sector pages?)\b/gi, 'generic $1'],
  [/\bNot Thin\b/g, 'Complete'],
  [/\bnot thin\b/g, 'complete'],
  [/\bThin vs\b/g, 'Generic vs'],
  [/\bIs Thin\b/g, 'Looks Generic'],
  [/\bthin\b(?!\s+(rug|rugs|cotton|mattress|layer|film|coat|coating|grout|line|lines))/gi, 'generic'],

  // internal "pillar" jargon
  [/\bbare pillar\b/gi, 'city-wide guide'],
  [/\b[Bb]are guide\b/g, 'City-wide guide'],
  [/\bThis [Pp]illar\b/g, 'This guide'],
  [/\bthis pillar\b/g, 'this guide'],
  [/\bthe pillar\b/gi, 'the guide'],
  [/\bTop 5 Pillar\b/g, 'Top 5 roundup'],
  [/\bpillar\b/gi, 'guide'],

  // ranking / SERP / GSC framing
  [/\bSERP\b/g, 'search results'],
  [/\branks? #\d+\b/g, 'appears near the top'],
  [/\branking #\d+\b/g, 'appearing near the top'],
  [/\boutranks?\b/gi, 'answers better than'],
  [/\b\d+\s*imp,?\s*\d*\s*clicks?\b/gi, ''],
  [/\b\d+\s*imp\b/gi, ''],
  [/ where your Instagram gets \d+/g, ''],
  [/your Instagram gets \d+/g, ''],
  [/ on your site\b/g, ''],
  [/\bexact-match\b/gi, 'topical'],

  // ── Pass 2: leftovers still addressed to the site owner ──
  // "If you searched X, here is…" speaks to the SEO, not the reader.
  [/If you searched\b/g, 'If you are looking for'],
  // Leads that ended by comparing the page with other listings. This strips the
  // trailing meta-sentence but keeps the price and scope information.
  [/This (?:topical|city-wide) guide for \u201c[^\u201d]*\u201d\s*(?:\([^)]*\))?\s*beats the[^']*?(?=')/g, ''],
  [/This (?:topical|city-wide) guide for[^']*?answers[^']*?(?=')/g, ''],
  // "This guide beats the generic <competitor>…" trailing sentence in leads.
  [/This (?:guide|hub)(?:\s+for\s+[^']{0,140}?)?\s*beats the generic[^']*?(?=')/g, ''],
  [/It also (?:outranks|answers better than)[^']*?(?=')/g, ''],
];

// Whitespace tidy-up that is safe: collapses runs of spaces only *inside*
// quoted strings, so file indentation and code layout stay untouched.
function tidyStrings(text) {
  return text
    .split('\n')
    .map((line) => {
      if (!line.includes("'")) return line;
      let out = '';
      let inStr = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '\\') { out += ch + (line[i + 1] || ''); i++; continue; }
        if (ch === "'") { inStr = !inStr; out += ch; continue; }
        if (inStr && (ch === ' ' || ch === '\t')) {
          let j = i;
          while (j < line.length && (line[j] === ' ' || line[j] === '\t')) j++;
          const prev = out.slice(-1);
          const next = line[j] || '';
          if (prev !== ' ' && prev !== '(' && next !== ')' && next !== ',' && next !== '.') out += ' ';
          i = j - 1;
          continue;
        }
        out += ch;
      }
      return out;
    })
    .join('\n');
}
// ── Bespoke rewrites: exact strings, each must match exactly once ─────────────

const FIXES = [
  ['Why Bare \u201cFull Home Deep Cleaning\u201d SERP Ranks Thin Pages (#4 TechSquad, #7 Urban) \u2014 And How This Pillar Beats Them',
   'Why Some \u201cFull Home Deep Cleaning\u201d Quotes Look Cheaper \u2014 And What They Leave Out'],
  ['How to Use This Full Home Deep Cleaning Pillar to Compare Quotes in 60 Seconds',
   'How to Compare Full Home Deep Cleaning Quotes in 60 Seconds'],
  ['What Bathroom Deep Cleaning in Gurgaon Includes \u2014 9 Steps (ProsAdda/AKS/SKKS All List This, But Only We Price It Per Bath)',
   'What Bathroom Deep Cleaning in Gurgaon Includes \u2014 The 9 Steps at \u20b9800/Bath'],
  ['Why Some Bathroom Quotes Are \u20b9399 and Others \u20b9800 \u2014 Thin vs This Pillar',
   'Why Some Bathroom Quotes Are \u20b9399 and Others \u20b9800 \u2014 What Actually Differs'],
  ['Why Kleanhomz #6 Ranks but Loses Clicks \u2014 Thin vs This Pillar',
   'What a Cheaper Home Deep Cleaning Quote Usually Leaves Out'],
  ['Post Construction Cleaning Price in Gurgaon \u2014 BHK & Sq-Ft Table (Sep 2026, Beats Thin \u201cCall for Quote\u201d)',
   'Post Construction Cleaning Price in Gurgaon \u2014 BHK & Sq-Ft Table (Sep 2026)'],
  ['Why Bare \u201cBest Deep Cleaning Services in Gurgaon\u201d SERP Is Thin \u2014 And How This Pillar Is Not',
   'How to Judge the Best Deep Cleaning Services in Gurgaon in 5 Checks'],
  ['Why This One Guide Outranks 50 Thin Sector Pages',
   'Why One Complete Guide Beats 50 Near-Identical Sector Pages'],
  ['Why DLF Phase 4 Needs Society-Wise Deep Cleaning (Not a Thin Template)',
   'Why DLF Phase 4 Needs Society-Wise Deep Cleaning (Not a Generic Template)'],
  // table headers
  ["['Signal', 'Urban/Zoopgo/TechSquad (Thin)', 'This Full Home Deep Cleaning Pillar (Not Thin)']",
   "['What to Check', 'Typical \u201cStarts At\u201d Quote', 'Our Fixed-Price Full Home Deep Clean']"],
  ["['Signal', 'Thin Competitors (ProsAdda/AKS/SKKS/BusyBucket/ Balaji)', 'This Bathroom Deep Cleaning Gurgaon Pillar (Not Thin)']",
   "['What to Compare', '\u20b9399 \u201cStarts At\u201d Quote', 'Our \u20b9800/Bath Fixed Price']"],
  ["['Signal', 'Kleanhomz #6 (Thin, 800 words)', 'This Home Deep Cleaning Service Gurgaon Pillar (Not Thin)']",
   "['What to Check', 'A Cheaper Local Quote', 'Our Fixed BHK Price']"],
  ["['Signal', 'Top 4 Bare SERP (Thin)', 'This Top 5 Pillar (Not Thin, 1,900+ words)']",
   "['What to Check', 'Typical Top-4 Listing', 'This Roundup']"],
  ["['Full home deep cleaning (this pillar)'", "['Full home deep cleaning (this page)'"],
  ["['deep cleaning services (this pillar, bare)'", "['deep cleaning services (city-wide)'"],
  ["['full home deep cleaning (433 imp)'", "['full home deep cleaning'"],
  ["['home deep cleaning services gurgaon (this pillar, 125 imp)'", "['home deep cleaning services gurgaon'"],
  ["['deep cleaning services in gurgaon (202 imp, 2 clicks)'", "['deep cleaning services in gurgaon'"],
  ["['deep cleaning services (bare, 209 imp)'", "['deep cleaning services (without city)'"],
  ["['home cleaning services gurgaon (this pillar, 142 imp)'", "['home cleaning services gurgaon'"],
  ["['house cleaning services gurgaon (4 clicks, 258 imp)'", "['house cleaning services gurgaon'"],
  ["['home cleaning services near me (2 clicks, 61 imp)'", "['home cleaning services near me'"],
  // pages.config.mjs descriptions
  ['Bathroom deep cleaning Gurgaon \u20b9800/bath. Descaling, grout, commode, glass, exhaust. 49 imp 0 clicks \u2192 now exact pillar. Updated Sep 2026.',
   'Bathroom deep cleaning Gurgaon \u20b9800/bath \u2014 45\u201360 min per bath, descaling, grout, commode, glass and exhaust. TDS-zone descaling included.'],
  ['Deep cleaning services price \u20b92,500\u2013\u20b99,000. What\u2019s included, BHK table, vs regular cleaning. Bare 209 imp pillar. Updated Sep 2026.',
   'Deep cleaning services price \u20b92,500\u2013\u20b99,000 in Gurgaon. What is included, BHK-by-BHK table, time on site, exclusions and how it differs from regular cleaning.'],
  ['Home cleaning services Gurgaon from \u20b9499/visit. Weekly plans, what\u2019s included, vs house cleaning. 142 imp 0 clicks. Updated Sep 2026.',
   'Home cleaning services in Gurgaon from \u20b9499/visit \u2014 weekly, bi-weekly and one-time plans, exactly what each visit covers, and how it differs from a deep clean.'],
  ['Home deep cleaning services Gurgaon \u20b92,500\u2013\u20b95,500. BHK price, checklist, vs regular. 125 imp 0 clicks. Updated Sep 2026.',
   'Home deep cleaning services in Gurgaon \u20b92,500\u2013\u20b95,500 \u2014 BHK price table, 5-area checklist, time per home and how it differs from weekly cleaning.'],
  ['Full home deep cleaning price \u20b92,500\u2013\u20b99,000 (1BHK to villa). What\u2019s included, BHK checklist, time & booking. Bare pillar to rank for \u201cfull home deep cleaning\u201d. Updated Sep 2026.',
   'Full home deep cleaning price in Gurgaon \u20b92,500\u2013\u20b99,000 (1BHK to villa). BHK price table, room-by-room checklist, time on site and booking.'],
  ['Full home deep cleaning price \u20b92,500\u2013\u20b99,000 (1BHK to villa). What\u2019s included, BHK checklist, time & booking. Updated Sep 2026.',
   'Full home deep cleaning price in Gurgaon \u20b92,500\u2013\u20b99,000 (1BHK to villa). BHK price table, room-by-room checklist, time on site and booking.'],
  // ── Pass 2: individual sentences rewritten by hand ──
  ['This city-wide guide answers \u201cwhat does a full house deep clean include?\u201d and beats the generic Urban/a marketplace listing/a national aggregator service pages appearing near the top for \u201cfull home deep cleaning\u201d.',
   'Below is the room-by-room answer to \u201cwhat does a full house deep clean include?\u201d, priced BHK by BHK.'],
  ['If you are looking for **full home deep cleaning** and found only aggregator cards (Urban Company \u201cStarts at \u20b94,199 5 hrs\u201d, a marketplace listing \u201c\u20b9499\u2013\u20b93,999\u201d, a national aggregator\u2019s generic \u201cDeep Home Cleaning Services\u201d page) with no BHK checklist, here is the one fixed table that actually answers the People Also Ask \u2014 \u201cWhat does a full house deep clean include?\u201d \u2014 room by room, BHK by BHK, from the Gurgaon team that does full home deep cleaning daily since 2015.',
   'Most \u201cfull home deep cleaning\u201d quotes online give a starting figure and a short bullet list \u2014 no BHK breakdown, no exclusions, no time on site. What follows is the room-by-room answer to the question people actually ask: \u201cWhat does a full house deep clean include?\u201d \u2014 BHK by BHK, from a Gurgaon team doing this daily since 2015.'],
  ['Bare \u201cfull home deep cleaning\u201d without \u201cGurgaon\u201d still shows Gurgaon prices because you searched from Sector 43. Here is the fixed, pay-after card that beats a marketplace listing\u2019s \u201c\u20b9499\u2013\u20b93,999\u201d range (which hides scope) and Urban\u2019s \u201cStarts at \u20b94,199\u201d (which is 1BHK, not 2BHK):',
   'Searching \u201cfull home deep cleaning\u201d without \u201cGurgaon\u201d still returns Gurgaon prices when the search comes from Sector 43. Here is the fixed, pay-after card to check any quote you have been given against \u2014 plus the two questions that expose a range quote hiding its scope:'],
  ['This topical guide for \u201cbathroom deep cleaning gurgaon\u201d (in your GSC) beats the generic one Gurgaon listing, a facilities company, another Gurgaon listing (\u20b9399) and a marketplace listing pages that list 800 generic lines with no per-bath price or TDS zone.',
   'Below is the per-bath price, the 45\u201360 minute step list and the TDS zones that decide how often your bathroom needs descaling.'],
  ['This city-wide guide for \u201cdeep cleaning services\u201d () beats the generic Urban/a marketplace listing cards with a BHK-fixed checklist.',
   'Fixed, BHK-by-BHK pricing and the full scope list, for homes anywhere in Gurgaon.'],
  ['This topical guide for \u201chome cleaning services gurgaon\u201d () beats the generic \u201cInsta 100+ followers\u201d profile with a per-visit table and house vs home wording fix.',
   'The per-visit table for every home size, the weekly-versus-one-time maths, and where regular upkeep ends and a deep clean begins.'],
  ['Gurgaon users type both \u201chome\u201d and \u201chouse\u201d for the same job. Your Instagram ranks for \u201chome cleaning services gurgaon\u201d because its handle is cleaning_service_in_gurgaon, but your service page is titled \u201cHouse Cleaning Services in Gurgaon\u201d (house, not home) \u2014 that one-word mismatch is why you get but 0 clicks. This guide fixes it by using exact \u201chome cleaning services gurgaon\u201d in title, H1, first paragraph, FAQs and tables \u2014 the house vs home wording split that cost you 142 clicks.',
   'In Gurgaon, \u201chome cleaning services\u201d and \u201chouse cleaning services\u201d describe the same job: regular upkeep of your whole home, priced per visit. This guide covers both phrasings, gives the per-visit table for every home size, and shows where regular upkeep ends and a deep clean begins.'],
  ['This topical guide for \u201chome deep cleaning services gurgaon\u201d (where Instagram gets 125) and \u201chome deep cleaning services in gurgaon\u201d () beats the generic Instagram profile with a BHK-fixed checklist.',
   'The BHK price table and the 5-area checklist that shows what a full home deep clean actually covers.'],
  ['but home deep cleaning services in Gurgaon is the residential intent you searched. Our home deep cleaning services guide and deep cleaning services guide share the same BHK card; home just filters to residential.',
   'while \u201chome deep cleaning services\u201d always means a residential flat, builder floor or villa. Both follow the same BHK price card \u2014 home simply filters the scope to a home.'],
  ["['You Searched', 'You Probably Need', 'Book']",
   "['If You Are Looking For', 'You Probably Need', 'Book']"],

];


// ── Regenerate the formulaic "You searched … and got <competitor>" openings ──
// These paragraphs were written to the site owner, not to a reader. Each is
// replaced with a customer-facing intro; the variant is chosen from the slug so
// neighbouring articles do not all open the same way.

const OPENERS = [
  (kw) => `Comparing **${kw}** quotes? Below is the fixed price for each home size, the room-by-room scope, how long the team is on site and what a fair quote should exclude in writing.`,
  (kw) => `If you are booking **${kw}** in Gurgaon, this guide answers the two things quotes usually avoid: the exact price for your home size, and the written list of what is and is not included.`,
  (kw) => `Most **${kw}** quotes online stop at a \u201cstarting from\u201d figure. Here is the fixed price, the time on site, the water-hardness reality in Gurgaon and the exclusions that decide the final bill.`,
  (kw) => `Before you book **${kw}**, compare the numbers below with any quote you already hold \u2014 price per BHK, hours on site, crew size and what is left out.`,
  (kw) => `**${kw}** in Gurgaon: prices by home size, what the team actually does in each area, how long it takes, and the three questions that separate a detailed job from a rushed one.`,
];

const hashSlug = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

function regenerateOpeners(text) {
  let n = 0;
  const re = /\{ t: 'p', x: 'You (?:searched|typed)((?:[^'\\]|\\.)*)' \},?/g;
  const out = text.replace(re, (whole, rest) => {
    const kwMatch = String(rest).match(/\*\*([^*]+)\*\*/);
    const kw = kwMatch ? kwMatch[1].trim().replace(/\.$/, '') : 'this service';
    const slug = (text.match(/slug: '([^']+)'/g) || []).pop() || kw;
    const pick = OPENERS[hashSlug(String(slug)) % OPENERS.length];
    n++;
    return `{ t: 'p', x: '${pick(kw)}' },`;
  });
  return { text: out, count: n };
}

// ── Apply ────────────────────────────────────────────────────────────────────

let grandTotal = 0;
const missing = [];

for (const rel of FILES) {
  const path = resolve(root, rel);
  let text = readFileSync(path, 'utf8');
  const before = text;

  const regen = regenerateOpeners(text);
  text = regen.text;
  let applied = regen.count;

  for (const [find, replace] of FIXES) {
    const parts = text.split(find);
    if (parts.length === 1) {
      missing.push(`${rel}: "${find.slice(0, 70)}…"`);
      continue;
    }
    text = parts.join(replace);
    applied += parts.length - 1;
  }

  let ruleHits = 0;
  for (const [re, replace] of RULES) {
    const hits = (text.match(re) || []).length;
    if (!hits) continue;
    text = text.replace(re, replace);
    ruleHits += hits;
  }

  text = tidyStrings(text);

  if (text !== before) writeFileSync(path, text);
  console.log(`${rel}: ${applied} bespoke replacement(s), ${ruleHits} rule hit(s)`);
  grandTotal += applied + ruleHits;
}

console.log(`\nscrub complete — ${grandTotal} edit(s).`);
if (missing.length) {
  console.log(`\n${missing.length} bespoke pattern(s) not found (already clean or changed):`);
  for (const m of missing) console.log(`  ${m}`);
}