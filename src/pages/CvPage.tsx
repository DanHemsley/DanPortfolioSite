import { ActionLink } from '../components/ActionLink';
import { Dot } from '../components/icons';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { cvCapabilities, cvContact, cvEducation, cvExperience, cvHero, cvProfile, cvStats, type Position } from '../cv-content';
import { CASE_STUDY, HOME } from '../links';
import { PROFILE_LINKS } from '../profile-links';

const email = PROFILE_LINKS.email ? `mailto:${PROFILE_LINKS.email}` : null;

const DownloadCv = ({ primary }: { primary?: boolean }) => (
  <ActionLink href={PROFILE_LINKS.cvPdf} variant={primary ? 'primary' : 'secondary'} srSuffix="(PDF)" download>
    Download my CV
  </ActionLink>
);
const LinkedIn = () => (
  <ActionLink href={PROFILE_LINKS.linkedIn} srSuffix="(Dan Hemsley’s profile, opens in a new tab)" external>
    LinkedIn
  </ActionLink>
);
const EmailMe = ({ primary }: { primary?: boolean }) => (
  <ActionLink href={email} variant={primary ? 'primary' : 'secondary'}>
    Email me
  </ActionLink>
);

function Role({ p }: { p: Position }) {
  const headingId = `role-${p.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <li>
      <article className={`role role--${p.tier}`} aria-labelledby={headingId}>
        <header className="role__meta">
          <h3 id={headingId} className="role__company">
            {p.company}
          </h3>
          <p className="role__title">{p.role}</p>
          <p className="role__dates">
            {p.dates}
            {p.context && <> · {p.context}</>}
          </p>
        </header>
        <div className="role__body">
          {p.summary && <p className="role__summary">{p.summary}</p>}
          <ul className="role__points">
            {p.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          {p.caseStudy && (
            <p className="role__action">
              <ActionLink href={CASE_STUDY} variant="primary" arrow>
                {p.caseStudy.label}
              </ActionLink>
            </p>
          )}
        </div>
      </article>
    </li>
  );
}

export function CvPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader current="cv" />
      <main id="main" tabIndex={-1} className="cv">
        {/* 1. Hero */}
        <section className="cv-hero" aria-labelledby="cv-name">
          <div className="container">
            <h1 id="cv-name" className="cv-hero__name">
              {cvHero.name}
            </h1>
            <p className="cv-hero__role">{cvHero.role}</p>
            <p className="cv-hero__statement">{cvHero.statement}</p>
            <p className="cv-hero__intro">{cvHero.intro}</p>
            <p className="cv-hero__location">
              <Dot accent="blue" />
              {cvHero.location}
            </p>
            <div className="actions">
              <DownloadCv primary />
              <LinkedIn />
              <EmailMe />
            </div>
          </div>
        </section>

        {/* 2. At a glance */}
        <section className="cv-section cv-section--tight" aria-labelledby="cv-glance">
          <div className="container">
            <h2 id="cv-glance" className="sr-only">
              At a glance
            </h2>
            <ul className="stats">
              {cvStats.map((s) => (
                <li key={s.value} className={`stat accent-border-${s.accent}`}>
                  <p className="stat__value">{s.value}</p>
                  <p className="stat__text">{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Profile */}
        <section className="cv-section" aria-labelledby="cv-profile">
          <div className="container cv-split">
            <h2 id="cv-profile" className="cv-h2">
              {cvProfile.title}
            </h2>
            <div className="cv-prose">
              <p className="cv-prose__statement">{cvProfile.statement}</p>
              {cvProfile.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Experience */}
        <section className="cv-section" aria-labelledby="cv-experience">
          <div className="container">
            <h2 id="cv-experience" className="cv-h2 cv-h2--block">
              Experience
            </h2>
            <ol className="roles">
              {cvExperience.map((p) => (
                <Role key={p.company} p={p} />
              ))}
            </ol>
          </div>
        </section>

        {/* 5. Capabilities */}
        <section className="cv-section" aria-labelledby="cv-capabilities">
          <div className="container">
            <h2 id="cv-capabilities" className="cv-h2 cv-h2--block">
              Capabilities
            </h2>
            <div className="capabilities">
              {cvCapabilities.map((c) => (
                <div key={c.title} className="capability">
                  <h3 className="capability__title">
                    <Dot accent={c.accent} />
                    {c.title}
                  </h3>
                  <ul className="capability__items">
                    {c.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Education */}
        <section className="cv-section cv-section--tight" aria-labelledby="cv-education">
          <div className="container cv-split">
            <h2 id="cv-education" className="cv-h2">
              Education
            </h2>
            <div className="education">
              <h3 className="education__school">{cvEducation.school}</h3>
              <p>
                {cvEducation.degree} <span className="education__dates">· {cvEducation.dates}</span>
              </p>
            </div>
          </div>
        </section>

        {/* 7. Contact call to action */}
        <section className="cv-section" aria-labelledby="cv-contact">
          <div className="container">
            <div className="cv-cta">
              <h2 id="cv-contact" className="cv-h2">
                {cvContact.title}
              </h2>
              <p className="cv-cta__text">{cvContact.text}</p>
              <div className="actions actions--center">
                <EmailMe primary />
                <LinkedIn />
                <DownloadCv />
                <ActionLink href={HOME}>View my work</ActionLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
