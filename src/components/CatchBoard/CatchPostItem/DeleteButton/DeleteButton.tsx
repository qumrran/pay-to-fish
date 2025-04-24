import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { DeleteButtonProps } from '../../../../types/DeleteButton.types';

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='bg-red-500 text-white py-1 px-4 rounded mt-2 flex items-center gap-2
                 hover:bg-red-600 transition-colors duration-300'
    >
      <FaTrash size={18} />
      Usuń
    </button>
  );
};

export default DeleteButton;
