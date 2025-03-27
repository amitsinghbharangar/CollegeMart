import { dbConnect } from "@/lib/dbConnect";
import { Item } from "@/model/Item";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const itemId = params.id; // URL path se ID lo
    console.log("Fetching item with ID:", itemId);

    // Validate ID format (MongoDB ObjectID)
    if (!itemId || !itemId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ message: "Invalid Item ID format" }, { status: 400 });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching item:", error.message);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}