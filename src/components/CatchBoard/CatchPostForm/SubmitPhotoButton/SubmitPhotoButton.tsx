import React from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { SubmitPhotoButtonProps } from '../../../../types/SubmitPhotoButton.types';

const SubmitPhotoButton: React.FC<SubmitPhotoButtonProps> = ({ onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}  
      className="bg-cyan-500 text-white py-1 px-4 rounded gap-2 
                 hover:bg-cyan-600 transition-colors duration-300 justify-center flex w-56"
    >
      <IoMdAddCircleOutline size={20} />
      Dodaj połów
    </button>
  );
};

export default SubmitPhotoButton;
