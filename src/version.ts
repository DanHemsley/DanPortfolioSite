// Site version for the homepage logo tooltip. Imported straight from package.json
// (Vite bundles only this field), so it works in any environment, including
// Figma Make's dev server, and always matches the bumped version.
import { version } from '../package.json';

export const SITE_VERSION = `v${version}`;
