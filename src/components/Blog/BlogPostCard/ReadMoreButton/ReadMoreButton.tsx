import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SlArrowRightCircle } from 'react-icons/sl';
import { ReadMoreButtonProps } from '../../../../types/ReadMoreButton.types';

const ReadMoreButton: React.FC<ReadMoreButtonProps> = ({ slug }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/blog/${slug}`)}
      className="mt-3 text-white bg-cyan-500 hover:bg-cyan-600 flex items-center rounded px-2 py-1 hover:cursor-pointer transition-colors duration-200 text-sm"
    >
      Czytaj dalej
      <SlArrowRightCircle className="ml-2 text-lg" />
    </button>
  );
};

export default ReadMoreButton;
