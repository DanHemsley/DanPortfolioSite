import { useEffect, useLayoutEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { CASE_STUDY, CONTACT, CV, HOME } from './links';

/**
 * Page transitions.
 *
 * - Internal link clicks run inside a View Transition: the old page eases out while the new one eases in
 *   (CSS in main.css, "Page transitions"). The header logo and nav are named, so they hold still between pages.
 * - First load, back/forward, and browsers without View Transitions get a short entrance animation instead.
 * - Reduced motion: no interception and no animation; pages switch instantly.
 *
 * Wired here rather than through React Router's own `viewTransition` option, so it works whichever
 * react-router-dom version Figma Make has installed.
 */

type ViewTransition = { finished: Promise<void> };
type DocumentWithVT = Document & { startViewTransition?: (update: () => Promise<void> | void) => ViewTransition };

const ROUTES = new Set<string>([HOME, CASE_STUDY, CV, CONTACT]);

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Wait (briefly) for the new page's priority images, so they're in the incoming snapshot rather than popping in. */
function priorityImagesReady(maxWait = 300) {
  const imgs = [...document.querySelectorAll<HTMLImageElement>('main img[fetchpriority="high"]')].filter((i) => !i.complete);
  if (!imgs.length) return Promise.resolve();
  const loaded = Promise.all(imgs.map((i) => i.decode().catch(() => undefined)));
  return Promise.race([loaded, new Promise((r) => setTimeout(r, maxWait))]).then(() => undefined);
}

/** Replays the entrance animation (first load, back/forward, no View Transition support). */
function playEntrance() {
  if (prefersReducedMotion()) return;
  const root = document.documentElement;
  root.removeAttribute('data-page-enter');
  void root.offsetWidth; // restart the animation if it was already running
  root.setAttribute('data-page-enter', '');
  window.setTimeout(() => root.removeAttribute('data-page-enter'), 700);
}

export function PageTransitions() {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  // True while a navigation is being driven by a View Transition (which animates on its own).
  const viaTransition = useRef(false);

  // Start each new page at the top (instantly: the page has smooth scrolling for in-page anchors), or at its #anchor.
  // Layout effect, so the incoming View Transition snapshot is already scrolled.
  useLayoutEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  // Entrance animation when the page changed without a View Transition (including the first load).
  useEffect(() => {
    if (viaTransition.current) viaTransition.current = false;
    else playEntrance();
  }, [pathname]);

  // Route internal link clicks through a View Transition.
  useEffect(() => {
    const doc = document as DocumentWithVT;
    if (!doc.startViewTransition) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || a.hasAttribute('download') || (a.target && a.target !== '_self')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || !ROUTES.has(url.pathname)) return;
      if (url.pathname === window.location.pathname) return; // same page (#anchors): leave to the browser/router
      if (prefersReducedMotion()) return;

      // Stop the browser and React Router's own handling; navigate inside the transition instead.
      e.preventDefault();
      viaTransition.current = true;
      doc.startViewTransition!(async () => {
        flushSync(() => navigate(url.pathname + url.search + url.hash));
        await priorityImagesReady();
      });
    };

    // Capture phase on document runs before React's handlers on #root, so the Link sees defaultPrevented.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [navigate]);

  return null;
}
