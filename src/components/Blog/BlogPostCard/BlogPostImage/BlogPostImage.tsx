import React from 'react';
import LazyLoad from 'react-lazyload';
import { BlogPostImageProps } from '../../../../types/BlogPostImage.types';

const BlogPostImage: React.FC<BlogPostImageProps> = ({ imgUrl, title }) => {
  return (
    <LazyLoad height={200} offset={100}>
      <img src={imgUrl} alt={title} className="w-full h-48 object-cover" />
    </LazyLoad>
  );
};

export default BlogPostImage;
