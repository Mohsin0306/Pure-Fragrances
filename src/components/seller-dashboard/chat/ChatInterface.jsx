import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

const ChatInterface = ({ chatId }) => {
  const { currentTheme } = useTheme();
  const isMobile = window.innerWidth <= 768;
  
  // Dummy messages for testing - Replace with your actual messages data
  const [messages] = useState([
    {
      id: 1,
      content: "Hey, how are you?",
      timestamp: new Date().toISOString(),
      isRead: true,
      sender: {
        id: "user1",
        name: "John Doe",
        avatar: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff",
        isOnline: true
      }
    },
    {
      id: 2,
      content: "I'm good, thanks! How about you?",
      timestamp: new Date().toISOString(),
      isRead: true,
      sender: {
        id: "currentUser", // This should match your current user's ID
        name: "Current User",
        avatar: "https://ui-avatars.com/api/?name=Current+User&background=4CAF50&color=fff",
        isOnline: true
      }
    },
    {
      id: 3,
      content: "Great! Let's discuss the project details.",
      timestamp: new Date().toISOString(),
      isRead: false,
      sender: {
        id: "user1",
        name: "John Doe",
        avatar: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff",
        isOnline: true
      }
    }
  ]);

  const chatData = {
    id: 1,
    name: 'John Doe',
    status: 'online',
    lastSeen: '2 min ago',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
    typing: false,
    verified: true
  };

  const getThemeStyles = () => ({
    container: currentTheme === 'dark' ? 'bg-gray-900' : 
              currentTheme === 'eyeCare' ? 'bg-[#F5E6D3]' : 'bg-white',
  });

  const themeStyles = getThemeStyles();

  // Current user ID - Replace with your actual current user ID
  const currentUserId = "currentUser";

  useEffect(() => {
    if (isMobile) {
      const header = document.querySelector('header');
      const navbar = document.querySelector('nav');
      const mainContent = document.querySelector('main');

      if (header) header.style.display = 'none';
      if (navbar) navbar.style.display = 'none';
      if (mainContent) mainContent.style.padding = '0';
      document.body.style.overflow = 'hidden';

      return () => {
        if (header) header.style.display = '';
        if (navbar) navbar.style.display = '';
        if (mainContent) mainContent.style.padding = '';
        document.body.style.overflow = '';
      };
    }
  }, [isMobile]);

  return (
    <div className={`
      ${isMobile ? 'fixed inset-0 z-[9999]' : 'relative h-full'}
      flex flex-col
      ${themeStyles.container}
      overflow-hidden
    `}>
      {/* Header - Always at top */}
      <div className="flex-none">
        <ChatHeader 
          chatData={chatData} 
          isMobile={isMobile}
        />
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto relative">
        <ChatMessages 
          messages={messages}
          currentUserId={currentUserId}
        />
      </div>

      {/* Input Area - Always at bottom */}
      <div className="flex-none">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatInterface;
