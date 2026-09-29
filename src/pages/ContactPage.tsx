import { ActionLink } from '../components/ActionLink';
import { Dot } from '../components/icons';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { contactContent as c } from '../contact-content';
import { CASE_STUDY, CONTACT, CV } from '../links';
import { PROFILE_LINKS } from '../profile-links';
import { usePageMeta } from '../usePageMeta';

const email = PROFILE_LINKS.email;
const mailto = email ? `mailto:${email}` : null;

export function ContactPage() {
  usePageMeta(
    'Contact — Dan Hemsley',
    'Contact Dan Hemsley, a Senior Product Designer specialising in complex B2B products, connected workflows and design systems.',
    CONTACT,
  );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader current="contact" />
      <main id="main" tabIndex={-1} className="contact-page">
        <div className="container contact">
          {/* 1–2. Introduction and primary action */}
          <section className="contact__intro" aria-labelledby="contact-title">
            <p className="chip">
              <Dot accent="blue" />
              {c.label}
            </p>
            <h1 id="contact-title" className="contact__title">
              {c.title}
            </h1>
            <p className="contact__lead">{c.intro}</p>
            <p className="contact__body">{c.body}</p>
            <div className="actions contact__primary">
              <ActionLink href={mailto} variant="primary">
                {c.primaryAction}
              </ActionLink>
            </div>
          </section>

          <div className="contact__aside">
            {/* 3. Contact details */}
            <section className="contact-card" aria-label="Contact details">
              <dl className="contact-card__list">
                <div className="contact-card__row">
                  <dt>
                    <Dot accent="blue" />
                    {c.details.emailLabel}
                  </dt>
                  <dd>
                    {mailto ? (
                      <a className="contact-card__link" href={mailto}>
                        {email}
                      </a>
                    ) : null}
                  </dd>
                </div>
                <div className="contact-card__row">
                  <dt>
                    <Dot accent="red" />
                    {c.details.linkedInLabel}
                  </dt>
                  <dd>
                    <a className="contact-card__link" href={PROFILE_LINKS.linkedIn} target="_blank" rel="noopener noreferrer">
                      {c.details.linkedInText}
                      <span className="sr-only"> on LinkedIn (opens in a new tab)</span>
                      <svg className="contact-card__external" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
                        <path d="M5 2H2.5A.5.5 0 0 0 2 2.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V9M8 2h4v4M12 2 6.5 7.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </dd>
                </div>
                <div className="contact-card__row">
                  <dt>
                    <Dot accent="purple" />
                    {c.details.locationLabel}
                  </dt>
                  <dd className="contact-card__text">{c.details.location}</dd>
                </div>
              </dl>
            </section>

            {/* 4. Secondary actions */}
            <nav className="actions contact__secondary" aria-label="More about Dan">
              <ActionLink href={CASE_STUDY}>{c.secondary.work}</ActionLink>
              <ActionLink href={CV}>{c.secondary.cv}</ActionLink>
              <ActionLink href={PROFILE_LINKS.cvPdf} srSuffix="(PDF)" download>
                {c.secondary.download}
              </ActionLink>
            </nav>
          </div>
        </div>
      </main>
      {/* 5. Footer */}
      <SiteFooter />
    </>
  );
}
