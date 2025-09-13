import mongoose, { Document, Schema, Types } from "mongoose";

export interface IDoctor extends Document {
  user: Types.ObjectId;
  specialization: string;
  experience: number;
  fees: number;
}

// Define the Doctor schema
const doctorSchema = new Schema<IDoctor>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number, // Number of years of experience
    required: true,
  },
  fees: {
    type: Number, // Consultation fee in your preferred currency
    required: true,
  }
});

// Create the model
const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);

export default Doctor;
