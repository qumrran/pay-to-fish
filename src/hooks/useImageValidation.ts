import imageCompression from 'browser-image-compression';
import { toast } from 'react-toastify';

const useImageValidation = () => {
  return async (file: File | null): Promise<File | null> => {
    if (!file) return null;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast.error('Nieprawidłowy format zdjęcia. Użyj .jpg lub .png');
      return null;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Plik jest za duży. Maksymalny rozmiar to 5MB');
      return null;
    }

    return await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
    });
  };
};

export default useImageValidation;
