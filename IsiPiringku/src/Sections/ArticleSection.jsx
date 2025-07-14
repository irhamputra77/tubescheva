import React from "react";
import ArticleGrid from "../Components/ArticleGrid";
import ArticleBackground from "../assets/bg-article.png";

const Article = () => {
	return (
		<div
			id="article"
			className="py-10 px-4 bg-center bg-no-repeat"
			style={{
				backgroundImage: `url(${ArticleBackground})`,
				backgroundSize: "100%",
			}}
		>
			<div className="max-w-[90rem] mx-auto relative">
				<h2 className="text-4xl text-[#995B00] font-bold text-left mb-8">
					Artikel
				</h2>
				<ArticleGrid />
			</div>
		</div>
	);
};

export default Article;
