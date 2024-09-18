import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Avatar, IconButton, TextField, List, ListItem, InputAdornment, CircularProgress } from '@mui/material';
import { Send, ArrowBack, MoreVert, EmojiEmotions } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSocket } from '../socket/socketcontext'; // Import useSocket hook

import { getReceiverId } from './reciever'; // Import receiver ID function
import { sendMessage } from './sendmessage'; // Import the sendMessage function
import { fetchMessages } from './fetchmessages'; // Import the fetchMessages function

const ChatPage = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState(null); // Store user information
  const [loading, setLoading] = useState(true);
  const [receiverId, setReceiverId] = useState(null); // Store receiverId
  const chatContainerRef = useRef(null);
  const id = JSON.parse(localStorage.getItem('authState'))?.user?._id;
  
  const socket = useSocket(); // Use the provided socket from context

  // Fetch the receiver's ID
  useEffect(() => {
    const fetchReceiverId = async () => {
      const response = await getReceiverId(conversationId, id);
      if (response.success) {
        setReceiverId(response.receiverId._id);
        setUserInfo(response.receiverId);
      }
    };
    if (id) fetchReceiverId();
  }, [conversationId, id]);

  // Fetch messages for the conversation
  const handleFetchMessages = useCallback(async () => {
    setLoading(true);
    const response = await fetchMessages(conversationId);
    if (response.success) {
      setMessages(response.messages);
    }
    setLoading(false);
  }, [conversationId]);

  useEffect(() => {
    handleFetchMessages();
  }, [handleFetchMessages]);

  // Socket.IO - Listen for new messages
  useEffect(() => {
    if (socket && conversationId) {
      socket.emit('joinChat', conversationId); // Join the chat room based on the conversationId

      // Listen for incoming messages
      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]); // Add the new message to the state
      });

      return () => {
        socket.emit('leaveChat', conversationId); // Leave the chat room when component unmounts
        socket.off('receiveMessage'); // Clean up the event listener
      };
    }
  }, [socket, conversationId]);

  // Handle sending the message to the backend
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const response = await sendMessage(id, receiverId, newMessage);
    if (response.success) {
      // Send the message via Socket.IO to other participants
      const messageData = {
        senderId: id,
        receiverId: receiverId,
        message: newMessage,
        createdAt: new Date().toISOString(),
      };

      // Emit the message via Socket.IO
      socket.emit('sendMessage', messageData);

      // Add the message locally
      setMessages((prevMessages) => [messageData,...prevMessages]);
      setNewMessage(''); // Clear the input
    }
  };

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f0f4f8',
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Bar with User Info */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          backgroundColor: '#1976d2',
          color: '#fff',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
        component={motion.div}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 60 }}
      >
        <IconButton sx={{ color: '#fff' }} onClick={() => navigate(`/user/${id}/chats`)}>
          <ArrowBack />
        </IconButton>
        {userInfo && (
          <Avatar
            src={userInfo.avatarUrl || 'https://via.placeholder.com/50'}
            sx={{ marginLeft: 2, marginRight: 2 }}
            className="animate-pulse"
          />
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }} className="text-lg font-bold">
          {userInfo?.name || 'Chat'}
        </Typography>
        <IconButton sx={{ color: '#fff' }}>
          <MoreVert />
        </IconButton>
      </Box>

      {/* Chat Messages */}
      <Box
        ref={chatContainerRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 2,
          backgroundColor: '#f0f4f8',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {loading ? (
          <CircularProgress sx={{ alignSelf: 'center', marginTop: 5 }} />
        ) : (
          <List sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            {messages
                
              .map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: message.senderId === id ? 'flex-end' : 'flex-start',
                  marginBottom: 2,
                }}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 50, delay: index * 0.05 }}
              >
                <Box
                  sx={{
                    backgroundColor: message.senderId === id ? '#42a5f5' : '#fff',
                    color: message.senderId === id ? '#fff' : '#000',
                    borderRadius: '10px',
                    padding: 1.5,
                    maxWidth: '70%',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    className: 'transition-transform transform hover:scale-105',
                  }}
                >
                  <Typography variant="body1">{message.message}</Typography>
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', marginTop: 1 }}>
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Message Input */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          backgroundColor: '#fff',
          borderTop: '1px solid #ddd',
        }}
        component={motion.div}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          variant="outlined"
          placeholder="Type your message..."
          className="input input-bordered input-primary"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmojiEmotions className="text-yellow-400" />
              </InputAdornment>
            ),
          }}
        />
        <IconButton color="primary" onClick={handleSendMessage} className="btn btn-primary ml-2">
          <Send className="text-blue" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatPage;
