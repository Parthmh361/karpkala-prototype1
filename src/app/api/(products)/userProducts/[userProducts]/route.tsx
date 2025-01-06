import connect from "@/LIB/db";
import User from "@/LIB/modals/user";
import Product from "@/LIB/modals/product";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

// PATCH method to update a product
export const PATCH = async (
  request: Request,
  context: { params: Promise<{ userProducts: string }> } // Update type to Promise
) => {
  try {
    const { userProducts: productId } = await context.params; // Await the params

    const body = await request.json();
    const {
      productName,
      productDescription,
      productPrice,
      productImage,
      productCategory,
      productQuantity,
      productRating,
    } = body;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // Validate userId
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    // Validate productId
    if (!productId || !Types.ObjectId.isValid(productId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing productId" }),
        { status: 400 }
      );
    }

    await connect(); // Connect to the database

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const product = await Product.findOne({ _id: productId, user: userId });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        {
          status: 404,
        }
      );
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        productName,
        productDescription,
        productPrice,
        productImage,
        productCategory,
        productQuantity,
        productRating,
      },
      {
        new: true,
      }
    );

    return new NextResponse(
      JSON.stringify({
        message: "Product is updated",
        product: updatedProduct,
      }),
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return new NextResponse("Error in updating product: " + err.message, {
      status: 500,
    });
  }
};

// DELETE method to delete a product
export const DELETE = async (
  request: Request,
  context: { params: Promise<{ userProducts: string }> }
) => {
  try {
    // Await the `params` to resolve the promise
    const { userProducts: productId } = await context.params;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // Validate userId
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    // Validate productId
    if (!productId || !Types.ObjectId.isValid(productId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing productId" }),
        { status: 400 }
      );
    }

    await connect(); // Connect to the database

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const product = await Product.findOne({ _id: productId, user: userId });
    if (!product) {
      return new NextResponse(
        JSON.stringify({
          message: "Product not found or does not belong to the user",
        }),
        { status: 404 }
      );
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    return new NextResponse(JSON.stringify({ message: "Product is deleted" }), {
      status: 200,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return new NextResponse("Error in deleting product: " + err.message, {
      status: 500,
    });
  }
};
