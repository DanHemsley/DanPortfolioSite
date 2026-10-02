import '@fontsource-variable/mona-sans';
import '@fontsource-variable/menbere';
import '@fontsource-variable/geist';
import '@fontsource-variable/manrope';
import '@fontsource-variable/montserrat';
import './styles/main.css';
import './styles/home.css';
import './styles/cv.css';
import './styles/contact.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PageTransitions } from './PageTransitions';
import { Home } from './pages/Home';
import { CaseStudy } from './pages/CaseStudy';
import { CvPage } from './pages/CvPage';
import { ContactPage } from './pages/ContactPage';
import { CASE_STUDY, CONTACT, CV, HOME } from './links';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PageTransitions />
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
