import connect from "@/LIB/db";
import User from "@/LIB/modals/user";
import { NextResponse } from "next/server";

const isValidEmail = (email: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const GET = async (request: Request, context: { params: any }) => {
  try {
    const { searchParams } = new URL(request.url);

    // Retrieve query parameters
    const userParam = () => {
      if (searchParams.has("username")) {
        return searchParams.get("username");
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

    // Query database by email or username
    const user = await User.findOne({
      $or: [{ email: userParamValue }, { username: userParamValue }],
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "No user found" }), {
        status: 404,
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "User found", user: user }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in finding user: " + error.message, {
      status: 500,
    });
  }
};
