import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { Routes, Route, useLocation } from 'react-router-dom';
import ChatSidebar from './ChatSidebar';
import ChatInterface from './ChatInterface';

const Chat = () => {
  const { currentTheme } = useTheme();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`h-[calc(100vh-theme(spacing.32))] md:h-[calc(100vh-theme(spacing.20))] ${
      currentTheme === 'dark' ? 'bg-gray-900 text-white' 
      : currentTheme === 'eyeCare' ? 'bg-[#F5E6D3] text-[#433422]'
      : 'bg-white text-gray-900'
    }`}>
      <div className="h-full max-w-7xl mx-auto">
        {isMobile ? (
          // Mobile View: Adjusted for top navbar and bottom bar
          <div className="h-full bg-white dark:bg-gray-900">
            <Routes>
              <Route index element={<ChatSidebar />} />
              <Route path=":chatId" element={<ChatInterface />} />
            </Routes>
          </div>
        ) : (
          // Desktop View: Modern split view
          <div className="h-full flex">
            <div className={`w-[380px] flex-shrink-0 border-r ${
              currentTheme === 'dark' ? 'border-gray-800' 
              : currentTheme === 'eyeCare' ? 'border-[#D4C3AA]'
              : 'border-gray-100'
            }`}>
              <ChatSidebar />
            </div>
            <div className="flex-1">
              {location.pathname === '/alerts/chat' ? (
                <div className="h-full flex items-center justify-center text-center">
                  <div className="max-w-md px-4">
                    <h3 className="text-2xl font-semibold mb-2">Select a Conversation</h3>
                    <p className="text-gray-500">Choose from your existing conversations to start messaging</p>
                  </div>
                </div>
              ) : (
                <ChatInterface />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat; 