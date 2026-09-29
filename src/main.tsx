import '@fontsource-variable/mona-sans';
import '@fontsource-variable/menbere';
import '@fontsource-variable/geist';
import '@fontsource-variable/manrope';
import '@fontsource-variable/montserrat';
import './styles/main.css';
import './styles/home.css';
import './styles/cv.css';
import './styles/contact.css';

import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { CaseStudy } from './pages/CaseStudy';
import { CvPage } from './pages/CvPage';
import { ContactPage } from './pages/ContactPage';
import { CASE_STUDY, CONTACT, CV, HOME } from './links';

/** Start each new page at the top; in-page #anchors are left to the browser. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={CASE_STUDY} element={<CaseStudy />} />
        <Route path={CV} element={<CvPage />} />
        <Route path={CONTACT} element={<ContactPage />} />
        <Route path="*" element={<Navigate to={HOME} replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
