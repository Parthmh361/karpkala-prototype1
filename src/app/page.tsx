"use client";

import React, { useState, useEffect } from "react";
import Home from "./Home/page";
import { useUser } from "@auth0/nextjs-auth0/client";
import Form from "./form/page";

export default function Main() {
  const { user, error, isLoading } = useUser();
  const [isForm, setIsForm] = useState(false);
  const [userData, setUserData] = useState(null); // Store fetched user data
  const [loading, setLoading] = useState(false); // Loading state for fetching user data

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const usermail = user?.email;

      if (usermail) {
        try {
          const response = await fetch(`/api/singleUser?email=${usermail}`);
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            setUserData(data);
            if (!data.user.email || !data.user.name || !data.user.address) {
              setIsForm(true); // If essential data is missing, show form
            } else {
              setIsForm(false); // Else, show Home page
            }
          } else {
            setIsForm(true); // If the API call fails, show form
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setIsForm(true); // Show form on error
        } finally {
          setLoading(false);
        }
      } else {
        setIsForm(true); // If no email, show form
        setLoading(false);
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user]); // The effect runs whenever `user` changes

  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Welcome to Karpkala Loading ....</p>
        </div>
      </div>
    );
  }
  
  return <>{isForm ? <Form /> : <Home />}</>;
}
