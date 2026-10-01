import { decisions } from '../content';
import { SectionIntro } from '../components/SectionIntro';

export function Decisions() {
  return (
    <section className="section" aria-labelledby="decisions-title">
      <div className="container">
        <SectionIntro id="decisions-title" title={decisions.title} tone="slate" />
        <ol className="card-grid card-grid--4">
          {decisions.items.map((d, i) => (
            <li key={d.title} className={`card card--center accent-border-${d.accent}`}>
              <span className={`num num--square accent-bg-${d.accent}`} aria-hidden="true">
                {i + 1}
              </span>
              <p className="card__title card__title--roomy">{d.title}</p>
              <p className="card__body">{d.text}</p>
            </li>
          ))}
        </ol>
        <p className="lead section-outro">{decisions.intro}</p>
      </div>
    </section>
  );
}
