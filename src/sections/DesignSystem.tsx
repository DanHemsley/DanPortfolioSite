import { designSystem as d } from '../content';
import { SectionIntro } from '../components/SectionIntro';
import { Figure } from '../components/Figure';

export function DesignSystem() {
  return (
    <section className="section" aria-labelledby="ds-title">
      <div className="container">
        <div className="split">
          <div className="split__text">
            <SectionIntro id="ds-title" title={d.title} intro={d.intro} align="start" />
          </div>
          <div className="split__media">
            <Figure pic={d.overview} sizes="(min-width: 1024px) 720px, 92vw" />
          </div>
        </div>
        <ul className="ds-gallery" aria-label="Design system foundations">
          {d.gallery.map((g) => (
            <li key={g.slug} className={`ds-gallery__item ds-gallery__item--${g.slug}`}>
              <Figure pic={g} sizes="(min-width: 1024px) 480px, 70vw" fit="cover" position="left top" caption={<span className="pill">{g.label}</span>} />
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
