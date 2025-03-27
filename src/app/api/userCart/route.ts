import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { User } from "@/model";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  await dbConnect(); // Connect to MongoDB

  // Get session
  const session = await getServerSession(authOptions);
  if (!session || !session.user?._id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user._id;

    // Fetch cart items for the authenticated user
    const user = await User.findOne({ _id: userId });

    return NextResponse.json({ data: user?.cart}, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
