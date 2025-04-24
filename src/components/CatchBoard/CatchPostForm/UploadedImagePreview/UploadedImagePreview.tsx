import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { UploadedImagePreviewProps } from '../../../../types/UploadedImage.types';

const UploadedImagePreview: React.FC<UploadedImagePreviewProps> = ({ image, onCancel }) => {
	return (
		<div className='flex items-center gap-2 mt-2'>
			<p className='text-sm text-gray-700 flex items-center gap-2'>
				{image.name}
				<FaTimes
					className='text-gray-400 cursor-pointer hover:text-red-600 
                             transition-colors duration-200 p-1 rounded-full hover:bg-gray-200'
					onClick={onCancel}
					size={25}
				/>
			</p>
		</div>
	);
};

export default UploadedImagePreview;
