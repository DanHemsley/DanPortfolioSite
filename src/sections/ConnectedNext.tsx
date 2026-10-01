import { connectedNext as c } from '../content';
import { SectionIntro } from '../components/SectionIntro';
import { Figure } from '../components/Figure';
import { Flow } from '../components/Flow';
import { Dot } from '../components/icons';

export function ConnectedNext() {
  return (
    <section className="section" aria-labelledby="next-title">
      <div className="container">
        <SectionIntro id="next-title" title={c.title} intro={c.intro} size="xl" />
        <Flow steps={c.flow} className="flow--center" />
        <p className="callout callout--wide">{c.callout}</p>
        <div className="duo">
          {c.panels.map((p) => (
            <article key={p.label} className="duo__panel">
              <p className="chip chip--white">
                <Dot accent={p.accent} />
                {p.label}
              </p>
              <h3 className="h3">{p.title}</h3>
              <p className="lead">{p.text}</p>
              <Figure pic={p.image} sizes="(min-width: 900px) 620px, 88vw" className="duo__image" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
