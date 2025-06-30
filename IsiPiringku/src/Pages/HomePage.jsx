import React from 'react';
import Navbar from '../Components/Navbar';
import Features from '../Pages/Features';
import Background from '../assets/Background2 2.png';
import Dashboard from '../Pages/Dashboard';
import HeroSection from './HeroSection';
const HomePage = () => {
  return (
    <div
      className="min-h-screen pt-16 font-sans bg-cover bg-no-repeat bg-top bg-[#8BDF8D]"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <Navbar />
      <HeroSection />
      <Features />
    </div>
  );
};

export default HomePage;