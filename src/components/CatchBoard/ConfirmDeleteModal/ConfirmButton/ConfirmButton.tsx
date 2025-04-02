import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ConfirmButtonProps {
  onClick: () => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white py-1 px-4 rounded flex items-center gap-2
                 hover:bg-red-600 transition-colors duration-300"
    >
      <FaExclamationTriangle size={18} />
      Tak
    </button>
  );
};

export default ConfirmButton;
