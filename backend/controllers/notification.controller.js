const Notification = require('../models/notificationmodel'); 
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
 exports.sendNotification = async (senderId, userId, type, content) => {
  try {
    const notification = new Notification({
      sender: senderId,
      userId,
      type,
      content,
    });
    await notification.save();
    return notification;
  } catch (error) {
    throw new Error('Error sending notification: ' + error.message);
  }
};


 exports.getAllNotifications = catchAsyncErrors(async (req,res) => {
    const { id } = req.params;
   
      const notifications = await Notification.find({ userId:id }).sort({ createdAt: -1 });
      
      res.status(201).json({
        success: true,
       notifications
    });
    
  });
  
 exports.markNotificationsAsRead = catchAsyncErrors(async (req,res) => {
   const {id}=req.params;
   const user=await Notification.findOne({userId:id});
   if(!user){
    res.status(201).json({
      success: true,
      message: 'no notifcations' 
  });
   }
      await Notification.updateMany(
        { userId:id, read: false },
        { $set: { read: true } }
      );

      
      res.status(201).json({
        success: true,
        message: 'All notifications marked as read' 
    });
   
  });
