import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon } from './icons';

interface Props {
  /** `null` = destination not supplied yet: rendered as a disabled pill, never a broken link. */
  href: string | null;
  children: ReactNode;
  /** primary: dark. secondary: white, for tinted backgrounds. tertiary: tinted, for white backgrounds. */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Extra words for screen readers, e.g. "(PDF)" or "(opens in a new tab)". */
  srSuffix?: string;
  external?: boolean;
  download?: boolean;
  arrow?: boolean;
}

export function ActionLink({ href, children, variant = 'secondary', srSuffix, external, download, arrow }: Props) {
  const className =
    variant === 'primary' ? 'button' : variant === 'tertiary' ? 'nav__link nav__link--tertiary action' : 'nav__link action';
  if (!href) {
    return (
      <span className={`${className} is-unavailable`} aria-disabled="true" title="Not available yet">
        {children}
        <span className="sr-only"> (not available yet)</span>
      </span>
    );
  }
  // Internal routes ("/uprate") navigate client-side; files like the PDF load normally.
  if (href.startsWith('/') && !download) {
    return (
      <Link className={className} to={href}>
        {children}
        {srSuffix && <span className="sr-only"> {srSuffix}</span>}
        {arrow && <ArrowIcon size={20} />}
      </Link>
    );
  }
  return (
    <a
      className={className}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: '' } : {})}
    >
      {children}
      {srSuffix && <span className="sr-only"> {srSuffix}</span>}
      {arrow && <ArrowIcon size={20} />}
    </a>
  );
}
