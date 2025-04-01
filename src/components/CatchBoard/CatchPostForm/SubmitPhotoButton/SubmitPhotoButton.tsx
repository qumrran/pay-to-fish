import React from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';

interface SubmitPhotoButtonProps {
  onClick: (e: React.FormEvent) => Promise<void>; 
}

const SubmitPhotoButton: React.FC<SubmitPhotoButtonProps> = ({ onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}  
      className="bg-cyan-500 text-white py-1 px-4 rounded flex items-center gap-2 
                 hover:bg-cyan-600 transition-colors duration-300"
    >
      <IoMdAddCircleOutline size={20} />
      Dodaj połów
    </button>
  );
};

export default SubmitPhotoButton;
