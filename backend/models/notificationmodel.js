const mongoose = require('mongoose');

// Define the Notification schema
const notificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Sender's user ID
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Recipient's user ID
  createdAt: { type: Date, default: Date.now }, // Date when the notification was created
  read: { type: Boolean, default: false }, // Read/unread status
  type: { type: String, enum: ['appointment', 'message', 'reminder', 'alert'], required: true }, // Type of notification
  content: { type: String, required: true }, // Content of the notification
});

// Create the Notification model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
