const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patient: {
      type: mongoose.Schema.ObjectId,
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
  
  module.exports = mongoose.model("Appointment", appointmentSchema);
  