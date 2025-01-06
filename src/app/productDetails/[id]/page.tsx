"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Badge } from "@nextui-org/react";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar";
import { useUser } from "@auth0/nextjs-auth0/client";

interface ProductData {
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  productCategory: string;
  productQuantity: number;
  productRating: number; // Moisture Content
}

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loadingUserId, setLoadingUserId] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Resolve the promise to get the actual params
        const resolvedParams = await params;
        const productId = resolvedParams.id;

        const response = await fetch(`/api/allProducts?id=${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();

        // If the API returns an array, extract the first product
        if (Array.isArray(data) && data.length > 0) {
          setProduct(data[0]);
        } else if (!Array.isArray(data)) {
          setProduct(data); // In case your API returns a single product directly
        } else {
          throw new Error("No product found");
        }
      } catch (error: unknown) {
        const err = error as Error;
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  useEffect(() => {
    const fetchUserId = async () => {
      if (user?.email) {
        try {
          setLoadingUserId(true);
          const response = await fetch(`/api/getUserId?email=${user.email}`);
          if (response.ok) {
            const data = await response.json();
            setUserId(data.userId);
          } else {
            console.error("Failed to fetch user ID");
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
        } finally {
          setLoadingUserId(false);
        }
      }
    };

    fetchUserId();
  }, [user?.email]);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(prev + amount, product?.productQuantity || 0))
    );
  };

  const handleAddToCart = async () => {
    if (loadingUserId) {
      alert("Loading user information. Please wait.");
      return;
    }

    if (!userId) {
      alert("User not logged in. Please log in to add items to the cart.");
      return;
    }

    try {
      const resolvedParams = await params;
      const productId = resolvedParams.id;
      const response = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          userId,
          productId: productId, // Use params.id directly
          quantity,
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
      alert("Failed to add product to cart. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !product) {
    return <p>Error: {error || "Product not found"}</p>;
  }

  return (
    <div className="bg-white text-gray-800 h-screen">
      <Navbar pageHeading={"Product"} />
      <Button
        variant="ghost"
        className="m-4 text-gray-700 hover:bg-gray-100"
        aria-label="Back to Products"
        onClick={() => router.back()}
      >
        <ArrowLeft size={16} className="mr-2 text-gray-600" />
        Back to Products
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-center items-center">
          <Image
            src={product.productImage}
            alt={product.productName}
            width={400}
            height={400}
            className="rounded-lg shadow-sm"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
          <Badge
            color="secondary"
            variant="flat"
            className="mb-4 bg-gray-200 text-gray-700"
          >
            {product.productCategory}
          </Badge>
          <p className="text-gray-600 mb-4">{product.productDescription}</p>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-500 mr-2" size={20} />
            <span className="font-semibold">
              {product.productRating}% Moisture Content
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-4">
            ${product.productPrice} per kg
          </p>
          <div className="flex items-center mb-4">
            <Button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity === 1}
              aria-label="Decrease quantity"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              -
            </Button>
            <span className="mx-4 font-semibold">{quantity}</span>
            <Button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity === product.productQuantity}
              aria-label="Increase quantity"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              +
            </Button>
          </div>
          <Button
            color="primary"
            className="w-full mt-4 py-2 bg-[#318CE7] text-white border-0 hover:bg-[#4A92D3] rounded-md"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} className="mr-2" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
