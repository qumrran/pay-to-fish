import { toast } from 'react-toastify';
import { AddPostFunction } from '../types/useAddPost.types';

export const useAddPost = (
  addPost: AddPostFunction 
) => {
  const handleAddPost = async (description: string, image: File, lake: string) => {
    try {
      await addPost(description, image, lake);
      toast.success('Dodano nowy post!');
    } catch {
      toast.error('Błąd podczas dodawania posta.');
    }
  };

  return { handleAddPost };
};
