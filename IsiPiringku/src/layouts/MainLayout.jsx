import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Background from "../assets/Background2 2.png";

const MainLayout = ({ children }) => {
	return (
		<div
			className="font-sans bg-top bg-repeat bg-cover min-h-screen"
			style={{ backgroundImage: `url(${Background})` }}
		>
			<Navbar />
			<div className="pt-16">{children}</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
