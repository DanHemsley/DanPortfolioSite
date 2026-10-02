import { PROFILE_LINKS } from '../profile-links';

const details = {
  name: 'Dan Hemsley',
  role: 'Senior Product Designer',
  location: 'Tonbridge, Kent, UK',
};

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container container--wide site-footer__inner">
        <p className="site-footer__name">{details.name}</p>
        <p>{details.role}</p>
        <p>{details.location}</p>
        {PROFILE_LINKS.email && (
          <a className="site-footer__email" href={`mailto:${PROFILE_LINKS.email}`}>
            {PROFILE_LINKS.email}
          </a>
        )}
      </div>
    </footer>
  );
}
