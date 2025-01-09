import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { BsThreeDotsVertical, BsPin, BsArchive, BsBell, BsTrash, BsShieldCheck } from 'react-icons/bs';
import { IoClose, IoChevronBack } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ChatHeader = ({ chatData, isMobile }) => {
  const { currentTheme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const getThemeStyles = () => ({
    header: currentTheme === 'dark' ? 'bg-gray-900/95 border-gray-700' : 
            currentTheme === 'eyeCare' ? 'bg-[#F5E6D3]/95 border-[#D4C3AA]' : 'bg-white/95 border-gray-200',
    text: currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900',
    subtext: currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500',
    iconButton: currentTheme === 'dark' ? 'hover:bg-gray-800 active:bg-gray-700' : 
                currentTheme === 'eyeCare' ? 'hover:bg-[#E8D5BC] active:bg-[#D4C3AA]' : 'hover:bg-gray-100 active:bg-gray-200',
    dropdown: currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 
             currentTheme === 'eyeCare' ? 'bg-[#E8D5BC] border-[#D4C3AA]' : 'bg-white border-gray-200',
    dropdownHover: currentTheme === 'dark' ? 'hover:bg-gray-700' : 
                  currentTheme === 'eyeCare' ? 'hover:bg-[#D4C3AA]' : 'hover:bg-gray-50'
  });

  const themeStyles = getThemeStyles();

  const menuItems = [
    { icon: <BsPin size={16} />, label: 'Pin Chat', action: () => console.log('Pin chat') },
    { icon: <BsBell size={16} />, label: 'Mute Notifications', action: () => console.log('Mute') },
    { icon: <BsArchive size={16} />, label: 'Archive Chat', action: () => console.log('Archive') },
    { icon: <BsTrash size={16} className="text-red-500" />, label: 'Delete Chat', action: () => console.log('Delete') },
  ];

  return (
    <div className={`
      px-2 py-2 border-b backdrop-blur-lg ${themeStyles.header}
      transition-colors duration-200
    `}>
      <div className="flex items-center justify-between">
        {/* User Info with Back Button */}
        <div className="flex items-center gap-2">
          {isMobile && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className={`p-1.5 rounded-full ${themeStyles.iconButton} transition-colors duration-200`}
            >
              <IoChevronBack size={20} className={themeStyles.text} />
            </motion.button>
          )}

          {/* Avatar with Status */}
          <motion.div 
            className="relative cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800
              group-hover:ring-blue-500 transition-all duration-300">
              <img 
                src={chatData.avatar} 
                alt={chatData.name}
                className="w-full h-full object-cover"
              />
            </div>
            {chatData.status === 'online' && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full 
                ring-2 ring-white dark:ring-gray-800 group-hover:ring-offset-1 transition-all duration-300" />
            )}
          </motion.div>

          {/* Name and Status */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className={`font-semibold ${themeStyles.text} flex items-center gap-1.5`}>
                {chatData.name}
                {chatData.verified && (
                  <BsShieldCheck className="text-blue-500" size={15} />
                )}
                <span className="text-xs font-normal bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded-full">
                  Seller
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 text-xs ${themeStyles.subtext}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  chatData.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
                {chatData.typing ? 'typing...' : chatData.status === 'online' ? 'Active now' : chatData.lastSeen}
                <span className="px-1.5 text-gray-300">•</span>
                <span className="text-xs">ID: #1234</span>
              </span>
            </div>
          </div>
        </div>

        {/* More Options Button and Dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowOptions(!showOptions)}
            className={`p-2 rounded-full ${themeStyles.iconButton} transition-colors duration-200`}
          >
            {showOptions ? (
              <IoClose size={20} className={themeStyles.text} />
            ) : (
              <BsThreeDotsVertical size={20} className={themeStyles.text} />
            )}
          </motion.button>

          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`absolute right-0 mt-2 w-56 rounded-xl border shadow-lg ${themeStyles.dropdown}`}
              >
                <div className="py-1">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        item.action();
                        setShowOptions(false);
                      }}
                      className={`w-full px-4 py-2 flex items-center gap-3 ${themeStyles.dropdownHover}
                        ${item.label.includes('Delete') ? 'text-red-500' : themeStyles.text}`}
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader; 