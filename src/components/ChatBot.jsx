import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import ChatIcon from './ChatIcon';
import '../styles/ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {isOpen && <ChatWindow onClose={toggleChat} />}
      <ChatIcon onClick={toggleChat} />
    </div>
  );
};

export default ChatBot;
