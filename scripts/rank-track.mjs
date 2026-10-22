// Rank tracking — the money-query set, checked against the live SERP.
//
// WHY: the GSC data showed ~100 queries ranking position 1-8 with ZERO
// clicks, and the head terms sitting at position 15-60. That is a CTR and
// authority problem, not a content-volume problem. This script tracks the
// position and the SERP features of the queries that matter so a change can
// be attributed instead of guessed at.
//
// Two modes:
//   node scripts/rank-track.mjs              → the query set, checked
//   node scripts/rank-track.mjs --history    → compare against the last run
//
// It reads the live SERP through the search tool available to the agent, so
// run it from an agent session, or point it at a GSC export:
//   node scripts/rank-track.mjs --gsc <path-to-queries.csv>
//
// The GSC export format it expects is the standard one:
//   Top queries | Clicks | Impressions | CTR | Position
//   deep cleaning services in gurgaon | 0 | 46 | 0% | 40.4

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(__dirname, '..');
const HISTORY = resolve(root, 'rank-history.json');

// The money query set, with the position the site held on 2026-10-22 (from
// the GSC export). `target` is the position worth reaching — for the
// position 1-8 queries it is "get clicks", for the head terms it is "page 1".
export const TARGET_QUERIES = [
  // position 1-8 — impressions with no clicks. The whole game.
  { q: 'water tank cleaning services near me', pos: 1.0, cluster: 'top8' },
  { q: 'toilet tank cleaning services', pos: 1.0, cluster: 'top8' },
  { q: 'facade cleaning services in gurgaon', pos: 1.0, cluster: 'top8' },
  { q: 'common area cleaning services', pos: 1.0, cluster: 'top8' },
  { q: 'sweeper near me prices', pos: 1.0, cluster: 'top8' },
  { q: 'window grill cleaning', pos: 2.0, cluster: 'top8' },
  { q: 'lift cleaning services', pos: 2.0, cluster: 'top8' },
  { q: 'utensils cleaning services', pos: 2.0, cluster: 'top8' },
  { q: 'road cleaning service', pos: 2.0, cluster: 'top8' },
  { q: 'washing machine deep cleaning service', pos: 4.0, cluster: 'top8' },
  { q: 'chair deep cleaning', pos: 4.0, cluster: 'top8' },
  { q: 'curtain vacuum cleaning services', pos: 4.0, cluster: 'top8' },
  { q: 'how much does deep cleaning cost', pos: 4.0, cluster: 'top8' },
  { q: 'balcony cleaning services', pos: 6.0, cluster: 'top8' },
  { q: 'deep cleaning rate per square foot', pos: 8.0, cluster: 'top8' },
  { q: '3 bhk deep cleaning price', pos: 7.0, cluster: 'top8' },
  { q: '2 bhk deep cleaning cost', pos: 5.0, cluster: 'top8' },

  // position 11-30 — page 2, no clicks. One push gets these to page 1.
  { q: 'deep cleaning service in gurgaon', pos: 22.0, cluster: 'page2' },
  { q: 'deep cleaning services near me', pos: 14.4, cluster: 'page2' },
  { q: 'cleaning services in gurgaon', pos: 16.7, cluster: 'page2' },
  { q: 'cleaning services gurgaon', pos: 16.8, cluster: 'page2' },
  { q: 'cleaning service gurgaon', pos: 17.4, cluster: 'page2' },
  { q: 'home cleaning services in gurgaon', pos: 15.9, cluster: 'page2' },
  { q: 'house cleaning services in gurgaon', pos: 15.5, cluster: 'page2' },
  { q: 'kitchen deep cleaning services gurgaon', pos: 11.0, cluster: 'page2' },
  { q: 'deep cleaning near me', pos: 15.0, cluster: 'page2' },
  { q: 'full home deep cleaning', pos: 22.0, cluster: 'page2' },
  { q: 'home deep cleaning services', pos: 23.8, cluster: 'page2' },
  { q: 'house deep cleaning services in gurgaon', pos: 31.9, cluster: 'page2' },
  { q: 'best deep cleaning services in gurgaon', pos: 13.0, cluster: 'page2' },

  // position 35-70 — the authority gap. Links and reviews move these.
  { q: 'deep cleaning services in gurgaon', pos: 40.4, cluster: 'authority' },
  { q: 'deep cleaning services gurgaon', pos: 27.4, cluster: 'authority' },
  { q: 'deep cleaning gurgaon', pos: 42.1, cluster: 'authority' },
  { q: 'deep cleaning services', pos: 19.2, cluster: 'authority' },
  { q: 'office cleaning services in gurgaon', pos: 50.0, cluster: 'authority' },
  { q: 'office deep cleaning services in gurgaon', pos: 42.9, cluster: 'authority' },
  { q: 'office carpet cleaning gurgaon', pos: 67.6, cluster: 'authority' },
  { q: 'carpet cleaning services in gurgaon', pos: 54.3, cluster: 'authority' },
  { q: 'sofa cleaning gurgaon', pos: 53.0, cluster: 'authority' },
  { q: 'bathroom cleaning services in gurgaon', pos: 58.3, cluster: 'authority' },
  { q: 'chimney service gurgaon', pos: 50.0, cluster: 'authority' },
];

