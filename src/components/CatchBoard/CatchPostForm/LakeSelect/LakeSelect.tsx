import React from 'react';
import { LakeSelectProps } from '../../../../types/LakeSelect.types';

const LakeSelect: React.FC<LakeSelectProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="block p-2 border rounded mt-3 mb-4 w-56"
    >
      <option value="">-- Wybierz łowisko --</option>
      <option value="Łowisko 1">Łowisko 1</option>
      <option value="Łowisko 2">Łowisko 2</option>
      <option value="Łowisko 3">Łowisko 3</option>
    </select>
  );
};

export default LakeSelect;
