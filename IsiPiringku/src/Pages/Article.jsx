import Card from '../Components/Card';
import BackgroundImage from '../assets/Article.png';

const articles = [
  "The quick brown fox jump over the lazy dog",
  "The quick brown fox jump over the lazy dog",
  "The quick brown fox jump over the lazy dog",
  "The quick brown fox jump over the lazy dog",
  "The quick brown fox jump over the lazy dog",
  "The quick brown fox jump over the lazy dog",
  "The quick brown fox jump over the lazy dog",
  "The quick brown fox jump over the lazy dog",
  "The quick brown fox jump over the lazy dog",
];

const Article = () => {
  return (
    <div id="article" className="py-10">
      <h2 className="text-4xl text-[#995B00] font-bold text-center mb-8">Artikel</h2>

      <div className="flex flex-wrap justify-center px-4">
            {articles.map((title, index) => (
              <Card key={index} title={title} />
            ))}
      </div>

      <div className="mt-10 flex justify-center">
          <button className="px-6 py-2 rounded-md font-bold shadow-md overflow-hidden bg-cover bg-center"
           style={{ backgroundImage: `url(${BackgroundImage})` }}
          >
            LIHAT SEMUA
          </button>
        </div>
    </div>
  );
};
export default Article;