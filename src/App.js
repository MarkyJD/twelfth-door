/* eslint-disable */
/* eslint-disable react/jsx-no-constructed-context-values */
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/Routes';
import Layout from './pages/templates/Layout';
import ThemeContext from './context/ThemeContext';
import useDarkMode from './hooks/useDarkMode';
import useAuthListener from './hooks/useAuthListener';
import UserContext from './context/UserContext';
import IsLoggedInRoute from './helpers/IsLoggedInRoute';
import ProtectedRoute from './helpers/ProtectedRoute';
import useFeed from './hooks/useFeed';
import { generateSchema, seedDatabase } from './mock_data/seed';

const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Home = lazy(() => import('./pages/Home'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Messages = lazy(() => import('./pages/Messages'));
const Drive = lazy(() => import('./pages/Drive'));
const Targets = lazy(() => import('./pages/Targets'));
const Reports = lazy(() => import('./pages/Reports'));

function App() {
  const { isDarkMode } = useDarkMode();
  const { user } = useAuthListener();
  const { feed } = useFeed();
  return (
    <ThemeContext.Provider value={{ isDarkMode }}>
      <UserContext.Provider value={{ user, feed }}>
        <div className="antialiased bg-lightGray-600 dark:bg-darkGray-700 text-slate-900 dark:text-slate-100">
          <Router>
            <Suspense fallback={<p>Loading...</p>}>
              <Routes>
                <Route
                  exact
                  path={ROUTES.LOGIN}
                  element={
                    <IsLoggedInRoute isLoggedInPath={ROUTES.HOME} user={user}>
                      <Login />
                    </IsLoggedInRoute>
                  }
                />

                <Route element={<Layout />}>
                  <Route
                    exact
                    path={ROUTES.HOME}
                    element={
                      <ProtectedRoute user={user}>
                        <Home />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    exact
                    path={ROUTES.JOBS}
                    element={
                      <ProtectedRoute user={user}>
                        <Jobs />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    exact
                    path={ROUTES.MESSAGES}
                    element={
                      <ProtectedRoute user={user}>
                        <Messages />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    exact
                    path={ROUTES.DRIVE}
                    element={
                      <ProtectedRoute user={user}>
                        <Drive />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    exact
                    path={ROUTES.TARGETS}
                    element={
                      <ProtectedRoute user={user}>
                        <Targets />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path={ROUTES.REPORTS}
                    element={
                      <ProtectedRoute user={user}>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path={ROUTES.ADMIN}
                    element={
                      <ProtectedRoute user={user}>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
