// Generates responsive WebP derivatives from assets/source into public/img
// and writes src/generated/images.json (dimensions + srcset) for the app.
//
// Two kinds of product imagery:
// - Design images exported from the Figma file (assets/source/design/hero/…), cropped with
//   the exact framing the design uses (the `figma` option below).
// - Older captures from "UpRate Screenshots" (git-ignored), cropped to the app viewport so the
//   browser chrome and macOS menu bar (which show a third party's email address) are never published.
//
// Usage: `npm run images` rebuilds everything; `npm run images -- <slug> [<slug>…]` rebuilds only
// those slots and keeps every other entry in images.json as it is.
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
const hero = (file) => path.join(SRC, 'design/hero', file);

/**
 * Framing copied from Figma (get_design_context): the layer's box size (px, including its 2px border)
 * and the image fill's position/size as percentages of the box. `cover: true` = object-fit: cover.
 */
const BORDER = 2;
function figmaCrop(meta, { box: [boxW, boxH], cover, img }) {
  const w = boxW - 2 * BORDER;
  const h = boxH - 2 * BORDER;
  if (cover) {
    const scale = Math.max(w / meta.width, h / meta.height);
    const cw = w / scale, ch = h / scale;
    return { left: Math.round((meta.width - cw) / 2), top: Math.round((meta.height - ch) / 2), width: Math.round(cw), height: Math.round(ch) };
  }
  const sx = (w * img.width) / 100 / meta.width;
  const sy = (h * img.height) / 100 / meta.height;
  const left = Math.max(0, Math.round((-(w * img.left) / 100) / sx));
  const top = Math.max(0, Math.round((-(h * img.top) / 100) / sy));
  return { left, top, width: Math.min(meta.width - left, Math.round(w / sx)), height: Math.min(meta.height - top, Math.round(h / sy)) };
}

/** slug → { file, crop?, figma?, widths?, whiten? } */
const MANIFEST = {
  // UpRate hero collage: Figma 'Case study page' → Group 1174 (136:15034), one entry per window.
  'hero-labour-scheduler': { file: hero('labour-scheduler.png'), figma: { box: [1310.892, 703.984], cover: true } },
  'hero-sales-manager': { file: hero('sales-manager.png'), figma: { box: [457.634, 524.225], img: { left: 0, top: -0.02, width: 100, height: 127.87 } } },
  'hero-invoicing': { file: hero('invoicing.png'), figma: { box: [288.967, 525.76], img: { left: 0, top: -0.07, width: 346.43, height: 137.3 } } },
  'hero-contract-editor': { file: hero('contract-editor.png'), figma: { box: [505.806, 480.303], img: { left: -0.08, top: 0, width: 100.17, height: 153.98 } } },
  'hero-timesheets': { file: hero('timesheets.png'), figma: { box: [532.726, 331.537], img: { left: 0, top: 0, width: 100, height: 229.49 } } },
  'hero-labour-resources': { file: hero('labour-resources.png'), figma: { box: [372.692, 555.295], img: { left: -4.06, top: -2.72, width: 108.12, height: 134.28 } } },

  // Homepage headshot. whiten lifts the off-white studio backdrop to pure white so it sits seamlessly on the white panel.
  'headshot': { file: brand('headshot.png'), widths: [480, 840], whiten: true },

  // Original product screenshots (~/Downloads/UpRate Screenshots)
  'labour-scheduler-overview': { file: shot('labour-scheduler', 'Screenshot 2026-07-08 at 14.43.02.png'), crop: VIEWPORT },
  'labour-scheduler-bulk-assign': { file: shot('labour-scheduler', 'Screenshot 2026-07-08 at 15.22.38.png'), crop: VIEWPORT },
  'labour-scheduler-create-assignment': { file: shot('labour-scheduler', 'Screenshot 2026-07-08 at 15.23.26.png'), crop: VIEWPORT },
  'asset-scheduler': { file: shot('asset-scheduler', 'Screenshot 2026-07-08 at 14.39.32.png'), crop: VIEWPORT },
  'invoicing': { file: shot('invoice-manager', 'Screenshot 2026-07-08 at 15.40.00.png'), crop: VIEWPORT_COLLAPSED },
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

const only = process.argv.slice(2);
for (const slug of only) if (!MANIFEST[slug]) throw new Error(`Unknown image slug: ${slug}`);

// Keep existing entries for slots that aren't being rebuilt; drop entries no longer in the manifest.
const previous = fs.existsSync(JSON_OUT) ? JSON.parse(fs.readFileSync(JSON_OUT, 'utf8')) : {};
const result = {};
for (const slug of Object.keys(MANIFEST)) if (only.length && !only.includes(slug) && previous[slug]) result[slug] = previous[slug];

for (const [slug, { file, crop, figma, widths = DEFAULT_WIDTHS, whiten }] of Object.entries(MANIFEST)) {
  if (only.length && !only.includes(slug)) continue;
  let base = sharp(file).rotate();
  if (crop) base = base.extract(crop);
  if (figma) base = base.extract(figmaCrop(await sharp(file).metadata(), figma));
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

const ordered = Object.fromEntries(Object.keys(MANIFEST).filter((k) => result[k]).map((k) => [k, result[k]]));
fs.writeFileSync(JSON_OUT, JSON.stringify(ordered, null, 2) + '\n');

// Social preview (JPEG: some link-preview crawlers do not read WebP).
{
  const { file } = MANIFEST['hero-labour-scheduler'];
  await sharp(file).resize(1200, 630, { fit: 'cover', position: 'top' }).jpeg({ quality: 82 }).toFile(path.join(ROOT, 'public/og-image.jpg'));
  console.log('og-image.jpg 1200×630');
}
