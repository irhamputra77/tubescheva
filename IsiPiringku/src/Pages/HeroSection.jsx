import React from "react";
import MockupImage from "../assets/Mockup.png";

export default function HeroSection() {
  return (
    <div className="w-full pl-4 sm:pl-8 md:pl-16 lg:pl-32 pr-0 flex flex-col-reverse md:flex-row items-center justify-between min-h-[calc(100vh-64px)] relative z-10">
      {/* Text Section */}
      <div className="text-center md:text-left max-w-xl space-y-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#995B00]">
          Tulisan apa gitu <br /> nanti disini
        </h1>
        <p className="text-black text-lg">
          The quick borwn fox jump over the lazy dog
        </p>
        <button className="bg-[#4CAF50]/40 text-black font-bold py-2 px-4 rounded-md hover:shadow hover:shadow-white transition border border-white">
          Download
        </button>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-[60%] flex justify-center  md:justify-end mb-6 md:mb-0 px-2 md:px-4 lg:px-8">
        <img
          src={MockupImage}
          alt="Mockup"
          className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[700px] object-contain"
        />
      </div>

    </div>
  );
}
