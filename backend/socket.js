const { Server } = require('socket.io');

let io;
const userSocketMap = {}; // { userId: socketId }

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Extract userId from the socket's handshake query
    const userId = socket.handshake.query.userId;

    if (userId && userId !== 'undefined') {
      // Store the socket ID mapped to the userId
      userSocketMap[userId] = socket.id;

      // Emit the list of online users to all clients
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    }

    // Handle incoming messages
    socket.on('sendMessage', (message) => {
      const receiverSocketId = userSocketMap[message.receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveMessage', message);
      }
    });

    // Handle incoming notifications
    socket.on('sendNotification', (notification) => {
      const receiverSocketId = userSocketMap[notification.userId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveNotification', notification);
      }
    });

    // Handle socket disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);

      // Remove the user from the map when disconnected
      Object.keys(userSocketMap).forEach((key) => {
        if (userSocketMap[key] === socket.id) {
          delete userSocketMap[key];
        }
      });

      // Emit updated list of online users
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
  });
};

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

module.exports = {
  initializeSocket,
  getReceiverSocketId,
  io, // Export the io instance (it will be initialized later)
};
