// Generates responsive WebP derivatives from assets/source into public/img
// and writes src/generated/images.json (dimensions + srcset) for the app.
//
// Product screenshots are the original captures from "UpRate Screenshots".
// Each is cropped to the app viewport so the browser chrome and macOS menu
// bar (which include a personal email address in a tab) are never published.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets/source');
const OUT = path.join(ROOT, 'public/img');
const JSON_OUT = path.join(ROOT, 'src/generated/images.json');

// App viewport inside a 2880×1800 capture (below the browser chrome, right of the app sidebar).
const VIEWPORT = { left: 344, top: 236, width: 2536, height: 1564 };
// Captures where the app sidebar is collapsed: skip the collapsed rail too.
const VIEWPORT_COLLAPSED = { left: 420, top: 236, width: 2460, height: 1564 };

const shot = (dir, file) => path.join(SRC, 'screenshots', dir, file);
const design = (file) => path.join(SRC, 'design', file);
const brand = (file) => path.join(SRC, 'brand', file);

/** slug → { file, crop?, widths?, whiten? } */
const MANIFEST = {
  // Homepage headshot. whiten lifts the off-white studio backdrop to pure white so it sits seamlessly on the white panel.
  'headshot': { file: brand('headshot.png'), widths: [480, 840], whiten: true },

  // Original product screenshots (~/Downloads/UpRate Screenshots)
  'labour-scheduler-week': { file: shot('labour-scheduler', 'Screenshot 2026-07-08 at 15.32.43.png'), crop: VIEWPORT },
  'labour-scheduler-overview': { file: shot('labour-scheduler', 'Screenshot 2026-07-08 at 14.43.02.png'), crop: VIEWPORT },
  'labour-scheduler-bulk-assign': { file: shot('labour-scheduler', 'Screenshot 2026-07-08 at 15.22.38.png'), crop: VIEWPORT },
  'labour-scheduler-create-assignment': { file: shot('labour-scheduler', 'Screenshot 2026-07-08 at 15.23.26.png'), crop: VIEWPORT },
  'labour-resources-panel': { file: shot('labour-scheduler', 'Screenshot 2026-07-08 at 14.43.21.png'), crop: { left: 2172, top: 262, width: 636, height: 1530 } },
  'asset-scheduler': { file: shot('asset-scheduler', 'Screenshot 2026-07-08 at 14.39.32.png'), crop: VIEWPORT },
  'invoicing': { file: shot('invoice-manager', 'Screenshot 2026-07-08 at 15.40.00.png'), crop: VIEWPORT_COLLAPSED },
  'sales-manager': { file: shot('sales-manager', 'Screenshot 2026-07-08 at 15.46.06.png'), crop: VIEWPORT_COLLAPSED },
  'contract-editor': { file: shot('sales-manager', 'Screenshot 2026-07-08 at 15.47.34.png'), crop: VIEWPORT },
  'timesheets': { file: shot('timesheets', 'Screenshot 2026-07-08 at 15.34.44.png'), crop: { left: 344, top: 236, width: 1100, height: 1564 } },

  // Design-only artwork exported from the Figma file (not present in the screenshot folder)
  'hero-gradient': { file: design('44901.png'), widths: [1440] },
  'contract-scheduler': { file: design('2bea8.png') },
  'assignment-detail': { file: design('6cd4d.png') },
  'labour-resources': { file: design('16b2b.png') },
  'research-whiteboard': { file: design('df8ec.png') },
  'research-spreadsheet': { file: design('432df.png') },
  'research-screen': { file: design('2ad94.png') },
  'legacy-scheduler': { file: design('a5e41.png') },
  'assignment-mockup': { file: design('fe8f0.png') },
  'contract-scheduler-shipped': { file: design('d4290.png') },
  'assignment-actions': { file: design('f5d32.png') },
  'ds-overview': { file: design('1d6fd.png') },
  'ds-colour': { file: design('899ca.png') },
  'ds-themes': { file: design('eac0e.png') },
  'ds-modes': { file: design('295bd.png') },
  'ds-spacing': { file: design('22206.png') },
  'ds-typography': { file: design('493a2.png') },
};

const DEFAULT_WIDTHS = [640, 1280, 2048];

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.dirname(JSON_OUT), { recursive: true });

const result = {};
for (const [slug, { file, crop, widths = DEFAULT_WIDTHS, whiten }] of Object.entries(MANIFEST)) {
  let base = sharp(file).rotate();
  if (crop) base = base.extract(crop);
  if (whiten) base = base.linear(255 / 243, 0);
  const buf = await base.png().toBuffer();
  const { width, height } = await sharp(buf).metadata();
  const sizes = [...new Set(widths.map((w) => Math.min(w, width)))];
  const variants = [];
  for (const w of sizes) {
    const name = `${slug}-${w}.webp`;
    await sharp(buf).resize({ width: w }).webp({ quality: 80, effort: 5 }).toFile(path.join(OUT, name));
    variants.push({ w, url: `/img/${name}` });
  }
  const largest = variants[variants.length - 1];
  result[slug] = {
    width,
    height,
    src: largest.url,
    srcSet: variants.map((v) => `${v.url} ${v.w}w`).join(', '),
  };
  console.log(`${slug.padEnd(36)} ${width}×${height} → ${sizes.join(', ')}`);
}

fs.writeFileSync(JSON_OUT, JSON.stringify(result, null, 2) + '\n');

// Social preview (JPEG: some link-preview crawlers do not read WebP).
{
  const { file, crop } = MANIFEST['labour-scheduler-week'];
  await sharp(file).extract(crop).resize(1200, 630, { fit: 'cover', position: 'top' }).jpeg({ quality: 82 }).toFile(path.join(ROOT, 'public/og-image.jpg'));
  console.log('og-image.jpg 1200×630');
}
