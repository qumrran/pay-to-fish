import React from 'react';
import { BlogPost } from '../../../types/Blog.types';
import ReadMoreButton from './ReadMoreButton/ReadMoreButton';
import BlogPostImage from './BlogPostImage/BlogPostImage';
import TagsList from './TagsList/TagsList';
import { truncateText } from '../../../utils/truncateText';
import PostHeader from './PostHeader/PostHeader';

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
      {post.imgUrl && <BlogPostImage imgUrl={post.imgUrl} title={post.title} />}
      <div className="p-4 flex flex-col flex-grow">
        <PostHeader
          title={post.title}
          date={post.date}
          author={post.author}
          category={post.category}
        />
        <p className="text-sm text-gray-700 mb-4">{truncateText(post.content, 150)}</p>
        <TagsList tags={post.tags} />
        <div className="mt-auto">
          <ReadMoreButton slug={post.slug} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
