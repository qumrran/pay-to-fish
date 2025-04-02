import React from 'react';

interface LakeSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LakeSelect: React.FC<LakeSelectProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="block w-full p-2 border rounded mt-3 mb-4"
    >
      <option value="">-- Wybierz łowisko --</option>
      <option value="Łowisko 1">Łowisko 1</option>
      <option value="Łowisko 2">Łowisko 2</option>
      <option value="Łowisko 3">Łowisko 3</option>
    </select>
  );
};

export default LakeSelect;
