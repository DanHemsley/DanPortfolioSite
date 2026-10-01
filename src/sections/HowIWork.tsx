import { howIWork as h } from '../content';
import { SectionIntro } from '../components/SectionIntro';

export function HowIWork() {
  return (
    <section id="how-i-work" className="section" aria-labelledby="how-title">
      <div className="container container--wide split">
        <div className="split__text">
          <SectionIntro id="how-title" title={h.title} intro={h.intro} align="start" tone="slate" size="m" />
          <p className="callout">{h.callout}</p>
        </div>
        <ul className="practice-grid">
          {h.practices.map((p) => (
            <li key={p.label} className="card card--center">
              <span className={`tag accent-bg-${p.accent}`}>{p.label}</span>
              <p className="card__title">{p.title}</p>
              <p className="card__body card__body--l">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
