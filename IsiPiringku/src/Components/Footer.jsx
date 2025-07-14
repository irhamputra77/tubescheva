import React from "react";
import { Icon } from "@iconify/react";

const Footer = () => {
	return (
		<footer className="bg-[#1B4D2D] text-white py-5 px-4 sm:px-6">
			<div className="space-y-6">
				<div className="mb-2">
					<h3 className="font-bold text-2xl mb-4">Isi Piringku</h3>
					<p className="text-lg font-semibold">
						Get out there & discover your next slope, <br />
						mountain & destination!
					</p>
				</div>
				<div className="flex items-center space-x-2 pb-10">
					<div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400">
						<Icon
							icon="ri:instagram-fill"
							width="16"
							height="16"
							className="text-white"
						/>
					</div>
					<div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400">
						<Icon
							icon="mdi:twitter"
							width="16"
							height="16"
							className="text-white"
						/>
					</div>
					<div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400">
						<Icon
							icon="ri:facebook-fill"
							width="16"
							height="16"
							className="text-white"
						/>
					</div>
					<div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400">
						<Icon
							icon="ri:threads-fill"
							width="16"
							height="16"
							className="text-white"
						/>
					</div>
					<div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400">
						<Icon
							icon="ri:instagram-fill"
							width="16"
							height="16"
							className="text-white"
						/>
					</div>
				</div>

				<hr className="border-gray-400 mt-10 mb-3" />

				<p className="text-sm text-gray-300 pt-1">
					Copyright © 2025 Isi Piringku, Inc. Terms & Privacy
				</p>
			</div>
		</footer>
	);
};

export default Footer;
