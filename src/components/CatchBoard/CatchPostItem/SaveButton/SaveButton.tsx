import React from 'react';
import { FaSave } from 'react-icons/fa';

interface SaveButtonProps {
  onClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 text-white py-1 px-4 rounded mr-2
                 hover:bg-green-600 transition-colors duration-300  flex items-center gap-2"
    >
      <FaSave size={16} />
      Zapisz
    </button>
  );
};

export default SaveButton;
