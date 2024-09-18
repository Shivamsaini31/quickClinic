import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import useGetConversations from './hooks/useGetConversation';

const SearchPage = ({ searchQuery }) => {
  const { loading, conversations } = useGetConversations();
  const navigate = useNavigate();

  const filteredUsers = conversations.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserClick = (conversationId) => {
    navigate(`/user/chats/${conversationId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {loading ? (
        <Typography variant="h6" color="textSecondary">Loading...</Typography>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <motion.div
                key={user._id}
                className="bg-white p-4 rounded-lg shadow-md flex items-center hover:bg-green-50 cursor-pointer"
                onClick={() => handleUserClick(user._id)}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={user.avatarUrl || 'https://via.placeholder.com/50'} 
                  alt={user.name} 
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-medium">{user.name}</h2>
                </div>
              </motion.div>
            ))
          ) : (
            <Typography variant="h6" color="textSecondary">No users found</Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
