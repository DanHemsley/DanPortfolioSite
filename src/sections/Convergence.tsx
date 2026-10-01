import { convergence } from '../content';
import { SectionIntro } from '../components/SectionIntro';
import { Figure } from '../components/Figure';
import { Flow } from '../components/Flow';

export function Convergence() {
  return (
    <section className="section" aria-labelledby="convergence-title">
      <div className="container split">
        <div className="split__text">
          <SectionIntro id="convergence-title" title={convergence.title} intro={convergence.intro} align="start" size="xl" />
          <Flow steps={convergence.flow} />
        </div>
        <div className="split__media stack">
          <Figure pic={convergence.main} sizes="(min-width: 1024px) 720px, 92vw" />
          <div className="pair">
            {convergence.details.map((pic) => (
              <Figure key={pic.slug} pic={pic} sizes="(min-width: 1024px) 350px, 45vw" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
