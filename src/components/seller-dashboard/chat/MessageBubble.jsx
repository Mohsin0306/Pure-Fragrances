import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { format } from 'date-fns';

const MessageBubble = ({ message, isOwn }) => {
  const { currentTheme } = useTheme();

  const getThemeStyles = () => ({
    bubble: isOwn 
      ? currentTheme === 'dark' 
        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
        : currentTheme === 'eyeCare'
        ? 'bg-gradient-to-br from-[#4A90E2] to-[#357ABD] text-white'
        : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
      : currentTheme === 'dark'
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100'
        : currentTheme === 'eyeCare'
        ? 'bg-gradient-to-br from-[#E8D5BC] to-[#D4C3AA] text-gray-800'
        : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800',
    time: isOwn
      ? 'text-blue-100/70'
      : currentTheme === 'dark'
        ? 'text-gray-400'
        : 'text-gray-500',
  });

  const themeStyles = getThemeStyles();

  return (
    <div className={`flex items-end gap-2 mb-4 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Profile Picture */}
      {!isOwn && (
        <div className="flex-shrink-0">
          <div className="relative">
            <img 
              src={message.sender.avatar} 
              alt={message.sender.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
            />
            {message.sender.isOnline && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full 
                ring-2 ring-white dark:ring-gray-800" 
              />
            )}
          </div>
        </div>
      )}

      {/* Message Content */}
      <div className={`
        flex flex-col
        ${isOwn ? 'items-end' : 'items-start'}
        max-w-[75%] sm:max-w-[65%]
      `}>
        {/* Sender Name - Only show for others' messages */}
        {!isOwn && (
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1 mb-1">
            {message.sender.name}
          </span>
        )}

        {/* Message Bubble */}
        <div className={`
          rounded-2xl px-4 py-2
          ${isOwn ? 'rounded-tr-sm' : 'rounded-tl-sm'}
          ${themeStyles.bubble}
          shadow-sm
        `}>
          {/* Message Text */}
          <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
            {message.content}
          </p>

          {/* Time */}
          <div className={`
            text-[10px] sm:text-xs mt-1
            ${themeStyles.time}
            text-right
          `}>
            {format(new Date(message.timestamp), 'h:mm a')}
          </div>
        </div>

        {/* Read Status - Only for own messages */}
        {isOwn && message.isRead && (
          <span className="text-xs text-blue-500 mt-1 mr-1">
            Read
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble; 