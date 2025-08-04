import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { Icon } from "@iconify/react";
import axios from "axios";

const ArticleGrid = () => {
	const [articles, setArticles] = useState([]);
		useEffect(() => {
		const fetchArticles = async () => {
			try {
				const res = await axios.get("https://m9n3cxf2-8000.asse.devtunnels.ms/v1/article", { 
					params: {
						status: "publish",
						pageSize: 10,
						page: 1,
					},
				});
				setArticles(res.data.data); 
			} catch (err) {
				console.error("Gagal fetch artikel:", err);
			}
		};

		fetchArticles();
	}, []);

	const topArticles = articles.slice(0, 4); 
	const bottomArticles = articles.slice(4, 7); 

	return (
		<div>
			{/* === Grid Atas === */}
			<div className="relative mb-12">
				<button className="hidden sm:block absolute top-1/2 -translate-y-1/2 z-10 left-[-16px] xl:left-[-40px]">
					<Icon icon="mdi:chevron-left" width="28" height="28" color="black"/>
				</button>

				<div className="px-4 sm:px-7 md:px-4 lg:px-1">
					{/* Grid untuk desktop */}
					<div className="hidden md:grid grid-cols-8 grid-rows-2 gap-4 h-[500px] mw-full mx-auto">
						{topArticles.map((article) => (
							<ArticleCard
								key={article.id}
								id={article.id}
								title={article.title}
								image={article.image}
								className={article.span}
							/>
						))}
					</div>

					{/* Grid untuk mobile (tanpa span, 2 kolom) */}
					<div className="grid md:hidden grid-cols-1 sm:grid-cols-2 gap-4">
						{topArticles.map((article) => (
							<ArticleCard
								key={article.id}
								id={article.id}
								title={article.title}
								image={article.image}
								className="h-[200px] sm:h-[220px]" 
							/>
						))}
					</div>
				</div>

				<button className="hidden sm:block absolute top-1/2 -translate-y-1/2 z-10 right-[-16px] xl:right-[-40px]">
					<Icon icon="mdi:chevron-right" width="28" height="28" color="black"/>
				</button>
			</div>

			{/* === Grid Bawah === */}
			<div className="relative">
				<button className="hidden sm:block absolute top-1/2 -translate-y-1/2 z-10 left-[-16px] xl:left-[-40px]">
					<Icon icon="mdi:chevron-left" width="28" height="28" color="black"/>
				</button>

				<div className="px-4 sm:px-7 md:px-4 lg:px-1">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-full mx-auto">
						{bottomArticles.map((article) => (
							<ArticleCard
								key={article.id}
								id={article.id}
								title={article.title}
								description={article.description}
								image={article.image}
								className="h-[280px]"
							/>
						))}
					</div>
				</div>

				<button className="hidden sm:block absolute top-1/2 -translate-y-1/2 z-10 right-[-16px] md:right-[-20px] xl:right-[-40px]">
					<Icon icon="mdi:chevron-right" width="28" height="28" color="black" />
				</button>
			</div>
		</div>
	);
};

export default ArticleGrid;
