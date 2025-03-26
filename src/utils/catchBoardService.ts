import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
  } from 'firebase/firestore';
  import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
  import { db, storage } from '../firebase/firebaseConfig';
  import { v4 as uuidv4 } from 'uuid';
  import { CatchPost } from '../types/CatchPost.types';
  
  export const subscribeToPosts = (cb: (posts: CatchPost[]) => void) => {
    const q = query(collection(db, 'catch_board'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      const updated = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as CatchPost[];
      cb(updated);
    });
  };
  
  export const createPost = async (
    description: string,
    image: File,
    lake: string,
    user: any
  ) => {
    const imgRef = ref(storage, `catch_board_images/${uuidv4()}`);
    const uploadTask = await uploadBytes(imgRef, image);
    const imageUrl = await getDownloadURL(uploadTask.ref);
  
    return addDoc(collection(db, 'catch_board'), {
      userId: user?.uid,
      userName: user?.displayName || 'Anonimowy użytkownik',
      avatar: user?.photoURL || '',
      imageUrl,
      description,
      lake,
      createdAt: serverTimestamp(),
    });
  };
  
  export const removePost = async (postId: string) => {
    const docRef = doc(db, 'catch_board', postId);
    const snap = await getDoc(docRef);
    const data = snap.data();
    if (data?.imageUrl) {
      await deleteObject(ref(storage, data.imageUrl));
    }
    return deleteDoc(docRef);
  };
  
  export const updatePostDescription = async (postId: string, description: string) => {
    return updateDoc(doc(db, 'catch_board', postId), {
      description,
      updatedAt: serverTimestamp(),
    });
  };
  