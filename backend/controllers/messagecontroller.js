const Conversation = require('../models/conversationmodel.js');
const Message = require('../models/messagemodel.js');
const User=require('../models/usermodel.js');
const { getReceiverSocketId, io } = require('../socket.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
exports.sendMessage = async (req, res) => {
  try {
    const { message ,receiverId} = req.body;
    
    const { id: senderId } = req.params;


    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      conversation.lastMessage=newMessage.message;
    }

    // Save both conversation and message in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // Emit the message to the receiver via Socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log('Error in sendMessage controller:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getMessages = catchAsyncErrors(async (req, res) => {
  const { conversationId } = req.params;

  // Fetch conversation and populate messages
  const conversation = await Conversation.findOne({
      _id: conversationId
  }).populate({
      path: 'messages',
      options: {
          sort: { createdAt: -1 } // Sort messages by createdAt in ascending order
      }
  });

  if (!conversation) return res.status(200).json([]);

  // Send sorted messages as response
  res.status(200).json(conversation.messages);
});
exports.getconversations = catchAsyncErrors(async (req, res) => {
  const { id } = req.params; // The ID of the requesting user

  // Find conversations where the user is one of the participants
  const conversations = await Conversation.find({
    participants: { $in: [id] },
  }).populate('participants', 'name'); // Populating participants' names from the User model

  // Create a list of conversations with the other participant's details (excluding the requesting user)
  const formattedConversations = conversations.map((conversation) => {
    // Find the other participant
    const otherParticipant = conversation.participants.find(
      (participant) => participant._id.toString() !== id
    );

    return {
      conversationId: conversation._id,
      otherParticipantId: otherParticipant._id,
      otherParticipantName: otherParticipant.name,
      lastMessage:conversation.lastMessage
    };
  });

  // Send the formatted conversations as response
  res.status(200).json(formattedConversations);
});
exports.lastmessage = catchAsyncErrors(async (req, res) => {
  const { conversationId } = req.params;

  // Fetch the conversation by its ID
  const conversation = await Conversation.findById(conversationId)
    .populate({
      path: 'messages',
      options: { sort: { createdAt: -1 }, limit: 1 }, // Fetch the latest message
    })
    .exec();

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: 'Conversation not found',
    });
  }

  // Check if there are messages in the conversation
  if (!conversation.messages.length) {
    return res.status(404).json({
      success: false,
      message: 'No messages found for this conversation',
    });
  }

  // Return the last message
  const lastMessage = conversation.messages[0];

  res.status(200).json({
    success: true,
    lastMessage,
  });
});
exports.groupids = catchAsyncErrors(async (req, res) => {
  const { conversationId } = req.params;

  // Find the conversation by its ID
  const conversation = await Conversation.findById(conversationId);

  // Check if the conversation exists
  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: 'Conversation not found',
    });
  }

  // Get the participant IDs
  const participantIds = conversation.participants;

  // Fetch the detailed information for each participant
  const participantsInfo = await User.find({ _id: { $in: participantIds } })
    .select('_id name email'); // Select only necessary fields (adjust as needed)

  // Send the array of participant details
  res.status(200).json({
    success: true,
    participants: participantsInfo,
  });
});

