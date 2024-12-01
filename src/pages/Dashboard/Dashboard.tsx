import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg text-center mb-6">
        Manage your profile, bookings, and catch records with ease.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Go Back to Home
      </a>
    </div>
  );
};

export default Dashboard;
