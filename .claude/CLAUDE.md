# Dan Hemsley portfolio: instructions for Claude

Dan's portfolio (danhemsley.com): homepage, UpRate case study, CV, contact.
React 18 + TypeScript + Vite 6, single-page app with React Router. Published through **Figma Make**.

This file lives in `.claude/` on purpose: Figma Make keeps its own untracked
`CLAUDE.md` / `AGENTS.md` at the repo root, and a tracked root file would clash with them.

## Branch workflow

| Branch | Owner | Rule |
| --- | --- | --- |
| `main` | Dan | Source of truth = what's live. Changes only via pull request. Never commit or push to it directly. |
| `figma` | Figma Make | Figma's working branch; it commits here itself. Never commit to it. |
| `claude/<topic>` | Claude | One short-lived branch per task, cut from the latest `origin/main`. |

Flow: `claude/<topic>` → PR → `main` → PR → `figma` → Figma Make preview → publish.
Changes made in Figma come back via a `figma` → `main` PR.

### How to work

1. `git fetch`, then create the branch **in a separate worktree** so Dan's checkout is never switched or modified:
   `git worktree add -b claude/<topic> <scratch-dir> origin/main`
   Dan's local folder may be on `figma` or have uncommitted changes. Don't touch it.
2. Make the change, **bump the site version** (below), then verify.
3. Push with `git push -u origin claude/<topic>` and give Dan the compare link to open the PR:
   `https://github.com/DanHemsley/DanPortfolioSite/compare/main...claude/<topic>?expand=1`
   (the `gh` CLI isn't installed).
4. After Dan merges, remind him to sync `main` → `figma` (PR) before publishing from Figma Make.
5. Remove the worktree when done.

Before committing, check `git status -sb` shows the expected branch. A commit once landed on
`figma` by mistake because the checkout had been switched underneath.

## Site version

The homepage logo (`.home__mark`) shows the site version as a native tooltip (`title="v0.1.0"`), so Dan can
confirm Figma Make is serving the latest build. The version comes from `package.json` and is injected at build
time as `__APP_VERSION__` (`vite.config.ts`).

- **Every `claude/*` branch bumps it exactly once**, with `npm version <x.y.z> --no-git-tag-version` (updates
  `package.json` and `package-lock.json`). Patch for fixes and content, minor for new pages or features.
  Check `origin/main`'s version first so two branches don't claim the same number.
- **Only `claude/*` branches change the version.** Figma must never edit it; if `figma` shows a different number
  from `main`, it hasn't pulled the latest.
- State the new version in the PR description and in the reply to Dan.

## Rules learned the hard way

- **Dependencies change only on `claude/*` branches.** Figma and local machines both running npm caused
  lockfile churn and broken installs. Never run `npm audit fix --force`.
- **Never delete or rename files in Figma Make's workspace**, even ones the app doesn't import
  (`src/App.tsx`, `src/index.css`, `src/entries/`, `src/shared.tsx` may exist there). Deleting them broke publishing.
- Figma Make serves its own `index.html` template (only title + lang filled from its site settings). Per-route
  metadata is created at runtime by `src/usePageMeta.ts`; keep it creating missing tags, not just updating them.
- Figma injects `@tailwindcss/vite`, which needs Vite ≥ 5.2. Don't downgrade Vite.
- Node ≥ 18.18 required (Dan's Mac has Node 24).

## Verify before every PR

- `npx tsc --noEmit` and `npm run build` pass.
- Run `npx vite preview --port <free port>` (not 8080; Dan's dev server may be using it) and check `/`, `/uprate`,
  `/cv`, `/contact`: they render, nav links route client-side, per-route title/description/canonical are right,
  no horizontal overflow at 390 / 768 / 1024 / 1440px.

## Content rules

- Copy is supplied by Dan and must stay **verbatim**: `src/content.ts` (case study), `src/cv-content.ts` (CV),
  homepage copy in `src/pages/Home.tsx`. Never invent or reword copy, metrics or testimonials; mark gaps clearly instead.
- Visual language: tokens and type in `src/styles/main.css` (Mona Sans / Menbere / Geist; blue-grey ink;
  blue `#9ECEFA`, coral `#FA9E9E`, violet `#A09EFA`, orange `#FACA9E`). Reuse them; don't add a new style.
- Missing destinations render as disabled pills via `ActionLink` (`href: null`), never as broken or `#` links.

## Open items

- CV PDF: add `public/dan-hemsley-cv.pdf` (buttons enable automatically at build time).
- Email: `PROFILE_LINKS.email` in `src/profile-links.ts` is `null`. The brief's `mailto@gmail.com` looked
  like a placeholder, so it isn't published. Confirm with Dan.
- Contact page: still a placeholder (`src/pages/PendingPage.tsx`).
- "How I Work" nav item removed at Dan's request; the section remains at `/uprate#how-i-work`.

## Images

`npm run images` rebuilds `public/img` from `assets/source` using `sharp` (optional dependency). The original
screenshots are git-ignored because their browser chrome shows a third party's email address, so this only works
on Dan's Mac. Never commit `assets/source/screenshots`.
