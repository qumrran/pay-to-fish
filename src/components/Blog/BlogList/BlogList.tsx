import React from 'react';
import BlogItem from '../BlogItem/BlogItem';
import { BlogPost } from '../../../types/Blog.types';

interface BlogListProps {
  posts: BlogPost[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="max-w-9xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {posts.map((post) => (
        <BlogItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
