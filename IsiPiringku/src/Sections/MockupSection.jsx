import React from "react";
import MockupBackground from "../assets/bg-mockup.png";

const MockupPage = () => {
	return (
		<div
			className="py-20 px-4 min-h-screen bg-center bg-no-repeat"
			style={{ 
				backgroundImage: `url(${MockupBackground})`,
				backgroundSize : "100%",
			
			}}
		>
			<h2 className="text-4xl font-bold text-[#995B00] mb-10 text-center">
				Mock Up Aplikasi
			</h2>
		</div>
	);
};

export default MockupPage;
