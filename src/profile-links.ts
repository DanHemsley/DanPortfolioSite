/**
 * External profile links and the downloadable CV.
 *
 * `null` means "not supplied yet": the matching buttons render as visibly
 * disabled instead of broken links.
 */
export const PROFILE_LINKS = {
  linkedIn: 'https://linkedin.com/in/dan-hemsley-4ba363178',

  email: 'danhemsley83@gmail.com' as string | null,

  // Drop the PDF at public/dan-hemsley-cv.pdf. The build checks for it
  // (see vite.config.ts) and enables the download buttons automatically.
  // typeof guard: environments that don't apply Vite's define (e.g. Figma Make's dev server) treat the PDF as missing instead of crashing.
  cvPdf: typeof __CV_PDF_AVAILABLE__ !== 'undefined' && __CV_PDF_AVAILABLE__ ? '/dan-hemsley-cv.pdf' : null,
};

export const CV_PDF_PATH = 'public/dan-hemsley-cv.pdf';
