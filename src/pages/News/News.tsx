import React, { useState, useContext, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { UserContext } from '../../context/UserContext';
import { ClipLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LazyLoad from 'react-lazyload';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  imgUrl: string;
}

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext) || {};

  useEffect(() => {
    const q = query(collection(db, 'news'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: Number(doc.data().id),
        ...doc.data(),
      })) as NewsItem[];

      const sortedData = data.sort((a, b) => b.id - a.id);

      setNews(sortedData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="p-4">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={false}
        theme="dark"
      />

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <ClipLoader color="#3498db" size={50} loading={loading} />
        </div>
      ) : (
        <>
        
          <ul className="space-y-4">
            {news.map((newsItem) => (
              <li key={newsItem.id} className="p-4 bg-white shadow-md rounded">
                <div className="mx-auto w-full max-w-3xl">
                  <h3 className="font-bold text-lg mb-2">{newsItem.title}</h3>
                  <p className="mb-4">{newsItem.content}</p>
                  {newsItem.imgUrl && (
                    <LazyLoad height={200} offset={100}>
                      <img
                        src={newsItem.imgUrl}
                        alt={newsItem.title}
                        className="w-full h-auto mb-4 rounded"
                      />
                    </LazyLoad>
                  )}
                  <p className="text-sm text-gray-500">{newsItem.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default News;
