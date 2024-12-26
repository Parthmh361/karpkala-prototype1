"use client";

import { useState, useEffect } from "react";
import FarmerForm from "../components/FarmerForm";
import BuyerForm from "../components/BuyerForm";
import { useUser } from "@auth0/nextjs-auth0/client";
import Home from "../Home/page";

export default function Fome() {

  const { user, error, isLoading } = useUser();
  const [userType, setUserType] = useState<"farmer" | "buyer" | null>(null);
  // const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [formData, setFormData] = useState({
    email:"" ,
    username: "",
    name: "",
    contactInfo: "",
    location: "",
    typeOfCotton: "",
    yearsInFarming: "",
    address: "",
    cottonToBuy: "",
  });

  useEffect(() => {
    // Optionally pre-fill user data if available
    if (user) {
      setFormData({
        ...formData,
        email: user.email ? user.email : "",
        username: user.name ? user.name : "",
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `/api/singleUser?username=${formData.username}`
        );
        const data = await response.json();
        if (data) {
          // Check for required properties before setting showHome
          if (
            data.email &&
            data.name &&
            (data.typeOfCotton || data.cottonToBuy) &&
            (data.occupation === "farmer" || data.occupation === "buyer") &&
            data.yearsInFarming &&
            data.address
          ) {
            <Home />
          } else {
            // Handle cases where data is incomplete
            console.warn("Incomplete user data for Home:", data);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (formData.username) {
      fetchUser();
    }
  }, [formData.username]);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("Form submitted successfully!");
    } else {
      alert("Failed to submit form.");
    }


    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-6">
                  Cotton Trade Registration
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      I am a:
                    </label>
                    <select
                      name="userType"
                      value={userType || ""}
                      onChange={(e) =>
                        setUserType(e.target.value as "farmer" | "buyer")
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="">Select user type</option>
                      <option value="farmer">Cotton Farmer</option>
                      <option value="buyer">Cotton Buyer</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contactInfo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Information
                    </label>
                    <input
                      type="text"
                      id="contactInfo"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  {userType === "farmer" && (
                    <>
                      <div>
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="typeOfCotton"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Type of Cotton Grown
                        </label>
                        <input
                          type="text"
                          id="typeOfCotton"
                          name="typeOfCotton"
                          value={formData.typeOfCotton}
                          onChange={handleChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="yearsInFarming"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Years in Cotton Farming
                        </label>
                        <input
                          type="number"
                          id="yearsInFarming"
                          name="yearsInFarming"
                          value={formData.yearsInFarming}
                          onChange={handleChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </>
                  )}
                  {userType === "buyer" && (
                    <>
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cottonToBuy"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Type of Cotton Likely to Buy
                        </label>
                        <input
                          type="text"
                          id="cottonToBuy"
                          name="cottonToBuy"
                          value={formData.cottonToBuy}
                          onChange={handleChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
