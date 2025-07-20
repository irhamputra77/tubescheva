import React from "react";
import logo from "../assets/Logo Isi Piringku Tulisan Samping 2.png";

const Navbar = () => {
	const handleScroll = (targetId) => {
		const section = document.getElementById(targetId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<nav
			className="fixed top-0 left-0 w-full z-50 flex items-center h-20 px-2 sm:px-4 md:px-6  lg:px-8 py-2 bg-[#8BDF8D] border-b border-[#9aa19a]/40 shadow-md"
			style={{
				background: "linear-gradient(to bottom, #d2f5d2 20%, #ffffff 80%)",
			}}
		>
			<div className="absolute eft-2 sm:left-6 md:left-8">
				<img src={logo} alt="Logo" className="h-17 sm:h-19 md:h-22 lg:h-27 object-contain" />
			</div>

			<div className="mx-auto">
				<button
					onClick={() => handleScroll("hero")}
					className="flex items-center justify-center 
					text-white text-base sm:text-sm md:text-2xl 
               		h-8 sm:h-10 md:h-10 w-20 sm:w-28 md:w-30 
					rounded-md bg-[#4CAF50]/40 hover:bg-[#66BB66] hover:shadow hover:shadow-white transition "
				>
					Home
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
