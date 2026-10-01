import type { ReactNode } from 'react';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

interface Props {
  current?: 'cv' | 'contact';
  children: ReactNode;
}

/**
 * Shared page frame for the case study, CV and contact pages: a slanted white sheet over a faint gradient
 * (Figma 'Case study page': Rectangle 854 / image 83) with the site header on top, and the site footer below.
 */
export function SheetPage({ current, children }: Props) {
  return (
    <>
      <div className="sheet-page">
        <div className="sheet-page__sheet" aria-hidden="true" />
        <SiteHeader current={current} />
        {children}
      </div>
      <SiteFooter />
    </>
  );
}
