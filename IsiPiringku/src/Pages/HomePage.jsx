import React from 'react';
import Navbar from '../Components/Navbar';
import Features from '../Pages/Features';
import Background from '../assets/Desktop - 12.png';
import Dashboard from '../Pages/Dashboard';
import HeroSection from './HeroSection';
const HomePage = () => {
  return (
    <div
      className="min-h-screen font-sans bg-contain bg-no-repeat bg-top bg-green-300"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <Navbar />
      <HeroSection />
      <Features />
    </div>
  );
};

export default HomePage;