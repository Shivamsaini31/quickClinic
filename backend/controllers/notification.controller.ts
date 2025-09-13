import { Request, Response } from 'express';
import Notification from '../models/notificationmodel';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import { sendNotificationToUser } from '../socket';

export const sendNotification = async (senderId: string, userId: string, type: string, content: string) => {
  try {
    const notification = new Notification({
      sender: senderId,
      userId,
      type,
      content,
    });
    await notification.save();
    
    // Send real-time notification via socket.io
    sendNotificationToUser(userId, {
      _id: notification._id,
      sender: senderId,
      userId,
      type,
      content,
      read: false,
      createdAt: notification.createdAt
    });
    
    return notification;
  } catch (error) {
    throw new Error('Error sending notification: ' + (error as Error).message);
  }
};

export const getAllNotifications = catchAsyncErrors(async (req: Request, res: Response) => {
  const { id } = req.params;

  const notifications = await Notification.find({ userId: id }).sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    notifications
  });
});

export const markNotificationsAsRead = catchAsyncErrors(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await Notification.findOne({ userId: id });
  if (!user) {
    res.status(201).json({
      success: true,
      message: 'no notifications'
    });
  }
  await Notification.updateMany(
    { userId: id, read: false },
    { $set: { read: true } }
  );

  res.status(201).json({
    success: true,
    message: 'All notifications marked as read'
  });
});

export const markNotificationAsRead = catchAsyncErrors(async (req: Request, res: Response) => {
  const { notificationId } = req.params;
  
  const notification = await Notification.findByIdAndUpdate(
    notificationId,
    { $set: { read: true } },
    { new: true }
  );

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

export const deleteNotification = catchAsyncErrors(async (req: Request, res: Response) => {
  const { notificationId } = req.params;
  
  const notification = await Notification.findByIdAndDelete(notificationId);

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

export const deleteAllNotifications = catchAsyncErrors(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  await Notification.deleteMany({ userId: id });

  res.status(200).json({
    success: true,
    message: 'All notifications deleted successfully'
  });
});
