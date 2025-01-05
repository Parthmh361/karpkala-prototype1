import { NextResponse } from "next/server";
import connect from "@/LIB/db";
import Cart from "@/LIB/modals/cart";
import Product from "@/LIB/modals/product";

// POST method: Add product to the cart
export async function POST(req: Request) {
  const { userId, productId, quantity } = await req.json();

  if (!userId || !productId || !quantity) {
    return NextResponse.json(
      { error: "UserId, ProductId, and Quantity are required" },
      { status: 400 }
    );
  }

  try {
    await connect();

    // Check if the product already exists in the user's cart
    const existingCartItem = await Cart.findOne({ userId, productId });

    if (existingCartItem) {
      // If the item exists, update the quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      // If the item doesn't exist, create a new cart entry
      const newCartItem = new Cart({
        userId,
        productId,
        quantity,
      });
      await newCartItem.save();
    }

    return NextResponse.json({ message: "Product added to cart" });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET method: Fetch all cart items for a user
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "UserId is required" }, { status: 400 });
  }

  try {
    await connect();

    // Fetch all cart items for the user
    const cartItems = await Cart.find({ userId });

    // Get product details for each cart item
    const productIds = cartItems.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    // Merge cart data with product data
    const cartWithProductDetails = cartItems.map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item.productId.toString()
      );
      if (product) {
        return {
          ...item.toObject(),
          productName: product.productName,
          productDescription: product.productDescription,
          productPrice: product.productPrice,
          productImage: product.productImage,
        };
      }
      return item; // If no product found, return the cart item as is
    });

    return NextResponse.json(cartWithProductDetails);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

// DELETE method: Remove product from the cart
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const productId = searchParams.get("productId");

  if (!userId || !productId) {
    return NextResponse.json(
      { error: "UserId and ProductId are required" },
      { status: 400 }
    );
  }

  try {
    await connect();

    // Remove the cart item
    const deletedItem = await Cart.findOneAndDelete({ userId, productId });
    if (!deletedItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Product removed from cart" });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
