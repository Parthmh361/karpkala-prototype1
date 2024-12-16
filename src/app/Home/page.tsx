"use client";
import { FiSearch } from "react-icons/fi";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Product from "../components/productCard";

const Home = () => {
  return (
    <div className="flex w-full h-screen bg-gray-50 overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <Navbar pageHeading="Home" />
        <Hero />

        {/* Search Bar with Search Icon */}
        <div className="flex items-center space-x-4 mt-6 bg-white border border-[#545f70] rounded-lg px-6 py-3 shadow-md">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full text-[#545f70] font-medium outline-none"
          />
          <FiSearch className="text-[#545f70]" size={22} />
        </div>

        <Product />
      </div>
    </div>
  );
};

export default Home;
