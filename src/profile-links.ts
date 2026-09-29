/**
 * External profile links and the downloadable CV.
 *
 * `null` means "not supplied yet": the matching buttons render as visibly
 * disabled instead of broken links.
 */
export const PROFILE_LINKS = {
  linkedIn: 'https://linkedin.com/in/dan-hemsley-4ba363178',

  // TODO(Dan): confirm the address. The brief supplied "mailto@gmail.com", which
  // looks like a placeholder (and is someone else's Gmail address), so it's not
  // published. Set e.g. 'you@example.com' here.
  email: null as string | null,

  // Drop the PDF at public/dan-hemsley-cv.pdf. The build checks for it
  // (see vite.config.ts) and enables the download buttons automatically.
  cvPdf: __CV_PDF_AVAILABLE__ ? '/dan-hemsley-cv.pdf' : null,
};

export const CV_PDF_PATH = 'public/dan-hemsley-cv.pdf';
