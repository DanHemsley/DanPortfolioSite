import { LightboxProvider } from '../components/Lightbox';
import { SheetPage } from '../components/SheetPage';
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
    'UpRate case study | Dan Hemsley',
    'How I redesigned UpRate’s connected back-office scheduling workflow around the Assignment model.',
    CASE_STUDY,
  );
  return (
    <LightboxProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SheetPage progress>
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
      </SheetPage>
    </LightboxProvider>
  );
}
