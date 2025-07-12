// components/ArticleGrid.jsx
import React from "react";
import ArticleCard from "./ArticleCard";
import bgImage from "../assets/Article.png"; // Ganti nanti kalau API sudah ada

const ArticleGrid = () => {
	// Simulasi data dummy
	const topArticles = [
		{
			title: "Ini Kebutuhan Gizi Bayi Usia 0–12 Bulan yang Perlu Dicukupi",
			span: "row-span-2 col-span-4",
		},
		{
			title: "Kebutuhan Gizi Ibu Hamil dan Janin, Nutrisi Apa Saja yang Dibutuhkan?",
			span: "col-span-4",
		},
		{
			title: "Gizi Anak yang Harus Dipenuhi saat MPASI",
			span: "col-span-2",
		},
		{
			title: "7 Nutrisi Ibu Hamil yang Perlu Dipenuhi",
			span: "col-span-2",
		},
	];

	const bottomArticles = [
		{
			title: "Nutrisi, Pengertian dan Jenis-Jenisnya yang Perlu Diketahui",
			description:
				"Secara umum, nutrisi terbagi menjadi dua jenis, yaitu makro dan mikro...",
		},
		{
			title: "Kebutuhan Nutrisi Ibu Hamil Terpenuhi, Kehamilan Pasti Lancar",
			description:
				"Banyak ibu mengatakan kehamilan menyenangkan sekaligus menegangkan...",
		},
		{
			title: "Kebutuhan Nutrisi Ibu Hamil Terpenuhi, Kehamilan Pasti Lancar",
			description:
				"Ibu hamil harus jaga kesehatan dirinya dan janinnya secara menyeluruh...",
		},
	];

	return (
		<div>
			{/* === Grid Atas === */}
			<div className="grid grid-cols-8 grid-rows-2 gap-4 h-[500px] mb-12">
				{topArticles.map((article, index) => (
					<ArticleCard
						key={index}
						title={article.title}
						image={bgImage}
						className={article.span}
					/>
				))}
			</div>

			{/* === Grid Bawah === */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{bottomArticles.map((article, index) => (
					<ArticleCard
						key={index}
						title={article.title}
						description={article.description}
						image={bgImage}
						className="h-[280px]"
					/>
				))}
			</div>
		</div>
	);
};

export default ArticleGrid;
