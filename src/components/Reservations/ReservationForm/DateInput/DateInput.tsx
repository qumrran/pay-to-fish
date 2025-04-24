import React from 'react';
import { DateInputProps } from '../../../../types/DateInput.types';

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange, min }) => {
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).showPicker();
  };

  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={handleClick}
        required
        className="w-full px-3 py-2 border-2 border-gray-300 rounded cursor-pointer focus:outline-none focus:ring focus:ring-cyan-500"
        min={min}
      />
    </div>
  );
};

export default DateInput;
