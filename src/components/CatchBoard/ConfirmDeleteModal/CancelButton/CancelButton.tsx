import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { CancelButtonProps } from '../../../../types/CancelButton.types';



const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-300 text-gray-700 py-1 px-4 rounded flex items-center gap-2
                 hover:bg-gray-400 transition-colors duration-300"
    >
      <FaTimes size={16} />
      Anuluj
    </button>
  );
};

export default CancelButton;
