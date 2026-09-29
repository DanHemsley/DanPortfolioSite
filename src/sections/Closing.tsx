import { closing } from '../content';
import { Dot } from '../components/icons';

export function Closing() {
  return (
    <section className="section closing" aria-labelledby="closing-title">
      <div className="container container--narrow">
        <h2 id="closing-title" className="h2 h2--xl tone-slate">
          {closing.title}
        </h2>
        <p className="dots" aria-hidden="true">
          <Dot accent="blue" />
          <Dot accent="red" />
          <Dot accent="purple" />
          <Dot accent="orange" />
        </p>
        {closing.paragraphs.map((p) => (
          <p key={p.slice(0, 20)} className="lead">
            {p}
          </p>
        ))}
        <p className="callout">{closing.callout}</p>
      </div>
    </section>
  );
}
