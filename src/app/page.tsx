"use client";

import React from "react";
import Home from "./Home/page";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Form from "./form/page";

export default function main() {
  const { user, error, isLoading } = useUser();
  const [isForm, setIsForm] = useState(false);
  const username = user?.name;

  useEffect(() => {
    // if(user && username){
    //   setIsForm(false)
    // }
    const fetchUser = async () => {
      const response = await fetch(`/api/singleUser?username=${username}`);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Check for required properties before setting showHome
        if (!data.email || !data.name || !data.address) {
          setIsForm(true);
        } else {
          // Handle cases where data is incomplete
          console.warn("Incomplete user data for Home:", data);
        }
      } else {
        setIsForm(false);
      }
    };

    if (user) {
      fetchUser();
    }
  }, [username]);
  return <>{isForm ? <Form /> : <Home />}</>;
}
