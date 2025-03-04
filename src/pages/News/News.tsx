import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Shared/Loader/Loader';
import NewsList from '../../components/News/NewsList/NewsList';
import { useFetchNews } from '../../hooks/useFetchNews';

const News: React.FC = () => {
  const { news, loading } = useFetchNews();

  return (
    <div className="p-4 font-serif">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        theme="dark"
      />

      {loading ? <Loader /> : <NewsList news={news} />}
    </div>
  );
};

export default News;
