import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { BlogPost } from '../types/Blog.types';

export const useFetchBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'blog'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title || 'Brak tytułu',
        content: doc.data().content || '',
        date: doc.data().date || 'Brak daty',
        imgUrl: doc.data().imgUrl || '',
        category: doc.data().category || 'Brak kategorii',
        author: doc.data().author || 'Nieznany autor',
        slug: doc.data().slug || '',
        tags: Array.isArray(doc.data().tags) ? doc.data().tags : [],
      })) as BlogPost[];

      setPosts(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { posts, loading };
};
