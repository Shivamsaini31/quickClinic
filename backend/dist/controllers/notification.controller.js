"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllNotifications = exports.deleteNotification = exports.markNotificationAsRead = exports.markNotificationsAsRead = exports.getAllNotifications = exports.sendNotification = void 0;
const notificationmodel_1 = __importDefault(require("../models/notificationmodel"));
const catchAsyncErrors_1 = __importDefault(require("../middleware/catchAsyncErrors"));
const socket_1 = require("../socket");
const sendNotification = async (senderId, userId, type, content) => {
    try {
        const notification = new notificationmodel_1.default({
            sender: senderId,
            userId,
            type,
            content,
        });
        await notification.save();
        (0, socket_1.sendNotificationToUser)(userId, {
            _id: notification._id,
            sender: senderId,
            userId,
            type,
            content,
            read: false,
            createdAt: notification.createdAt
        });
        return notification;
    }
    catch (error) {
        throw new Error('Error sending notification: ' + error.message);
    }
};
exports.sendNotification = sendNotification;
exports.getAllNotifications = (0, catchAsyncErrors_1.default)(async (req, res) => {
    const { id } = req.params;
    const notifications = await notificationmodel_1.default.find({ userId: id }).sort({ createdAt: -1 });
    res.status(201).json({
        success: true,
        notifications
    });
});
exports.markNotificationsAsRead = (0, catchAsyncErrors_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = await notificationmodel_1.default.findOne({ userId: id });
    if (!user) {
        res.status(201).json({
            success: true,
            message: 'no notifications'
        });
    }
    await notificationmodel_1.default.updateMany({ userId: id, read: false }, { $set: { read: true } });
    res.status(201).json({
        success: true,
        message: 'All notifications marked as read'
    });
});
exports.markNotificationAsRead = (0, catchAsyncErrors_1.default)(async (req, res) => {
    const { notificationId } = req.params;
    const notification = await notificationmodel_1.default.findByIdAndUpdate(notificationId, { $set: { read: true } }, { new: true });
    if (!notification) {
        return res.status(404).json({
            success: false,
            message: 'Notification not found'
        });
    }
    res.status(200).json({
        success: true,
        message: 'Notification marked as read',
        notification
    });
});
exports.deleteNotification = (0, catchAsyncErrors_1.default)(async (req, res) => {
    const { notificationId } = req.params;
    const notification = await notificationmodel_1.default.findByIdAndDelete(notificationId);
    if (!notification) {
        return res.status(404).json({
            success: false,
            message: 'Notification not found'
        });
    }
    res.status(200).json({
        success: true,
        message: 'Notification deleted successfully'
    });
});
exports.deleteAllNotifications = (0, catchAsyncErrors_1.default)(async (req, res) => {
    const { id } = req.params;
    await notificationmodel_1.default.deleteMany({ userId: id });
    res.status(200).json({
        success: true,
        message: 'All notifications deleted successfully'
    });
});
//# sourceMappingURL=notification.controller.js.map