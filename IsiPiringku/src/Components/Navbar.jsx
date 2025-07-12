import React from "react";
import logo from "../assets/Logo Isi Piringku Tulisan Samping 2.png";

const Navbar = () => {
	const handleScroll = (targetId) => {
		const section = document.getElementById(targetId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	};

	const navItems = [
		{ label: "Home", targetId: "hero" },
		{ label: "Artikel", targetId: "article" },
	];

	return (
		<nav
			className="fixed top-0 left-0 w-full z-50 flex items-center h-20 px-8 py-2 bg-[#8BDF8D] border-b border-[#9aa19a]/40 shadow-md"
			style={{
				background:
					"linear-gradient(to bottom, #d2f5d2 10%, #ffffff 80%)",
			}}
		>
			<div className="absolute left-8">
				<img src={logo} alt="Logo" className="h-27 object-contain" />
			</div>

			<div className="mx-auto flex gap-20">
				{navItems.map((item) => (
					<button
						key={item.label}
						onClick={() => handleScroll(item.targetId)}
						className="flex items-center justify-center text-[#995B00] text-2xl h-10 w-27 rounded-md hover:bg-[#995B00]/40 hover:shadow hover:shadow-white transition hover:text-white"
					>
						{item.label}
					</button>
				))}
			</div>
		</nav>
	);
};

export default Navbar;
