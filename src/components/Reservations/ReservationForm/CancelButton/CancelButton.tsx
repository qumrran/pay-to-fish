import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { CancelButtonProps } from '../../../../types/CancelButton.types';


const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-gray-500 hover:bg-gray-400 transition-colors duration-300 text-white py-2 px-4 rounded flex items-center gap-2"
    >
      <FaTimes size={20} /> Anuluj
    </button>
  );
};

export default CancelButton;
