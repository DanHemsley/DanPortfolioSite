import type { ReactNode } from 'react';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

interface Props {
  current?: 'cv' | 'contact';
  /**
   * Short pages (e.g. contact): header, main and footer together fill the viewport, with the main content centred
   * vertically between header and footer. Taller content just flows.
   */
  fill?: boolean;
  /** Long pages: section heading + reading-progress border in the floating toolbar (desktop). */
  progress?: boolean;
  children: ReactNode;
}

/**
 * Shared page frame for the case study, CV and contact pages: a slanted white sheet over a faint gradient
 * (Figma 'Case study page': Rectangle 854 / image 83) with the site header on top, and the site footer below.
 */
export function SheetPage({ current, fill, progress, children }: Props) {
  const page = (
    <>
      <div className="sheet-page">
        <div className="sheet-page__sheet" aria-hidden="true" />
        <SiteHeader current={current} progress={progress} />
        {children}
      </div>
      <SiteFooter />
    </>
  );
  return fill ? <div className="page-fill">{page}</div> : page;
}
