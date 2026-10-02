import { Link } from 'react-router-dom';
import { ArrowIcon } from '../components/icons';
import { images } from '../images';
import { CASE_STUDY, CONTACT, CV, HOME } from '../links';
import { usePageMeta } from '../usePageMeta';
import { SITE_VERSION } from '../version';

// Homepage copy, verbatim from the "Lander Welcome" design.
const copy = {
  headline: 'Bringing clarity to complex products, systems and user journeys',
  primary: 'View Selected Work',
  links: [
    { href: CV, label: 'CV' },
    { href: CONTACT, label: 'Contact' },
  ],
  name: 'Dan Hemsley',
  role: 'Senior Product Designer',
};

export function Home() {
  usePageMeta('Dan Hemsley — Senior Product Designer', 'Bringing clarity to complex products, systems and user journeys.', HOME);
  const photo = images.headshot;
  return (
    <main className="home">
      <div className="container home__top">
        <h1 className="home__headline">{copy.headline}</h1>
        {/* Native tooltip with the site version, so it's easy to confirm which build Figma is serving. */}
        <img className="home__mark" src="/logo-mark.svg" width="104" height="104" alt="" title={SITE_VERSION} />
      </div>

      <nav className="container home__nav" aria-label="Main navigation">
        <ul className="home__actions">
          <li>
            <Link className="button" to={CASE_STUDY}>
              {copy.primary}
              <ArrowIcon size={20} />
            </Link>
          </li>
          {copy.links.map((l) => (
            <li key={l.label}>
              <Link className="nav__link" to={l.href}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="home__stage" aria-label="About">
        <div className="home__panel" aria-hidden="true" />
        <div className="home__person">
          <p className="home__id">
            <span className="home__name">{copy.name}</span>
            <span className="home__role">{copy.role}</span>
          </p>
          <img
            className="home__photo"
            src={photo.src}
            srcSet={photo.srcSet}
            sizes="(min-width: 1024px) 420px, 40vw"
            width={photo.width}
            height={photo.height}
            alt="Portrait of Dan Hemsley"
            {...{ fetchpriority: 'high' }}
          />
        </div>
      </section>
    </main>
  );
}
