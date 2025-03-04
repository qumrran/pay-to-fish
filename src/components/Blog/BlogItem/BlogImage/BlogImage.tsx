import React from 'react';
import LazyLoad from 'react-lazyload';

interface BlogImageProps {
  imgUrl: string;
  title: string;
}

const BlogImage: React.FC<BlogImageProps> = ({ imgUrl, title }) => {
  if (!imgUrl) return null;

  return (
    <LazyLoad height={200} offset={100}>
      <img src={imgUrl} alt={title} className="w-full h-48 object-cover" />
    </LazyLoad>
  );
};

export default BlogImage;
