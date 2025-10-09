import dotenv from 'dotenv'; // Import dotenv to load environment variables
import http from 'http'; // Import http to create the server
import app from './app'; // Import the Express app
import { initializeSocket } from './socket'; // Import socket initialization
import connect_Database from './config/database'; // Import the database connection
import express from 'express'; // Import Express
import path from 'path'; // Import path for handling file paths

// Load environment variables
dotenv.config({ path: 'backend/config/config.env' });

// Connect to the database only if not on Vercel
if (!process.env.VERCEL) {
  connect_Database();
}

// Create the HTTP server
const server = http.createServer(app);

// Initialize socket with the created server only if not on Vercel
if (!process.env.VERCEL) {
  initializeSocket(server);
}

// Export the app for Vercel
export default app;

// Start the server only if not on Vercel
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
