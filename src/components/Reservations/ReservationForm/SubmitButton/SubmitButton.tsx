import React from 'react';
import { FaSave } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';

interface SubmitButtonProps {
  isEditing: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isEditing }) => {
  return (
    <button
      type="submit"
      className="bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 text-white py-2 px-4 rounded flex items-center gap-2"
    >
      {isEditing ? <FaSave size={20} /> : <IoMdAddCircleOutline size={24} />}
      {isEditing ? 'Zapisz zmiany' : 'Zarezerwuj'}
    </button>
  );
};

export default SubmitButton;
