import React from 'react';
import { NewsItem as NewsItemType } from '../../../types/NewsItem.types';
import NewsItem from '../NewsItem/NewsItem';

const NewsList: React.FC<{ news: NewsItemType[] }> = ({ news }) => {
  return (
    <ul className='space-y-4'>
      {news.map((newsItem) => (
        <NewsItem key={newsItem.id} newsItem={newsItem} />
      ))}
    </ul>
  );
};

export default NewsList;
