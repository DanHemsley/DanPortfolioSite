# UpRate case study — Dan Hemsley

A static React + TypeScript (Vite) build of the UpRate case study.

## Pages

| URL | Source |
| --- | --- |
| `/` | `index.html` → `src/pages/Home.tsx` (Lander Welcome) |
| `/uprate/` | `uprate/index.html` → `src/pages/CaseStudy.tsx` |
| `/cv/` | `cv/index.html` → `src/pages/CvPage.tsx` (copy in `src/cv-content.ts`) |
| `/contact/` | `contact/index.html` → `src/pages/PendingPage.tsx` (placeholder) |

Each page is its own HTML file, so every URL works on any static host with no rewrite rules. Shared URLs live in `src/links.ts`.

## Before publishing

- **CV PDF:** add `public/dan-hemsley-cv.pdf`. The build detects it and enables every "Download my CV" button (it warns while the file is missing).
- **Email:** set `PROFILE_LINKS.email` in `src/profile-links.ts`. Until then the "Email me" buttons render as disabled.
- **Contact page:** replace the placeholder in `src/pages/PendingPage.tsx`.

## Commands

```bash
npm install
npm run images   # regenerate public/img from assets/source (only needed when images change)
npm run dev      # local dev server on http://localhost:8080 (also F5 in VS Code)
npm run build    # production build into dist/
npm run preview  # serve dist/ locally
```

Needs Node 16+.

## Deploying to your domain

`dist/` is a plain static site. Any static host works, for example:

- **Netlify / Cloudflare Pages / Vercel:** connect the repo, build command `npm run build`, output directory `dist`, then add `danhemsley.com` as a custom domain and follow the host's DNS instructions.
- **Manual:** upload the contents of `dist/` to any web server.

The canonical URLs and social-preview image in each page's `index.html` point to `https://danhemsley.com/`. Change them if you use a different domain.

## Where things live

| Path | What |
| --- | --- |
| `src/content.ts` | All case-study copy (verbatim from the design) and image alt text |
| `src/sections/` | One component per page section, in page order |
| `src/components/` | Header, responsive `Figure`, `Lightbox`, `Flow` chips, icons |
| `src/styles/main.css` | Design tokens and all styles |
| `scripts/build-images.mjs` | Image manifest: which source file and crop feeds each slot |
| `assets/source/screenshots/` | Copies of the original captures (git-ignored; they include browser chrome) |
| `assets/source/design/` | Artwork exported from the Figma design that isn't in the screenshot folder |

To swap a screenshot, change its entry in `scripts/build-images.mjs` and run `npm run images`.
