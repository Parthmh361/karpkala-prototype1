import connect from "@/LIB/db";
import User from "@/LIB/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import Product from "@/LIB/modals/product";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid or missing user id" }),
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found in database" }),
        { status: 400 }
      );
    }

    const product = await Product.find({
      user: new Types.ObjectId(userId),
    });

    if (!product) {
      return new NextResponse(JSON.stringify({ message: "No product found" }), {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "Error in fetching products" } + error.message),
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const {
      productName,
      productDescription,
      productPrice,
      productImage,
      productCategory,
      productQuantity,
      productRating,
    } = await request.json();

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid user id" }), {
        status: 400,
      });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found in database" }),
        { status: 404 }
      );
    }

    const newProduct = new Product({
      productName,
      productDescription,
      productImage,
      productPrice,
      productCategory,
      productQuantity,
      productRating,
      user: new Types.ObjectId(userId),
    });

    await newProduct.save();
    return new NextResponse(
      JSON.stringify({ message: "Product created successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating the product" + error.message, {
      status: 500,
    });
  }
};
