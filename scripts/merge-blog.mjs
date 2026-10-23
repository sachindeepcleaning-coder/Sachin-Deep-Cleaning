// Task 5 consolidation merger.
//
// Reads the verified merge plan (/tmp/opencode/merge-plan.json), copies the
// named unique sections + FAQs from each weaker article into its stronger
// target, directly in src/lib/blog.js (line-based surgery — every block is a
// single line in the source file).
//
// Sections are inserted before the target's closing WhatsApp tip block; FAQs
// are appended to the target's faqs: array (which drives BOTH the visible
// FaqSection and the FAQPage schema, so schema keeps mirroring visible
// content).
//
// Run: node scripts/merge-blog.mjs   (run ONCE — not idempotent)

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const plan = JSON.parse(readFileSync('/tmp/opencode/merge-plan.json', 'utf8'));

const lines = readFileSync(resolve(root, 'src/lib/blog.js'), 'utf8').split('\n');

// Locate an article's `blocks: [` / `faqs: [` extents (line indexes, [start, end)).
function articleExtents(slug) {
  const start = lines.findIndex((l) => l.includes(`slug: '${slug}'`));
  if (start < 0) throw new Error(`article not found: ${slug}`);
  const out = {};
  for (let i = start; i < lines.length; i++) {
    if (/^    blocks: \[\s*$/.test(lines[i])) {
      let j = i + 1;
      while (!/^    \],\s*$/.test(lines[j])) j++;
      out.blocksStart = i + 1;
      out.blocksEnd = j;
    }
    if (/^    faqs: \[\s*$/.test(lines[i])) {
      let j = i + 1;
      while (!/^    \],\s*$/.test(lines[j])) j++;
      out.faqsStart = i + 1;
      out.faqsEnd = j;
    }
    if (out.blocksEnd !== undefined && out.faqsEnd !== undefined) break;
    if (i > start && /slug: '/.test(lines[i])) break;
  }
  if (out.blocksEnd === undefined) throw new Error(`blocks array not found: ${slug}`);
  return out;
}

// A section = the h2 line + following block lines until the next h2 / array end.
function extractSection(slug, h2Title) {
  const ext = articleExtents(slug);
  for (let i = ext.blocksStart; i < ext.blocksEnd; i++) {
    if (lines[i].includes(`t: 'h2', x: '${h2Title}'`)) {
      const group = [];
      let j = i;
      while (j < ext.blocksEnd && !(j > i && lines[j].includes("t: 'h2', x: '"))) {
        group.push(lines[j]);
        j++;
      }
      while (group.length && group[group.length - 1].trim() === '') group.pop();
      return group;
    }
  }
  throw new Error(`section not found in ${slug}: ${h2Title}`);
}

function extractFaqs(slug, questions) {
  const ext = articleExtents(slug);
  return questions.map((q) => {
    const needle = `{ q: '${q.replace(/'/g, "\\'")}'`;
    const line = lines.slice(ext.faqsStart, ext.faqsEnd).find((l) => l.includes(needle));
    if (!line) throw new Error(`faq not found in ${slug}: ${q}`);
    return line;
  });
}

let merged = 0;
for (const [src, cfg] of Object.entries(plan)) {
  const sectionLines = [];
  for (const h of cfg.h2) sectionLines.push(...extractSection(src, h));
  const faqLines = extractFaqs(src, cfg.q);

  // Splice the LATER region first so earlier indexes stay valid.
  const dst = articleExtents(cfg.dst);

  // 1) blocks: before the last t:'tip' block (the closing WhatsApp CTA).
  let insertAt = dst.blocksEnd;
  for (let i = dst.blocksEnd - 1; i >= dst.blocksStart; i--) {
    if (lines[i].includes("t: 'tip'")) {
      insertAt = i;
      break;
    }
  }
  lines.splice(insertAt, 0, ...sectionLines);

  // 2) faqs: append before the faqs array close (recompute extents — the
  //    blocks splice above shifted the faqs lines).
  const dst2 = articleExtents(cfg.dst);
  if (faqLines.length) lines.splice(dst2.faqsEnd, 0, ...faqLines);

  merged++;
  console.log(`merged ${src} -> ${cfg.dst} (${cfg.h2.length} sections, ${faqLines.length} faqs)`);
}

writeFileSync(resolve(root, 'src/lib/blog.js'), lines.join('\n'));
console.log(`DONE: ${merged} articles merged into their targets.`);
