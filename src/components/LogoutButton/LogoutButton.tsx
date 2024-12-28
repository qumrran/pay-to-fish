import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const LogoutButton: React.FC = () => {
  const context = useContext(UserContext);

  if (!context?.logout) {
    return null; 
  }

  const { logout } = context;

  const handleLogout = async () => {
    try {
      await logout();
      alert('Wylogowano pomyślnie.');
    } catch (error) {
      alert('Błąd podczas wylogowywania.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
    >
      Wyloguj się
    </button>
  );
};

export default LogoutButton;
