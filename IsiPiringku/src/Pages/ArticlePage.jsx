// pages/ArticlePage.jsx
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import bgImage from "../assets/bg-articlePage.png";
import NutrisiImage from "../assets/Nutrisi.png";

const articles = [
  {
    id: 5,
    title: "Nutrisi, Pengertian dan Jenis-Jenisnya yang Perlu Diketahui",
    description: "Nutrisi adalah aspek fundamental bagi kesehatan dan perkembangan tubuh.",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    image: NutrisiImage,
  },
  {
    id: 6,
    title: "Kebutuhan Nutrisi Ibu Hamil Terpenuhi, Kehamilan Pasti Lancar",
    description: "Ibu hamil membutuhkan berbagai nutrisi untuk mendukung kesehatan.",
    content: `Kehamilan merupakan masa penting di mana nutrisi yang baik berperan dalam perkembangan janin dan kesehatan ibu.`,
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
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-cover bg-repeat bg-center min-h-screen text-gray-800"
    >
      <MainLayout>
        <div className="px-6 md:px-20 lg:px-20 py-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

          {article.description && (
            <p className="text-lg md:text-xl mb-6 text-gray-700">{article.description}</p>
          )}

          <img
            src={article.image}
            alt={article.title}
            className="w-full max-w-3xl mx-auto rounded-xl mb-8 shadow-lg"
          />

          <p className="whitespace-pre-line leading-relaxed text-justify">{article.content}</p>
        </div>
      </MainLayout>
    </div>
  );
};

export default ArticlePage;
