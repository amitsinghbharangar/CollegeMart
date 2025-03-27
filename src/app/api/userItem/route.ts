import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect(); // Ensure DB is connected

  try {
    // Get and validate Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Invalid or missing Authorization header", success: false },
        { status: 401 }
      );
    }

    const userId = authHeader.split(" ")[1]; // Extract token after "Bearer "
    if (!userId) {
      return NextResponse.json(
        { message: "Invalid token", success: false },
        { status: 401 }
      );
    }

    console.log("Fetching items for userId:", userId);
    
    const user = await User.findOne({ _id: userId });

    return NextResponse.json({message: "Items fetched successfully",success: true,data: user?.cart },
       { status: 200 });
      
  } catch (err: any) {
    console.error("Error in /api/userItem:", err.message);
    return NextResponse.json(
      { message: err.message || "Internal server error", success: false },
      { status: 500 }
    );
  }
}