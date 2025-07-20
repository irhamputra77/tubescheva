import React from "react";
import bgMockup from "../assets/bg-mockup.png";
import M1 from "../assets/M1.png";
import M2 from "../assets/M2.png";
import M3 from "../assets/M3.png";
import M4 from "../assets/M4.png";

const MockupApp = () => {
	return (
		<div
			className="py-16 px-6 lg:px-50 bg-white bg-no-repeat bg-cover bg-center"
			style={{
				backgroundImage: `url(${bgMockup})`,
			}}
		>
			<h2 className="text-4xl font-bold text-[#995B00] text-center mb-10">
				Mock Up Aplikasi
			</h2>

			{/* Gunakan grid */}
			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-4 lg:gap-x-2 justify-items-center">
				<img
					src={M1}
					alt="Mockup 1"
					className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[250px] lg:mt-10 object-contain"
				/>
				<img
					src={M2}
					alt="Mockup 2"
					className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[250px] lg:mt-50 object-contain"
				/>
				<img
					src={M3}
					alt="Mockup 3"
					className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[250px]  lg:mt-10 object-contain"
				/>
				<img
					src={M4}
					alt="Mockup 4"
					className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[250px] lg:mt-50 object-contain"
				/>
			</div>
		</div>
	);
};

export default MockupApp;
