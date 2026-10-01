import { convergence } from '../content';
import type { Accent } from '../content';
import { SectionIntro } from '../components/SectionIntro';
import { Figure } from '../components/Figure';
import { Flow } from '../components/Flow';

// Dot colours for the flow tags, as in the design (Frame 1330, 227:22996).
const FLOW_ACCENTS: Accent[] = ['blue', 'red', 'purple'];

export function Convergence() {
  return (
    <section className="section" aria-labelledby="convergence-title">
      <div className="container container--wide split">
        <div className="split__text">
          <SectionIntro id="convergence-title" title={convergence.title} intro={convergence.intro} align="start" size="xl" />
          <Flow steps={convergence.flow} accents={FLOW_ACCENTS} />
        </div>
        {/* Layered as in the design (Figma 'Transition content', 101:14889). The images carry their own border. */}
        <div className="split__media converge">
          <Figure pic={convergence.main} sizes="(min-width: 1024px) 760px, 92vw" framed={false} className="converge__tile converge__tile--main" />
          <Figure pic={convergence.details[0]} sizes="(min-width: 1024px) 380px, 46vw" framed={false} className="converge__tile converge__tile--detail" />
          <Figure pic={convergence.details[1]} sizes="(min-width: 1024px) 380px, 46vw" framed={false} className="converge__tile converge__tile--resources" />
        </div>
      </div>
    </section>
  );
}
