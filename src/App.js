import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useDarkMode from './hooks/useDarkMode';
import * as ROUTES from './constants/Routes';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

function App() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  return (
    <div className="bg-lightGray-700 dark:bg-darkGray-700 text-slate-900 dark:text-slate-100">
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<Signup />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