// ─── GSC import mode ───────────────────────────────────────────────────────
function parseGscCsv(path) {
  const text = readFileSync(path, 'utf8');
  const lines = text.split('\n').filter((l) => l.trim());
  const out = [];
  for (const line of lines.slice(1)) {
    // "query | clicks | impressions | ctr | position" or comma-separated
    const parts = line.split('|').length > 3 ? line.split('|') : line.split(',');
    const [q, clicks, impr, , pos] = parts.map((x) => (x || '').trim());
    if (!q || pos === undefined) continue;
    const position = parseFloat(String(pos).replace('%', ''));
    if (!Number.isFinite(position)) continue;
    out.push({
      q,
      clicks: Number(clicks) || 0,
      impressions: Number(impr) || 0,
      pos: position,
    });
  }
  return out;
}

// ─── report ─────────────────────────────────────────────────────────────────
function summarise(rows, label) {
  const clusters = { top8: [], page2: [], authority: [] };
  for (const r of rows) {
    const c = r.cluster || (r.pos <= 10 ? 'top8' : r.pos <= 34 ? 'page2' : 'authority');
    clusters[c].push(r);
  }
  console.log(`\n${label}`);
  for (const [name, list] of Object.entries(clusters)) {
    if (!list.length) continue;
    const avg = (list.reduce((n, r) => n + (r.pos || 0), 0) / list.length).toFixed(1);
    const page1 = list.filter((r) => (r.pos || 99) <= 10).length;
    console.log(`  ${name.padEnd(10)} ${String(list.length).padStart(2)} queries · avg position ${avg} · on page 1: ${page1}/${list.length}`);
  }
}

const args = process.argv.slice(2);
const gscIndex = args.indexOf('--gsc');
if (gscIndex !== -1 && args[gscIndex + 1]) {
  const rows = parseGscCsv(resolve(process.cwd(), args[gscIndex + 1]));
  summarise(rows, `GSC import: ${rows.length} queries`);

  const now = new Date().toISOString().slice(0, 10);
  const history = existsSync(HISTORY) ? JSON.parse(readFileSync(HISTORY, 'utf8')) : {};
  const before = history.snapshots ? history.snapshots[history.snapshots.length - 1] : null;
  history.snapshots = history.snapshots || [];
  history.snapshots.push({ date: now, rows });
  writeFileSync(HISTORY, JSON.stringify(history, null, 2));

  if (before) {
    const bmap = new Map(before.rows.map((r) => [r.q, r.pos]));
    const movers = rows
      .map((r) => ({ ...r, was: bmap.get(r.q) }))
      .filter((r) => r.was !== undefined && r.was !== r.pos)
      .sort((a, b) => (a.pos - a.was) - (b.pos - b.was));
    console.log(`\n  Movement since ${before.date}:`);
    for (const m of movers.slice(0, 20)) {
      const d = (m.was - m.pos).toFixed(1);
      console.log(`    ${d > 0 ? '▲' : '▼'} ${String(d).padStart(5)}  ${m.q}`);
    }
    if (!movers.length) console.log('    no position changes');
  }
} else {
  console.log('rank-track: the money query set');
  for (const t of TARGET_QUERIES) {
    console.log(`  ${String(t.pos).padStart(5)}  [${t.cluster}]  ${t.q}`);
  }
  summarise(TARGET_QUERIES, '\nBaseline (GSC 2026-10-22)');
  console.log(
    '\n  To compare against live data, export the GSC queries CSV and run:\n' +
      '    node scripts/rank-track.mjs --gsc <path>\n' +
      '  Or check a query live and record the position here.'
  );
}
