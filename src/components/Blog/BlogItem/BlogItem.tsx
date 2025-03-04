import React from 'react';
import { BlogPost } from '../../../types/Blog.types';
import ReadMoreButton from './ReadMoreButton/ReadMoreButton';
import BlogImage from './BlogImage/BlogImage';

interface BlogItemProps {
  post: BlogPost;
}

const BlogItem: React.FC<BlogItemProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
      <BlogImage imgUrl={post.imgUrl} title={post.title} />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-xl mb-2 line-clamp-2 font-serif" title={post.title}>
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{post.date}</p>
        <p className="text-sm text-gray-700 mb-4">{post.content.substring(0, 150)}...</p>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Autor: {post.author}</span>
          <span>Kategoria: {post.category}</span>
        </div>
        <ReadMoreButton slug={post.slug} />
      </div>
    </div>
  );
};

export default BlogItem;
