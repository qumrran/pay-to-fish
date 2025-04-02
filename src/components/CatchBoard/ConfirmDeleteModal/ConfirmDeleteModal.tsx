import React from 'react';
import ConfirmButton from './ConfirmButton/ConfirmButton';
import CancelButton from './CancelButton/CancelButton';

const ConfirmDeleteModal: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-96">
	<p className='mb-4 text-lg font-semibold'>
				Czy na pewno chcesz usunąć ten post?
			</p>

      <div className="flex justify-around">
        <ConfirmButton onClick={onConfirm} />
        <CancelButton onClick={onCancel} />
      </div>
    </div>
  </div>
);

export default ConfirmDeleteModal;
