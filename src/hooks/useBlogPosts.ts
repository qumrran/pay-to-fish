import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { BlogPost } from '../types/Blog.types';

const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'blog'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          title: docData.title || 'Brak tytułu',
          content: docData.content || '',
          date: docData.date || 'Brak daty',
          imgUrl: docData.imgUrl || '',
          category: docData.category || 'Brak kategorii',
          author: docData.author || 'Nieznany autor',
          slug: docData.slug || '',
          tags: Array.isArray(docData.tags) ? docData.tags : [],
        } as BlogPost;
      });

      setPosts(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { posts, loading };
};

export default useBlogPosts;
