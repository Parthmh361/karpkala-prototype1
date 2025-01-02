import { NextResponse } from "next/server";
import User from "@/LIB/modals/user";
import connect from "@/LIB/db";

const isValidEmail = (email: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const GET = async (request: Request) => {
  try {
    // Parse the query parameters
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    if (searchParams.has("email") && !isValidEmail(email)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid email format" }),
        { status: 400 }
      );
    }

    await connect();

    // Find the user by email
    // const user = await User.findOne([{ email: email }]);
    const user = await User.findOne({ email }).select("_id");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // Return the user ID
    return NextResponse.json(
      { success: true, userId: user._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}