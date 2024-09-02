const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
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

module.exports = mongoose.model("Patient", patientSchema);
