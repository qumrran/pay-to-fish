import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { NewsItem } from '../types/NewsItem.types';

export const useFetchNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = () => {
      const q = query(collection(db, 'news'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const sortedData = snapshot.docs
          .map((doc) => ({
            id: Number(doc.data().id),
            ...doc.data(),
          }))
          .sort((a, b) => b.id - a.id) as NewsItem[];

        setNews(sortedData);
        setLoading(false);
      });

      return unsubscribe;
    };

    const unsubscribe = fetchNews();

    return () => unsubscribe();
  }, []);

  return { news, loading };
};
