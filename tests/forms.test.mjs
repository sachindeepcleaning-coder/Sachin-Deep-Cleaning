// Form-level regression tests for the two remaining lead forms
// (LeadForm + MultiStepForm) — the "never lose a lead, never fake a
// conversion" guard.
//
// Run:  npm test        (node --test "tests/*.test.mjs")
//   or: node --test tests/forms.test.mjs
//
// What these pin down, per form:
//   1. the phone field can no longer REFUSE a number the visitor typed
//      correctly (the old pattern="[0-9+ ]{8,15}" blocked "98739-15215",
//      "+91 98739-15215" and "98739 15215" in the BROWSER, so the submit
//      never even happened -> the lead was lost),
//   2. the number that is SENT is the canonical 10 digits, never the raw
//      field value (the gateway validates /^[6-9][0-9]{9}$/ and the owner
//      has to be able to call the number back),
//   3. a submit the site refuses (or a send that fails) tells click-guard to
//      UNDO the conversion it recorded, and
//   4. the focus goes back to the field the visitor has to fix.
//
// The components are React and the repo has no DOM test runner, so the tests
// assert on the component source (the same style as tests/phone.test.mjs).

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { normalizePhone, isValidPhone } from '../src/lib/phone.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(resolve(ROOT, rel), 'utf8');

// Strip comments so an explanatory note in the source can never be mistaken
// for a live attribute (and a live attribute can never hide in a comment).
const stripComments = (s) =>
  s
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:"'`\\])\/\/.*$/gm, '$1');

const FORMS = [
  { file: 'src/components/LeadForm.jsx', label: 'LeadForm' },
  { file: 'src/components/MultiStepForm.jsx', label: 'MultiStepForm' },
];

// The digit-strip that both forms run on every keystroke.
const DIGIT_STRIP = "e.target.value.replace(/\\D/g, '').slice(0, 13)";

for (const { file, label } of FORMS) {
  const src = read(file);
  const code = stripComments(src);

  test(`${label}: the phone field never blocks a correctly typed number`, () => {
    assert.ok(
      !/\bpattern\s*=/.test(code),
      `${label}: the phone input must not carry a pattern attribute — the old ` +
      `pattern="[0-9+ ]{8,15}" made the browser refuse "98739-15215", ` +
      `"+91 98739-15215" and "98739 15215" before the submit even fired`
    );
    assert.ok(
      !code.includes('[0-9+ ]'),
      `${label}: the old 8-15 char phone pattern must be gone completely`
    );
    assert.ok(
      src.includes(DIGIT_STRIP),
      `${label}: the digits must be stripped as they are typed (13 digits, so ` +
      `"+91 98739-15215" still fits)`
    );
    assert.ok(
      src.includes('maxLength="13"'),
      `${label}: the phone input must accept 13 digits`
    );
    assert.ok(
      src.includes('slice(0, 10)') === false && src.includes('maxLength="10"') === false,
      `${label}: the 10-digit truncation must be gone (it cut valid numbers)`
    );
  });

  test(`${label}: validates the NORMALISED number and sends it`, () => {
    assert.ok(
      src.includes("from '../lib/phone.js'"),
      `${label}: the form must import the phone helpers`
    );
    assert.ok(src.includes('normalizePhone'), `${label}: the phone must be normalised`);
    assert.ok(src.includes('isValidPhone'), `${label}: the normalised phone must be validated`);
    assert.ok(
      /const p = normalizePhone\(/.test(src),
      `${label}: the number that is sent must be the normalised one`
    );
    assert.ok(
      /isValidPhone\(p\)/.test(src),
      `${label}: the validation must run on the normalised value`
    );
    assert.ok(
      /phone: p,/.test(src),
      `${label}: sendLead must receive the normalised number`
    );
    assert.ok(
      !/phone: phone[,}]/.test(src) && !/phone: data\.phone[,}]/.test(src),
      `${label}: the raw field value must never be sent`
    );
  });

  test(`${label}: tells click-guard when the site refused the submit`, () => {
    assert.ok(
      src.includes("from '../lib/formReject.js'"),
      `${label}: the form must use the shared rejection helper`
    );
    assert.ok(
      /cgFormRejected\(\)/.test(src),
      `${label}: the beacon rejection hook must be called`
    );
    assert.ok(
      src.includes('focusField('),
      `${label}: the focus must move back into the form`
    );
  });
}

// ---- The shared helper ---------------------------------------------------

test('formReject.js calls the click-guard hook, guarded', () => {
  const src = read('src/lib/formReject.js');
  assert.ok(src.includes('window.cgFormRejected'), 'the global hook must be called');
  assert.ok(
    /typeof window\.cgFormRejected === 'function'/.test(src),
    'the hook must be guarded by a typeof check (safe no-op before beacon v13)'
  );
});

