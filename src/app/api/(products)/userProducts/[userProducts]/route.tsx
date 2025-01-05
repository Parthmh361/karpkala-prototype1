import connect from "@/LIB/db";
import User from "@/LIB/modals/user";
import Product from "@/LIB/modals/product";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const PATCH = async (
  request: Request,
  context: { params: { userProducts: string } }
) => {
  const productId = context.params.userProducts;
  try {
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

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    if (!productId || !Types.ObjectId.isValid(productId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing productId" }),
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const product = await Product.findOne({ _id: productId, user: userId });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "product not found" }),
        {
          status: 404,
        }
      );
    }

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
    return new NextResponse("Error in updating product" + err.message, {
      status: 500,
    });
  }
};

export const DELETE = async (
  request: Request,
  context: { params: { userProducts: string } }
) => {
  const productId = context.params.userProducts;
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    if (!productId || !Types.ObjectId.isValid(productId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing productId" }),
        { status: 400 }
      );
    }

    await connect();

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
          message: "product not found or does not belong to the user",
        }),
        {
          status: 404,
        }
      );
    }

    await Product.findByIdAndDelete(productId);

    return new NextResponse(JSON.stringify({ message: "product is deleted" }), {
      status: 200,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return new NextResponse("Error in deleting product" + err.message, {
      status: 500,
    });
  }
};
