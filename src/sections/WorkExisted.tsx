import { workExisted as w } from '../content';
import type { Accent } from '../content';
import { SectionIntro } from '../components/SectionIntro';
import { Figure } from '../components/Figure';
import { Flow } from '../components/Flow';

// Dot colours for the flow tags, as in the design (Existing 308:26077, Required 229:23174).
const EXISTING_ACCENTS: Accent[] = ['purple', 'red'];
const REQUIRED_ACCENTS: Accent[] = ['blue', 'blue', 'red', 'purple'];

export function WorkExisted() {
  return (
    <section className="section" aria-labelledby="existed-title">
      <div className="container container--wide split">
        <div className="split__text">
          <SectionIntro id="existed-title" title={w.title} intro={w.intro} align="start" size="m" />
        </div>
        <div className="split__media stack">
          <div className="workflow">
            <p className="workflow__label">{w.existing.label}</p>
            <Flow steps={w.existing.steps} accents={EXISTING_ACCENTS} />
          </div>
          <div className="panel">
            <div className="trio">
              {w.research.map((pic) => (
                <Figure key={pic.slug} pic={pic} sizes="(min-width: 1024px) 380px, 30vw" className="frame-photo" />
              ))}
            </div>
            <Figure pic={w.legacy} sizes="(min-width: 1024px) 1000px, 90vw" framed={false} />
            <p className="caption">{w.legacyCaption}</p>
          </div>
          <div className="workflow workflow--spaced">
            <p className="workflow__label">{w.required.label}</p>
            <Flow steps={w.required.steps} accents={REQUIRED_ACCENTS} />
          </div>
          <div className="panel">
            <Figure pic={w.mockup} sizes="(min-width: 1024px) 1000px, 90vw" className="frame-ink frame-ink--thin" />
            <p className="caption">{w.mockupCaption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
