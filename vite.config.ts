import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The CV download buttons stay disabled until this file exists.
const cvPdfAvailable = existsSync(resolve(__dirname, 'public/dan-hemsley-cv.pdf'));
if (!cvPdfAvailable) console.warn('\n[cv] public/dan-hemsley-cv.pdf not found: "Download my CV" is shown as unavailable.\n');

// Site version shown in the homepage logo tooltip. Bumped on every claude/* branch (see .claude/CLAUDE.md).
const { version } = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf8')) as { version: string };

// Single-page app: index.html + React Router (src/main.tsx).
export default defineConfig({
  plugins: [react()],
  define: {
    __CV_PDF_AVAILABLE__: JSON.stringify(cvPdfAvailable),
    __APP_VERSION__: JSON.stringify(version),
  },
  // 8080 matches .vscode/launch.json. Figma Make passes its own --port, which takes precedence.
  server: { port: 8080 },
  preview: { port: 8080 },
  build: { target: 'es2020', assetsInlineLimit: 0 },
});
