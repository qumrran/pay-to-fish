import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiLogoutCircleRLine } from 'react-icons/ri'; 

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
      <button
        onClick={handleLogout}
        className="mt-1 text-white bg-cyan-500 hover:bg-cyan-600 flex items-center rounded px-4 py-2 hover:cursor-pointer transition-colors duration-200"
      >
        <RiLogoutCircleRLine className="text-lg mr-2" /> 
        Wyloguj się
      </button>
    </>
  );
};

export default LogoutButton;
