import { phases } from '../content';
import { SectionIntro } from '../components/SectionIntro';
import { ArrowIcon } from '../components/icons';

export function Phases() {
  return (
    <section className="section" aria-labelledby="phases-title">
      <div className="container container--wide split split--center">
        <div className="split__text">
          <SectionIntro id="phases-title" title={phases.title} intro={phases.intro} align="start" size="xl" />
        </div>
        <ol className="phases">
          {phases.items.map((p, i) => (
            <li key={p.label} className="phases__step">
              <div className={`phase accent-border-${p.accent}`}>
                <span className="pill pill--muted">{p.label}</span>
                <p className="phase__text">{p.text}</p>
              </div>
              {i < phases.items.length - 1 && (
                <span className="phases__arrow">
                  <ArrowIcon size={20} />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
