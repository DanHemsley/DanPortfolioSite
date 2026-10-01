// Generates responsive WebP derivatives from assets/source into public/img
// and writes src/generated/images.json (dimensions + srcset) for the app.
//
// All case-study imagery comes from the Figma design file (assets/source/design/…). Product
// screenshots are cropped to the exact framing each layer uses in the design (the `figma` option),
// using the values Figma's design context reports for that layer.
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

const design = (file) => path.join(SRC, 'design', file);
const brand = (file) => path.join(SRC, 'brand', file);
const hero = (file) => path.join(SRC, 'design/hero', file);
const cs = (file) => path.join(SRC, 'design/case-study', file);

/**
 * Framing copied from Figma (get_design_context): the layer's box size in px (including its border,
 * `border` px wide, default 2) and the image fill's position/size as percentages of the inner box.
 * `cover: true` = object-fit: cover.
 */
function figmaCrop(meta, { box: [boxW, boxH], border = 2, cover, img }) {
  const w = boxW - 2 * border;
  const h = boxH - 2 * border;
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

/** Crops a source with `figma` framing (or a plain `crop`) and returns a PNG buffer. */
async function framed(file, { crop, figma } = {}) {
  let img = sharp(file).rotate();
  if (crop) img = img.extract(crop);
  if (figma) img = img.extract(figmaCrop(await sharp(file).metadata(), figma));
  return img.png().toBuffer();
}

/** slug → { file, crop?, figma?, overlay?, widths?, whiten? } */
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

  // "The complexity lived in the handoffs": Main evidence (101:14804) and Evidence blocks (101:14844).
  'cs-asset-scheduler': { file: cs('asset-scheduler.png'), figma: { box: [1040, 571], img: { left: 0, top: -0.49, width: 100.38, height: 114.35 } } },
  'cs-scale': { file: cs('scale.png'), figma: { box: [475.333, 178], border: 1, img: { left: -6.04, top: -45.55, width: 110.22, height: 190.21 } } },
  'cs-dependency-a': { file: cs('dependency-a.png'), figma: { box: [302, 178], border: 1, img: { left: -62.61, top: -42.01, width: 182.84, height: 222.29 } } },
  'cs-dependency-b': { file: cs('dependency-b.png'), figma: { box: [165, 178], border: 1, img: { left: -173.95, top: 0.21, width: 274.61, height: 173.6 } } },
  'cs-change-timesheets': { file: hero('timesheets.png'), figma: { box: [267, 170], border: 1, img: { left: -0.13, top: -0.97, width: 100.02, height: 224.51 } } },
  'cs-change-invoicing': { file: hero('invoicing.png'), figma: { box: [199, 170], border: 1, img: { left: -1, top: -2.04, width: 253.5, height: 214.26 } } },

  // "The Assignment connected what happened next": Frame 1334 (258:25526).
  'cs-panel-timesheets': { file: hero('timesheets.png'), figma: { box: [616, 391.86], border: 1, img: { left: -0.13, top: -0.97, width: 100.02, height: 224.51 } } },
  // The Invoicing panel is a composite in Figma (several captures and masks); invoicing-panel.png is its 2x
  // export (259:25528). Trim the exported 1px stroke, then lay the "Invoicing" title (264:25562) back on top.
  'cs-panel-invoicing': {
    file: cs('invoicing-panel.png'),
    crop: { left: 2, top: 2, width: 1232, height: 784 },
    overlay: { file: hero('invoicing.png'), figma: { box: [125, 40], border: 0, img: { left: -3.2, top: -17.35, width: 813.64, height: 1821.24 } }, left: 0, top: 10, width: 250, height: 80 },
  },

  // Design-only artwork exported from the Figma file
  'hero-gradient': { file: design('44901.png'), widths: [1440] },
  'contract-scheduler': { file: design('2bea8.png') },
  'assignment-detail': { file: design('6cd4d.png') },
  'labour-resources': { file: design('16b2b.png') },
  // "The work existed before a resource was assigned": Frame 1331 (234:22584) and Frame 1332 (234:23615).
  'research-whiteboard': { file: design('df8ec.png') },
  'research-spreadsheet': { file: design('432df.png'), figma: { box: [248, 245], img: { left: 0, top: 0, width: 228.39, height: 100 } } },
  'research-screen': { file: design('2ad94.png'), figma: { box: [375, 245], img: { left: -0.03, top: -18.79, width: 136.93, height: 157.18 } } },
  'legacy-scheduler': { file: design('a5e41.png'), figma: { box: [1006, 231], border: 0, img: { left: -0.3, top: -1.33, width: 100.6, height: 102.67 } } },
  'assignment-mockup': { file: design('fe8f0.png'), figma: { box: [758, 328], border: 1.5, img: { left: -2.9, top: -6.74, width: 105.8, height: 113.17 } } },
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

for (const [slug, entry] of Object.entries(MANIFEST)) {
  if (only.length && !only.includes(slug)) continue;
  const { file, overlay, widths = DEFAULT_WIDTHS, whiten } = entry;
  let buf = await framed(file, entry);
  if (overlay) {
    const layer = await sharp(await framed(overlay.file, overlay)).resize(overlay.width, overlay.height, { fit: 'fill' }).png().toBuffer();
    buf = await sharp(buf).composite([{ input: layer, left: overlay.left, top: overlay.top }]).png().toBuffer();
  }
  if (whiten) buf = await sharp(buf).linear(255 / 243, 0).png().toBuffer();
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
