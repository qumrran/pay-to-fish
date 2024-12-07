import React from 'react';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MainMenu from './components/MainManu/MainMenu';
import News from './pages/News/News';
import Reservations from './pages/Reservations/Reservations';
import Blog from './pages/Blog/Blog';
import CatchBoard from './pages/CatchBoard/CatchBoard';
import Account from './pages/Account/Account';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useContext(UserContext)?.user;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <MainMenu />
                <Routes>
                  <Route path="/news" element={<News />} />
                  <Route path="/reservations" element={<Reservations />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/catchboard" element={<CatchBoard />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="*" element={<Navigate to="/news" />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
