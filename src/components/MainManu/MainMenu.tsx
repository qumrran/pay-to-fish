import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';

const MainMenu: React.FC = () => {
  const user = useContext(UserContext);

  if (!user) return null; // Ukryj menu, jeśli użytkownik nie jest zalogowany.

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <ul className="flex justify-around">
        <li><NavLink to="/news">Aktualności</NavLink></li>
        <li><NavLink to="/reservations">Rezerwacje</NavLink></li>
        <li><NavLink to="/blog">Blog</NavLink></li>
        <li><NavLink to="/catchboard">Tablica Połowów</NavLink></li>
        <li><NavLink to="/account">Moje Konto</NavLink></li>
      </ul>
    </nav>
  );
};

export default MainMenu;
