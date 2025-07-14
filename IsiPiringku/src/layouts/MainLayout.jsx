import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


const MainLayout = ({ children }) => {
	return (
		<div className="font-sans min-h-screen">
			
			<Navbar />
			<div className="pt-16">{children}</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
