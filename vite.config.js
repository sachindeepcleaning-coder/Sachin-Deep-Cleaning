import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Multi-page app: every *.html in the repo root is an entry point.
// (The Google Search Console verification file is excluded.)
const htmlFiles = fs
  .readdirSync(__dirname)
  .filter((f) => f.endsWith('.html') && f !== 'google4bc4a68e1ff9b7f5.html');

const input = Object.fromEntries(
  htmlFiles.map((f) => [f.replace(/\.html$/, ''), resolve(__dirname, f)])
);

export default defineConfig({
  // Relative base so built asset URLs (./assets/...) resolve correctly whether
  // the site is served from a GitHub Pages subpath (/Sachin-Deep-Cleaning/),
  // a custom domain, or locally. Without this, absolute /assets/ paths 404 on
  // the subpath and React never loads → blank screen.
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: { input },
    target: 'es2018',
  },
});
