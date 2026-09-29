import { handoffs } from '../content';
import { SectionIntro } from '../components/SectionIntro';
import { Figure } from '../components/Figure';

const s = handoffs.sticker;

export function Handoffs() {
  return (
    <section className="section" aria-labelledby="handoffs-title">
      <div className="container">
        <SectionIntro id="handoffs-title" title={handoffs.title} intro={handoffs.intro} />

        <div className="annotated">
          <Figure pic={handoffs.scheduler} sizes="(min-width: 1100px) 1040px, 92vw" className="annotated__image" />
          <div className="annotated__side">
            <ol className="annotations">
              {handoffs.annotations.map((a, i) => (
                <li key={a.title} className="annotation">
                  <span className="num num--round num--dark" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <p className="annotation__title">{a.title}</p>
                    <p className="annotation__text">{a.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="sticker" role="group" aria-labelledby="sticker-label">
              <p id="sticker-label" className="eyebrow eyebrow--blue">
                {s.label}
              </p>
              <div className="sticker__card">
                <span className="sticker__site">{s.site}</span>
                <span className="sticker__row">
                  <span className="sticker__tag">{s.ref}</span>
                  <span className="sticker__tag sticker__tag--customer">{s.customer}</span>
                </span>
                <p className="sticker__box">{s.requirement}</p>
                <span className="sticker__box">{s.price}</span>
                <p className="sticker__box">{s.note}</p>
                <p className="sticker__box sticker__box--split">
                  {s.operator}
                  <span className="sticker__more">{s.operatorMore}</span>
                </p>
                {s.states.map((state) => (
                  <span key={state} className="sticker__box">
                    {state}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="triad">
          {handoffs.columns.map((c) => (
            <article key={c.label} className="triad__item">
              <div className={`triad__media triad__media--${c.images.length}`}>
                {c.images.map((pic) => (
                  <Figure key={pic.alt} pic={pic} sizes="(min-width: 900px) 30vw, 90vw" fit="cover" position="left top" />
                ))}
              </div>
              <p className="eyebrow eyebrow--green">{c.label}</p>
              <h3 className="h3-sm">{c.title}</h3>
              <p className="small">{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
