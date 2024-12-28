import React, { useState, useEffect, useContext } from 'react';
import { db, storage } from '../../firebase/firebaseConfig'; // Importowanie konfiguracji Firebase
import { UserContext } from '../../context/UserContext';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FaCircleUser } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid'; // Używamy UUID dla unikalnych ID dla zdjęć i komentarzy

// Typy dla postu i komentarza
interface CatchPost {
  id: string;
  userId: string;
  description: string;
  imageUrl: string;
  avatar: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

interface Comment {
  userId: string;
  content: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const CatchBoard: React.FC = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  
  const [description, setDescription] = useState<string>(''); // Typowanie stanu na string
  const [image, setImage] = useState<File | null>(null); // Typowanie stanu na plik lub null
  const [posts, setPosts] = useState<CatchPost[]>([]); // Lista postów - typowane jako CatchPost[]
  const [comments, setComments] = useState<Comment[]>([]); // Lista komentarzy - typowane jako Comment[]
  const [newComment, setNewComment] = useState<string>(''); // Typowanie stanu na string

  // Wczytywanie istniejących postów
  useEffect(() => {
    const q = query(collection(db, 'catch_board'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const catchBoardPosts: CatchPost[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CatchPost[];
      setPosts(catchBoardPosts);
    });

    return () => unsubscribe();
  }, []);

  // Funkcja obsługująca dodawanie posta
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !image || !user) return;

    // Upload zdjęcia do Firebase Storage
    const imageRef = ref(storage, `catch_board_images/${uuidv4()}`);
    const uploadTask = await uploadBytes(imageRef, image);

    const imageUrl = await getDownloadURL(uploadTask.ref);

    // Dodajemy nowy post do Firestore
    try {
      await addDoc(collection(db, 'catch_board'), {
        userId: user.uid,
        description,
        imageUrl,
        avatar: user.photoURL || '',
        createdAt: serverTimestamp(),
      });

      setDescription('');
      setImage(null);
    } catch (error) {
      console.error("Błąd przy dodawaniu posta:", error);
    }
  };

  // Funkcja obsługująca dodawanie komentarza
  const handleCommentSubmit = async (postId: string) => {
    if (!newComment || !user) return;

    try {
      await addDoc(collection(db, 'catch_board', postId, 'comments'), {
        userId: user.uid,
        content: newComment,
        createdAt: serverTimestamp(),
      });

      setNewComment('');
    } catch (error) {
      console.error("Błąd przy dodawaniu komentarza:", error);
    }
  };

  // Funkcja do wczytywania komentarzy
  const loadComments = (postId: string) => {
    const q = query(collection(db, 'catch_board', postId, 'comments'), orderBy('createdAt', 'asc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postComments: Comment[] = querySnapshot.docs.map(doc => doc.data()) as Comment[];
      setComments(postComments);
    });

    return unsubscribe;
  };

  // Ładowanie komentarzy po załadowaniu postów
  useEffect(() => {
    if (posts.length > 0) {
      loadComments(posts[0]?.id); // Załadowanie komentarzy dla pierwszego posta jako przykład
    }
  }, [posts]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Tablica Połowów</h1>
      <p className="text-lg text-center mb-6">
        Udostępnij swoje połowy i zobacz, co złowili inni.
      </p>

      {/* Formularz dodawania posta */}
      {user && (
        <form onSubmit={handlePostSubmit} className="mb-6">
          <div>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Avatar"
                className="w-12 h-12 rounded-full mb-2"
              />
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
          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="mb-2"
          />
          <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded">Dodaj połów</button>
        </form>
      )}

      {/* Lista postów */}
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
            <p className="text-sm text-gray-500">{new Date(post.createdAt.seconds * 1000).toLocaleString()}</p>

            {/* Komentarze */}
            <div>
              <h3 className="font-bold mt-4">Komentarze:</h3>
              {comments.map((comment, index) => (
                <div key={index} className="border-t mt-2 pt-2">
                  <p>{comment.content}</p>
                  <p className="text-sm text-gray-500">{new Date(comment.createdAt.seconds * 1000).toLocaleString()}</p>
                </div>
              ))}

              {/* Formularz do dodawania komentarzy */}
              {user && (
                <div className="mt-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Napisz komentarz"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <button onClick={() => handleCommentSubmit(post.id)} className="bg-green-500 text-white py-1 px-4 rounded">Dodaj komentarz</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatchBoard;
