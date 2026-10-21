// Shared "the site refused this submit" helpers.
//
// Owner priority: never lose a lead AND never fake a conversion. A submit
// that the site itself refuses — or a send that fails — creates NO lead on
// the server, so click-guard must undo the conversion it recorded (no alert
// email, no CRM card for a lead that does not exist).
//
// Every form on the site uses the same two channels:
//
//   1. cgFormRejected() below — the DIRECT channel. It calls the click-guard
//      beacon hook window.cgFormRejected() (added in beacon v13). The call is
//      guarded by a typeof check, so it is a safe no-op until the beacon
//      grows the hook and the two can be rolled out independently.
//
//   2. The focus jump (focusField below) — the channel the beacon already
//      understands (v12): the site refuses a submit by moving the focus back
//      into the form it just rejected, and the beacon tells a refused submit
//      from a good one by exactly that event. The blur() is NOT cosmetic:
//      focus() on the element that is ALREADY focused fires no focusin event,
//      and a React form never moves the focus by itself.

export function focusField(el) {
  if (!el || typeof el.focus !== 'function') return;
  try {
    const start = el.selectionStart;
    const end = el.selectionEnd;
    if (document.activeElement === el) el.blur();
    el.focus({ preventScroll: true });
    if (start !== null && start !== undefined && typeof el.setSelectionRange === 'function') {
      try { el.setSelectionRange(start, end); } catch (_) {}
    }
  } catch (_) {}
}

// Tell click-guard that the site refused this submit, so it can undo the
// conversion it recorded. No-op (and never throws) until beacon v13.
export function cgFormRejected() {
  try {
    if (typeof window !== 'undefined' && typeof window.cgFormRejected === 'function') {
      window.cgFormRejected();
    }
  } catch (_) {}
}
