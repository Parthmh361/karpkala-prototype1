import connect from "@/LIB/db";
import User from "@/LIB/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import Product from "@/LIB/modals/product";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const searchKeywords = searchParams.get("keywords") as string;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    await connect();

    // let allProduct: any = await Product.find();

    const filter: any = {
      // user: new Types.ObjectId(userId),
      // category: new Types.ObjectId(categoryId),
    };

    if (searchKeywords) {
      // allProduct = await Product.aggregate([
      //   {
      //     $match: {
            filter.$or= [
              {
                productName: { $regex: searchKeywords, $options: "i" },
              },
              {
                productDescription: { $regex: searchKeywords, $options: "i" },
              },
              {
                productCategory: { $regex: searchKeywords, $options: "i" },
              },
            ];
      //     },
      //   },
      // ]);
    }


    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
      };
    } else if (endDate) {
      filter.createdAt = {
        $lte: new Date(endDate),
      };
    }

    const product = await Product.find(filter);
    
    if (!product) {
      return new NextResponse(JSON.stringify({ message: "No product found" }), {
        status: 404,
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
