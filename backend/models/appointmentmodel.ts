import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAppointment extends Document {
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  date: Date;
  time: string;
  fees: number;
  paid: boolean;
  appointmentNumber: string;
  status: 'Scheduled' | 'Canceled' | 'Completed';
}

const appointmentSchema = new Schema<IAppointment>({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // You can store time as a string or use Date depending on requirements
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  appointmentNumber: {
    type: String, // Unique identifier for the appointment
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Canceled', 'Completed'],
    default: 'Scheduled',
  },
});

export default mongoose.model<IAppointment>("Appointment", appointmentSchema);
