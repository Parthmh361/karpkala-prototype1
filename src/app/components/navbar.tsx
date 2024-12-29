"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  FiHome,
  FiBook,
  FiUser,
  FiShoppingCart,
  FiClipboard,
  FiHelpCircle,
  FiX,
  FiMenu,
} from "react-icons/fi";

interface NavbarProps {
  pageHeading: string;
}

const Navbar: React.FC<NavbarProps> = ({ pageHeading }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close the sidebar when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 w-full z-50">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full bg-white shadow-xl p-6 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } w-64`}
      >
        {/* Close Sidebar Icon */}
        <button
          onClick={toggleSidebar}
          className="text-gray-600 mb-6 text-lg font-semibold"
        >
          <FiX size={24} />
        </button>

        {/* Sidebar Content */}
        <div className="w-full flex justify-center items-center py-5">
          <div className="profile_photo bg-blue-600 h-[15vh] w-[15vh] rounded-full overflow-hidden">
            {user ? (
              <img
                src={user?.picture ?? ""}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-3 text-gray-600 text-lg h-11">
            <FiHome size={22} />
            <span>Home</span>
          </Link>
          <Link href="/news" className="flex items-center space-x-3 text-gray-600 text-lg h-11">
            <FiBook size={22} />
            <span>News</span>
          </Link>
          <Link href="/profile" className="flex items-center space-x-3 text-gray-600 text-lg h-11">
            <FiUser size={22} />
            <span>Profile</span>
          </Link>
          <Link href="/cart" className="flex items-center space-x-3 text-gray-600 text-lg h-11">
            <FiShoppingCart size={22} />
            <span>My Cart</span>
          </Link>
          <Link href="/orderAndHistory" className="flex items-center space-x-3 text-gray-600 text-lg h-11">
            <FiClipboard size={22} />
            <span>Order & History</span>
          </Link>
          <Link href="/privacyPolicy" className="flex items-center space-x-3 text-gray-600 text-lg h-11">
            <FiHelpCircle size={22} />
            <span>Support</span>
          </Link>
          {user ? (
            <Link
              href="/api/auth/logout"
              className="flex items-center space-x-3 text-gray-600 text-lg h-11"
            >
              <span>Logout</span>
            </Link>
          ) : (
            <Link
              href="/api/auth/login"
              className="flex items-center space-x-3 text-gray-600 text-lg h-11"
            >
              <span>Login</span>
            </Link>
          )}
        </div>
      </aside>

      {/* Top Navbar */}
      <div className="flex justify-between items-center px-4 py-2 bg-black">
        <div className="logo h-9 w-9 bg-white rounded-md"></div>

        {/* Centered Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white text-lg font-medium flex items-center space-x-2">
            <FiHome />
            <span>Home</span>
          </Link>
          <Link href="/news" className="text-white text-lg font-medium flex items-center space-x-2">
            <FiBook />
            <span>News</span>
          </Link>
          <Link href="/profile" className="text-white text-lg font-medium flex items-center space-x-2">
            <FiUser />
            <span>Profile</span>
          </Link>
          <Link href="/cart" className="text-white text-lg font-medium flex items-center space-x-2">
            <FiShoppingCart />
            <span>My Cart</span>
          </Link>
          <Link href="/orderAndHistory" className="text-white text-lg font-medium flex items-center space-x-2">
            <FiClipboard />
            <span>Order & History</span>
          </Link>
          <Link href="/privacyPolicy" className="text-white text-lg font-medium flex items-center space-x-2">
            <FiHelpCircle />
            <span>Support</span>
          </Link>
          {user ? (
            <button className="text-white text-lg font-medium flex items-center space-x-2">
              <span>Logout</span>
            </button>
          ) : (
            <Link
              href="/api/auth/login"
              className="text-white text-lg font-medium flex items-center space-x-2"
            >
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Page Heading for Mobile View */}
        <div className="md:hidden text-white font-semibold text-xl">
          {pageHeading}
        </div>

        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="text-white text-3xl"
        >
          <FiMenu />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
