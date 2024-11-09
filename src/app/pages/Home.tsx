'use client';

import { useState } from 'react';
import { Card, Button, Avatar } from '@nextui-org/react';
import { FiSearch, FiHome, FiBook, FiUser, FiShoppingCart, FiClipboard, FiLock, FiHelpCircle, FiX } from 'react-icons/fi'; 


const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Slide through the indicators
  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  return (
    <div className="flex w-full h-screen bg-gray-50 overflow-hidden">
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full bg-white shadow-xl p-6 transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } w-64`}
      >
        {/* Close Sidebar Icon */}
        <button
          onClick={toggleSidebar}
          className="text-[#545f70] mb-6 text-lg font-semibold"
        >
          <FiX size={24} /> {/* Close icon */}
        </button>
        
        {/* Sidebar Content */}
        <h2 className="text-center text-xl font-semibold text-[#545f70] mb-6">Navigation</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <FiHome className="text-[#545f70]" size={22} />
            <span className="text-[#545f70] text-lg">Home</span>
          </div>
          <div className="flex items-center space-x-3">
            <FiBook className="text-[#545f70]" size={22} />
            <span className="text-[#545f70] text-lg">News</span>
          </div>
          <div className="flex items-center space-x-3">
            <FiUser className="text-[#545f70]" size={22} />
            <span className="text-[#545f70] text-lg">Profile</span>
          </div>
          <div className="flex items-center space-x-3">
            <FiShoppingCart className="text-[#545f70]" size={22} />
            <span className="text-[#545f70] text-lg">My Cart</span>
          </div>
          <div className="flex items-center space-x-3">
            <FiClipboard className="text-[#545f70]" size={22} />
            <span className="text-[#545f70] text-lg">Order & History</span>
          </div>
          <div className="flex items-center space-x-3">
            <FiLock className="text-[#545f70]" size={22} />
            <span className="text-[#545f70] text-lg">Privacy Policy</span>
          </div>
          <div className="flex items-center space-x-3">
            <FiHelpCircle className="text-[#545f70]" size={22} />
            <span className="text-[#545f70] text-lg">Support</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Top Navbar */}
        <div className="flex justify-between items-center px-4">
          <button onClick={toggleSidebar} className="text-[#545f70] text-3xl">
            &#9776; {/* Hamburger icon */}
          </button>
          
          {/* Centered Title */}
          <h1 className="flex-1 text-center text-[#545f70] text-2xl font-semibold">Home</h1>
        </div>

        {/* Hero Section */}
        <div className="w-full h-[250px] bg-gradient-to-r from-[#318CE7] to-[#3A8DFF] text-white rounded-xl flex items-center justify-center mt-8">
          <h2 className="text-3xl font-bold">Welcome to Our Store</h2>
        </div>

        {/* Progress Indicator (Slideshow) */}
        <div className="w-full flex justify-center space-x-2 mt-6 cursor-pointer" onClick={nextSlide}>
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className={`w-10 h-2 ${slideIndex === idx ? 'bg-[#318CE7]' : 'bg-[#d3d3d3]'} rounded-md`}
            />
          ))}
        </div>

        {/* Search Bar with Search Icon */}
        <div className="flex items-center space-x-4 mt-6 bg-white border border-[#545f70] rounded-lg px-6 py-3 shadow-md">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full text-[#545f70] font-medium outline-none"
          />
          <FiSearch className="text-[#545f70]" size={22} />
        </div>

        {/* Product Cards (Scrollable) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="w-full p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <div className="w-24 h-24 bg-[#eef0f4] rounded-lg flex items-center justify-center mb-4">
                <Avatar size="lg" />
              </div>
              <div className="flex-1">
                <div className="text-[#545f70] font-semibold text-lg">Design Leadership: How Top Design Leaders Build...</div>
                <div className="text-[#545f70] font-semibold mt-2 text-xl">$38.95</div>
                <Button
                  color="primary"
                  className="w-full mt-4 py-2 bg-[#318CE7] text-white border-0 hover:bg-[#4A92D3] rounded-md"
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
