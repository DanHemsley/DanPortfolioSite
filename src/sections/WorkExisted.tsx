import { workExisted as w } from '../content';
import { SectionIntro } from '../components/SectionIntro';
import { Figure } from '../components/Figure';
import { Flow } from '../components/Flow';

export function WorkExisted() {
  return (
    <section className="section" aria-labelledby="existed-title">
      <div className="container split">
        <div className="split__text">
          <SectionIntro id="existed-title" title={w.title} intro={w.intro} align="start" />
          <div className="workflow">
            <p className="workflow__label">{w.existing.label}</p>
            <Flow steps={w.existing.steps} />
          </div>
          <div className="workflow">
            <p className="workflow__label">{w.required.label}</p>
            <Flow steps={w.required.steps} />
          </div>
        </div>
        <div className="split__media stack">
          <div className="panel">
            <div className="trio">
              {w.research.map((pic) => (
                <Figure key={pic.slug} pic={pic} sizes="(min-width: 1024px) 380px, 30vw" />
              ))}
            </div>
            <Figure pic={w.legacy} sizes="(min-width: 1024px) 680px, 90vw" />
            <p className="caption">{w.legacyCaption}</p>
          </div>
          <div className="panel">
            <Figure pic={w.mockup} sizes="(min-width: 1024px) 680px, 90vw" />
            <p className="caption">{w.mockupCaption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
