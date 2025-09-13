import express from 'express';
import { getAllNotifications, markNotificationsAsRead, markNotificationAsRead, deleteNotification, deleteAllNotifications } from '../controllers/notification.controller';

const router = express.Router();

router.route('/notifications/:id').get(getAllNotifications);
router.route('/notifications/:id/mark-read').put(markNotificationsAsRead);
router.route('/notifications/:id/delete-all').delete(deleteAllNotifications);
router.route('/notification/:notificationId/mark-read').put(markNotificationAsRead);
router.route('/notification/:notificationId').delete(deleteNotification);

export default router;
