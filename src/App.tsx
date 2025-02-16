import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { UserProvider } from './context/UserContext';
import LoginPage from './pages/Login/LoginPage';
import MainMenu from './components/MainManu/MainMenu';
import News from './pages/News/News';
import Reservations from './pages/Reservations/Reservations';
import Blog from './pages/Blog/Blog';
import CatchBoard from './pages/CatchBoard/CatchBoard';
import Account from './pages/Account/Account';
import ContactPage from './pages/ContactPage/ContactPage';


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
        <MainMenu />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/news" element={<News />} />
                  <Route path="/reservations" element={<Reservations />} />
                  <Route path="/reservations/:reservationId" element={<Reservations />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<Blog />} /> 
                  <Route path="/catchboard" element={<CatchBoard />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/contact" element={<ContactPage />} />
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
