const mongoose = require("mongoose");



const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  appointment: [
    {
      patient_name: {
        type: String,
        required: true,
      },
      patient_id: {
        type: String,
        required: true,
      },
      patient_email:{
        type: String,
        required: true,
      },
      patient_phone:{
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String, // You might want to store time as a string or Date depending on your needs
        required: true,
      },
      fees: {
        type: Number,
        required: true,
      },
      paid: {
        type: Boolean,
        required: true,
      },
      appointmentNumber: {
        type: String, // Changed from Number to String if using UUID
        required: true,
        unique: true,
      },
      status: {
        type: String,
        enum: ['Scheduled', 'Canceled', 'Completed'], // Possible statuses
        default: 'Scheduled', // Default value
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Doctor", doctorSchema);
