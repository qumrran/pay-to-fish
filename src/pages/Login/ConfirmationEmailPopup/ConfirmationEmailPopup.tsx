import React from 'react';

interface ConfirmationEmailPopupProps {
  onClose: () => void;
}

const ConfirmationEmailPopup: React.FC<ConfirmationEmailPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
      <div className="p-6 bg-white shadow-md rounded w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Wysłano e-mail weryfikacyjny</h2>
        <p className="mb-4">Sprawdź swoją skrzynkę pocztową i kliknij w link, aby zweryfikować swój adres e-mail.</p>
        <button
          className="w-full bg-cyan-500 hover:bg-cyan-600  text-white py-2 rounded"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ConfirmationEmailPopup;
