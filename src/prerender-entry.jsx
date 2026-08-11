import { renderToString } from 'react-dom/server';
import App from './app.jsx';

// SSR entry used by scripts/prerender.mjs to render each page's final HTML.
export function renderPage({ page, file, serviceKey, bhk }) {
  return renderToString(<App page={page} file={file} serviceKey={serviceKey} bhk={bhk} />);
}
