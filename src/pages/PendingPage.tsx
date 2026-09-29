import { SiteHeader } from '../components/SiteHeader';
import { CONTACT, CV } from '../links';
import { usePageMeta } from '../usePageMeta';

interface Props {
  page: 'cv' | 'contact';
  title: string;
}

/**
 * Shell for pages whose content hasn't been supplied yet.
 * TODO(Dan): replace the placeholder block with the real CV / contact content.
 */
export function PendingPage({ page, title }: Props) {
  usePageMeta(`${title} — Dan Hemsley`, `${title} Dan Hemsley, Senior Product Designer.`, page === 'cv' ? CV : CONTACT);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader current={page} />
      <main id="main" tabIndex={-1} className="section">
        <div className="container container--narrow pending">
          <h1 className="h2 h2--xl tone-ink">{title}</h1>
          <p className="pending__placeholder">[Placeholder: {title} content to be added]</p>
        </div>
      </main>
    </>
  );
}
