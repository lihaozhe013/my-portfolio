import { useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Portfolio from '@/Portfolio';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import TimelinePage from '@/pages/TimelinePage';
import ProjectDetailPage from '@/pages/ProjectDetailPage';
import AppLayout from '@/components/AppLayout';

function RouteScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const targetId = hash.replace(/^#/, '');

    if (targetId) {
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView();
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <RouteScroll />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
