import type { Accent } from '../content';

const ARROW_PATH =
  'M12.25 16.94a.86.86 0 0 1-.25-.6c0-.24.08-.46.25-.62l2.84-2.84H6.81a.87.87 0 0 1-.87-.87c0-.43.38-.86.87-.86h8.28l-2.84-2.87a.84.84 0 0 1 0-1.21.84.84 0 0 1 1.21 0l4.33 4.32a.84.84 0 0 1 0 1.22l-4.33 4.33a.84.84 0 0 1-1.21 0Z';

const ROTATION = { right: 0, down: 90, left: 180, up: 270 } as const;

export function ArrowIcon({ direction = 'right', size = 24 }: { direction?: keyof typeof ROTATION; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={{ transform: `rotate(${ROTATION[direction]}deg)` }}>
      <path d={ARROW_PATH} fill="currentColor" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Dot({ accent }: { accent: Accent }) {
  return <span className={`dot accent-${accent}`} aria-hidden="true" />;
}

export function UserIcon({ accent }: { accent: Accent }) {
  return (
    <svg className={`user-icon accent-${accent}`} width="80" height="80" viewBox="0 0 80 80" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M40 40a12.5 12.5 0 1 1 0-25 12.5 12.5 0 0 1 0 25Zm4.88 4.69c9.38 0 17 7.61 17 16.99A3.37 3.37 0 0 1 58.46 65H21.45a3.3 3.3 0 0 1-3.32-3.32c0-9.38 7.52-17 16.9-17h9.85Z"
      />
    </svg>
  );
}
