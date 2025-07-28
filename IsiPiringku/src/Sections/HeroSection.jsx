import React from "react";
import HeroBackground from "../assets/bgLogin.jpg";
import MockupImage from "../assets/Mockup2.png";

export default function HeroSection() {
	return (
		<div
			id="hero"
			className="scroll-mt-24 w-full bg-center bg-contain bg-no-repeat"
			style={{ 
				backgroundImage: `url(${HeroBackground})`,
				
			}}
		>
			<div
				id="hero"
				className=" scroll-mt-24 w-full pl-4 sm:pl-8 md:pl-16 lg:pl-32 pr-0 flex flex-col-reverse md:flex-row items-center justify-between py-8 md:min-h-[calc(100vh-64px)] relative z-10"
			>
				{/* Text Section */}
				<div className="text-center md:text-left max-w-xl space-y-5">
					<h1 className="text-[30px] ml-[-1rem] md:text-[40px] lg:text-[55px] font-bold text-[#995B00] leading-[2rem] sm:leading-[2.5rem] md:leading-[3rem] lg:leading-[3.5rem]" >
						Sehat dimulai <br /> dari piring anda
					</h1>
					<p className="text-black ml-[-1rem] md:text-[18px] text-xl font-semibold" >
						Dukung pertumbuhan optimal si kecil dan <br /> kesehatan
						ibu dengan panduan gizi yang praktis, terpercaya, dan
						menyenangkan
					</p>
					<button className="bg-[#4CAF50]/40 text-[##224F24] font-bold py-2 px-7 rounded-md transition hover:bg-[#66BB66] ml-[-1rem]" >
						Download
					</button>
				</div>

				{/* Image Section */}
				<div className="w-full flex justify-center items-center mt-4 mb-0 px-2 md:w-[90%] md:justify-end md:mb-0  md:px-4 lg:px-8">
					<img
						src={MockupImage}
						alt="Mockup"
						className="w-full ml-[-6rem] max-w-[400px] sm:max-w-[500px] sm:mr-[2rem] md:max-w-[600px] lg:max-w-[700px] lg: mt-[-5px] object-contain"
					/>
				</div>
			</div>
		</div>
	);
}
