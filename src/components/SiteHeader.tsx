import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { CONTACT, CV, HOME } from '../links';
import { ArrowIcon } from './icons';

interface Props {
  /** Marks the matching nav item with aria-current. */
  current?: 'cv' | 'contact';
  /** Long pages: the floating toolbar shows the current section's heading and a reading-progress border (desktop). */
  progress?: boolean;
}

/** The page's sections, and the one being read: the last whose top has passed 40% of the viewport. */
function readSections() {
  const sections = [...document.querySelectorAll<HTMLElement>('main section[aria-labelledby]')];
  const line = window.innerHeight * 0.4;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  let index = 0;
  if (atBottom) index = sections.length - 1;
  else sections.forEach((s, i) => s.getBoundingClientRect().top <= line && (index = i));
  const heading = sections[index] && document.getElementById(sections[index].getAttribute('aria-labelledby') ?? '');
  return { sections, index, atBottom, title: heading?.textContent?.trim() ?? '' };
}

/** Where the previous/next controls go from here. Previous returns to the start of the current section first. */
function sectionTargets() {
  const { sections, index, atBottom } = readSections();
  const scrollPad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const intoCurrent = sections[index] ? sections[index].getBoundingClientRect().top < scrollPad - 24 : false;
  const prev = intoCurrent ? index : index - 1;
  const next = atBottom ? -1 : index + 1;
  return { sections, prev: prev >= 0 && window.scrollY > 0 ? prev : -1, next: next < sections.length ? next : -1 };
}

const DESKTOP = '(min-width: 1024px)';

/**
 * Reading progress drawn as the toolbar's own border: a stroke that runs clockwise from the top-left of the pill.
 * Sized to the toolbar with a ResizeObserver; the stroke length is set directly (no re-render per scroll).
 */
