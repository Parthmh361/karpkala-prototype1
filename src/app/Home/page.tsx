"use client";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import { Card, Button, Avatar } from "@nextui-org/react";

// Define Types
interface ProductData {
  _id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  productCategory: string;
  productQuantity: number;
  productRating: number;
}

const Home = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/allProducts");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToCart = async (productId: string) => {
    const userId = "676c32de895813f55307c58f"; // Replace with the actual user ID from the session or auth
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          userId,
          productId,
          quantity: 1, // Default quantity, can be adjusted
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      <Navbar pageHeading="Home" />
      <div className="flex w-full h-screen bg-gray-50 overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <Hero />
          <div className="flex items-center space-x-4 mt-6 bg-white border border-[#545f70] rounded-lg px-6 py-3 shadow-md">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full text-[#545f70] font-medium outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />
            <FiSearch className="text-[#545f70]" size={22} />
          </div>

          {products
            .filter((product) => product.productName.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((product) => (
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
                    <div className="text-[#545f70] mt-2">{product.productDescription}</div>
                    <div className="text-[#545f70] font-semibold mt-2 text-xl">
                      <span>&#8377;</span> {product.productPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
                <Button
                  color="primary"
                  className="w-full mt-4 py-2 bg-[#318CE7] text-white border-0 hover:bg-[#4A92D3] rounded-md"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </Button>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
