import { designSystem as d } from '../content';
import { SectionIntro } from '../components/SectionIntro';
import { Figure } from '../components/Figure';
import { Dot } from '../components/icons';
import type { Accent } from '../content';

const GALLERY_ACCENTS: Accent[] = ['blue', 'purple', 'red', 'orange', 'blue'];

export function DesignSystem() {
  return (
    <section className="section" aria-labelledby="ds-title">
      <div className="container container--wide">
        <div className="split">
          <div className="split__text">
            <SectionIntro id="ds-title" title={d.title} intro={d.intro} align="start" size="xl" />
          </div>
          <div className="split__media">
            <Figure pic={d.overview} sizes="(min-width: 1024px) 1000px, 92vw" className="frame-ink" />
          </div>
        </div>
        <ul className="ds-gallery" aria-label="Design system foundations">
          {d.gallery.map((g, i) => (
            <li key={g.slug} className={`ds-gallery__item ds-gallery__item--${g.slug}`}>
              <Figure pic={g} sizes="(min-width: 1100px) 500px, 440px" className="frame-ink" caption={
                  <span className="pill">
                    <Dot accent={GALLERY_ACCENTS[i]} />
                    {g.label}
                  </span>
                } />
            </li>
          ))}
        </ul>
        <ul className="principles">
          {d.principles.map((p) => (
            <li key={p.title}>
              <p className="result__title">{p.title}</p>
              <p className="small">{p.text}</p>
            </li>
          ))}
        </ul>
        <p className="callout callout--wide">{d.callout}</p>
      </div>
    </section>
  );
}
