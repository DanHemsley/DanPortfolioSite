import { connecting } from '../content';

export function Connecting() {
  return (
    <section id="connecting" className="section connecting" aria-labelledby="connecting-title">
      <div className="container">
        <header className="intro intro--center">
          <h2 id="connecting-title" className="h2 h2--l tone-ink">
            {connecting.title}
          </h2>
          <p className="badge">{connecting.badge}</p>
        </header>
        <ol className="area-grid">
          {connecting.areas.map((a, i) => (
            <li key={a.title} className="area-card">
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
