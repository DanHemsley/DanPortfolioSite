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
        {/* Each panel carries its workflow (title + steps) and caption in a footer under the images. */}
        <div className="split__media stack stack--panels">
          <div className="panel">
            <div className="trio">
              {w.research.map((pic) => (
                <Figure key={pic.slug} pic={pic} sizes="(min-width: 1024px) 380px, 30vw" className="frame-photo" />
              ))}
            </div>
            <Figure pic={w.legacy} sizes="(min-width: 1024px) 1000px, 90vw" framed={false} />
            <div className="panel__footer">
              <div className="workflow workflow--inline">
                <p className="workflow__label">{w.existing.label}</p>
                <Flow steps={w.existing.steps} accents={EXISTING_ACCENTS} className="flow--on-tint" />
              </div>
              <p className="caption caption--start">{w.legacyCaption}</p>
            </div>
          </div>
          <div className="panel">
            <Figure pic={w.mockup} sizes="(min-width: 1024px) 1000px, 90vw" className="frame-ink frame-ink--thin" />
            <div className="panel__footer">
              <div className="workflow workflow--inline">
                <p className="workflow__label">{w.required.label}</p>
                <Flow steps={w.required.steps} accents={REQUIRED_ACCENTS} className="flow--on-tint" />
              </div>
              <p className="caption caption--start">{w.mockupCaption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
