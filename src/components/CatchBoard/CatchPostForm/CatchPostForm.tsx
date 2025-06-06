import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import SubmitPhotoButton from './SubmitPhotoButton/SubmitPhotoButton';
import PhotoUploadButton from './PhotoUploadButton/PhotoUploadButton';
import UploadedImagePreview from './UploadedImagePreview/UploadedImagePreview';
import LakeSelect from './LakeSelect/LakeSelect';
import DescriptionTextarea from './DescriptionTextarea/DescriptionTextarea';
import UserAvatar from './UserAvatar/UserAvatar';
import { useCatchPostForm } from '../../../hooks/useCatchPostForm';
import { CatchPostFormProps } from '../../../types/CatchPostForm.types';

const CatchPostForm: React.FC<CatchPostFormProps> = ({ onSubmit }) => {
  const { user } = useContext(UserContext) || {};
  const { formData, handleChange, handleImageChange, handleSubmit } = useCatchPostForm(onSubmit);

  return (
    <form
      onSubmit={handleSubmit}
      className='mb-8 p-4 shadow-md rounded border-2 border-gray-300 max-w-3xl mx-auto bg-gray-50'
    >
      <h1 className='text-3xl font-bold mb-4 text-center'>Tablica Połowów</h1>
      
      <div className='flex items-center mb-4'>
        <UserAvatar photoURL={user?.photoURL ?? undefined} />
      </div>
      
      <DescriptionTextarea value={formData.description} onChange={(e) => handleChange('description')(e.target.value)} />
      <PhotoUploadButton onImageChange={handleImageChange} />

      {formData.image && (
        <UploadedImagePreview image={formData.image} onCancel={() => handleChange('image')(null)} />
      )}

      <LakeSelect value={formData.lake} onChange={(e) => handleChange('lake')(e.target.value)} />
      
      <SubmitPhotoButton onClick={handleSubmit} />
    </form>
  );
};

export default CatchPostForm;
