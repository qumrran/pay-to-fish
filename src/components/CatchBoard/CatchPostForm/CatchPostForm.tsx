
import React, { useContext, useState } from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import { UserContext } from '../../../context/UserContext';
import useImageValidation from '../../../hooks/useImageValidation';

const CatchPostForm: React.FC<{ onSubmit: (desc: string, image: File, lake: string) => void }> = ({ onSubmit }) => {
  const { user } = useContext(UserContext) || {};
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [lake, setLake] = useState('');
  const validateImage = useImageValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !image || !lake) return alert("Wypełnij wszystkie pola.");
    onSubmit(description, image, lake);
    setDescription('');
    setImage(null);
    setLake('');
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const validated = await validateImage(file);
    if (validated) setImage(validated);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-6">
      <div>
        {user?.photoURL ? (
          <img src={user.photoURL} alt="avatar" className="w-12 h-12 rounded-full mb-2" />
        ) : (
          <FaCircleUser className="w-12 h-12 text-gray-500 mb-2" />
        )}
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Opisz swój połów"
        className="w-full p-2 border rounded mb-2"
      />
      <input type="file" onChange={handleImageChange} className="mb-2" />
      <select
        value={lake}
        onChange={(e) => setLake(e.target.value)}
        className="block w-full p-2 border rounded mb-4"
      >
        <option value="">-- Wybierz łowisko --</option>
        <option value="Łowisko 1">Łowisko 1</option>
        <option value="Łowisko 2">Łowisko 2</option>
        <option value="Łowisko 3">Łowisko 3</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded">Dodaj połów</button>
    </form>
  );
};

export default CatchPostForm;
