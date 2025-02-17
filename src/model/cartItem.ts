import { Schema, Types } from "mongoose";

export interface CartItem {
  condition: string;
  createdAt: Date;
  description: string;
  id: string;
  image: string;
  itemname: string;
  ownerId: string;
  price: number;
  quantity: number;
  sold: boolean;
  updatedAt: Date;
  city:string;
  ownername:string
}

export const cartItemSchema = new Schema<CartItem>({
  condition: String,
  createdAt: Date,
  description: String,
  id: String,
  image: String,
  itemname: String,
  ownerId: String,
  price: Number,
  quantity: Number,
  sold: Boolean,
  updatedAt: Date,
});