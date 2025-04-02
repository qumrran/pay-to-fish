import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import SubmitPhotoButton from './SubmitPhotoButton/SubmitPhotoButton';
import PhotoUploadButton from './PhotoUploadButton/PhotoUploadButton';
import UploadedImagePreview from './UploadedImagePreview/UploadedImagePreview';
import LakeSelect from './LakeSelect/LakeSelect';
import DescriptionTextarea from './DescriptionTextarea/DescriptionTextarea';
import UserAvatar from './UserAvatar/UserAvatar';
import { useCatchPostForm } from '../../../hooks/useCatchPostForm';

const CatchPostForm: React.FC<{ onSubmit: (desc: string, image: File, lake: string) => Promise<void> }> = ({ onSubmit }) => {
  const { user } = useContext(UserContext) || {};
  const { formData, handleChange, handleImageChange, handleSubmit } = useCatchPostForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-6">
      <UserAvatar photoURL={user?.photoURL ?? undefined} />

      <DescriptionTextarea value={formData.description} onChange={(e) => handleChange('description')(e.target.value)} />
      <PhotoUploadButton onImageChange={handleImageChange} />

      {formData.image && <UploadedImagePreview image={formData.image} onCancel={() => handleChange('image')(null)} />}

      <LakeSelect value={formData.lake} onChange={(e) => handleChange('lake')(e.target.value)} />
      <SubmitPhotoButton onClick={handleSubmit} />
    </form>
  );
};

export default CatchPostForm;
