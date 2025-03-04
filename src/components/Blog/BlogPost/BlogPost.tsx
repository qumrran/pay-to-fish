import React from 'react';
import type { BlogPost } from '../../../types/Blog.types';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../Shared/BackButton/BackButton';

interface BlogPostProps {
  post: BlogPost;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="mx-auto max-w-5xl bg-gray-50 p-6 shadow-md rounded-lg">
        <BackButton onClick={() => navigate('/blog')} />
        <h1 className="text-3xl font-bold mb-4 mt-4 font-serif">{post.title}</h1>
        <p className="text-gray-500 mb-2">{post.date}</p>
        {post.imgUrl && <img src={post.imgUrl} alt={post.title} className="w-full h-auto mb-4 rounded" />}
        <p className="text-lg text-gray-700 mb-4 font-serif">{post.content}</p>
        <div className="text-sm text-gray-600 mb-4">
          <span>Autor: {post.author}</span>
          <span className="ml-4">Kategoria: {post.category}</span>
        </div>
        <BackButton onClick={() => navigate('/blog')} />
      </div>
    </div>
  );
};

export default BlogPost;
