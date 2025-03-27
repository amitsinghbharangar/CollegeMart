import mongoose, { Document, Schema, Types } from "mongoose";
export interface Item extends Document {
  itemName: string;
  condition: string;
  price: number;
  sold: boolean;
  description: string;
  image: string;
  createdAt: Date;
  ownerName:String;
  ownerId: string;
  city:string;
}
const ItemSchema:Schema<Item> = new Schema({
  condition: String,
  createdAt: Date,
  description: String,
  image: String,
  itemName:{
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
    
  ownerName:{
    type:String,
    required:[true,"OwnerName is required"]
  },
  sold: Boolean,
  city:{
        type:String,
        required:[true,"city is required"],
        
    },
});
export const Item = (mongoose.models.Item as mongoose.Model<Item>) || mongoose.model<Item>("Item",ItemSchema)