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
			className="fixed top-0 left-0 w-full z-50 flex items-center h-20 px-8 py-2 bg-[#8BDF8D] border-b border-[#9aa19a]/40 shadow-md"
			style={{
				background: "linear-gradient(to bottom, #d2f5d2 20%, #ffffff 80%)",
			}}
		>
			<div className="absolute left-8">
				<img src={logo} alt="Logo" className="h-27 object-contain" />
			</div>

			<div className="mx-auto">
				<button
					onClick={() => handleScroll("hero")}
					className="flex items-center justify-center text-white text-2xl h-10 w-28 rounded-md  bg-[#995B00]/40 hover:bg-[#995B00] hover:shadow hover:shadow-white transition "
				>
					Home
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
