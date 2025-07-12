import React from "react";
import ArticleGrid from "../Components/ArticleGrid";

const Article = () => {
	return (
		<div id="article" className="py-10 px-4">
			<div className="max-w-[90rem] mx-auto">
				<h2 className="text-4xl text-[#995B00] font-bold text-left mb-8">
					Artikel
				</h2>
				{/* Panggil komponen grid */}
				<ArticleGrid />
			</div>
		</div>
	);
};

export default Article;
