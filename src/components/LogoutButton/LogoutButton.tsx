import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiLogoutCircleRLine } from "react-icons/ri";

const LogoutButton: React.FC = () => {
  const context = useContext(UserContext);

  if (!context?.logout) {
    return null;
  }

  const { logout } = context;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Wylogowano pomyślnie.');
    } catch (error) {
      toast.error('Błąd podczas wylogowywania.');
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={false}
        theme="dark"
      />
      <div className="relative group">
        
        <button
          onClick={handleLogout}
          className="text-white bg-cyan-500 hover:bg-cyan-600 rounded-full p-2 transition-colors duration-200"
        >
          <RiLogoutCircleRLine className="text-lg" />
        </button>

       
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs rounded py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Wyloguj się
        </div>
      </div>
    </>
  );
};

export default LogoutButton;
