import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { BsCheckAll, BsCheck2 } from 'react-icons/bs';
import { motion } from 'framer-motion';

const ChatList = ({ searchTerm, activeTab }) => {
  const { currentTheme } = useTheme();
  const location = useLocation();

  // Dummy data - Replace with your actual chat data
  const conversations = [
    { 
      id: 1, 
      name: 'John Doe', 
      lastMessage: 'Thanks for your help!', 
      time: '2m ago', 
      unread: 2,
      online: true,
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
      isTyping: false,
      status: 'read'
    },
    { 
      id: 2, 
      name: 'Sarah Smith', 
      lastMessage: 'When will it be ready?', 
      time: '1h ago', 
      unread: 0,
      online: true,
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Smith&background=FF69B4&color=fff',
      isTyping: true,
      status: 'sent'
    },
    { 
      id: 3, 
      name: 'Alex Johnson', 
      lastMessage: 'Perfect, thanks!', 
      time: '3h ago', 
      unread: 4,
      online: false,
      avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=4CAF50&color=fff',
      isTyping: false,
      status: 'delivered'
    }
  ];

  const getThemeStyles = () => ({
    container: currentTheme === 'dark' ? 'bg-gray-900' : 
               currentTheme === 'eyeCare' ? 'bg-[#F5E6D3]' : 'bg-white',
    chatItem: currentTheme === 'dark' ? 'hover:bg-gray-800/80' : 
              currentTheme === 'eyeCare' ? 'hover:bg-[#E8D5BC]' : 'hover:bg-gray-50',
    activeChat: currentTheme === 'dark' ? 'bg-gray-800' : 
               currentTheme === 'eyeCare' ? 'bg-[#E8D5BC]' : 'bg-blue-50',
    text: currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-900',
    subtext: currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
  });

  const themeStyles = getThemeStyles();

  const filteredConversations = conversations.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMessageStatus = (status) => {
    switch (status) {
      case 'sent':
        return <BsCheck2 className="text-gray-400" size={16} />;
      case 'delivered':
        return <BsCheckAll className="text-gray-400" size={16} />;
      case 'read':
        return <BsCheckAll className="text-blue-500" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-1 px-2">
      {filteredConversations.map((chat) => (
        <motion.div
          key={chat.id}
          whileHover={{ scale: 0.995 }}
          whileTap={{ scale: 0.985 }}
        >
          <Link
            to={`/alerts/chat/${chat.id}`}
            className={`block p-3 rounded-xl transition-colors duration-200 ${themeStyles.chatItem}
              ${location.pathname.includes(chat.id.toString()) ? themeStyles.activeChat : ''}`}
          >
            <div className="flex items-center gap-3">
              {/* Avatar with Online Status */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800">
                  {chat.avatar ? (
                    <img 
                      src={chat.avatar} 
                      alt={chat.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                      {chat.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800" />
                )}
              </div>
              
              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className={`font-semibold truncate ${themeStyles.text}`}>
                    {chat.name}
                  </h3>
                  <span className={`text-xs whitespace-nowrap ${themeStyles.subtext}`}>
                    {chat.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-sm truncate ${themeStyles.subtext} ${chat.isTyping ? 'text-blue-500 font-medium' : ''}`}>
                    {chat.isTyping ? 'typing...' : chat.lastMessage}
                  </p>
                  <div className="flex items-center gap-2 ml-2">
                    {!chat.unread && getMessageStatus(chat.status)}
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-medium flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ChatList;
