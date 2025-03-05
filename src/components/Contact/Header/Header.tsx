
import React from 'react';
import { FaFish } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h1 className="text-4xl font-bold text-black text-center flex items-center justify-center">
        <FaFish className="text-cyan-500 mr-5" />
        Kontakt
      </h1>
    </div>
  );
};

export default Header;
