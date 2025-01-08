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
    <nav className="bg-cyan-500 sticky top-0 z-50 shadow-md">
      <div className="max-w-9xl mx-auto px-4">
        
        <div className="flex justify-between items-center h-16">
          
          <div className="hidden md:block flex-1"></div>

          
          <ul className="hidden md:flex md:space-x-6 md:text-lg flex items-center justify-center">
            <li>
              <NavLink to="/news" className="text-white hover:text-gray-100">
                Aktualności
              </NavLink>
            </li>
            <li>
              <NavLink to="/reservations" className="text-white hover:text-gray-100">
                Rezerwacje
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className="text-white hover:text-gray-100">
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/catchboard" className="text-white hover:text-gray-100">
                Tablica Połowów
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="text-white hover:text-gray-100">
                Kontakt
              </NavLink>
            </li>
            <li>
              <NavLink to="/account" className="text-white hover:text-gray-100">
                Moje Konto
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>

     
          <div className="hidden md:block flex-1"></div>

          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        
        <ul
          className={`md:hidden flex flex-col items-center space-y-4 text-lg bg-cyan-500 py-4 transition-all duration-300 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <NavLink
              to="/news"
              className="text-white hover:text-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Aktualności
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reservations"
              className="text-white hover:text-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Rezerwacje
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className="text-white hover:text-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catchboard"
              className="text-white hover:text-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Tablica Połowów
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="text-white hover:text-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontakt
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/account"
              className="text-white hover:text-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Moje Konto
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainMenu;
