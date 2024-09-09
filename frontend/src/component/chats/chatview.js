import React, { useEffect, useState } from 'react';
import { useSocket } from './socketcontext'; // Ensure this path is correct
import { useParams, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Typography, TextField, InputAdornment } from '@mui/material';
import { Search, ChatBubbleOutline } from '@mui/icons-material';
import axios from 'axios';
import { motion } from 'framer-motion';

const ChatViewPage = () => {
  const [conversations, setConversations] = useState([]); // Initialize as an array
  const [searchQuery, setSearchQuery] = useState('');
  const { id } = useParams(); // Get the user ID from URL params
  const socket = useSocket(); // Use the socket context
  const navigate = useNavigate(); // For navigation on conversation click

  // Function to fetch last message for a conversation
  const fetchLastMessage = async (conversationId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/lastmessage/${conversationId}`);
      return response.data.lastMessage; // Assuming lastMessage field in response
    } catch (error) {
      console.error("Error fetching last message:", error);
      return 'No messages yet'; // Fallback message
    }
  };

  // Fetch all conversations and last messages on mount
  useEffect(() => {
    if (!socket) return;

    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/conversations/${id}`);
        const fetchedConversations = Array.isArray(response.data) ? response.data : [];
console.log("response",response.data);
        // Fetch last message for each conversation
        const conversationsWithLastMessage = await Promise.all(
          fetchedConversations.map(async (conversation) => {
            const lastMessage = await fetchLastMessage(conversation.conversationId); // Use _id or conversationId based on your API
            return {
              ...conversation,
              lastMessage: lastMessage.message || 'No messages yet', // Adjust according to your message schema
            };
          })
        );

        setConversations(conversationsWithLastMessage);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [socket, id]);

  const handleConversationClick = (conversationId) => {
    navigate(`/user/chats/${conversationId}`); // Navigate to the chat page for the conversation
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <Typography 
        variant="h4" 
        sx={{ marginBottom: 2, color: '#2e7d32' }} 
        component={motion.h4}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        Your Conversations
      </Typography>

      {/* Search Bar */}
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search for a conversation..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {/* Conversation List */}
      <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {Array.isArray(conversations) && conversations
          .filter(convo => convo.otherParticipantName.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((conversation) => (
            <ListItem 
              key={conversation.conversationId} // Ensure this is applied to ListItem only
             // Ensure this is applied to ListItem only
              onClick={() => handleConversationClick(conversation.conversationId)} // Ensure correct property used
              sx={{
                backgroundColor: '#ffffff',
                marginBottom: 2,
                borderRadius: 2,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#e0f7fa',
                },
              }}
              component={motion.div}
              whileHover={{ scale: 1.02 }}
            >
              <ListItemAvatar>
                <Avatar src={conversation.avatarUrl || 'https://via.placeholder.com/50'} />
              </ListItemAvatar>
              <ListItemText
                primary={conversation.otherParticipantName} // Adjusted to use the correct property
                secondary={conversation.lastMessage || 'No messages yet'}
              />
              <IconButton edge="end">
                <ChatBubbleOutline />
              </IconButton>
            </ListItem>
          ))}
      </List>

      {/* Message Input Area */}
     
    </Box>
  );
};

export default ChatViewPage;
