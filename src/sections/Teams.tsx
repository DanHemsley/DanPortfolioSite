import { teams } from '../content';
import { SectionIntro } from '../components/SectionIntro';
import { UserIcon } from '../components/icons';

export function Teams() {
  return (
    <section className="section" aria-labelledby="teams-title">
      <div className="container">
        <SectionIntro id="teams-title" title={teams.title} tone="slate" />
        <ul className="card-grid card-grid--4">
          {teams.roles.map((r) => (
            <li key={r.title} className={`card card--center accent-border-${r.accent}`}>
              <UserIcon accent={r.accent} />
              <p className="card__title">{r.title}</p>
              <p className="card__lead">{r.lead}</p>
              <p className="card__text">{r.text}</p>
            </li>
          ))}
        </ul>
        <p className="lead section-outro">{teams.intro}</p>
      </div>
    </section>
  );
}
