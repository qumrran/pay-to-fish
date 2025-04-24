import React from 'react';
import { DescriptionTextareaProps } from '../../../../types/DescriptionTextarea.types';

const DescriptionTextarea: React.FC<DescriptionTextareaProps> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder="Opisz swój połów"
      className="w-full p-2 border rounded mb-2 focus:ring focus:ring-cyan-500 focus:outline-none"
    />
  );
};

export default DescriptionTextarea;
