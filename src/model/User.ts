import mongoose, { Document, Schema, Types, model } from "mongoose";
import { CartItem, cartItemSchema } from "./cartItem";

export interface User extends Document {
  name:string;
  city:string;
  phone:number;
  email :string;
  password:string;
  verifyCode:string;
  verifyCodeExpiry:Date;
  isVerified:boolean;
  itemListId: string[];
  cart: CartItem[];
  online: boolean;
  chatRooms: string[];
}

const UserSchema : Schema<User> = new Schema({
  
  name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
        unique:true
    },
  city:{
        type:String,
        required:[true,"City is required"],
        trim:true,
    },
  email:{
        type:String,
        required:[true,"Username is required"],
        unique:true,
        match:[/.+\@.+\..+/,"please use a valid email address"]
    },
    phone:{
      type:Number
    },
  itemListId: [
    {
      type: String,
    },
  ],
  password:{
        type:String,
        required:[true,"Password is required"],
    },
  verifyCode:{
        type:String,
        required:[true,"verify code is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify code Expiry is required"],
    },
  isVerified:{
    type:Boolean,
    default:false
  },
  cart: [cartItemSchema],
  online: {
    type: Boolean,
    default: false,
  },
  chatRooms: [
    {
      type: String,
    },
  ],
});

export const User = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)