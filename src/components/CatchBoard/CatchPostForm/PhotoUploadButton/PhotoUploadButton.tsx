import React from 'react';
import { HiPhotograph } from 'react-icons/hi';

interface PhotoUploadButtonProps {
	onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoUploadButton: React.FC<PhotoUploadButtonProps> = ({ onImageChange }) => {
	return (
		<label
			className='cursor-pointer border-gray-500 bg-gray-500 text-white py-1 px-4 rounded items-center gap-2 
			hover:bg-gray-600 hover:border-gray-600 border-2 transition-colors duration-300 justify-center flex w-56'
		>
			<HiPhotograph size={20} /> Wybierz zdjęcie
			<input type='file' onChange={onImageChange} className='hidden' />
		</label>
	);
};

export default PhotoUploadButton;
