# Dan Hemsley portfolio: instructions for Claude

Dan's portfolio (danhemsley.com): homepage, UpRate case study, CV, contact.
React 18 + TypeScript + Vite 6, single-page app with React Router. Published through **Figma Make**.

This file lives in `.claude/` on purpose: Figma Make keeps its own untracked
`CLAUDE.md` / `AGENTS.md` at the repo root, and a tracked root file would clash with them.

## Branch workflow

| Branch | Owner | Rule |
| --- | --- | --- |
| `main` | Dan | Source of truth = what's live. **Protected** (GitHub ruleset): changes only via a PR Dan merges. |
| `figma` | Dan | Delivery branch Figma Make pulls from. **Protected** the same way: only receives `main` → `figma` PRs. |
| `claude/<topic>` | Claude | One short-lived branch per task, cut from the latest `origin/main`. |
| `figma/<topic>` | Figma Make | Only when Dan asks Figma to push something he made in Figma. Merged via PR into `main`. |

Flow: `claude/<topic>` → PR → `main` → PR → `figma` → Figma Make pulls → preview → publish.
Changes Dan makes in Figma stay in Figma's workspace until he asks it to push them to `figma/<topic>`.

Ruleset `protected branches` (repo is public, so it's enforced on the free plan) on `main` and `figma`:
deletions and force pushes blocked, pull request required (0 approvals), empty bypass list. Direct pushes to
either branch are rejected, including Claude's. Check with
`curl -s https://api.github.com/repos/DanHemsley/DanPortfolioSite/rules/branches/main`.

At the start of each task, glance at `git log origin/main` and `origin/figma`: every change should arrive via a
merged PR. Flag anything unexpected before building on it.

Reviewing a `figma/<topic>` PR for Dan: only runtime changes under `src/`, `public/`, `assets/` matter to the site.
Figma's root files (`package.json`, lockfile, `.mcp.json`, `.figma/`) are its own copies; recommend dropping
root-file changes unless Dan wants them, and never let them bump or change `src/version.ts`.

### How to work

1. `git fetch`, then create the branch **in a separate worktree** so Dan's checkout is never switched or modified:
   `git worktree add -b claude/<topic> <scratch-dir> origin/main`
   Dan's local folder may be on any branch or have uncommitted changes. Don't touch it.
2. Make the change, **bump the site version** (below), then verify.
3. Push with `git push -u origin claude/<topic>` and give Dan the compare link to open the PR:
   `https://github.com/DanHemsley/DanPortfolioSite/compare/main...claude/<topic>?expand=1`
   (the `gh` CLI isn't installed).
4. After Dan merges, remind him to sync `main` → `figma` (PR) before publishing from Figma Make.
5. Remove the worktree when done.

Before committing, check `git status -sb` shows the expected branch. A commit once landed on
`figma` by mistake because the checkout had been switched underneath.

## Site version

The homepage logo (`.home__mark`) shows the site version as a native tooltip, so Dan can confirm Figma Make is
serving the latest build. **The source of truth is the `SITE_VERSION` string in `src/version.ts`.**

Don't read it from `package.json`: Figma Make keeps its own `package.json` and ignores changes to it on pull, so
the tooltip stayed on an old number while the rest of the code updated. Also don't use a Vite `define`:
Figma's dev server didn't apply it (`__APP_VERSION__ is not defined`).

- **Every `claude/*` branch bumps it exactly once:** edit `SITE_VERSION` in `src/version.ts`, and keep
  `package.json` in step with `npm version <x.y.z> --no-git-tag-version` (tidiness only; the site doesn't use it).
  Patch for fixes and content, minor for new pages or features. Check `origin/main`'s `src/version.ts` first so
  two branches don't claim the same number.
- **Only `claude/*` branches change the version.** Figma must never edit it; if Figma shows a different number
  from `main`, it hasn't pulled the latest.
- State the new version in the PR description and in the reply to Dan.

## Rules learned the hard way

- **Figma Make only syncs `src/`, `public/` and `assets/` from GitHub.** Root files (`package.json`,
  `package-lock.json`, `vite.config.ts`, `index.html`, `tsconfig.json`) are *not* taken on pull; Figma keeps its
  own. Anything the site needs at runtime must live under those three folders. A change to a root file only
  affects local builds, and needs a separate, explicit request to Figma's agent if Figma must have it too.
  Say so in the PR description whenever a branch touches root files.

- **Dependencies change only on `claude/*` branches.** Figma and local machines both running npm caused
  lockfile churn and broken installs. Never run `npm audit fix --force`.
- **Never delete or rename files in Figma Make's workspace**, even ones the app doesn't import
  (`src/App.tsx`, `src/index.css`, `src/entries/`, `src/shared.tsx` may exist there). Deleting them broke publishing.
- Figma Make serves its own `index.html` template (only title + lang filled from its site settings). Per-route
  metadata is created at runtime by `src/usePageMeta.ts`; keep it creating missing tags, not just updating them.
- Don't rely on Vite `define` constants (or other build-time-only config) in code Figma runs: its dev server
  didn't apply them. Prefer imports and committed files; if a define is unavoidable, guard it with `typeof X !== 'undefined'`.
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

## Canonical details

- Email `danieljhemsley@gmail.com` and LinkedIn `linkedin.com/in/danhemsley1983` (both as on the CV PDF), set in
  `src/profile-links.ts`. Keep the site and `public/dan-hemsley-cv.pdf` consistent.

## Open items

- Contact page: still a placeholder (`src/pages/PendingPage.tsx`).
- "How I Work" nav item removed at Dan's request; the section remains at `/uprate#how-i-work`.

## Images

`npm run images` rebuilds `public/img` from `assets/source` using `sharp` (optional dependency). The original
screenshots are git-ignored because their browser chrome shows a third party's email address, so this only works
on Dan's Mac. Never commit `assets/source/screenshots`.
