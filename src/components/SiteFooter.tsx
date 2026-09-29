const details = {
  name: 'Dan Hemsley',
  role: 'Senior Product Designer',
  location: 'Tonbridge, Kent, UK',
};

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__name">{details.name}</p>
        <p>{details.role}</p>
        <p>{details.location}</p>
      </div>
    </footer>
  );
}
