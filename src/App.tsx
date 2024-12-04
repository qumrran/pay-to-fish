import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider, UserContext } from './context/UserContext';
import MainMenu from './components/MainManu/MainMenu';
import LoginPage from './pages/Login/Login';
import News from './pages/News/News';
import Reservations from './pages/Reservations/Reservations';
import Blog from './pages/Blog/Blog';
import CatchBoard from './pages/CatchBoard/CatchBoard';
import Account from './pages/Account/Account';

const App: React.FC = () => {
  const user = useContext(UserContext);

  return (
    <UserProvider>
      <BrowserRouter>
        {!user ? (
          <Routes>
            <Route path="*" element={<LoginPage />} />
          </Routes>
        ) : (
          <>
            <MainMenu />
            <Routes>
              <Route path="/news" element={<News />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/catchboard" element={<CatchBoard />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<Navigate to="/news" />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
