import React from 'react';
import { FaEdit } from 'react-icons/fa';

interface EditButtonProps {
	onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			className='bg-cyan-500 text-white py-1 px-4 rounded mt-2 flex items-center gap-2
                 hover:bg-cyan-600 transition-colors duration-300'
		>
			<FaEdit size={18} />
			Edytuj
		</button>
	);
};

export default EditButton;
