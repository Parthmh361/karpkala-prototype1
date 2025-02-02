import connect from "@/LIB/db";
import User from "@/LIB/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);

    // Retrieve query parameters
    const userParam = () => {
      if (searchParams.has("username")) {
        return searchParams.get("username");
      }
      if (searchParams.has("_id")) {
        return searchParams.get("_id");
      }
      return searchParams.get("email");
    };

    const userParamValue = userParam(); // Fetch username or email

    // Validate the input
    if (!userParamValue) {
      return new NextResponse(
        JSON.stringify({ message: "No username or email provided" }),
        { status: 400 }
      );
    }

    if (searchParams.has("email") && !isValidEmail(userParamValue)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid email format" }),
        { status: 400 }
      );
    }

    await connect();

    const isObjectId = Types.ObjectId.isValid(userParamValue);
    console.log(isObjectId);

    const query = isObjectId
      ? {
          $or: [
            { email: userParamValue },
            { username: userParamValue },
            { _id: userParamValue },
          ],
        }
      : { $or: [{ email: userParamValue }, { username: userParamValue }] };

    const user = await User.findOne(query);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "No user found" }), {
        status: 404,
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "User found", user: user }),
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return new NextResponse("Error in finding user: " + err.message, {
      status: 500,
    });
  }
};
