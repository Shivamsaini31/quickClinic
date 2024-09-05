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
        type: String, // e.g., "HH:mm" or "morning" / "evening"
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

// Middleware to auto-remove past occupied slots and sort occupied slots by date and time
doctorScheduleSchema.pre('save', function(next) {
  const now = new Date();

  // Remove past slots
  this.occupiedSlots = this.occupiedSlots.filter(slot => slot.date >= now);

  // Sort slots by date and then timeSlots within each date
  this.occupiedSlots.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // Compare by date
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;

    // If dates are equal, sort by the first timeSlot within each occupiedSlots object
    const timeA = a.timeSlots.length ? a.timeSlots[0].timeSlot : '';
    const timeB = b.timeSlots.length ? b.timeSlots[0].timeSlot : '';

    // If timeSlot is in "HH:mm" format, compare times
    if (timeA && timeB && /\d{2}:\d{2}/.test(timeA) && /\d{2}:\d{2}/.test(timeB)) {
      return timeA.localeCompare(timeB); // Sort by actual time
    }

    // If timeSlot is "morning" or "evening", custom comparison
    if (timeA === 'morning' && timeB === 'evening') return -1;
    if (timeA === 'evening' && timeB === 'morning') return 1;

    return 0; // If they are equal
  });

  // Sort the timeSlots within each occupiedSlots array for each date
  this.occupiedSlots.forEach(slot => {
    slot.timeSlots.sort((a, b) => {
      const timeA = a.timeSlot;
      const timeB = b.timeSlot;

      // If timeSlot is in "HH:mm" format, compare times
      if (/\d{2}:\d{2}/.test(timeA) && /\d{2}:\d{2}/.test(timeB)) {
        return timeA.localeCompare(timeB); // Sort by actual time
      }

      // If timeSlot is "morning" or "evening", custom comparison
      if (timeA === 'morning' && timeB === 'evening') return -1;
      if (timeA === 'evening' && timeB === 'morning') return 1;

      return 0; // If they are equal
    });
  });

  next();
});

module.exports = mongoose.model("DoctorSchedule", doctorScheduleSchema);