test('formReject.js blurs before it focuses (the beacon needs the focusin)', () => {
  const src = read('src/lib/formReject.js');
  assert.ok(
    /el\.blur\(\)/.test(src) && /el\.focus\(/.test(src),
    'focus() on the already focused element fires no focusin — the blur is required'
  );
});

// ---- LeadForm specifics --------------------------------------------------

test('LeadForm: the focus goes back to the phone field on a failed send', () => {
  const src = read('src/components/LeadForm.jsx');
  assert.ok(
    src.includes('focusField(phoneRef.current)'),
    'the focus must return to the phone input'
  );
  assert.ok(
    src.includes('ref={phoneRef}'),
    'the phone input must carry the ref the focus helper needs'
  );
  // The failure branch: no lead -> click-guard must undo the conversion.
  const failIdx = src.indexOf("Couldn't send your request");
  assert.ok(failIdx > -1, 'the failure message must stay');
  const tail = src.slice(failIdx, failIdx + 400);
  assert.ok(
    tail.includes('cgFormRejected()'),
    'the failed send must call the rejection hook'
  );
  assert.ok(
    tail.includes('focusField(phoneRef.current)'),
    'the failed send must move the focus back to the phone field'
  );
});

// ---- MultiStepForm specifics --------------------------------------------

test('MultiStepForm: the phone lives on step 1, so a refusal goes back there', () => {
  const src = read('src/components/MultiStepForm.jsx');
  assert.ok(
    src.includes('setStep(0)'),
    'a refused submit must go back to the step that holds the phone field'
  );
  assert.ok(
    src.includes('focusPhone'),
    'the focus must be moved to the phone field once that step is mounted'
  );
  assert.ok(
    src.includes('ref={phoneRef}'),
    'the phone input must carry the ref the focus helper needs'
  );
  assert.ok(
    /if \(!focusPhone \|\| step !== 0\) return;/.test(src),
    'the focus may only move once the phone step is on screen'
  );
});

test('MultiStepForm: the send failure keeps the WhatsApp fallback and the hook', () => {
  const src = read('src/components/MultiStepForm.jsx');
  const code = stripComments(src);
  const failIdx = code.indexOf("Couldn't send your request");
  assert.ok(failIdx > -1, 'the failure message must stay');
  assert.ok(
    /rejectSubmit\([^)]*Couldn't send your request/.test(code),
    'the failed send must go through rejectSubmit (the rejection path)'
  );
  // rejectSubmit is the single "the site refused this submit" path: it tells
  // click-guard to undo the conversion and takes the visitor back to the
  // phone field.
  const helper = code.slice(code.indexOf('const rejectSubmit ='), code.indexOf('const submit ='));
  assert.ok(helper.includes('cgFormRejected()'), 'rejectSubmit must call the rejection hook');
  assert.ok(helper.includes('setStep(0)'), 'rejectSubmit must go back to the phone step');
  assert.ok(helper.includes('setFocusPhone(true)'), 'rejectSubmit must focus the phone field');
  assert.ok(src.includes('WhatsApp us →'), 'the WhatsApp fallback must stay');
  assert.ok(src.includes("window.location.href = '/thank-you.html'"), 'the success redirect must stay');
  assert.ok(src.includes("track('generate_lead'"), 'the generate_lead event must stay');
});

test('LeadForm: the success redirect, the track() call and the WhatsApp fallback stay', () => {
  const src = read('src/components/LeadForm.jsx');
  assert.ok(src.includes("window.location.href = '/thank-you.html'"), 'the success redirect must stay');
  assert.ok(src.includes("track('generate_lead'"), 'the generate_lead event must stay');
  assert.ok(src.includes('WhatsApp us →'), 'the WhatsApp fallback must stay');
  assert.ok(src.includes('className="lead-form"'), 'the layout classes must stay');
});

// ---- normalizePhone edge cases -------------------------------------------

test('normalizePhone handles the formats a visitor really types', () => {
  const expected = '9873915215';
  const inputs = [
    '+91 98739-15215',
    '+91-98739-15215',
    '091 98739 15215',
    '  98739 15215  ',
    '98739\t15215',
    '(+91) 9873915215',
  ];
  for (const input of inputs) {
    assert.equal(normalizePhone(input), expected, `normalizePhone(${JSON.stringify(input)})`);
  }
});

test('normalizePhone refuses to guess: a long value is never truncated to a valid one', () => {
  // 13 digits ("+91 98739 15215 ext 4") must NOT become a valid number.
  assert.equal(normalizePhone('9198739152154'), '9198739152154');
  assert.equal(isValidPhone('9198739152154'), false);
  // A landline / a number that does not start with 6-9 stays invalid.
  assert.equal(isValidPhone('011 4567 8900'), false);
  assert.equal(isValidPhone('5873915215'), false);
});
