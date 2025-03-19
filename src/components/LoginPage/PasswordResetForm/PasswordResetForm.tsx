import React from 'react';

interface Props {
  email: string;
  setEmail: (email: string) => void;
  onReset: () => void;
  onCancel: () => void;
}

const PasswordResetForm: React.FC<Props> = ({ email, setEmail, onReset, onCancel }) => {
  return (
    <div className='mt-4 text-center'>
      <input
        type='email'
        placeholder='Podaj swój email'
        className='w-full p-2 border mb-2 focus:outline-none focus:ring focus:ring-cyan-500 rounded'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className='w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 mb-2 rounded' onClick={onReset}>
        Wyślij link do resetowania hasła
      </button>
      <button className='w-full bg-black hover:bg-gray-800 text-white py-2 rounded' onClick={onCancel}>
        Anuluj
      </button>
    </div>
  );
};

export default PasswordResetForm;
