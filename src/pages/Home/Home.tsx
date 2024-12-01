import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-blue-500 text-white">
      <h1 className="text-5xl font-extrabold mb-6">Welcome to Pay-to-Fish Lake</h1>
      <p className="text-xl mb-6">Your ultimate fishing destination awaits.</p>
      <div className="flex space-x-4">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-700 rounded-lg shadow-lg text-white font-semibold hover:bg-blue-800"
        >
          Log In
        </a>
        <a
          href="/dashboard"
          className="px-6 py-3 bg-green-700 rounded-lg shadow-lg text-white font-semibold hover:bg-green-800"
        >
          Visit Dashboard
        </a>
      </div>
    </div>
  );
};

export default Home;
