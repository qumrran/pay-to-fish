import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import { FaCircleUser } from "react-icons/fa6";

const Account: React.FC = () => {
  const context = useContext(UserContext);

  if (!context?.user) {
    return null;
  }

  const { user } = context;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col items-center">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-4 shadow-lg"
          />
        ) : (
          <FaCircleUser className="w-24 h-24 text-gray-500 mb-4" /> 
        )}
        <h1 className="text-4xl font-bold mb-4 text-center">Moje Konto</h1>
        <p className="text-lg text-center mb-6">
          Witaj, {user.displayName || 'Użytkowniku'}!
        </p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Account;
