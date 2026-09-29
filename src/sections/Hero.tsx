import { hero } from '../content';
import { Figure } from '../components/Figure';
import { ArrowIcon, Dot } from '../components/icons';

const { collage } = hero;

export function Hero() {
  return (
    <section id="case-study" className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            {hero.title}
          </h1>
          <p className="hero__subtitle">{hero.subtitle}</p>
          <p className="hero__meta">{hero.meta}</p>
          <ul className="chips" aria-label="Focus areas">
            {hero.skills.map((s) => (
              <li key={s.label} className="chip">
                <Dot accent={s.accent} />
                {s.label}
              </li>
            ))}
          </ul>
          <p className="hero__summary">{hero.summary}</p>
          <a className="button" href="#connecting">
            {hero.cta}
            <ArrowIcon direction="down" size={20} />
          </a>
        </div>

        <div className="collage">
          <Figure pic={collage.main} sizes="(min-width: 1024px) 660px, 90vw" fit="cover" position="left top" className="collage__tile collage__tile--main" priority />
          <Figure pic={collage.contract} sizes="240px" fit="cover" position="left top" className="collage__tile collage__tile--contract" priority />
          <Figure pic={collage.resourcePanel} sizes="160px" fit="cover" position="right top" className="collage__tile collage__tile--panel" />
          <Figure pic={collage.scheduling} sizes="280px" fit="cover" position="left top" className="collage__tile collage__tile--scheduling" />
          <Figure pic={collage.resourceDetails} sizes="260px" fit="cover" position="left top" className="collage__tile collage__tile--details" />
          <Figure pic={collage.invoice} sizes="200px" fit="cover" position="left top" className="collage__tile collage__tile--invoice" />
        </div>
      </div>
    </section>
  );
}
