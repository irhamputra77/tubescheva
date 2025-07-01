import React from 'react';
import Navbar from '../Components/Navbar';
import Article from './Article';
import Background from '../assets/Background2 2.png';
import HeroSection from './HeroSection';
const HomePage = () => {
  return (
    <div className="font-sans bg-[#8BDF8D]">
        <div
          className="pt-16 font-sans bg-cover bg-no-repeat bg-top bg-[#8BDF8D]"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(139, 223, 141, 0) 92%, #8BDF8D 100%), url(${Background})` }}
        >
            <Navbar />
            <HeroSection />
      </div>

        <div className="bg-[#8BDF8D]">
           <Article />
        </div>
    </div>
  );
};

export default HomePage;