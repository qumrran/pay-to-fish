import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Account: React.FC = () => {
  const context = useContext(UserContext);

  if (!context?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-red-500">Nie jesteś zalogowany. Zaloguj się, aby uzyskać dostęp do konta.</p>
      </div>
    );
  }

  const { user, logout } = context;

  const handleLogout = async () => {
    try {
      await logout();
      alert('Wylogowano pomyślnie.');
    } catch (error) {
      alert('Błąd podczas wylogowywania.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Moje Konto</h1>
      <p className="text-lg text-center mb-6">
        Witaj, {user.displayName || 'Użytkowniku'}!
      </p>
      <button 
        onClick={handleLogout} 
        className="block mx-auto bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
      >
        Wyloguj się
      </button>
    </div>
  );
};

export default Account;
