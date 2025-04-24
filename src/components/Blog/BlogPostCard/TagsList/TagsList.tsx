import React from 'react';
import { TagsListProps } from '../../../../types/TagsList.types';

const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap mt-1">
      {tags.slice(0, 2).map((tag, index) => (
        <span
          key={index}
          className="bg-gray-200 text-gray-600 text-xs py-1 px-2 rounded-full mr-2 mb-2"
        >
          {tag}
        </span>
      ))}
      {tags.length > 2 && (
        <span className="bg-gray-200 text-gray-600 text-xs py-1 px-2 rounded-full mr-2 mb-2">
          +{tags.length - 2} inne
        </span>
      )}
    </div>
  );
};

export default TagsList;
