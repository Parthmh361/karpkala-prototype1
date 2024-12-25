"use client"
import React from "react";
import Navbar from "../components/navbar";
import Product from "../components/productCard";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

interface profile {
  width:number
}

const width = window.innerWidth

const Profile: React.FC<profile> = () => {

  const {user} = useUser()

  return (
    <>
      <div className="bg-white min-h-screen text-black">
        <Navbar pageHeading="Profile" />
        <div className="profile_page flex flex-col md:flex-row">
          <div
            id="user_info"
            className="flex flex-col justify-center md:justify-start items-center mt-6 gap-3"
          >
            <div className="w-16 h-16 rounded-full bg-black m-3">
              <img src="" />
            </div>
            <p>{user?.name}</p>
            <p className="text-slate-500">{user?.email}</p>
            {width > 720 ? (
              <>
                <Link
                  href={"/api/auth/logout"}
                  className="text-[#545f70] text-lg"
                >
                  Logout
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="md:ml-10">
            <div className="mt-8">
              <p className="">
                Your Product{" "}
                <span className="hidden min-[720px]:inline">| Wishlisted</span>
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
