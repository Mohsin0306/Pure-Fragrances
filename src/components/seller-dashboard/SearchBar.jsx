import React, { useState } from 'react';
import { 
  RiSearchLine, 
  RiFilterLine, 
  RiSparklingLine,
  RiLeafLine, 
  RiMoonLine, 
  RiHeartLine, 
  RiFireLine,
  RiVipCrownLine 
} from 'react-icons/ri';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const SearchBar = () => {
  const { currentTheme } = useTheme();
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    { icon: <RiSparklingLine size={18} />, name: 'New' },
    { icon: <RiLeafLine size={18} />, name: 'Fresh' },
    { icon: <RiMoonLine size={18} />, name: 'Night' },
    { icon: <RiHeartLine size={18} />, name: 'Romance' },
    { icon: <RiFireLine size={18} />, name: 'Popular' },
    { icon: <RiVipCrownLine size={18} />, name: 'Luxury' },
  ];

  return (
    <div className={`sticky top-0 z-20 ${
      currentTheme === 'dark' ? 'bg-gray-900/95' 
      : currentTheme === 'eyeCare' ? 'bg-[#F5E6D3]/95'
      : 'bg-white/95'
    } backdrop-blur-md shadow-sm`}>
      <div className="max-w-7xl mx-auto px-3 pt-3 pb-2">
        {/* Search and Filter Row */}
        <div className="flex gap-2 items-center mb-3">
          <motion.div 
            className={`flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full border ${
              currentTheme === 'dark' ? 'bg-gray-800/80 border-gray-700' 
              : currentTheme === 'eyeCare' ? 'bg-[#E6D5BC] border-[#D4C3AA]'
              : 'bg-gray-50/80 border-gray-200'
            } ${searchFocused ? 'ring-2 ring-indigo-500/20' : ''}`}
            animate={{ scale: searchFocused ? 1.01 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <RiSearchLine className={
              currentTheme === 'dark' ? 'text-gray-400' 
              : currentTheme === 'eyeCare' ? 'text-[#433422]'
              : 'text-gray-500'
            } size={18} />
            <input 
              type="text"
              placeholder="Search for perfumes..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full bg-transparent outline-none text-sm ${
                currentTheme === 'dark' ? 'text-white placeholder:text-gray-500' 
                : currentTheme === 'eyeCare' ? 'text-[#433422] placeholder:text-[#433422]/60'
                : 'text-gray-900 placeholder:text-gray-500'
              }`}
            />
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2.5 rounded-full border ${
              currentTheme === 'dark' 
                ? 'bg-gray-800/80 border-gray-700 text-white hover:bg-gray-700' 
                : currentTheme === 'eyeCare' 
                ? 'bg-[#E6D5BC] border-[#D4C3AA] text-[#433422] hover:bg-[#D4C3AA]'
                : 'bg-gray-50/80 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <RiFilterLine size={18} />
          </motion.button>
        </div>

        {/* Categories Row */}
        <div className="overflow-hidden">
          <div 
            className={`flex gap-2 overflow-x-auto ${
              currentTheme === 'dark' 
                ? '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [background:rgb(17,24,39)]' 
                : currentTheme === 'eyeCare' 
                ? '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [background:#F5E6D3]'
                : '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [background:white]'
            }`}
          >
            {categories.map((category, index) => (
              <motion.button
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                  activeCategory === index ? (
                    currentTheme === 'dark'
                      ? 'bg-white text-gray-900'
                      : currentTheme === 'eyeCare'
                      ? 'bg-[#433422] text-[#F5E6D3]'
                      : 'bg-gray-900 text-white'
                  ) : (
                    currentTheme === 'dark'
                      ? 'bg-gray-800/80 hover:bg-gray-700 text-white'
                      : currentTheme === 'eyeCare'
                      ? 'bg-[#E6D5BC] hover:bg-[#D4C3AA] text-[#433422]'
                      : 'bg-gray-50/80 hover:bg-gray-100 text-gray-800'
                  )
                }`}
              >
                {category.icon}
                <span className="text-sm font-medium">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

