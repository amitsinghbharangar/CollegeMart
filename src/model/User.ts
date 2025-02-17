import { Schema, Types, model } from "mongoose";
import { cartItemSchema } from "./cartItem";

export interface User {
  username: string;
  name:string;
  city:string;
  email? :string;
  password?:string;
  verifyCode?:string;
  verifyCodeExpiry?:Date;
  isVerified?:boolean;
  itemListId?: Types.UUID[];
  cart?: Types.Array<Types.ObjectId>;
  isOnline: boolean;
  chatRooms?: string[];
}

export const userSchema = new Schema<User>({
  username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true
    },
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
        unique:true
    },
  email:{
        type:String,
        required:[true,"Username is required"],
        unique:true,
        match:[/.+\@.+\..+/,"please use a valid email address"]
    },
  itemListId: [
    {
      type: Schema.Types.UUID,
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

export const User = model<User>("User", userSchema);