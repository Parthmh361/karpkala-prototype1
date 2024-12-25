import React from "react";
import Navbar from "../components/navbar";
import NewsCard from "../components/newsCard";
import Hero from "../components/hero";

const News = () => {
  return (
    <>
      <div className="w-full bg-gray-50 overflow-x-hidden-hidden">
        <Navbar pageHeading="NEWS" />
        <Hero />
        <NewsCard />
      </div>
    </>
  );
};

export default News;
