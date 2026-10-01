import { connecting } from '../content';

/**
 * "Connecting the back office." From 1280px the six areas orbit the heading as in the design
 * (Figma 'Case study page' → Frame 1324, 136:15120); below that they fall back to a grid.
 * Reading order stays 1–6 in both layouts.
 */
export function Connecting() {
  return (
    <section id="connecting" className="section connecting" aria-labelledby="connecting-title">
      <div className="connecting__stage">
        <div className="connecting__glow" aria-hidden="true" />
        <img className="connecting__orbit" src="/img/connecting-orbit.svg" alt="" width="1478" height="788" />
        <header className="intro intro--center connecting__intro">
          <h2 id="connecting-title" className="h2 h2--l tone-ink connecting__title">
            {connecting.title}
          </h2>
          <p className="badge">{connecting.badge}</p>
        </header>
        <ol className="area-grid">
          {connecting.areas.map((a, i) => (
            <li key={a.title} className={`area-card area-card--${i + 1}`}>
              <p className="area-card__title">
                <span className={`num num--round accent-bg-${a.accent}`} aria-hidden="true">
                  {i + 1}
                </span>
                {a.title}
              </p>
              <p className="area-card__text">{a.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
