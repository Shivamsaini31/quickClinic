"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupids = exports.lastmessage = exports.getconversations = exports.getMessages = exports.sendMessage = void 0;
const conversationmodel_1 = __importDefault(require("../models/conversationmodel"));
const messagemodel_1 = __importDefault(require("../models/messagemodel"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
const socket_1 = require("../socket");
const catchAsyncErrors_1 = __importDefault(require("../middleware/catchAsyncErrors"));
const sendMessage = async (req, res) => {
    try {
        const { message, receiverId } = req.body;
        const { id: senderId } = req.params;
        let conversation = await conversationmodel_1.default.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = await conversationmodel_1.default.create({
                participants: [senderId, receiverId],
            });
        }
        const newMessage = new messagemodel_1.default({
            senderId,
            receiverId,
            message,
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
            conversation.lastMessage = newMessage.message;
        }
        await Promise.all([conversation.save(), newMessage.save()]);
        const receiverSocketId = (0, socket_1.getReceiverSocketId)(receiverId);
        if (receiverSocketId) {
            socket_1.io.to(receiverSocketId).emit('receiveMessage', newMessage);
        }
        res.status(201).json(newMessage);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.sendMessage = sendMessage;
exports.getMessages = (0, catchAsyncErrors_1.default)(async (req, res) => {
    const { conversationId } = req.params;
    const conversation = await conversationmodel_1.default.findOne({
        _id: conversationId
    }).populate({
        path: 'messages',
        options: {
            sort: { createdAt: -1 }
        }
    });
    if (!conversation)
        return res.status(200).json([]);
    res.status(200).json(conversation.messages);
});
exports.getconversations = (0, catchAsyncErrors_1.default)(async (req, res) => {
    const { id } = req.params;
    const conversations = await conversationmodel_1.default.find({
        participants: { $in: [id] },
    }).populate('participants', 'name');
    const formattedConversations = conversations.map((conversation) => {
        const otherParticipant = conversation.participants.find((participant) => participant._id.toString() !== id);
        return {
            conversationId: conversation._id,
            otherParticipantId: otherParticipant._id,
            otherParticipantName: otherParticipant.name,
            lastMessage: conversation.lastMessage
        };
    });
    res.status(200).json(formattedConversations);
});
exports.lastmessage = (0, catchAsyncErrors_1.default)(async (req, res) => {
    const { conversationId } = req.params;
    const conversation = await conversationmodel_1.default.findById(conversationId)
        .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 }, limit: 1 },
    })
        .exec();
    if (!conversation) {
        return res.status(404).json({
            success: false,
            message: 'Conversation not found',
        });
    }
    if (!conversation.messages.length) {
        return res.status(404).json({
            success: false,
            message: 'No messages found for this conversation',
        });
    }
    const lastMessage = conversation.messages[0];
    res.status(200).json({
        success: true,
        lastMessage,
    });
});
exports.groupids = (0, catchAsyncErrors_1.default)(async (req, res) => {
    const { conversationId } = req.params;
    const conversation = await conversationmodel_1.default.findById(conversationId);
    if (!conversation) {
        return res.status(404).json({
            success: false,
            message: 'Conversation not found',
        });
    }
    const participantIds = conversation.participants;
    const participantsInfo = await usermodel_1.default.find({ _id: { $in: participantIds } })
        .select('_id name email');
    res.status(200).json({
        success: true,
        participants: participantsInfo,
    });
});
//# sourceMappingURL=messagecontroller.js.map