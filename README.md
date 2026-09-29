# Dan Hemsley — portfolio

Dan Hemsley’s portfolio: homepage, UpRate case study, CV and contact. React + TypeScript (Vite), published through Figma Make from `main`.

## Pages

A single-page app: one `index.html`, with React Router rendering each route (`src/main.tsx`). This is what Figma Make supports.

| Route | Component |
| --- | --- |
| `/` | `src/pages/Home.tsx` (Lander Welcome) |
| `/uprate` | `src/pages/CaseStudy.tsx` |
| `/cv` | `src/pages/CvPage.tsx` (copy in `src/cv-content.ts`) |
| `/contact` | `src/pages/PendingPage.tsx` (placeholder) |

Routes live in `src/links.ts`; each page sets its own title, description and canonical URL with `usePageMeta`. Unknown URLs redirect to `/`. The host must serve `index.html` for every path (Figma Make and `vite preview` do this).

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

Needs **Node 18.18 or newer** (Node 20 recommended). `sharp` is optional: only `npm run images` uses it, and it needs the original screenshots, which are kept locally.

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
