import { ArrowIcon } from '../components/icons';
import { images } from '../images';
import { CASE_STUDY, CONTACT, CV } from '../links';

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
  const photo = images.headshot;
  return (
    <main className="home">
      <div className="container home__top">
        <h1 className="home__headline">{copy.headline}</h1>
        <img className="home__mark" src="/favicon.svg" width="137" height="137" alt="" />
      </div>

      <nav className="container home__nav" aria-label="Main navigation">
        <ul className="home__actions">
          <li>
            <a className="button" href={CASE_STUDY}>
              {copy.primary}
              <ArrowIcon size={20} />
            </a>
          </li>
          {copy.links.map((l) => (
            <li key={l.label}>
              <a className="nav__link" href={l.href}>
                {l.label}
              </a>
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
