import React from "react";
import Navbar from "../components/navbar";
import Product from "../components/productCard";

const Profile = () => {
  return (
    <>
      <div className="bg-white p-6 min-h-screen text-black">
        <Navbar pageHeading="Profile" />
        <div className="profile_page flex flex-col md:flex-row">
          <div
            id="user_info"
            className="flex flex-col justify-center md:justify-start items-center mt-6 gap-3"
          >
            <div className="w-16 h-16 rounded-full bg-black m-3">
              <img src="" />
            </div>
            <p>User Name</p>
            <p className="text-slate-500">userEmailIdByGoogle@gmail.com</p>
          </div>
          <div className="md:ml-10">
            <div className="mt-8">
              <p className="">
                Your Product <span className="hidden min-[720px]:inline">| Wishlisted</span>
              </p>
            </div>
            <Product grids={2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
