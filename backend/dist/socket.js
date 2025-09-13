"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotificationToUser = exports.getReceiverSocketId = exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const userSocketMap = {};
const initializeSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"],
        },
    });
    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId && userId !== 'undefined') {
            userSocketMap[userId] = socket.id;
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        }
        socket.on('sendMessage', (message) => {
            const receiverSocketId = userSocketMap[message.receiverId];
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('receiveMessage', message);
            }
        });
        socket.on('sendNotification', (notification) => {
            const receiverSocketId = userSocketMap[notification.userId];
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('receiveNotification', notification);
            }
        });
        socket.on('disconnect', () => {
            Object.keys(userSocketMap).forEach((key) => {
                if (userSocketMap[key] === socket.id) {
                    delete userSocketMap[key];
                }
            });
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        });
    });
};
exports.initializeSocket = initializeSocket;
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
exports.getReceiverSocketId = getReceiverSocketId;
const sendNotificationToUser = (userId, notification) => {
    const socketId = userSocketMap[userId];
    if (socketId) {
        io.to(socketId).emit('receiveNotification', notification);
    }
};
exports.sendNotificationToUser = sendNotificationToUser;
//# sourceMappingURL=socket.js.map