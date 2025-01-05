import React, { useEffect, useState } from "react";
import { Card, Button, Avatar } from "@nextui-org/react";

interface ProductCardProp {
  grids: number;
}

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

const Product: React.FC<ProductCardProp> = ({ grids }) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const userId = "your-user-id"; // Replace with the actual userId
        const response = await fetch(`api/userProducts?userId=676c32de895813f55307c58f`);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${grids} gap-6 mt-8`}>
        {products.map((product) => (
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
                  ${product.productPrice.toFixed(2)}
                </div>
              </div>
            </div>
            <Button
              color="primary"
              className="w-full mt-4 py-2 bg-[#318CE7] text-white border-0 hover:bg-[#4A92D3] rounded-md"
            >
              Add to Cart
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Product;
