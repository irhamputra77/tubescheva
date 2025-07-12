import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulasi fetching (nanti bisa ganti dengan API asli)
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fakeData = [
          {
            id: 1,
            title: "Apa Itu Nutrisi?",
            summary: "Nutrisi adalah komponen penting untuk pertumbuhan dan kesehatan tubuh.",
          },
          {
            id: 2,
            title: "5 Jenis Nutrisi yang Wajib Diketahui",
            summary: "Mengenal karbohidrat, protein, lemak, vitamin, dan mineral.",
          },
          {
            id: 2,
            title: "5 Jenis Nutrisi yang Wajib Diketahui",
            summary: "Mengenal karbohidrat, protein, lemak, vitamin, dan mineral.",
          },
        ];

        // simulasi delay
        setTimeout(() => {
          setArticles(fakeData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Gagal fetch artikel:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Artikel Gizi</h1>
        {loading ? (
          <p>Loading artikel...</p>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-700">{article.summary}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ArticlePage;
