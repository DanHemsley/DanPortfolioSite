import { LightboxProvider } from '../components/Lightbox';
import { SiteHeader } from '../components/SiteHeader';
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
  return (
    <LightboxProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
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
    </LightboxProvider>
  );
}
