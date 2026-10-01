import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { CONTACT, CV, HOME } from '../links';

interface Props {
  /** Marks the matching nav item with aria-current. */
  current?: 'cv' | 'contact';
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
export function SiteHeader({ current }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [floating, setFloating] = useState(false);

  // Show the toolbar once the header's bottom edge has scrolled above the viewport. setState skips re-rendering
  // when the value is unchanged, so checking on every scroll event is cheap.
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (el) setFloating(el.getBoundingClientRect().bottom < 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      <header ref={ref} className="site-header">
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
        <div className={`float-nav${floating ? ' is-visible' : ''}`}>
          <Link to={HOME} className="float-nav__mark" aria-label="Dan Hemsley, home">
            <img src="/favicon.svg" width="40" height="40" alt="" />
          </Link>
          <nav aria-label="Main navigation (floating)">
            <NavLinks current={current} />
          </nav>
        </div>,
        document.body,
      )}
    </>
  );
}
