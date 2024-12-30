import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
      >
        Wyloguj się
      </button>
    </>
  );
};

export default LogoutButton;
