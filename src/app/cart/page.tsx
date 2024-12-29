"use client";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Button, Card, Avatar } from "@nextui-org/react";
import Navbar from "../components/navbar";

interface CartItem {
  _id: string;
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  quantity: number;
}

const MyCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = "676c32de895813f55307c58f"; // Replace with the actual user ID from session or auth
      try {
        const response = await fetch(`/api/cart?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveFromCart = async (productId: string) => {
    const userId = "676c32de895813f55307c58f"; // Replace with actual user ID
    try {
      const response = await fetch(`/api/cart?userId=${userId}&productId=${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to remove product from cart");
      }
      alert("Product removed from cart!");
      setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <>
      <Navbar pageHeading="My Cart" />
      <div className="flex w-full h-screen bg-gray-50 overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center space-x-4 mt-6 bg-white border border-[#545f70] rounded-lg px-6 py-3 shadow-md">
            <input
              type="text"
              placeholder="Search in cart"
              className="w-full text-[#545f70] font-medium outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />
            <FiSearch className="text-[#545f70]" size={22} />
          </div>

          {cartItems
            .filter((item) =>
                item.productName && item.productName.toLowerCase().includes(searchTerm.toLowerCase())
              )
            .map((cartItem) => (
              <Card
                key={cartItem._id}
                className="w-full md:min-w-[300px] p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out gap-5 mt-6"
              >
                <div className="flex flex-row gap-3">
                  <div className="w-24 h-24 bg-[#eef0f4] rounded-lg flex items-center justify-center mb-4">
                    {cartItem.productImage ? (
                      <img
                        src={cartItem.productImage}
                        alt={cartItem.productName}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Avatar size="lg" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-[#545f70] font-semibold text-lg">
                      {cartItem.productName}
                    </div>
                    <div className="text-[#545f70] mt-2">{cartItem.productDescription}</div>
                    <div className="text-[#545f70] font-semibold mt-2 text-xl">
                      <span>&#8377;</span> {cartItem.productPrice.toFixed(2)}
                    </div>
                    <div className="mt-2 text-[#545f70]">Quantity: {cartItem.quantity}</div>
                  </div>
                </div>
                <Button
                  color="warning"
                  className="w-full mt-4 py-2 bg-red-500 text-white border-0 hover:bg-red-600 rounded-md"
                  onClick={() => handleRemoveFromCart(cartItem.productId)}
                >
                  Remove from Cart
                </Button>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};

export default MyCart;