const app = require('./app');
const dotenv = require('dotenv');
const connect_Database = require('./config/database');
const cors = require('cors');
const http = require('http'); // Import http to create the server
const { Server } = require('socket.io'); // Import Socket.IO
const socketFunctions = require('./socket'); // Import the socket functions

// Load environment variables
dotenv.config({ path: 'backend/config/config.env' });

// Connect to the database
connect_Database();

// Allow CORS
app.use(cors());

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a new Socket.IO instance and attach it to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"], // Allowed methods
    credentials: true, // Allow credentials such as cookies
  },
});

// Use the socket functions from the separate file
socketFunctions(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
