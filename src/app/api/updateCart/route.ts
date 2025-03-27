import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/model";
import { NextResponse } from "next/server";

export async function POST(req:any){
    
    try{
        await dbConnect();
        const { cart } = await req.json();
        if (!Array.isArray(cart)) {
            return NextResponse.json(
                { message: "Cart must be an array", success: false },
                { status: 400 }
            );
        }

        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { message: "Invalid or missing Authorization header", success: false },
                { status: 401 }
            );
        }

        const ownerId = authHeader.split(" ")[1];
        if (!ownerId) {
            return NextResponse.json(
                { message: "Invalid token", success: false },
                { status: 401 }
            );
        }

        const res = await User.findOneAndUpdate(
            { _id: ownerId },
            { cart, updatedAt: new Date() }, // Add updatedAt for tracking
            { new: true } // Return the updated document
        );
        if (!res) {
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 404 } // Changed to 404 for "not found"
            );
        }
        return NextResponse.json(
            { message: "Updated successfully", success: true, cart: res.cart },
            { status: 200 }
        );
        
    }catch (err:any) {
        
        return NextResponse.json(
            { message: err.message || "Internal server error", success: false },
            { status: 500 }
        );
    }

}