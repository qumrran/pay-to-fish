import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './../src/pages/Home/Home';
import Dashboard from './../src/pages/Dashboard/Dashboard';
import Login from './../src/pages/Login/Login';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
