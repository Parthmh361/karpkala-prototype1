import connect from "@/LIB/db";
import User from "@/LIB/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
  
    if (!username || !Types.ObjectId.isValid(username)) {
      return new NextResponse(
        JSON.stringify({ message: "Entered user ID is not valid" }),
        { status: 400 }
      );
    }
  
    await connect();
  
    const user = User.findOne({
      username: username,
    })
  
    if(!user){
      return new NextResponse(JSON.stringify({message:"No user found"}), {status: 400})
    }
  
    return new NextResponse(
      JSON.stringify({ message: "User found", user: user }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating user" + error.message, {
      status: 500,
    });
  }
};
