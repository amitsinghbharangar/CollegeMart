import { dbConnect } from "@/lib/dbConnect";
import { Item } from "@/model/Item";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest,res:NextResponse){
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "8", 10);
    const offset = (page - 1) * limit;
    await dbConnect();
    try {
        const totalItems = await Item.countDocuments();
        const totalPages = Math.ceil(totalItems / limit)
        // const items = await Item.find({ order: [["createdAt", "DESC"]], offset, limit });
        const items = await Item.find({});

        return NextResponse.json({ meta: { total: totalItems, page, pages: totalPages }, data: items });
        } catch (err:any) {
    console.error(err.message);
    return NextResponse.json({success:false, message:"failed to get all items"},{status:400})
  }
}