import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { BsChatSquareText } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import ChatList from './ChatList';

const ChatSidebar = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getThemeStyles = () => ({
    container: currentTheme === 'dark' ? 'bg-gray-900' : 
              currentTheme === 'eyeCare' ? 'bg-[#F5E6D3]' : 'bg-white',
    input: currentTheme === 'dark' ? 'bg-gray-800 border-gray-700 focus:border-gray-600' : 
           currentTheme === 'eyeCare' ? 'bg-[#F5E6D3] border-[#D4C3AA]' : 'bg-gray-50 border-gray-200',
    buttonHover: currentTheme === 'dark' ? 'hover:bg-gray-700/50' : 
                 currentTheme === 'eyeCare' ? 'hover:bg-[#D4C3AA]' : 'hover:bg-gray-100',
    iconHover: currentTheme === 'dark' ? 'hover:bg-gray-700' : 
               currentTheme === 'eyeCare' ? 'hover:bg-[#D4C3AA]' : 'hover:bg-gray-100'
  });

  const themeStyles = getThemeStyles();

  const filters = [
    { id: 'all', label: 'All', count: 24 },
    { id: 'unread', label: 'Unread', count: 12 },
    { id: 'archived', label: 'Archived', count: 8 }
  ];

  const filterVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      marginTop: 0
    },
    visible: { 
      opacity: 1,
      height: 'auto',
      marginTop: 12,
      transition: {
        height: {
          type: "spring",
          stiffness: 500,
          damping: 40,
          mass: 1
        },
        opacity: {
          duration: 0.2
        }
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      transition: {
        height: {
          duration: 0.2
        },
        opacity: {
          duration: 0.15
        }
      }
    }
  };

  return (
    <div className={`h-full flex flex-col ${themeStyles.container}`}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 md:py-6 border-b dark:border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <BsChatSquareText className="text-blue-500" size={24} />
            <div>
              <h1 className="text-xl font-semibold">Messages</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">12 unread messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="p-4 space-y-3">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <IoSearchOutline 
            className="absolute left-3 text-gray-400 dark:text-gray-500" 
            size={20} 
          />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-12 py-2.5 rounded-lg ${themeStyles.input} 
              border focus:ring-1 focus:ring-blue-500/50 focus:outline-none 
              transition-colors placeholder-gray-400 dark:placeholder-gray-500`}
          />
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`absolute right-2 p-1.5 rounded-md transition-all duration-200
              ${isFilterOpen 
                ? 'bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-600' 
                : `text-gray-400 dark:text-gray-500 ${themeStyles.iconHover}`
              }`}
          >
            <HiOutlineAdjustmentsHorizontal size={20} />
          </button>
        </div>

        {/* Filter Pills with improved animation */}
        <AnimatePresence initial={false}>
          {isFilterOpen && (
            <motion.div
              variants={filterVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden"
            >
              <div className="grid grid-cols-3 gap-2">
                {filters.map((filter) => (
                  <motion.button
                    key={filter.id}
                    onClick={() => setActiveTab(filter.id)}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                      transition-all duration-200 ${
                      filter.id === activeTab 
                        ? 'bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-600 scale-[0.98]' 
                        : `${themeStyles.buttonHover} text-gray-600 dark:text-gray-300`
                      }`}
                    whileHover={{ scale: filter.id === activeTab ? 0.98 : 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-sm font-medium whitespace-nowrap">{filter.label}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      filter.id === activeTab 
                        ? 'bg-blue-400/30 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {filter.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full pb-16 md:pb-0 overflow-y-auto">
          <ChatList 
            searchTerm={searchTerm} 
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
