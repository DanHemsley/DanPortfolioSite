import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { CONTACT, CV, HOME } from '../links';

interface Props {
  /** Marks the matching nav item with aria-current. */
  current?: 'cv' | 'contact';
  /** Long pages: the floating toolbar shows the current section's heading and a reading-progress border (desktop). */
  progress?: boolean;
}

/** The heading text of the section being read: the last section whose top has passed 40% of the viewport. */
function currentSectionTitle() {
  const sections = [...document.querySelectorAll<HTMLElement>('main section[aria-labelledby]')];
  const line = window.innerHeight * 0.4;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  let active = atBottom ? sections[sections.length - 1] : undefined;
  if (!active) for (const s of sections) if (s.getBoundingClientRect().top <= line) active = s;
  const heading = active && document.getElementById(active.getAttribute('aria-labelledby') ?? '');
  return heading?.textContent?.trim() ?? '';
}

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
  const [floating, setFloating] = useState(false);
  const [section, setSection] = useState('');
  const setProgress = useRef<(p: number) => void>(() => {});

  // Show the toolbar once the header's bottom edge has scrolled above the viewport. setState skips re-rendering
  // when the value is unchanged, so checking on every scroll event is cheap.
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (el) setFloating(el.getBoundingClientRect().bottom < 0);
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress.current(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
        setSection(currentSectionTitle());
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [progress]);

  return (
    <>
      {/* Named for page transitions only while on screen (see PageTransitions / main.css). */}
      <header ref={ref} className={floating ? 'site-header' : 'site-header site-header--anchored'}>
        <div className="container container--wide site-header__inner">
          <Link to={HOME} className="site-header__mark" aria-label="Dan Hemsley, home">
            <img src="/favicon.svg" width="72" height="72" alt="" />
          </Link>
          <nav aria-label="Main navigation">
            <NavLinks current={current} />
          </nav>
        </div>
      </header>
      {createPortal(
        <div className={`float-nav${floating ? ' is-visible' : ''}${progress ? ' float-nav--progress' : ''}`}>
          {progress && <ProgressBorder value={setProgress} />}
          <Link to={HOME} className="float-nav__mark" aria-label="Dan Hemsley, home">
            <img src="/favicon.svg" width="40" height="40" alt="" />
          </Link>
          {progress && (
            // Visual cue only: the headings themselves are in the page for screen readers.
            <p className="float-nav__section" aria-hidden="true">
              <span key={section}>{section}</span>
            </p>
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
