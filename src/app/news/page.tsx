"use client";

import React, { useCallback, useEffect, useState } from "react";
import NewsCard from "../components/newsCard";
import Navbar from "../components/navbar";
import Hero from "../components/hero";

interface NewsItem {
  title: string;
  link: string;
  source: string;
}

const NewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [language, setLanguage] = useState<string>("hindi");

 
  const fetchNews = useCallback(async() => {

    try {
      const res = await fetch(`/api/news?lang=${language}`);
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  }, [language]);
  useEffect(() => {
    fetchNews();
  }, [language, fetchNews]);

  return (
    <div className="bg-white min-h-screen text-black">
      <Navbar pageHeading="News" />
      <Hero />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Latest News</h1>
        
        {/* Language Dropdown */}
        <div className="flex items-center justify-end mb-6">
          <label htmlFor="language" className="mr-2 font-medium text-gray-700">
            Select Language:
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 transition ease-in-out duration-300"
          >
            <option value="hindi">Hindi</option>
            <option value="marathi">Marathi</option>
            <option value="telugu">Telugu</option>
          </select>
        </div>

        {/* News Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {news.length > 0 ? (
            news.map((item, index) => (
              <NewsCard
                key={index}
                title={item.title}
                link={item.link}
                source={item.source}
              />
            ))
          ) : (
            <p>No news available for the selected language.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
