import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';
import LogoutButton from './../LogoutButton/LogoutButton';
import { FiMenu, FiX } from 'react-icons/fi';

const MainMenu: React.FC = () => {
  const user = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) return null; 

  return (
    <nav className="bg-blue-500 p-4 text-white">
      
      <div className="flex justify-between items-center">
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <FiX className="w-6 h-6" /> 
          ) : (
            <FiMenu className="w-6 h-6" /> 
          )}
        </button>
      </div>

      
      <ul
        className={`flex flex-col md:flex-row md:justify-around mt-4 md:mt-0 ${
          isMenuOpen ? 'block' : 'hidden md:flex'
        }`}
      >
        <li className="py-2 md:py-0">
          <NavLink
            to="/news"
            className="hover:text-gray-300 block md:inline"
            onClick={() => setIsMenuOpen(false)} 
          >
            Aktualności
          </NavLink>
        </li>
        <li className="py-2 md:py-0">
          <NavLink
            to="/reservations"
            className="hover:text-gray-300 block md:inline"
            onClick={() => setIsMenuOpen(false)}
          >
            Rezerwacje
          </NavLink>
        </li>
        <li className="py-2 md:py-0">
          <NavLink
            to="/blog"
            className="hover:text-gray-300 block md:inline"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </NavLink>
        </li>
        <li className="py-2 md:py-0">
          <NavLink
            to="/catchboard"
            className="hover:text-gray-300 block md:inline"
            onClick={() => setIsMenuOpen(false)}
          >
            Tablica Połowów
          </NavLink>
        </li>
        <li className="py-2 md:py-0">
          <NavLink
            to="/contact"
            className="hover:text-gray-300 block md:inline"
            onClick={() => setIsMenuOpen(false)}
          >
            Kontakt
          </NavLink>
        </li>
        <li className="py-2 md:py-0">
          <NavLink
            to="/account"
            className="hover:text-gray-300 block md:inline"
            onClick={() => setIsMenuOpen(false)}
          >
            Moje Konto
          </NavLink>
        </li>
        <li className="py-2 md:py-0">
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
