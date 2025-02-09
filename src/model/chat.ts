import { Schema, Types } from "mongoose";
import { messageSchema } from "./message";

export interface Chat {
  participants: Types.ObjectId[];
  messages: Types.Array<Types.ObjectId>;
}

export const chatSchema = new Schema<Chat>({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [messageSchema],
});