import connect from "@/LIB/db";
import Product from "@/LIB/modals/product";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const searchKeywords = searchParams.get("keywords") as string;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    await connect();

    const filter: any = {};

    if (searchKeywords) {
      filter.$or = [
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

    const products = await Product.find(filter);

    if (!products) {
      return new NextResponse(JSON.stringify({ message: "No products found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "Error fetching products: " + error.message }),
      { status: 500 }
    );
  }
};
