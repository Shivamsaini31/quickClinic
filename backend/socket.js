// socket.js
const {}=require('./controllers/socketcontrollers');

const socketFunctions = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle joining a conversation
    socket.on('joinConversation', (conversationId) => {
    
    });

    // Handle sending a message
    socket.on('sendMessage', async ({ senderId, receiverId, messageText }) => {
     
    });

    // Handle fetching older messages
    socket.on('fetchMessages', async ({ conversationId }) => {
      
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = socketFunctions;
