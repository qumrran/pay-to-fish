import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface CancelButtonProps {
  onClick: () => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-500 text-white py-1 px-4 rounded
                 hover:bg-gray-600 transition-colors duration-300
                 flex items-center gap-2" 
    >
      <FaTimes size={16} />
      Anuluj
    </button>
  );
};

export default CancelButton;
