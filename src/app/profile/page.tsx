"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { Card, Button, Avatar } from "@nextui-org/react";

const Profile: React.FC = () => {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: 0,
    productImage: "",
    productCategory: "",
    productQuantity: 0,
    productRating: 0,
  });
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingProductId, setEditingProductId] = useState<string | null>(null); // Track the product being edited

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const fetchUserId = async () => {
    try {
      const response = await fetch(`/api/getUserId?email=${user?.email}`);
      if (response.ok) {
        const data = await response.json();
        return data.userId; // Returns the user ID
      } else {
        console.error("Failed to fetch user ID");
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
    return null;
  };
  
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const userId = await fetchUserId();
      if (!userId) throw new Error("User ID not found");
  
      const response = await fetch(`/api/userProducts?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = await fetchUserId();
    if (!userId) {
      alert("User ID not found. Please try again.");
      return;
    }
  
    const url = editingProductId
      ? `/api/userProducts/${editingProductId}?userId=${userId}`
      : `/api/userProducts?userId=${userId}`;
    const method = editingProductId ? "PATCH" : "POST";
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const message = editingProductId ? "Product updated successfully!" : "Product added successfully!";
        alert(message);
        fetchProducts(); // Refresh product list
        setShowForm(false);
        setEditingProductId(null);
        setFormData({
          productName: "",
          productDescription: "",
          productPrice: 0,
          productImage: "",
          productCategory: "",
          productQuantity: 0,
          productRating: 0,
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert("Failed to submit the form. Please try again.");
    }
  };
  

  const handleEdit = (product: any) => {
    setFormData({
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productImage: product.productImage,
      productCategory: product.productCategory,
      productQuantity: product.productQuantity,
      productRating: product.productRating,
    });
    setEditingProductId(product._id); // Set the product ID to edit
    setShowForm(true);
  };

  const handleDelete = async (productId: string) => {
    const userId = await fetchUserId();
    if (!userId) {
      alert("User ID not found. Please try again.");
      return;
    }
  
    try {
      const response = await fetch(`/api/userProducts/${productId}?userId=${userId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        alert("Product deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert("Failed to delete product. Please try again.");
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div className="bg-white min-h-screen text-black">
        <Navbar pageHeading="Profile" />
        <div className="profile_page flex flex-col md:flex-row">
          <div id="user_info" className="flex flex-col justify-center md:justify-start items-center mt-6 gap-3">
            <div className="w-16 h-16 rounded-full bg-black m-3">
              <img src={user?.picture || ""} alt="User Avatar" />
            </div>
            <p>{user?.name}</p>
            <p className="text-slate-500">{user?.email}</p>
            <Link href={"/api/auth/logout"} className="text-[#545f70] text-lg">
              Logout
            </Link>
          </div>
          <div className="md:ml-10 flex flex-col items-start">
            <div className="mt-8">
              <p className="mb-4">
                Your Product{" "}
                <span className="hidden min-[720px]:inline">| Wishlisted</span>
              </p>
              <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Add New Product
              </button>
            </div>

            {showForm && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    onClick={() => setShowForm(false)}
  >
    <div
      className="bg-white rounded-lg p-6 w-full max-w-lg md:max-w-xl lg:max-w-2xl shadow-lg relative overflow-auto max-h-screen"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-2 right-2 text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition"
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4">{editingProductId ? "Edit Product" : "Add New Product"}</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            name="productImage"
            value={formData.productImage}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <input
            type="text"
            name="productCategory"
            value={formData.productCategory}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Quantity</label>
          <input
            type="number"
            name="productQuantity"
            value={formData.productQuantity}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Rating</label>
          <input
            type="number"
            name="productRating"
            value={formData.productRating}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  </div>
)}


            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8`}>
              {products.length === 0 ? (
                <div>No products available</div>
              ) : (
                products.map((product) => (
                  <Card
                    key={product._id}
                    className="w-full md:min-w-[300px] p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out gap-5"
                  >
                    <div className="flex flex-row gap-3">
                      <div className="w-24 h-24 bg-[#eef0f4] rounded-lg flex items-center justify-center mb-4">
                        {product.productImage ? (
                          <img
                            src={product.productImage}
                            alt={product.productName}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Avatar size="lg" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-[#545f70] font-semibold text-lg">
                          {product.productName}
                        </div>
                        <div className="text-[#4b5563] text-sm mt-2">
                          {product.productDescription}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <button onClick={() => handleEdit(product)} className="bg-blue-700 text-white px-4 py-2 rounded">
                      Edit
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="bg-red-700 text-white px-4 py-2 rounded">
                        Delete
                      </button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
