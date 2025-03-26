import { toast } from 'react-toastify';
import { DocumentReference, DocumentData } from 'firebase/firestore';

export const useAddPost = (
  addPost: (description: string, image: File, lake: string) => Promise<DocumentReference<DocumentData>>
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
