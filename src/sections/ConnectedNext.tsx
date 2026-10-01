import { connectedNext as c } from '../content';
import type { Accent } from '../content';
import { SectionIntro } from '../components/SectionIntro';
import { Figure } from '../components/Figure';
import { Flow } from '../components/Flow';
import { Dot } from '../components/icons';

// Dot colours for the flow tags (Frame 238:25406), matching the panels below: Timesheet purple, Invoice orange.
const FLOW_ACCENTS: Accent[] = ['blue', 'purple', 'red', 'orange'];

/** "The Assignment connected what happened next.": Frame 1335 (259:25561). */
export function ConnectedNext() {
  return (
    <section className="section connected-next" aria-labelledby="next-title">
      <div className="container container--wide">
        <SectionIntro id="next-title" title={c.title} intro={c.intro} size="xl" />
        <Flow steps={c.flow} accents={FLOW_ACCENTS} className="flow--center" />
        <div className="duo">
          {c.panels.map((p) => (
            <article key={p.label} className="duo__panel">
              <header className="duo__header">
                <p className="chip chip--white">
                  <Dot accent={p.accent} />
                  {p.label}
                </p>
                <h3 className="h3">{p.title}</h3>
                <p className="lead">{p.text}</p>
              </header>
              <Figure pic={p.image} sizes="(min-width: 900px) 620px, 88vw" className="duo__image frame-thin" />
            </article>
          ))}
        </div>
        <p className="callout connected-next__callout">{c.callout}</p>
      </div>
    </section>
  );
}
