// "use client";

// import React from "react";
// import Home from "./Home/page";
// import { useState, useEffect } from "react";
// import { useUser } from "@auth0/nextjs-auth0/client";
// import Form from "./form/page";

// export default function main() {
//   const { user, error, isLoading } = useUser();
//   const [isForm, setIsForm] = useState(false);

//   useEffect(() => {
//     // if(user && username){
//     //   setIsForm(false)
//     // }
//     const fetchUser = async () => {
//       const usermail = user?.email;

//       const response = await fetch(`/api/singleUser?email=${usermail}`);
//       const data = await response.json();
//       console.log(data);
//       if (response.ok) {
//         setIsForm(false);
//         // Check for required properties before setting showHome
//       //   if (!data.email || !data.name || !data.address) {
//       //     setIsForm(true);
//       //   } else {
//       //     // Handle cases where data is incomplete
//       //     console.warn("Incomplete user data for Home:", data);
//       //   }
//       // } else {
//       //   setIsForm(true);
//       // }
//     };

//     if (user) {
//       fetchUser();
//     }
//   }, [user]); //[usermail]
//   return <>{isForm ? <Form /> : <Home />}</>;
// }



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
    return <div>Loading...</div>; // Show loading state if user data is being fetched
  }

  return <>{isForm ? <Form /> : <Home />}</>;
}
