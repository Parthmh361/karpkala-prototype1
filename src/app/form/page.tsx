"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import FarmerForm from "../components/FarmerForm";
import BuyerForm from "../components/BuyerForm";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Form() {
  const { user, error, isLoading } = useUser();
  const [userType, setUserType] = useState<"farmer" | "buyer" | null>(null);
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    name: "",
    contactInfo: "",
    typeOfCotton: "",
    yearsInFarming: "",
    address: "",
    cottonToBuy: "",
  });

  // Use `useRouter` here to get the router object
  const router = useRouter();

  //
  const checkUsername = async (username: string) => {
    const response = await fetch(`/api/singleUser?username=${username}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (response.ok) {
      setIsUsernameUnique(false);
    }
  };

  // Use useEffect to update formData when user data changes
  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        email: user.email ? user.email : "",
      }));
    }
  }, [user]); // Only runs when `user` changes

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
    if (!isUsernameUnique) {
      alert("Please choose a unique username");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        router.push("/Home"); // Redirect to the '/Home' page
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.log(error);
      // Handle the error appropriately (e.g., display an error message to the user)
    }
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
                      onChange={(e) => {
                        handleChange(e);
                        checkUsername(e.target.value);
                      }}
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
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
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
                          name="address"
                          value={formData.address}
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
