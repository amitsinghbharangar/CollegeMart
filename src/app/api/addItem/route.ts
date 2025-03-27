import { dbConnect } from "@/lib/dbConnect"
import { User } from "@/model";
import { Item } from "@/model/Item";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest,res:NextResponse){
    await dbConnect()
    const {itemName,condition,price,description,image,ownerId,ownerName,city} = await req.json();
    
    try{
        const newItem = new Item({
            itemName,
            description,
            price,
            condition,
            ownerId,
            image,
            ownerName,
            city,
            sold:false,
            createdAt:Date.now()
        })
        console.log(newItem);
        await newItem.save();
        await User.findOneAndUpdate(
            { _id: ownerId },
            {
            $push: {
                itemListId: newItem._id,
                },
            }
        );
        return NextResponse.json({
                success:true,
                message:"Item added successfully."
            },{status:201})
    }catch (err:any) {
    console.error(err.message);
    return Response.json({
                success:false,
                message:"Failed to add item"
            },{status:401})
  }
}