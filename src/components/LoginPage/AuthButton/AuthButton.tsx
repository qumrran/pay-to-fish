import React from 'react';
import { MdAlternateEmail } from 'react-icons/md';
import { AuthButtonProps } from '../../../types/AuthButton.types';

const AuthButton: React.FC<AuthButtonProps> = ({ onClick, isRegistering }) => {
  return (
    <button
      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 mb-2 rounded flex items-center justify-center relative"
      onClick={onClick}
    >
      <MdAlternateEmail className="w-6 h-6 absolute left-4" />
      <span className="text-center">{isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}</span>
    </button>
  );
};

export default AuthButton;
