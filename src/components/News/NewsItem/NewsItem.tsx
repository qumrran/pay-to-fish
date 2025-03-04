import React from 'react';
import LazyLoad from 'react-lazyload';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { NewsItem as NewsItemType } from '../../../types/NewsItem.types';

interface NewsItemProps {
	newsItem: NewsItemType;
}

const NewsItem: React.FC<NewsItemProps> = ({ newsItem }) => {
	const { title, content, imgUrl, date } = newsItem;

	return (
		<li className='p-4 bg-white shadow-md rounded'>
			<div className='mx-auto w-full max-w-3xl'>
				<div className='flex items-center justify-start mb-4'>
					<BsFillInfoCircleFill className='text-3xl text-cyan-500 mr-3' />
					<h3 className='font-serif font-bold text-2xl sm:text-3xl mb-0'>
						{title}
					</h3>
				</div>

				<div className='border-b-2 border-gray-300 mb-4' />

				<p className='text-gray-700 sm:text-lg mb-4'>{content}</p>

				{imgUrl && (
					<LazyLoad height={200} offset={100}>
						<img
							src={imgUrl}
							alt={title}
							className='w-full h-auto mb-4 rounded'
						/>
					</LazyLoad>
				)}

				<p className='text-sm text-gray-500 font-sans'>{date}</p>
			</div>
		</li>
	);
};

export default NewsItem;
