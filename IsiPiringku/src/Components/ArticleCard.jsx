// components/ArticleCard.jsx
import React from "react";

const ArticleCard = ({ title, description, image, className = "" }) => {
	return (
		<div
			className={`relative rounded-sm overflow-hidden bg-cover bg-center ${className}`}
			style={{ backgroundImage: `url(${image})` }}
		>
			<div className="absolute inset-0 bg-black/30"></div>
			<div className="absolute bottom-0 left-0 p-4 text-white z-10">
				<h3 className="font-semibold text-lg">{title}</h3>
				{description && <p className="text-sm mt-1">{description}</p>}
			</div>
		</div>
	);
};

export default ArticleCard;
