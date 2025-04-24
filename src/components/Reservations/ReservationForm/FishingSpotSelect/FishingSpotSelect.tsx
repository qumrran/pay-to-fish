import React from 'react';
import { FishingSpotSelectProps } from '../../../../types/FishingSpotSelect.types';

const FishingSpotSelect: React.FC<FishingSpotSelectProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">Łowisko</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full px-3 py-2 border-2 border-gray-300 rounded bg-white text-black focus:outline-none focus:ring focus:ring-cyan-500"
      >
        <option value="Łowisko1">Łowisko 1</option>
        <option value="Łowisko2">Łowisko 2</option>
        <option value="Łowisko3">Łowisko 3</option>
      </select>
    </div>
  );
};

export default FishingSpotSelect;
