import { Schema, Types } from "mongoose";
export interface Item {
  id: string;
  itemname: string;
  condition: string;
  price: number;
  sold: boolean;
  description: string;
  image: string;
  createdAt: Date;
  quantity: number;
  ownerId: string;
  city:string;
}
export const ItemSchema = new Schema<Item>({
  condition: String,
  createdAt: Date,
  description: String,
  id: String,
  image: String,
  itemname:{
        type:String,
        required:[true,"itemname is required"],
        trim:true,
    },
  ownerId:{
        type:String,
        required:[true,"Username is required"],
    },
  price:{
        type:Number,
        required:[true,"Price is required"],        
    },
    
  quantity: Number,
  sold: Boolean,
  city:{
        type:String,
        required:[true,"city is required"],
        
    },
});