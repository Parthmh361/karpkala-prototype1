"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
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

interface navbarProps {
  pageHeading: string;
}


const Navbar: React.FC<navbarProps> = ({ pageHeading }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, error, isLoading } = useUser();
  console.log(user?.picture);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className=" sticky top-0 w-full z-50">
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
        <div className="w-full flex justify-center items-center py-5">
          <div className="profile_photo bg-blue-600 min-h-8 min-w-8 h-[15vh] w-[15vh] rounded-full">
            {user ? (<img src={user?.picture ?? ""} />) : ""}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 h-11">
            <FiHome className="text-[#545f70]" size={22} />
            <Link href={"/"} className="text-[#545f70] text-lg">
              Home
            </Link>
          </div>
          <div className="flex items-center space-x-3 h-11">
            <FiBook className="text-[#545f70]" size={22} />
            <Link href={"/news"} className="text-[#545f70] text-lg">
              News
            </Link>
          </div>
          <div className="flex items-center space-x-3 h-11">
            <FiUser className="text-[#545f70]" size={22} />
            <Link href={"/profile"} className="text-[#545f70] text-lg">
              Profile
            </Link>
          </div>
          <div className="flex items-center space-x-3 h-11">
            <FiShoppingCart className="text-[#545f70]" size={22} />
            <Link href={"/cart"} className="text-[#545f70] text-lg">
              My Cart
            </Link>
          </div>
          <div className="flex items-center space-x-3 h-11">
            <FiClipboard className="text-[#545f70]" size={22} />
            <Link href={"/orderAndHistory"} className="text-[#545f70] text-lg">
              Order & History
            </Link>
          </div>
          <div className="flex items-center space-x-3 h-11">
            <FiHelpCircle className="text-[#545f70]" size={22} />
            <Link href={"/privacyPolicy"} className="text-[#545f70] text-lg">
              Support
            </Link>
          </div>
          <div className="flex items-center space-x-3 h-11">
            {user ? (
              <>
                <FiHelpCircle className="text-[#545f70]" size={22} />
                <Link
                  href={"/api/auth/logout"}
                  className="text-[#545f70] text-lg"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <FiHelpCircle className="text-[#545f70]" size={22} />
                <Link
                  href={"/api/auth/login"}
                  className="text-[#545f70] text-lg"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Top Navbar */}
      <div className="flex justify-between items-center px-4 py-2 bg-black">
        <div className="logo h-9 w-9 bg-white rounded-md"></div>

        {/* Centered Title */}
        <div className="md:flex items-center px-4 hidden md:relative w-fit gap-10">
          <Link
            href={"/"}
            className="text-center text-white text-2xl font-semibold w-fit p-3"
          >
            Home
          </Link>
          <Link
            href={"/news"}
            className="w-fit p-3 text-center text-white text-2xl font-semibold"
          >
            News
          </Link>
          <Link
            href={"/profile"}
            className="w-fit p-3 text-center text-white text-2xl font-semibold"
          >
            Profile
          </Link>

          {user ? (
            <>
              <div className="w-14 h-14 rounded-full bg-black overflow-hidden">
                <img src={user?.picture ?? ""} alt="" />
              </div>
            </>
          ) : (
            <Link
              href={"/api/auth/login"}
              className="w-fit p-3 text-center text-white text-2xl font-semibold"
            >
              Login
            </Link>
          )}
        </div>

        <div className="md:hidden text-black font-semibold text-xl">
          {pageHeading}
        </div>

        <button
          onClick={toggleSidebar}
          className="md:hidden text-[#545f70] text-3xl"
        >
          &#9776; {/* Hamburger icon */}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
