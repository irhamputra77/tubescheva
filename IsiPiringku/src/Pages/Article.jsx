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
    <div className="py-10">
      <h2 className="text-4xl text-[#995B00] font-bold text-center mb-8">Artikel</h2>

      <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 justify-items-center">
            {articles.map((title, index) => (
              <Card key={index} title={title} />
            ))}
          </div>
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