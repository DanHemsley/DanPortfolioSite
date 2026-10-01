import { outcome } from '../content';
import { SectionIntro } from '../components/SectionIntro';
import { Figure } from '../components/Figure';
import { Dot } from '../components/icons';

/**
 * "The workflow no longer started with a resource."
 * Below 1440px the screenshot and narrative stack; above it they share a
 * flexible grid where the narrative never drops below 340px.
 */
export function Outcome() {
  return (
    <section className="section" aria-labelledby="outcome-title">
      <div className="container container--wide">
        <div className="outcome">
          <div className="outcome__media">
            <Figure pic={outcome.main} sizes="(min-width: 1440px) 1100px, 92vw" framed={false} />
            <Figure pic={outcome.overlay} sizes="(min-width: 1440px) 340px, 45vw" framed={false} className="outcome__overlay" />
          </div>
          <div className="outcome__text">
            <SectionIntro id="outcome-title" title={outcome.title} intro={outcome.intro} align="start" size="m" />
            <hr className="rule" />
            <p className="callout">{outcome.callout}</p>
          </div>
        </div>
        <ul className="results">
          {outcome.results.map((r) => (
            <li key={r.label} className="result">
              <p className="result__label">
                <Dot accent={r.accent} />
                {r.label}
              </p>
              <p className="result__title">{r.title}</p>
              <p className="small">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
