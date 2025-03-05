import React from 'react';
import LazyLoad from 'react-lazyload';

interface Props {
  imgUrl: string;
  title: string;
}

const BlogPostImage: React.FC<Props> = ({ imgUrl, title }) => {
  return (
    <LazyLoad height={200} offset={100}>
      <img src={imgUrl} alt={title} className="w-full h-48 object-cover" />
    </LazyLoad>
  );
};

export default BlogPostImage;
