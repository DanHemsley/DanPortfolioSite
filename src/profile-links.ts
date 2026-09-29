/**
 * External profile links and the downloadable CV.
 *
 * `null` means "not supplied yet": the matching buttons render as visibly
 * disabled instead of broken links.
 */
export const PROFILE_LINKS = {
  // Canonical handle, matching the CV PDF.
  linkedIn: 'https://linkedin.com/in/danhemsley1983',

  // Canonical address, matching the CV PDF.
  email: 'danieljhemsley@gmail.com' as string | null,

  // Served from public/dan-hemsley-cv.pdf. Replace that file to update the CV.
  cvPdf: '/dan-hemsley-cv.pdf' as string | null,
};
