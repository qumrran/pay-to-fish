import React from 'react';
import googleLogo from './../../../assets/images/Google__G__logo.svg';

interface GoogleAuthButtonProps {
  onClick: () => void;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ onClick }) => {
  return (
    <button
      className="w-full bg-black hover:bg-gray-800 text-white py-2 mb-2 rounded flex items-center justify-center relative"
      onClick={onClick}
    >
      <img src={googleLogo} alt="Google logo" className="w-6 h-6 absolute left-4" />
      <span className="text-center">Zaloguj się przez Google</span>
    </button>
  );
};

export default GoogleAuthButton;
