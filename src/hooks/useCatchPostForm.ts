import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import useImageValidation from './useImageValidation';
import { FormData } from '../types/FormData.types';

export const useCatchPostForm = (onSubmit: (desc: string, image: File, lake: string) => Promise<void>) => {
  const [formData, setFormData] = useState<FormData>({ description: '', image: null, lake: '' });
  const validateImage = useImageValidation();

  const handleChange = (field: keyof FormData) => (value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const validated = await validateImage(file);
    if (validated) handleChange('image')(validated);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { description, image, lake } = formData;

    if (!description || !image || !lake) {
      toast.error('Wypełnij wszystkie pola oraz wybierz zdjęcie!', { position: 'top-center', autoClose: 3000 });
      return;
    }

    await onSubmit(description, image, lake);
    setFormData({ description: '', image: null, lake: '' });
  };

  return { formData, handleChange, handleImageChange, handleSubmit };
};
