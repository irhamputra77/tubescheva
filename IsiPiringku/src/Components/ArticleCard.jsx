import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ id, title, description, image, className = "" }) => {
	return (
		<Link
			to={`/artikel/${id}`}
			className={`relative rounded-sm overflow-hidden bg-cover bg-center block ${className}`}
			style={{ backgroundImage: `url(${image})` }}
		>
			
			<div className="absolute inset-0 bg-black/30"></div>

		
			<div className="absolute bottom-0 left-0 p-4 text-white z-10 max-h-[50%] overflow-hidden">
				<h3 className="font-semibold text-base sm:text-lg leading-snug line-clamp-2">
					{title}
				</h3>
				{description && (
					<p className="text-xs sm:text-sm mt-1 leading-snug line-clamp-3">
						{description}
					</p>
				)}
			</div>
		</Link>
	);
};

export default ArticleCard;
