import React, { useState, useEffect, useContext } from 'react';
import { db, storage } from '../../firebase/firebaseConfig';
import { UserContext } from '../../context/UserContext';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { FaCircleUser } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';
import { CatchPost } from '../../types/CatchPost.types';
import Loader from '../../components/Shared/Loader/Loader'; 
import LazyLoad from 'react-lazyload';

const CatchBoard: React.FC = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [posts, setPosts] = useState<CatchPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLake, setSelectedLake] = useState<string>(''); 
  const [editPostId, setEditPostId] = useState<string | null>(null); 
  const [editDescription, setEditDescription] = useState<string>('');
  const [postToDelete, setPostToDelete] = useState<string | null>(null); 
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false); 

  useEffect(() => {
    const q = query(collection(db, 'catch_board'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const catchBoardPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CatchPost[];
      setPosts(catchBoardPosts);
      setLoading(false);
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
    if (validatedFile) {
      setImage(validatedFile);
    } else {
      console.log("Invalid file or error during compression.");
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !image || !user || !selectedLake) {
      alert("Wszystkie pola są wymagane.");
      return;
    }

    const imageRef = ref(storage, `catch_board_images/${uuidv4()}`);

    try {
      const uploadTask = await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(uploadTask.ref);

      await addDoc(collection(db, 'catch_board'), {
        userId: user.uid,
        userName: user.displayName || 'Anonimowy użytkownik',
        description,
        imageUrl,
        avatar: user.photoURL || '',
        createdAt: serverTimestamp(),
        lake: selectedLake, 
      });

      setDescription('');
      setImage(null);
      setSelectedLake('');
      alert("Post został dodany!");
    } catch (error) {
      console.error("Błąd przy dodawaniu posta:", error);
      alert("Nie udało się dodać posta.");
    }
  };

  const handleDeletePost = async () => {
    if (!postToDelete) {
      alert("Brak posta do usunięcia.");
      return;
    }

    try {
      const postDoc = doc(db, 'catch_board', postToDelete);
      const postSnapshot = await getDoc(postDoc);
      const postData = postSnapshot.data();

      if (postData?.imageUrl) {
        const imageRef = ref(storage, postData.imageUrl);
        await deleteObject(imageRef);
      }

      await deleteDoc(postDoc);
      setPostToDelete(null);
      setShowDeleteConfirmation(false);
      alert("Post został usunięty.");
    } catch (error) {
      console.error("Błąd przy usuwaniu posta:", error);
      alert("Nie udało się usunąć posta.");
    }
  };

  const handleEditPost = (postId: string, currentDescription: string) => {
    setEditPostId(postId);
    setEditDescription(currentDescription);
  };

  const handleSaveEdit = async () => {
    if (!editDescription || !editPostId) return;

    try {
      await updateDoc(doc(db, 'catch_board', editPostId), {
        description: editDescription,
        updatedAt: serverTimestamp(),
      });

      setEditPostId(null);
      setEditDescription('');
      alert("Post został zaktualizowany!");
    } catch (error) {
      console.error("Błąd przy edytowaniu posta:", error);
      alert("Nie udało się edytować posta.");
    }
  };

  const handleCancelEdit = () => {
    setEditPostId(null);
    setEditDescription('');
  };

  const getLakeText = (lake: string) => {
    switch (lake) {
      case 'Łowisko 1':
        return 'Zdjęcie zostało wykonane na łowisku numer 1';
      case 'Łowisko 2':
        return 'Zdjęcie zostało wykonane na łowisku numer 2';
      case 'Łowisko 3':
        return 'Zdjęcie zostało wykonane na łowisku numer 3';
      default:
        return 'Brak informacji o łowisku';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Tablica Połowów</h1>
      <p className="text-lg text-center mb-6">Udostępnij swoje połowy i zobacz, co złowili inni.</p>

      {loading ? (
        <Loader />
      ) : (
        <>
          {user && (
            <form onSubmit={handlePostSubmit} className="max-w-3xl mx-auto mb-6">
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
              <div className="mb-4">
                <label htmlFor="lake" className="block text-sm font-medium text-gray-700">Wybierz łowisko</label>
                <select
                  id="lake"
                  value={selectedLake}
                  onChange={(e) => setSelectedLake(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded"
                >
                  <option value="">-- Wybierz łowisko --</option>
                  <option value="Łowisko 1">Łowisko 1</option>
                  <option value="Łowisko 2">Łowisko 2</option>
                  <option value="Łowisko 3">Łowisko 3</option>
                </select>
              </div>
              <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded">Dodaj połów</button>
            </form>
          )}

          <div className="max-w-3xl mx-auto">
            {posts.map((post) => (
              <div key={post.id} className="border p-4 mb-4 rounded shadow-md">
                <div className="flex items-center mb-4">
                  {post.avatar ? (
                    <img src={post.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
                  ) : (
                    <FaCircleUser className="w-10 h-10 text-gray-500 mr-2" />
                  )}
                  <p className="font-bold">{post.userName || 'Anonimowy użytkownik'}</p>
                </div>
                <LazyLoad height={200} offset={100}>
                  <img 
                    src={post.imageUrl} 
                    alt="Połów" 
                    className="w-full h-auto mb-4 rounded"
                  />
                </LazyLoad>
                {editPostId === post.id ? (
                  <>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full p-2 border rounded mb-2"
                    />
                    <div className="mt-4">
                      <button onClick={handleSaveEdit} className="bg-green-500 text-white py-1 px-4 rounded mr-2">
                        Zapisz zmiany
                      </button>
                      <button onClick={handleCancelEdit} className="bg-gray-500 text-white py-1 px-4 rounded">
                        Anuluj
                      </button>
                    </div>
                  </>
                ) : (
                  <p>{post.description}</p>
                )}
                <p className="text-sm text-gray-500">
                  Dodano: {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleString() : 'Brak daty'}
                </p>
                <p className="text-sm text-gray-500">{getLakeText(post.lake)}</p>

                {user && user.uid === post.userId && (
                  <>
                    {editPostId === post.id ? null : (
                      <button 
                        onClick={() => handleEditPost(post.id, post.description)} 
                        className="mt-4 bg-blue-500 text-white py-1 px-4 rounded"
                      >
                        Edytuj post
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        setPostToDelete(post.id);
                        setShowDeleteConfirmation(true);
                      }} 
                      className="mt-4 ml-2 bg-red-500 text-white py-1 px-4 rounded"
                    >
                      Usuń post
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

         
          {showDeleteConfirmation && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg">
                <p>Czy na pewno chcesz usunąć ten post?</p>
                <div className="mt-4">
                  <button 
                    onClick={handleDeletePost} 
                    className="bg-red-500 text-white py-1 px-4 rounded mr-2"
                  >
                    Tak, usuń
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirmation(false)} 
                    className="bg-gray-500 text-white py-1 px-4 rounded"
                  >
                    Anuluj
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CatchBoard;
