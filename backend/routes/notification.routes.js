const express = require("express");
const router = express.Router(); 
const {getAllNotifications,markNotificationsAsRead} =require('../controllers/notification.controller')
router.route("/notifications/:id").get(getAllNotifications);
router.route("/marknotifications/:id").post(markNotificationsAsRead);

module.exports = router; 