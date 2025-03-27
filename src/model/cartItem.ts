import { Schema, Types } from "mongoose";

export interface CartItem {
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
  updatedAt: Date;
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