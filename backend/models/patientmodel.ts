import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPatient extends Document {
  user: Types.ObjectId;
  medicalHistory?: string;
  allergies?: string;
  currentMedications?: string;
}

const patientSchema = new Schema<IPatient>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  medicalHistory: {
    type: String,
  },
  allergies: {
    type: String,
  },
  currentMedications: {
    type: String,
  },
});

export default mongoose.model<IPatient>("Patient", patientSchema);
