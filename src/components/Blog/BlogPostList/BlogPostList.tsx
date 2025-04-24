import React from 'react';
import { BlogPost } from '../../../types/Blog.types';
import BlogPostCard from '../BlogPostCard/BlogPostCard';

const BlogPostList: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  return (
    <div className="max-w-9xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogPostList;
