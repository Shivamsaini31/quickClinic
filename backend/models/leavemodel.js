const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor", // Reference to the Doctor model
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
  },
});

module.exports = mongoose.model("Leave", leaveSchema);
