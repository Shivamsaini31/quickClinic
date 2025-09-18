import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server;
const userSocketMap: { [userId: string]: string } = {}; // { userId: socketId }

export const initializeSocket = (server: HttpServer): void => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    // console.log('A user connected:', socket.id);

    // Extract userId from the socket's handshake query
    const userId = socket.handshake.query.userId as string;

    if (userId && userId !== 'undefined') {
      // Store the socket ID mapped to the userId
      userSocketMap[userId] = socket.id;

      // Emit the list of online users to all clients
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    }

    // Handle incoming messages
    socket.on('sendMessage', (message: any) => {
      const receiverSocketId = userSocketMap[message.receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveMessage', message);
      }
    });

    // Handle incoming notifications
    socket.on('sendNotification', (notification: any) => {
      const receiverSocketId = userSocketMap[notification.userId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveNotification', notification);
      }
    });

    // Handle socket disconnection
    socket.on('disconnect', () => {
      // console.log('User disconnected:', socket.id);

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

export { io };
export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};

export const sendNotificationToUser = (userId: string, notification: any): void => {
  const socketId = userSocketMap[userId];
  if (socketId) {
    io.to(socketId).emit('receiveNotification', notification);
  }
};
