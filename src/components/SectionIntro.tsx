import type { ReactNode } from 'react';

interface Props {
  id: string;
  title: string;
  intro?: ReactNode;
  align?: 'center' | 'start';
  tone?: 'ink' | 'slate';
  size?: 'l' | 'xl';
}

/** Section heading + lead paragraph. `id` is used for aria-labelledby on the section. */
export function SectionIntro({ id, title, intro, align = 'center', tone = 'ink', size = 'l' }: Props) {
  return (
    <header className={`intro intro--${align}`}>
      <h2 id={id} className={`h2 h2--${size} tone-${tone}`}>
        {title}
      </h2>
      {intro && <p className="lead">{intro}</p>}
    </header>
  );
}
