import { Schema, Types } from "mongoose";

export interface Message {
  sender: Types.ObjectId;
  content: string;
  timestamp: Date;
  roomId: string;
  senderName: string;
}

export const messageSchema = new Schema<Message>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  roomId: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
});