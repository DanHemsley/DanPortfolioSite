// Site version, shown in the homepage logo tooltip so Dan can confirm which build Figma Make is serving.
//
// Kept here (not read from package.json) because Figma Make keeps its own package.json and doesn't take
// changes to it on pull, so a version stored there never updates in Figma. Source files do sync.
//
// Only claude/* branches bump this, once per branch (see .claude/CLAUDE.md). Keep package.json in step.
export const SITE_VERSION = 'v0.5.5';
