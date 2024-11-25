import React, { useState } from "react";
import {
  FiHome,
  FiBook,
  FiUser,
  FiShoppingCart,
  FiClipboard,
  FiLock,
  FiHelpCircle,
  FiX,
} from "react-icons/fi";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full bg-white shadow-xl p-6 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
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
        <h2 className="text-center text-xl font-semibold text-[#545f70] mb-6">
          Navigation
        </h2>
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

      {/* Top Navbar */}
      <div className="flex justify-between items-center px-4">
        <button onClick={toggleSidebar} className="text-[#545f70] text-3xl">
          &#9776; {/* Hamburger icon */}
        </button>

        {/* Centered Title */}
        <h1 className="flex-1 text-center text-[#545f70] text-2xl font-semibold">
          Home
        </h1>
      </div>
    </div>
  );
}

export default Navbar