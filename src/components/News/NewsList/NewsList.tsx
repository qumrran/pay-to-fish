import React from 'react';
import { NewsItem as NewsItemType } from '../../../types/NewsItem.types';
import NewsItem from '../NewsItem/NewsItem';

interface NewsListProps {
	news: NewsItemType[];
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
	return (
		<ul className='space-y-4'>
			{news.map((newsItem) => (
				<NewsItem key={newsItem.id} newsItem={newsItem} />
			))}
		</ul>
	);
};

export default NewsList;
