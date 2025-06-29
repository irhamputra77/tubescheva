import React from 'react';
import './index.css';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import Features from './Pages/Features';
import Background from './assets/Desktop - 12.png';

const App = () => {
  return (
    <div
      className="min-h-screen font-sans bg-contain bg-no-repeat bg-top bg-green-300"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <Navbar />
      <HomePage />
      <Features />
    </div>
  );
};

export default App;