// src/pages/LandingPage/LandingPage.tsx
import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-green-500 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-extrabold mb-6">Pay-to-Fish</h1>
      <p className="text-lg mb-6">Odkryj najlepsze miejsca do łowienia ryb online.</p>
      <div className="flex space-x-4">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-700 rounded-lg shadow-lg hover:bg-blue-800"
        >
          Zaloguj się
        </a>
        <a
          href="/news"
          className="px-6 py-3 bg-green-700 rounded-lg shadow-lg hover:bg-green-800"
        >
          Aktualności
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
