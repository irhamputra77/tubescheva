import React from 'react';
import logo from '../assets/Logo Isi Piringku Tulisan Samping 2.png';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-16 px-8 py-2 bg-transparent">
      <div>
        <img src={logo} alt="Logo" className="h-22 object-contain mt-[-17px] ml-[-16px]" />
      </div>
      <div className="flex gap-10 mt-2">
        <button className="flex items-center justify-center text-white h-8 w-24 rounded-md hover:bg-[#995B00]/40 hover:shadow hover:shadow-white transition">Home</button>
        <button className="flex items-center justify-center text-white h-8 w-24 rounded-md hover:bg-[#995B00]/40 hover:shadow hover:shadow-white transition">Artikel</button>
      </div>
      <div className="flex gap-7 mt-2">
        <button className="bg-[#4CAF50]/40 text-[#224F24] h-8 w-24 rounded-md font-light hover:shadow hover:shadow-white transition border border-white">Login</button>
        <button className="bg-[#FF9800]/40 text-[#995B00] h-8 w-24 rounded-md font-light hover:shadow hover:shadow-white transition border border-white">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;