const mongoose = require("mongoose");

const doctorScheduleSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor",
    required: true
  },
  schedule: {
    morning: [{
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      }
    }],
    evening: [{
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      }
    }]
  },
  occupiedSlots: [{
    date: {
      type: Date,
      required: true
    },
    timeSlots: [{
      timeSlot: {
        type: String, // e.g., "morning" or "evening"
        required: true
      },
      appointmentId: {
        type: mongoose.Schema.ObjectId,
        ref: "Appointment",
        required: true
      }
    }]
  }]
});

// Middleware to auto-remove past occupied slots
doctorScheduleSchema.pre('save', function(next) {
  const now = new Date();
  this.occupiedSlots = this.occupiedSlots.filter(slot => slot.date >= now);
  next();
});

module.exports = mongoose.model("DoctorSchedule", doctorScheduleSchema);
