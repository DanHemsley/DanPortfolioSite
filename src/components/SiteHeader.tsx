import { CONTACT, CV, HOME } from '../links';

interface Props {
  /** Marks the matching nav item with aria-current. */
  current?: 'cv' | 'contact';
}

export function SiteHeader({ current }: Props) {
  const items = [
    { key: 'cv', href: CV, label: 'CV' },
    { key: 'contact', href: CONTACT, label: 'Contact' },
  ];
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href={HOME} className="site-header__mark" aria-label="Dan Hemsley, home">
          <img src="/favicon.svg" width="51" height="51" alt="" />
        </a>
        <nav aria-label="Main navigation">
          <ul className="nav">
            {items.map((item) => (
              <li key={item.key}>
                <a className="nav__link" href={item.href} aria-current={current === item.key ? 'page' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
