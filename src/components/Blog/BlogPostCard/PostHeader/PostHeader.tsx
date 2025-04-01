import React from 'react';
import { PostHeaderProps } from '../../../../types/PostHeader.types';

const PostHeader: React.FC<PostHeaderProps> = ({ title, date, author, category }) => (
  <>
    <h3 className="font-semibold text-xl mb-2 line-clamp-2 overflow-hidden text-ellipsis font-serif" title={title}>
      {title}
    </h3>
    <p className="text-sm text-gray-500 mb-2">{date}</p>
    <div className="flex justify-between items-center text-xs text-gray-600 mb-4">
      <span>Autor: {author}</span>
      <span>Kategoria: {category}</span>
    </div>
  </>
);

export default PostHeader;
