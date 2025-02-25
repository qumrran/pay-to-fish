import React, { useState, useEffect, useContext } from 'react';
import { db, storage } from '../../firebase/firebaseConfig';
import { UserContext } from '../../context/UserContext';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { FaCircleUser } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';
import { CatchPost } from '../../types/CatchPost.types';

const CatchBoard: React.FC = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [posts, setPosts] = useState<CatchPost[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'catch_board'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const catchBoardPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CatchPost[];
      setPosts(catchBoardPosts);
    });
    return () => unsubscribe();
  }, []);

  const handleFileValidationAndCompression = async (file: File | null): Promise<File | null> => {
    if (!file) {
      alert("Nie wybrano pliku.");
      return null;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert("Dozwolone są tylko pliki graficzne (JPG, PNG, GIF).");
      return null;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Plik jest za duży. Maksymalny rozmiar to 5MB.");
      return null;
    }

    const options = { maxSizeMB: 0.3, maxWidthOrHeight: 1200, useWebWorker: true };

    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Błąd podczas kompresji obrazu:", error);
      alert("Nie udało się skompresować pliku.");
      return null;
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const validatedFile = await handleFileValidationAndCompression(file);
    if (validatedFile) setImage(validatedFile);
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !image || !user) {
      alert("Wszystkie pola są wymagane.");
      return;
    }

    const imageRef = ref(storage, `catch_board_images/${uuidv4()}`);

    try {
      const uploadTask = await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(uploadTask.ref);

      await addDoc(collection(db, 'catch_board'), {
        userId: user.uid,
        description,
        imageUrl,
        avatar: user.photoURL || '',
        createdAt: serverTimestamp(),
      });

      setDescription('');
      setImage(null);
      alert("Post został dodany!");
    } catch (error) {
      console.error("Błąd przy dodawaniu posta:", error);
      alert("Nie udało się dodać posta.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Tablica Połowów</h1>
      <p className="text-lg text-center mb-6">Udostępnij swoje połowy i zobacz, co złowili inni.</p>

      {user && (
        <form onSubmit={handlePostSubmit} className="mb-6">
          <div>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-12 h-12 rounded-full mb-2" />
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
          <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded">Dodaj połów</button>
        </form>
      )}

      <div>
        {posts.map((post) => (
          <div key={post.id} className="border p-4 mb-4 rounded shadow-md">
            <div className="flex items-center mb-4">
              {post.avatar ? (
                <img src={post.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
              ) : (
                <FaCircleUser className="w-10 h-10 text-gray-500 mr-2" />
              )}
              <p className="font-bold">{post.userId}</p>
            </div>
            <img src={post.imageUrl} alt="Połów" className="w-full h-64 object-cover mb-4" />
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatchBoard;
