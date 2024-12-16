import React from "react";
import Navbar from "../components/navbar";
import NewsCard from "../components/newsCard";

const News = () => {
    return (
      <>
        <div className="w-full bg-gray-50 overflow-x-hidden-hidden p-6">
          <Navbar pageHeading="NEWS" />

          <NewsCard />
        </div>
      </>
    );
}

export default News