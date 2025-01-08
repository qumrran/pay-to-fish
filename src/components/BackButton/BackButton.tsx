import React from 'react';
import { SlArrowLeftCircle } from 'react-icons/sl';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      className="mt-6 text-white bg-cyan-500 hover:bg-cyan-600 flex items-center rounded-lg px-4 py-2 hover:cursor-pointer transition-colors duration-200 text-base"
      onClick={onClick}
    >
      <SlArrowLeftCircle className="mr-3 text-2xl" /> 
      Wstecz
    </button>
  );
};

export default BackButton;
