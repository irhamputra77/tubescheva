// pages/ArticlePage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import bgImage from "../assets/bg-articlePage.png";
import axios from "axios";

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000").replace(/\/+$/, "");

const joinUrl = (base, path) => `${base}/${String(path).replace(/^\/+/, "")}`;

const ArticlePage = () => {
	const { id } = useParams();
	const [article, setArticle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchDetail = async () => {
			setLoading(true);
			setError("");
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(joinUrl(API_BASE, `/v1/article/${id}`), {
					headers: token ? { Authorization: `Bearer ${token}` } : {},
				});
				const data = res.data?.data;
				setArticle(Array.isArray(data) ? data[0] : data);
			} catch (err) {
				if (err.response?.status === 401) setError("Unauthorized. Silakan login ulang.");
				else if (err.response?.status === 404) setError("Artikel tidak ditemukan");
				else setError("Gagal mengambil data artikel");
			} finally {
				setLoading(false);
			}
		};
		fetchDetail();
	}, [id]);

	if (loading) return <div className="text-center mt-10">Loading...</div>;
	if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
	if (!article) return <div className="text-center mt-10">Artikel tidak ditemukan</div>;

	const imageSrc =
		article.image
			? (String(article.image).startsWith("http") ? article.image : joinUrl(API_BASE, article.image))
			: null;

	return (
		<div
			style={{ backgroundImage: `url(${bgImage})` }}
			className="bg-cover bg-repeat bg-center min-h-screen text-gray-800"
		>
			<MainLayout>
				<div className="px-6 md:px-20 lg:px-20 py-10">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

					{article.description && (
						<p className="text-lg md:text-xl mb-6 text-gray-700">{article.description}</p>
					)}

					{imageSrc && (
						<img
							src={imageSrc}
							alt={article.title}
							className="w-full max-w-3xl mx-auto rounded-xl mb-8 shadow-lg"
							onError={(e) => (e.currentTarget.style.display = "none")}
						/>
					)}

					<p className="whitespace-pre-line leading-relaxed text-justify">
						{article.content}
					</p>
				</div>
			</MainLayout>
		</div>
	);
};

export default ArticlePage;
