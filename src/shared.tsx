// Fonts and global styles shared by every page.
import '@fontsource-variable/mona-sans';
import '@fontsource-variable/menbere';
import '@fontsource-variable/geist';
import '@fontsource-variable/manrope';
import '@fontsource-variable/montserrat';
import './styles/main.css';

import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

export function mount(page: ReactNode) {
  createRoot(document.getElementById('root')!).render(<StrictMode>{page}</StrictMode>);
}
