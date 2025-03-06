import React from 'react';

interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded p-6 shadow-lg max-w-sm w-full">
        <p className="text-lg font-bold mb-4">{message}</p>
        <div className="flex justify-end">
          <button onClick={onConfirm} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            Tak
          </button>
          <button onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded">
            Nie
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
