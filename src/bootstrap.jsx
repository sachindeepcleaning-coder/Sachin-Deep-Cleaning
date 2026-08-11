import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './app.jsx';

// Read which page to mount from the data-page / data-service attributes
// set by each generated HTML entry shell (see scripts/gen-entries.mjs).
const el = document.documentElement;
const props = {
  page: el.dataset.page,
  file: el.dataset.file,
  serviceKey: el.dataset.service,
  bhk: el.dataset.bhk ? Number(el.dataset.bhk) : undefined,
};

const root = document.getElementById('root');

if (root && root.childNodes.length > 0) {
  // Static HTML was pre-rendered at build time → hydrate (fast, no flash).
  hydrateRoot(root, <App {...props} />);
} else {
  // Dev mode / no prerender → normal client render.
  createRoot(root).render(<App {...props} />);
}
