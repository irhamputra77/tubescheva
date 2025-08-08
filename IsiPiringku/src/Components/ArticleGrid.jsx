import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import axios from "axios";

const API_BASE = (
	import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000"
).replace(/\/+$/, "");
const api = axios.create({ baseURL: API_BASE });

const ArticleGrid = () => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const res = await api.get("/v1/article", {
					params: { status: "publish", pageSize: 10, page: 1 },
				});
				const payload = res.data?.data;
				const rows = Array.isArray(payload)
					? payload
					: payload?.rows ?? [];
				setArticles(rows);
			} catch (err) {
				console.error("Gagal fetch artikel:", err);
			}
		};
		fetchArticles();
	}, []);

	const getFullImageUrl = (image) => {
		if (!image) return "/default-placeholder.png";
		return image.startsWith("http")
			? image
			: `${API_BASE}/${image.replace(/^\/+/, "")}`;
	};

	// ==================== TOP GRID ====================
	const topArticlesRaw = articles.slice(0, 4);

	const spanMap = [
		"row-span-2 col-span-4", // besar kiri (2 baris, 4 kolom)
		"col-span-4", // kanan atas (1 baris, 4 kolom)
		"col-span-2", // kanan bawah (kecil)
		"col-span-2", // kanan bawah (kecil)
	];

	const topArticles = topArticlesRaw.map((a, i) => ({
		...a,
		_span: spanMap[i] ?? "col-span-2",
	}));

	// ==================== BOTTOM GRID ====================
	const bottomArticles = articles.slice(4, 7);

	return (
		<div>
			{/* === Grid Atas === */}
			<div className="relative mb-12">
				<div className="px-4 sm:px-7 md:px-4 lg:px-1">
					<div className="hidden md:grid grid-cols-8 grid-rows-2 gap-4 h-[560px] max-w-full mx-auto">
						{topArticles.map((article, i) => (
							<ArticleCard
								key={article.id ?? i}
								id={article.id}
								title={article.title}
								image={getFullImageUrl(article.image)}
								className={`${article._span} h-full`}
							/>
						))}
					</div>

					{/* Mobile 1–2 kolom, tanpa span */}
					<div className="grid md:hidden grid-cols-1 sm:grid-cols-2 gap-4">
						{topArticlesRaw.map((article, i) => (
							<ArticleCard
								key={article.id ?? i}
								id={article.id}
								title={article.title}
								image={getFullImageUrl(article.image)}
								className="h-[220px]"
							/>
						))}
					</div>
				</div>
			</div>

			{/* === Grid Bawah === */}
			<div className="relative">
				<div className="px-4 sm:px-7 md:px-4 lg:px-1">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full mx-auto">
						{bottomArticles.map((article, i) => (
							<ArticleCard
								key={article.id ?? i}
								id={article.id}
								title={article.title}
								description={article.description}
								image={getFullImageUrl(article.image)}
								className="h-[280px]"
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArticleGrid;
