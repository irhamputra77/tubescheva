import React from "react";
import M1 from "../assets/M1.png";
import M2 from "../assets/M2.png";
import M3 from "../assets/M3.png";
import M4 from "../assets/M4.png";

const MockupApp = () => {
	return (
		<div className="py-16 px-6 bg-white">
			<h2 className="text-4xl font-bold text-[#995B00] text-center mb-10">
				Mock Up Aplikasi
			</h2>

			<div className="flex flex-wrap justify-center gap-8">
				<img
					src={M1}
					alt="Mockup 1"
					className="max-w-[180px] sm:max-w-[200px] md:max-w-[230px] lg:max-w-[250px] mb-30 object-contain"
				/>
				<img
					src={M2}
					alt="Mockup 2"
					className="max-w-[180px] sm:max-w-[200px] md:max-w-[230px] lg:max-w-[250px] mt-50 object-contain"
				/>
				<img
					src={M3}
					alt="Mockup 3"
					className="max-w-[180px] sm:max-w-[200px] md:max-w-[230px] lg:max-w-[250px] mb-30 object-contain"
				/>
				<img
					src={M4}
					alt="Mockup 4"
					className="max-w-[180px] sm:max-w-[200px] md:max-w-[230px] lg:max-w-[250px] mt-50 object-contain"
				/>
			</div>
		</div>
	);
};

export default MockupApp;
