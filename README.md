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

Needs **Node 18.18 or newer** (Node 20+ recommended). `sharp` is optional: only `npm run images` uses it, and it needs the original screenshots, which are kept locally.

## Workflow

| Branch | Who | Rule |
| --- | --- | --- |
| `main` | Dan | Source of truth: what's live. Changes only through pull requests. |
| `figma` | Figma Make | Figma's working branch (it commits here itself). |
| `claude/<topic>` | Claude | One short-lived branch per task, cut from `main`. |

```
claude/<topic> ──PR──▶ main ──PR──▶ figma ──▶ Figma Make preview ──▶ Publish
                        ▲                │
                        └──────PR────────┘   (changes made in Figma)
```

1. **Claude's changes:** a `claude/<topic>` branch, tested, then a pull request into `main`.
2. **Sync to Figma:** a pull request from `main` into `figma`; Figma Make pulls it and you check the preview.
3. **Publish** from Figma Make only once `figma` contains everything in `main`.
4. **Figma's changes:** a pull request from `figma` into `main`.

House rules:

- Package upgrades only on `claude/*` branches. Don't run `npm install`/`npm update` in Figma, and never `npm audit fix --force`.
- Don't delete files in Figma Make's workspace. Its template relies on some files the app doesn't import.
- Protect `main` on GitHub (Settings → Branches → require a pull request before merging).

Full instructions for Claude are in `.claude/CLAUDE.md`.

## Publishing

Figma Make builds and publishes the site to danhemsley.com from its workspace (the `figma` branch), using its own `index.html` template. The page title, description, language, favicon and social image come from Figma's **site settings**; each route then sets its own title, description and canonical URL at runtime (`src/usePageMeta.ts`).

`npm run build` still produces a standard static build in `dist/` for local checks or another host. Any host must serve `index.html` for every route.

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
