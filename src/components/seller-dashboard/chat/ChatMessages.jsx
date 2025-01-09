import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import MessageBubble from './MessageBubble';

const ChatMessages = ({ messages, currentUserId }) => {
  const { currentTheme } = useTheme();

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 py-6">
      <div className="space-y-6">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.sender.id === currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatMessages; 