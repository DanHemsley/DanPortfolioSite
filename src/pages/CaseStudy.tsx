import { LightboxProvider } from '../components/Lightbox';
import { SiteHeader } from '../components/SiteHeader';
import { CASE_STUDY } from '../links';
import { usePageMeta } from '../usePageMeta';
import { Hero } from '../sections/Hero';
import { Connecting } from '../sections/Connecting';
import { Teams } from '../sections/Teams';
import { Handoffs } from '../sections/Handoffs';
import { Convergence } from '../sections/Convergence';
import { WorkExisted } from '../sections/WorkExisted';
import { Decisions } from '../sections/Decisions';
import { Phases } from '../sections/Phases';
import { Outcome } from '../sections/Outcome';
import { ConnectedNext } from '../sections/ConnectedNext';
import { DesignSystem } from '../sections/DesignSystem';
import { HowIWork } from '../sections/HowIWork';
import { Closing } from '../sections/Closing';

export function CaseStudy() {
  usePageMeta(
    'UpRate case study — Dan Hemsley',
    'How I redesigned UpRate’s connected back-office scheduling workflow around the Assignment model.',
    CASE_STUDY,
  );
  return (
    <LightboxProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {/* The page sits on a slanted white sheet over a faint gradient, as in the design (Rectangle 854 / image 83). */}
      <div className="cs-page">
        <div className="cs-page__sheet" aria-hidden="true" />
        <SiteHeader wide />
        <main id="main" tabIndex={-1}>
        <Hero />
        <Connecting />
        <Teams />
        <Handoffs />
        <Convergence />
        <WorkExisted />
        <Decisions />
        <Phases />
        <Outcome />
        <ConnectedNext />
        <DesignSystem />
        <HowIWork />
        <Closing />
        </main>
      </div>
    </LightboxProvider>
  );
}
