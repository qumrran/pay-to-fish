import React from 'react';

interface DescriptionTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

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
