"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Badge, Card } from "@nextui-org/react";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar";

interface ProductData {
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  productCategory: string;
  productQuantity: number;
  productRating: number; // Moisture Content
}

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<ProductData>({
    productName: "",
    productDescription: "",
    productPrice: 0,
    productImage: "",
    productCategory: "",
    productQuantity: 0,
    productRating: 0, // Moisture Content
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const unwrappedParams = await params; // Unwrap the params Promise
        console.log(unwrappedParams.id);
        const response = await fetch(
          `/api/allProducts?id=${unwrappedParams.id}`
        );
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
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(prev + amount, product.productQuantity))
    );
  };

  return (
    <div className="bg-white text-gray-800 h-screen">
        <Navbar pageHeading={"Product"} />
      {/* Back Button */}
      <Button
        variant="ghost"
        className="m-4 text-gray-700 hover:bg-gray-100"
        aria-label="Back to Products"
        onPress={() => router.back()}
      >
        <ArrowLeft size={16} className="mr-2 text-gray-600" />
        Back to Products
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <Image
            src={product.productImage}
            alt={product.productName}
            width={400}
            height={400}
            className="rounded-lg shadow-sm"
          />
        </div>

        {/* Product Details */}
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

          {/* Moisture Content */}
          <div className="flex items-center mb-4">
            <Star className="text-yellow-500 mr-2" size={20} />
            <span className="font-semibold">
              {product.productRating}% Moisture Content
            </span>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-gray-800 mb-4">
            ${product.productPrice} per kg
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <Button
              onPress={() => handleQuantityChange(-1)}
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

          {/* Add to Cart Button */}
          <Button
            variant="solid"
            color="primary"
            className="w-full mb-4 bg-blue-500 text-white hover:bg-blue-600"
          >
            <ShoppingCart size={16} className="mr-2" /> Add to Cart
          </Button>

          {/* Product Details */}
          <Card className="mt-4 p-4 bg-gray-50 shadow-md">
            <h3 className="font-semibold mb-2">Product Details:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Category: {product.productCategory}</li>
              <li>Available Quantity: {product.productQuantity} kg</li>
              <li>Moisture Content: {product.productRating}%</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
