import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/Routes';
import Layout from './pages/templates/Layout';
import ThemeContext from './context/ThemeContext';
import useDarkMode from './hooks/useDarkMode';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Home = lazy(() => import('./pages/Home'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Messages = lazy(() => import('./pages/Messages'));
const Drive = lazy(() => import('./pages/Drive'));
const Targets = lazy(() => import('./pages/Targets'));
const Reports = lazy(() => import('./pages/Reports'));

function App() {
  const { isDarkMode } = useDarkMode();
  return (
    <ThemeContext.Provider value={isDarkMode}>
      <div className="antialiased transition-none bg-lightGray-600 dark:bg-darkGray-600 text-slate-900 dark:text-slate-100">
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path={ROUTES.SIGN_UP} element={<Signup />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route element={<Layout />}>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.JOBS} element={<Jobs />} />
                <Route path={ROUTES.MESSAGES} element={<Messages />} />
                <Route path={ROUTES.DRIVE} element={<Drive />} />
                <Route path={ROUTES.TARGETS} element={<Targets />} />
                <Route path={ROUTES.REPORTS} element={<Reports />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
