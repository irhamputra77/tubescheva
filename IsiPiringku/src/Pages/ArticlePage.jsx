// pages/ArticlePage.jsx
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import bgImage from "../assets/bg-articlePage.png"; 

const articles = [
	{
		id: 5,
		title: "Nutrisi, Pengertian dan Jenis-Jenisnya yang Perlu Diketahui",
		content: `Nutrisi adalah aspek fundamental bagi kesehatan dan perkembangan tubuh..
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
`,
		image: "/img/nutrisi.jpg",
	},
	{
		id: 6,
		title: "Kebutuhan Nutrisi Ibu Hamil Terpenuhi, Kehamilan Pasti Lancar",
		content: `Ibu hamil membutuhkan berbagai nutrisi untuk mendukung kesehatan...`,
		image: "/img/hamil-lancar.jpg",
	},
];

const ArticlePage = () => {
	const { id } = useParams();
	const article = articles.find((a) => a.id === parseInt(id));

	if (!article) {
		return <div className="text-center mt-10">Artikel tidak ditemukan</div>;
	}

	return (
         <div
      style={{ backgroundImage: `url(${bgImage})` }} //
      className="bg-cover bg-repeat bg-center min-h-screen"
    >
		<MainLayout>
				<h1 className="text-2xl font-bold mb-5 mt-10">{article.title}</h1>
				<img
					src={article.image}
					alt={article.title}
					className="rounded-xl mb-4"
				/>
				<p className="text-gray-800 whitespace-pre-line leading-relaxed mb-10">
					{article.content}
				</p>
		</MainLayout>
        </div>
	);
};

export default ArticlePage;
