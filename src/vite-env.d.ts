/// <reference types="vite/client" />

/** True when public/dan-hemsley-cv.pdf exists at build time. May be undefined where Vite's define isn't applied: guard with typeof. */
declare const __CV_PDF_AVAILABLE__: boolean;