function ProgressBorder({ value }: { value: MutableRefObject<(p: number) => void> }) {
  const svg = useRef<SVGSVGElement>(null);
  const rect = useRef<SVGRectElement>(null);
  useEffect(() => {
    const el = svg.current?.parentElement;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      const r = rect.current;
      if (!r || !width) return;
      // Stroke centred on the pill's 1px border.
      r.setAttribute('x', '0.5');
      r.setAttribute('y', '0.5');
      r.setAttribute('width', String(width - 1));
      r.setAttribute('height', String(height - 1));
      r.setAttribute('rx', String((height - 1) / 2));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  value.current = (p) => rect.current?.style.setProperty('stroke-dasharray', `${(p * 100).toFixed(2)} 100`);
  return (
    <svg ref={svg} className="float-nav__progress" aria-hidden="true" focusable="false">
      <rect ref={rect} pathLength={100} />
    </svg>
  );
}

const ITEMS = [
  { key: 'cv', href: CV, label: 'CV' },
  { key: 'contact', href: CONTACT, label: 'Contact' },
] as const;

function NavLinks({ current }: Pick<Props, 'current'>) {
  return (
    <ul className="nav">
      {ITEMS.map((item) => (
        <li key={item.key}>
          <Link className="nav__link" to={item.href} aria-current={current === item.key ? 'page' : undefined}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Page header: logo and nav at the top of the page, plus a floating toolbar that slides in once the header has
 * scrolled out of view. The toolbar is portalled to <body> so the page sheet's clipping and stacking can't affect it,
 * and is `visibility: hidden` while out, so it's skipped by keyboard and screen readers until it appears.
 */
export function SiteHeader({ current, progress }: Props) {
  const ref = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [floating, setFloating] = useState(false);
  const [section, setSection] = useState('');
  const [canStep, setCanStep] = useState({ prev: false, next: true });
  const setProgress = useRef<(p: number) => void>(() => {});
  // While a smooth scroll is under way, repeated presses step on from where it's heading, not where it is.
  const pending = useRef<{ index: number; until: number } | null>(null);

  const goToSection = (dir: -1 | 1) => {
    const { sections, prev, next } = sectionTargets();
    let target = dir < 0 ? prev : next;
    if (pending.current && Date.now() < pending.current.until) {
      target = pending.current.index + dir;
      if (target < 0 || target >= sections.length) return;
    }
    if (target < 0) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    pending.current = { index: target, until: Date.now() + (smooth ? 700 : 0) };
    // html scroll-padding-top keeps the heading clear of the toolbar.
    sections[target].scrollIntoView({ behavior: smooth ? 'smooth' : ('instant' as ScrollBehavior), block: 'start' });
  };
  const goRef = useRef(goToSection);
  goRef.current = goToSection;

  // Show the toolbar once the header's bottom edge has scrolled above the viewport. setState skips re-rendering
  // when the value is unchanged, so checking on every scroll event is cheap.
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (el) setFloating(el.getBoundingClientRect().bottom < 0);
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress.current(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
        setSection(readSections().title);
        const { prev, next } = sectionTargets();
        setCanStep((c) => (c.prev === prev >= 0 && c.next === next >= 0 ? c : { prev: prev >= 0, next: next >= 0 }));
      }
    };
    // While the page is scrolling, the progress stroke shows at full strength (data-scrolling); it settles back to
    // a light tone shortly after scrolling stops. An attribute, not a class, so React's className can't clear it.
    let idle = 0;
    const onScroll = () => {
      update();
      if (!progress || !bar.current) return;
      bar.current.setAttribute('data-scrolling', '');
      window.clearTimeout(idle);
      idle = window.setTimeout(() => bar.current?.removeAttribute('data-scrolling'), 700);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      window.clearTimeout(idle);
    };
  }, [progress]);

  // Up/down arrow keys step between sections on desktop (long pages only). Left alone when typing, with modifier
  // keys, or while the image viewer (a modal <dialog>) is open.
  useEffect(() => {
    if (!progress) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (!window.matchMedia(DESKTOP).matches || document.querySelector('dialog[open]')) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest('input, textarea, select, [contenteditable="true"]')) return;
      e.preventDefault();
      goRef.current(e.key === 'ArrowDown' ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [progress]);

  return (
    <>
      {/* Named for page transitions only while on screen (see PageTransitions / main.css). */}
      <header ref={ref} className={floating ? 'site-header' : 'site-header site-header--anchored'}>
        <div className="container container--wide site-header__inner">
          <Link to={HOME} className="site-header__mark" aria-label="Dan Hemsley, home">
            <img src="/logo-mark.svg" width="72" height="72" alt="" />
          </Link>
          <nav aria-label="Main navigation">
            <NavLinks current={current} />
          </nav>
        </div>
      </header>
      {createPortal(
        <div ref={bar} className={`float-nav${floating ? ' is-visible' : ''}${progress ? ' float-nav--progress' : ''}`}>
          {progress && <ProgressBorder value={setProgress} />}
          <Link to={HOME} className="float-nav__mark" aria-label="Dan Hemsley, home">
            {/* Flat logo (no baked-in drop shadow), cropped to the circle. */}
            <img src="/logo-mark.svg" width="44" height="44" alt="" />
          </Link>
          {progress && (
            // Visual cue only: the headings themselves are in the page for screen readers.
            <p className="float-nav__section" aria-hidden="true">
              <span key={section}>{section}</span>
            </p>
          )}
          {progress && (
            <div className="float-nav__steps">
              <button type="button" className="float-nav__step" aria-label="Previous section" title="Previous section (↑)" disabled={!canStep.prev} onClick={() => goToSection(-1)}>
                <ArrowIcon direction="up" size={20} />
              </button>
              <button type="button" className="float-nav__step" aria-label="Next section" title="Next section (↓)" disabled={!canStep.next} onClick={() => goToSection(1)}>
                <ArrowIcon direction="down" size={20} />
              </button>
            </div>
          )}
          <nav aria-label="Main navigation (floating)">
            <NavLinks current={current} />
          </nav>
        </div>,
        document.body,
      )}
    </>
  );
}
