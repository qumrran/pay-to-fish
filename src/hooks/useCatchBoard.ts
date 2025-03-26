
import { useEffect, useState } from 'react';
import {
  collection, addDoc, deleteDoc, doc, getDoc,
  onSnapshot, orderBy, query, serverTimestamp, updateDoc
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../firebase/firebaseConfig';
import { CatchPost } from '../types/CatchPost.types';

export const useCatchBoard = (user: any) => {
  const [posts, setPosts] = useState<CatchPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'catch_board'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CatchPost[];
      setPosts(updatedPosts);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addPost = async (description: string, image: File, lake: string) => {
    const imageRef = ref(storage, `catch_board_images/${uuidv4()}`);
    const uploadTask = await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(uploadTask.ref);

    return await addDoc(collection(db, 'catch_board'), {
      userId: user?.uid,
      userName: user?.displayName || 'Anonimowy użytkownik',
      avatar: user?.photoURL || '',
      imageUrl,
      description,
      lake,
      createdAt: serverTimestamp(),
    });
  };

  const deletePost = async (postId: string) => {
    const postDoc = doc(db, 'catch_board', postId);
    const snapshot = await getDoc(postDoc);
    const data = snapshot.data();
    if (data?.imageUrl) {
      await deleteObject(ref(storage, data.imageUrl));
    }
    return await deleteDoc(postDoc);
  };

  const updateDescription = async (postId: string, description: string) => {
    return await updateDoc(doc(db, 'catch_board', postId), {
      description,
      updatedAt: serverTimestamp(),
    });
  };

  return {
    posts,
    loading,
    addPost,
    deletePost,
    updateDescription,
  };
};
