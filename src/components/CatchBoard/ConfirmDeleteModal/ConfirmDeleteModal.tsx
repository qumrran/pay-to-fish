import React from 'react';

const ConfirmDeleteModal: React.FC<{
	onConfirm: () => void;
	onCancel: () => void;
}> = ({ onConfirm, onCancel }) => (
	<div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50'>
		<div className='bg-white p-6 rounded shadow-lg'>
			<p className='mb-4'>Czy na pewno chcesz usunąć ten post?</p>
			<button
				onClick={onConfirm}
				className='bg-red-500 text-white py-1 px-4 rounded mr-2'
			>
				Tak
			</button>
			<button onClick={onCancel} className='bg-gray-300 py-1 px-4 rounded'>
				Anuluj
			</button>
		</div>
	</div>
);

export default ConfirmDeleteModal;
