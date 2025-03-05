import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Shared/Loader/Loader';
import useBlogPosts from '../../hooks/useBlogPosts';
import BlogPostExpanded from '../../components/Blog/BlogPostExpanded/BlogPostExpanded';
import BlogPostList from '../../components/Blog/BlogPostList/BlogPostList';

const Blog: React.FC = () => {
  const { slug } = useParams();
  const { posts, loading } = useBlogPosts();
  
  const postToDisplay = useMemo(() => posts.find(post => post.slug === slug), [posts, slug]);

  return (
    <div className="p-4">
      {loading ? <Loader /> : postToDisplay ? <BlogPostExpanded post={postToDisplay} /> : <BlogPostList posts={posts} />}
    </div>
  );
};

export default Blog;
