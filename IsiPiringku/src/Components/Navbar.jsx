import React from 'react';
import logo from '../assets/Logo Isi Piringku Tulisan Samping 2.png';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between h-22 px-8 py-2 bg-[#8BDF8D] border-b border-[#6FBF70] shadow-md">
      <div>
        <img src={logo} alt="Logo" className="h-27 object-contain " />
      </div>
      <div className="flex gap-20">
        <button className="flex items-center justify-center text-white text-2xl h-10 w-27 rounded-md hover:bg-[#995B00]/40 hover:shadow hover:shadow-white transition">Home</button>
        <button 
        className="flex items-center justify-center text-white text-2xl h-10 w-27 rounded-md hover:bg-[#995B00]/40 hover:shadow hover:shadow-white transition"
        onClick={() => {
          const articleSection = document.getElementById('article');
          if (articleSection) {
            articleSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
          >Artikel
        </button>
      </div>
      <div className="flex gap-7">
        <button className="bg-[#4CAF50]/40 text-[#224F24] text-2xl h-10 w-26 rounded-md font-light hover:shadow hover:shadow-white transition border border-white">Login</button>
        <button className="bg-[#FF9800]/40 text-[#995B00] text-2xl h-10 w-26 rounded-md font-light hover:shadow hover:shadow-white transition border border-white">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;