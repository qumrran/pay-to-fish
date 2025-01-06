import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { ClipLoader } from 'react-spinners';
import LazyLoad from 'react-lazyload';
import { SlArrowRightCircle } from "react-icons/sl";

// Definicja typu BlogPost
interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  imgUrl: string;
  category: string;
  author: string;
  tags: string[];
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState<BlogPost | null>(null);

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
          tags: Array.isArray(docData.tags) ? docData.tags : [],
        } as BlogPost;
      });

      // Sortowanie po dacie (najnowsze na początku)
      const sortedData = data.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      setPosts(sortedData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderExpandedPost = (post: BlogPost) => (
    <div className="p-4">
      <div className="mx-auto max-w-5xl bg-white p-6 shadow-md rounded-lg">
        <button
          className="text-blue-500 hover:text-blue-700 mb-4"
          onClick={() => setExpandedPost(null)}
        >
          Wstecz
        </button>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-2">{post.date}</p>
        {post.imgUrl && (
          <img src={post.imgUrl} alt={post.title} className="w-full h-auto mb-4 rounded" />
        )}
        <p className="text-lg text-gray-700 mb-4">{post.content}</p>
        <div className="text-sm text-gray-600 mb-4">
          <span>Autor: {post.author}</span>
          <span className="ml-4">Kategoria: {post.category}</span>
        </div>
        <div className="flex flex-wrap">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-600 text-xs py-1 px-2 rounded-full mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <ClipLoader color="#3498db" size={50} loading={loading} />
        </div>
      ) : expandedPost ? (
        renderExpandedPost(expandedPost)
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {post.imgUrl && (
                <LazyLoad height={200} offset={100}>
                  <img
                    src={post.imgUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </LazyLoad>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-xl mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{post.date}</p>
                <p className="text-sm text-gray-700 mb-4">
                  {post.content.substring(0, 150)}...
                </p>
                <div className="flex justify-between items-center text-xs text-gray-600 mb-4">
                  <span>Autor: {post.author}</span>
                  <span>Kategoria: {post.category}</span>
                </div>
                <div className="flex mt-4">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-600 text-xs py-1 px-2 rounded-full mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="bg-gray-200 text-gray-600 text-xs py-1 px-2 rounded-full mr-2">
                      +{post.tags.length - 2} inne
                    </span>
                  )}
                </div>
                <button
  onClick={() => setExpandedPost(post)}
  className="mt-4 text-black hover:text-white flex items-center border-2 border-black rounded px-2 py-1 hover:bg-black hover:cursor-pointer transition-colors duration-200 text-sm"
>
  Czytaj dalej
  <SlArrowRightCircle className="ml-2 text-lg" />
</button>


              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
