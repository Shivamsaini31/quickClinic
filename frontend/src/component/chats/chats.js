import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Box, Typography, Avatar, IconButton, TextField, List, ListItem, InputAdornment, CircularProgress } from '@mui/material';
import { Send, ArrowBack, MoreVert, EmojiEmotions } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';
import io from 'socket.io-client';

const useSocket = (conversationId, id, setMessages) => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:5000');

    socket.current.on('receiveMessage', (message) => {
      setMessages(prevMessages => [message, ...prevMessages]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [conversationId, id, setMessages]);

  const sendMessage = useCallback((message, receiverId) => {
    socket.current.emit('sendMessage', {
      message,
      receiverId,
      sender: id,
      createdAt: new Date(),
    });
  }, [id]);

  return { sendMessage };
};

const ChatPage = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [receiverId, setReceiverId] = useState('');
  const chatContainerRef = useRef(null);
  const id = JSON.parse(localStorage.getItem('authState'))?.user?._id;

  const { sendMessage } = useSocket(conversationId, id, setMessages);

  useEffect(() => {
    const fetchReceiverId = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/v1/recieverId/${conversationId}`);
        const participants = data.participantIds;
        setReceiverId(participants.find(participant => participant !== id));
      } catch (error) {
        console.error('Error fetching receiver ID:', error.message);
      }
    };

    if (id) fetchReceiverId();
  }, [conversationId, id]);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const messagesResponse = await axios.get(`http://localhost:5000/api/v1/getmessages/${conversationId}`);
      setMessages(messagesResponse.data);

      if (receiverId) {
        const userResponse = await axios.get(`http://localhost:5000/api/v1/userinfo/${receiverId}`);
        setUserInfo(userResponse.data.user);
        

      }
      
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    } finally {
      setLoading(false);
    }
  }, [conversationId, receiverId]);

  useEffect(() => {
    if (conversationId && receiverId) fetchMessages();
  }, [conversationId, receiverId, fetchMessages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post(`http://localhost:5000/api/v1/sendmessage/${id}`, {
        message: newMessage,
        receiverId,
      });

      sendMessage(newMessage, receiverId);

      setNewMessage('');
      fetchMessages();

    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#fafafa',
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
          backgroundColor: '#2e7d32',
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
          />
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
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
          backgroundColor: '#e8f5e9',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {loading ? (
          <CircularProgress sx={{ alignSelf: 'center', marginTop: 5 }} />
        ) : (
          <List sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            {messages.map((message, index) => (
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
                    backgroundColor: message.senderId === id ? '#4caf50' : '#fff',
                    color: message.senderId === id ? '#fff' : '#000',
                    borderRadius: '10px',
                    padding: 1.5,
                    maxWidth: '70%',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmojiEmotions />
              </InputAdornment>
            ),
          }}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatPage;
