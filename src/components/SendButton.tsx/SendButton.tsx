import React from 'react';
import { TfiEmail } from 'react-icons/tfi';


const SendButton: React.FC = () => {
  return (
    <button
      type="submit"
      className="w-full flex items-center justify-center gap-2 bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600"
    >
      <TfiEmail className="text-xl" />
      Wyślij
    </button>
  );
};

export default SendButton;
