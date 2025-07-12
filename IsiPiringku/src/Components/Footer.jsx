import React from "react";

const Footer = () => {
	return (
		<footer className="bg-[#1B4D2D] text-white py-10 px-6">
			<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
				<div>
					<h3 className="font-bold text-lg mb-2">Isi Piringku</h3>
					<p className="text-sm">
						Get out there & discover your next slope, mountain &
						destination!
					</p>
				</div>
				<div>
					<h3 className="text-yellow-300 font-semibold mb-2">
						More on The Blog
					</h3>
					<ul className="text-sm space-y-1">
						<li>About MNTN</li>
						<li>Contributors & Writers</li>
						<li>Write For Us</li>
						<li>Contact Us</li>
						<li>Privacy Policy</li>
					</ul>
				</div>
				<div>
					<h3 className="text-yellow-300 font-semibold mb-2">
						More on MNTN
					</h3>
					<ul className="text-sm space-y-1">
						<li>The Team</li>
						<li>Jobs</li>
						<li>Press</li>
					</ul>
				</div>
			</div>
			<div className="text-center text-xs mt-6 text-gray-300">
				Copyright © 2023 MNTN, Inc. Terms & Privacy
			</div>
		</footer>
	);
};

export default Footer;
