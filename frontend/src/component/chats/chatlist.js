import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatList = ({ onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const userId = 'user1'; // Replace with actual user ID
        const response = await axios.get(`/api/v1/conversations/${userId}`);
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div>
      <h2>Conversations</h2>
      <ul>
        {conversations.map((conv) => (
          <li key={conv._id} onClick={() => onSelectConversation(conv._id)}>
            {conv.participants.filter(p => p.toString() !== 'user1').join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
