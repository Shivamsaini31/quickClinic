import mongoose, { Document, Schema, Types } from "mongoose";

export interface INotification extends Document {
  sender: Types.ObjectId;
  userId: Types.ObjectId;
  type: string;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model<INotification>("Notification", notificationSchema);
