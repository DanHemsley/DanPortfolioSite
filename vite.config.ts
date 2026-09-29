import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// One HTML file per page, so every URL works on any static host without rewrites.
const page = (p: string) => resolve(__dirname, p);

// The CV download buttons stay disabled until this file exists.
const cvPdfAvailable = existsSync(page('public/dan-hemsley-cv.pdf'));
if (!cvPdfAvailable) console.warn('\n[cv] public/dan-hemsley-cv.pdf not found: "Download my CV" is shown as unavailable.\n');

export default defineConfig({
  plugins: [react()],
  define: { __CV_PDF_AVAILABLE__: JSON.stringify(cvPdfAvailable) },
  // Port 8080 matches the "Launch Chrome" config in .vscode/launch.json.
  server: { port: 8080, strictPort: true },
  preview: { port: 8080, strictPort: true },
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        home: page('index.html'),
        uprate: page('uprate/index.html'),
        cv: page('cv/index.html'),
        contact: page('contact/index.html'),
      },
    },
  },
});
