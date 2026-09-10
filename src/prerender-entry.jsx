import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import App from './app.jsx';

// SSR entry used by scripts/prerender.mjs to render each page's final HTML.
// Uses renderToPipeableStream (not renderToString) because src/app.jsx
// route-splits pages with React.lazy, which only pipeable rendering supports.
// onAllReady waits for every lazy chunk, so output matches the old markup.
export function renderPage({ page, file, serviceKey, bhk }) {
  return new Promise((resolve, reject) => {
    let html = '';
    const stream = new PassThrough();
    stream.on('data', (chunk) => {
      html += chunk.toString();
    });
    stream.on('end', () => resolve(html));
    stream.on('error', reject);
    const { pipe } = renderToPipeableStream(<App page={page} file={file} serviceKey={serviceKey} bhk={bhk} />, {
      onAllReady() {
        pipe(stream);
      },
      onError(err) {
        console.error('prerender stream error:', err);
      },
    });
  });
}
