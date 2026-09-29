import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Single-page app: index.html + React Router (src/main.tsx).
export default defineConfig({
  plugins: [react()],
  // 8080 matches .vscode/launch.json. Figma Make passes its own --port, which takes precedence.
  server: { port: 8080 },
  preview: { port: 8080 },
  build: { target: 'es2020', assetsInlineLimit: 0 },
});
