const mongoose = require("mongoose");

// Define the Doctor schema
const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
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
const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
