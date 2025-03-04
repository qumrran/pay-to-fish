import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchBlogPosts } from '../../hooks/useFetchBlogPosts';
import Loader from '../../components/Shared/Loader/Loader';
import BlogList from '../../components/Blog/BlogList/BlogList';
import BlogPost from '../../components/Blog/BlogPost/BlogPost';

const Blog: React.FC = () => {
  const { slug } = useParams();
  const { posts, loading } = useFetchBlogPosts();
  const postToDisplay = posts.find((post) => post.slug === slug);

  return (
    <div className="p-4">
      {loading ? <Loader /> : postToDisplay ? <BlogPost post={postToDisplay} /> : <BlogList posts={posts} />}
    </div>
  );
};

export default Blog;
