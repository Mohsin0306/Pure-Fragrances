import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiHome4Line,
  RiStore2Line,
  RiPriceTag3Line,
  RiShoppingCartLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiSettings4Line,
  RiUser3Line,
  RiLogoutBoxRLine,
  RiDashboardLine,
  RiSunLine,
  RiMoonLine,
  RiEyeLine,
  RiNotificationLine,
  RiArrowDownSLine,
  RiFlowerLine,
  RiFireLine,
  RiDropLine,
  RiVipCrownLine,
  RiLeafLine,
  RiLayoutGridLine,
} from 'react-icons/ri';
import { useTheme } from '../../context/ThemeContext';
import { themes } from '../../context/ThemeContext';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('/');
  const location = useLocation();
  const navigate = useNavigate();
  const { currentTheme, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMobileProfile, setShowMobileProfile] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
    }
  }, [location.pathname, isMobile]);

  const categories = [
    {
      name: "Floral Fragrances",
      icon: <RiFlowerLine size={18} />,
      path: "/categories/floral"
    },
    {
      name: "Oriental & Spicy",
      icon: <RiFireLine size={18} />,
      path: "/categories/oriental"
    },
    {
      name: "Fresh & Citrus",
      icon: <RiDropLine size={18} />,
      path: "/categories/fresh"
    },
    {
      name: "Luxury Collection",
      icon: <RiVipCrownLine size={18} />,
      path: "/categories/luxury"
    },
    {
      name: "Night Collection",
      icon: <RiMoonLine size={18} />,
      path: "/categories/night"
    },
    {
      name: "Natural & Organic",
      icon: <RiLeafLine size={18} />,
      path: "/categories/natural"
    }
  ];

  const menuItems = [
    { name: 'Dashboard', icon: <RiDashboardLine />, path: '/' },
    { 
      name: 'Categories', 
      icon: <RiLayoutGridLine />, 
      path: '/categories',
      hasDropdown: true,
      onClick: () => handleCategoryClick('/categories')
    },
    { path: '/products', name: 'Products', icon: <RiStore2Line /> },
    { path: '/cart', name: 'Orders', icon: <RiShoppingCartLine /> },
  ];

  const bottomMenuItems = [
    { path: '/settings', name: 'Settings', icon: <RiSettings4Line /> },
    { path: '/profile', name: 'Profile', icon: <RiUser3Line /> },
  ];

  // Profile menu items
  const profileMenuItems = [
    { name: 'Profile', icon: RiUser3Line, path: '/profile' },
    { name: 'Settings', icon: RiSettings4Line, path: '/settings' },
    { name: 'Login', icon: RiLogoutBoxRLine, onClick: () => navigate('/login') },
  ];

  // Animation variants
  const sidebarVariants = {
    expanded: {
      width: 240,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    collapsed: {
      width: 64,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    mobileExpanded: {
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    mobileCollapsed: {
      x: -240,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const getThemeStyles = (element) => {
    switch (currentTheme) {
      case 'dark':
        return themes.dark[element];
      case 'eyeCare':
        return themes.eyeCare[element];
      default:
        return themes.light[element];
    }
  };

  // Mobile Navbar Component with improved theme support
  const MobileNavbar = () => (
    <motion.div
      initial={false}
      animate={{
        backdropFilter: isExpanded ? "blur(8px)" : "blur(0px)",
        backgroundColor: isExpanded 
          ? currentTheme === 'dark' 
            ? 'rgba(17, 24, 39, 0.85)'
            : currentTheme === 'eyeCare'
            ? 'rgba(245, 230, 200, 0.85)'
            : 'rgba(255, 255, 255, 0.85)'
          : currentTheme === 'dark'
            ? 'rgb(17, 24, 39)'
            : currentTheme === 'eyeCare'
            ? 'rgb(245, 230, 200)'
            : 'rgb(255, 255, 255)'
      }}
      transition={{ duration: 0.2 }}
      className={`w-full px-4 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50
        ${currentTheme === 'dark' 
          ? 'border-gray-800 text-gray-100' 
          : currentTheme === 'eyeCare'
          ? 'border-[#E6D5B8] text-[#433422]'
          : 'border-gray-200 text-gray-900'
        } border-b shadow-sm`}
    >
      <div className="flex items-center gap-3">
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className={`p-2 rounded-md transition-all duration-200 ${
              currentTheme === 'dark' 
                ? 'hover:bg-gray-800 text-gray-400' 
                : currentTheme === 'eyeCare'
                ? 'hover:bg-[#E6D5B8] text-[#433422]'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <RiMenuUnfoldLine size={20} />
          </button>
        )}
        <span className="font-medium">Store Admin</span>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => toggleTheme(
            currentTheme === 'light' ? 'dark' 
            : currentTheme === 'dark' ? 'eyeCare' 
            : 'light'
          )}
          className={`p-2 rounded-md transition-all duration-200 ${
            currentTheme === 'dark' 
              ? 'bg-gray-800 text-gray-400' 
              : currentTheme === 'eyeCare'
              ? 'bg-[#E6D5B8] text-[#433422]'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {currentTheme === 'dark' ? <RiMoonLine size={18} />
            : currentTheme === 'light' ? <RiSunLine size={18} />
            : <RiEyeLine size={18} />}
        </button>
        
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
              currentTheme === 'dark'
                ? 'bg-gradient-to-br from-white to-gray-200'
                : 'bg-gradient-to-br from-gray-800 to-black'
            }`}
          >
            <span className={`text-sm font-medium ${
              currentTheme === 'dark' ? 'text-gray-900' : 'text-white'
            }`}>A</span>
          </button>

          <AnimatePresence>
            {showProfileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 z-50
                  ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                  border ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className={`px-4 py-2 border-b ${
                  currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <p className={`text-sm font-medium ${
                    currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Admin User</p>
                  <p className={`text-xs ${
                    currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>admin@example.com</p>
                </div>
                {profileMenuItems.map((item, index) => (
                  <div key={index}>
                    {item.path ? (
                      <Link
                        to={item.path}
                        className={`flex items-center px-4 py-2 text-sm ${
                          currentTheme === 'dark' 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className={`w-full flex items-center px-4 py-2 text-sm ${
                          currentTheme === 'dark' 
                            ? 'text-red-400 hover:bg-gray-700' 
                            : 'text-red-600 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.name}
                      </button>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

  // Sidebar header with persistent admin name
  const SidebarHeader = () => (
    <div className="p-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          currentTheme === 'dark'
            ? 'bg-gradient-to-br from-white to-gray-200'
            : 'bg-gradient-to-br from-gray-800 to-black'
        }`}>
          <span className={`font-semibold ${
            currentTheme === 'dark' ? 'text-gray-900' : 'text-white'
          }`}>A</span>
        </div>
        <div className="overflow-hidden">
          <motion.div
            animate={{ width: isExpanded ? 'auto' : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="whitespace-nowrap overflow-hidden"
          >
            <span className={`font-semibold ${
              currentTheme === 'dark' ? 'text-white' 
              : currentTheme === 'eyeCare' ? 'text-[#433422]'
              : 'text-gray-900'
            }`}>
              Store Admin
            </span>
          </motion.div>
        </div>
      </div>
      {isMobile && isExpanded ? (
        <button
          onClick={() => setIsExpanded(false)}
          className={`p-2 rounded-md transition-all duration-200 ${
            currentTheme === 'dark' 
              ? 'hover:bg-gray-800 text-gray-400' 
              : currentTheme === 'eyeCare'
              ? 'hover:bg-[#E6D5B8] text-[#433422]'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <RiMenuFoldLine size={20} />
        </button>
      ) : (
        isExpanded && !isMobile && (
          <button
            onClick={() => toggleTheme(
              currentTheme === 'light' ? 'dark' 
              : currentTheme === 'dark' ? 'eyeCare' 
              : 'light'
            )}
            className={`p-2 rounded-md transition-all duration-200 ${
              currentTheme === 'dark' 
                ? 'bg-gray-800 text-gray-400' 
                : currentTheme === 'eyeCare'
                ? 'bg-[#E6D5B8] text-[#433422]'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {currentTheme === 'dark' ? <RiMoonLine size={18} />
              : currentTheme === 'light' ? <RiSunLine size={18} />
              : <RiEyeLine size={18} />}
          </button>
        )
      )}
    </div>
  );

  // Profile dropdown with improved theme support
  const ProfileDropdown = () => (
    <AnimatePresence>
      {showProfileDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 z-50
            ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' 
            : currentTheme === 'eyeCare' ? 'bg-[#F5E6C8] border-[#E6D5B8]'
            : 'bg-white border-gray-200'}
            border`}
        >
          <div className={`px-4 py-2 border-b ${
            currentTheme === 'dark' ? 'border-gray-700' 
            : currentTheme === 'eyeCare' ? 'border-[#E6D5B8]'
            : 'border-gray-200'
          }`}>
            <p className={`text-sm font-medium ${
              currentTheme === 'dark' ? 'text-white' 
              : currentTheme === 'eyeCare' ? 'text-[#433422]'
              : 'text-gray-900'
            }`}>Admin User</p>
            <p className={`text-xs ${
              currentTheme === 'dark' ? 'text-gray-400' 
              : currentTheme === 'eyeCare' ? 'text-[#433422]/70'
              : 'text-gray-500'
            }`}>admin@example.com</p>
          </div>
          {profileMenuItems.map((item, index) => (
            <div key={index}>
              <Link
                to={item.path || '#'}
                onClick={!item.path ? item.onClick : undefined}
                className={`flex items-center px-4 py-2 text-sm ${
                  item.path 
                    ? currentTheme === 'dark' 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : currentTheme === 'eyeCare'
                      ? 'text-[#433422] hover:bg-[#E6D5B8]/50'
                      : 'text-gray-700 hover:bg-gray-100'
                    : currentTheme === 'dark'
                    ? 'text-red-400 hover:bg-gray-700'
                    : currentTheme === 'eyeCare'
                    ? 'text-red-600 hover:bg-[#E6D5B8]/50'
                    : 'text-red-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.name}
              </Link>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Desktop sidebar toggle button with adjusted position
  const DesktopToggle = () => (
    !isMobile && (
      <motion.button
        initial={false}
        animate={{
          left: isExpanded ? 220 : 44,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
          }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`fixed top-8 p-1.5 rounded-full
          ${currentTheme === 'dark'
            ? 'bg-gray-800 text-gray-400 hover:text-white border-gray-700'
            : currentTheme === 'eyeCare'
            ? 'bg-[#F5E6C8] text-[#433422] hover:text-[#433422] border-[#E6D5B8]'
            : 'bg-white text-gray-600 hover:text-gray-900 border-gray-200'
          }
          border shadow-md z-50`}
      >
        {isExpanded ? <RiMenuFoldLine size={14} /> : <RiMenuUnfoldLine size={14} />}
      </motion.button>
    )
  );

  const handleCategoryClick = (path, isDropdownItem = false) => {
    if (!isDropdownItem) {
      // Main category button click
      setShowCategoryDropdown(!showCategoryDropdown);
    } else {
      // Dropdown item click
      setShowCategoryDropdown(false);
      navigate(path);
      window.location.reload(); // Force reload on category selection
      if (isMobile) {
        setIsExpanded(false);
      }
    }
  };

  const getScrollbarStyle = () => {
    if (currentTheme === 'dark') {
      return `
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        ::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `;
    } else if (currentTheme === 'eyeCare') {
      return `
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #F5E6D3;
        }
        ::-webkit-scrollbar-thumb {
          background: #D4C3AA;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #433422;
        }
      `;
    } else {
      return `
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        ::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `;
    }
  };

  return (
    <>
      <style>
        {getScrollbarStyle()}
      </style>
      
      {isMobile && <MobileNavbar />}
      
      <AnimatePresence>
        {isMobile && isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key="sidebar"
          initial={false}
          animate={isMobile ? 
            (isExpanded ? { x: 0 } : { x: -280 }) :
            {
              width: isExpanded ? 240 : 64,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8
              }
            }
          }
          style={{
            width: isMobile ? 280 : undefined
          }}
          transition={isMobile ? {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8
          } : undefined}
          className={`fixed top-0 left-0 h-screen flex flex-col border-r z-50
            ${getThemeStyles('sidebar')}
            ${getThemeStyles('border')}
            ${getThemeStyles('transition')}
          `}
        >
          <SidebarHeader />
          {/* Menu Items */}
          <div className="flex-1 py-4 overflow-y-auto">
            <div className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
              {menuItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.hasDropdown ? (
                    <div className="flex flex-col">
                      <div className="flex">
                        <Link 
                          to={item.path}
                          className={`flex-grow w-[70%] flex items-center gap-3 px-3 py-2.5 rounded-l-lg transition-all duration-200
                            ${activeItem === item.path
                              ? currentTheme === 'dark'
                                ? 'bg-gradient-to-r from-white to-gray-200 text-gray-900 shadow-md'
                                : 'bg-gradient-to-r from-gray-800 to-black text-white shadow-md'
                              : currentTheme === 'dark'
                              ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                              : currentTheme === 'eyeCare'
                              ? 'text-[#433422] hover:bg-[#E6D5B8]'
                              : 'text-gray-600 hover:bg-gray-100'
                            }
                          `}
                        >
                          <span className="text-xl">{item.icon}</span>
                          {isExpanded && (
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="font-medium text-sm"
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </Link>

                        {isExpanded && (
                          <button 
                            onClick={handleCategoryClick}
                            className={`dropdown-trigger w-[30%] flex items-center justify-center rounded-r-lg transition-all duration-200
                              ${activeItem === item.path
                                ? currentTheme === 'dark'
                                  ? 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-900'
                                  : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white'
                                : currentTheme === 'dark'
                                ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                : currentTheme === 'eyeCare'
                                ? 'text-[#433422] hover:bg-[#E6D5B8]'
                                : 'text-gray-600 hover:bg-gray-100'
                              }
                            `}
                          >
                            <RiArrowDownSLine 
                              className={`transform transition-transform duration-200 ${
                                showCategoryDropdown ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                        )}
                      </div>

                      {/* Categories Dropdown */}
                      {showCategoryDropdown && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-1 ml-2 space-y-1"
                        >
                          {categories.map((category) => (
                            <button
                              key={category.path}
                              onClick={() => handleCategoryClick(category.path, true)}
                              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200
                                ${currentTheme === 'dark'
                                  ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                  : currentTheme === 'eyeCare'
                                  ? 'text-[#433422] hover:bg-[#E6D5B8]'
                                  : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                              {category.icon}
                              <span className="font-medium">{category.name}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link 
                      to={item.path}
                      onClick={() => isMobile && setIsExpanded(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                        ${activeItem === item.path
                          ? currentTheme === 'dark'
                            ? 'bg-gradient-to-r from-white to-gray-200 text-gray-900 shadow-md'
                            : 'bg-gradient-to-r from-gray-800 to-black text-white shadow-md'
                          : currentTheme === 'dark'
                          ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          : currentTheme === 'eyeCare'
                          ? 'text-[#433422] hover:bg-[#E6D5B8]'
                          : 'text-gray-600 hover:bg-gray-100'
                        }
                        ${!isExpanded && 'justify-center'}
                      `}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <AnimatePresence mode="wait">
                        {isExpanded && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="font-medium text-sm"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Settings Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 px-3 pt-6 border-t ${
                currentTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
              }`}
            >
              {[
                { name: 'Profile', icon: RiUser3Line, path: '/profile' },
                { name: 'Settings', icon: RiSettings4Line, path: '/settings' },
                { name: 'Notifications', icon: RiNotificationLine, path: '/alerts' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-200
                      ${currentTheme === 'dark'
                        ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                      }
                      ${!isExpanded && 'justify-center'}
                    `}
                  >
                    <span className="text-xl"><item.icon /></span>
                    {isExpanded && (
                      <span className="font-medium text-sm">{item.name}</span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Logout Button */}
            <div className={`px-3 py-4 mt-auto border-t ${
              currentTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => console.log('logout')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                  ${currentTheme === 'dark'
                    ? 'text-red-400 hover:bg-gray-800'
                    : 'text-red-600 hover:bg-gray-100'
                  }
                  ${!isExpanded && 'justify-center'}
                `}
              >
                <RiLogoutBoxRLine size={20} />
                {isExpanded && (
                  <span className="font-medium text-sm">Logout</span>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <DesktopToggle />

      {/* Main Content Wrapper */}
      <motion.div
        initial={false}
        animate={{
          marginLeft: isMobile ? 0 : (isExpanded ? 240 : 64),
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }
        }}
        className={`min-h-screen ${isMobile ? 'pt-[60px]' : ''}`}
      >
        <div className={`h-full ${
          currentTheme === 'dark' ? 'bg-gray-900' 
          : currentTheme === 'light' ? 'bg-gray-50'
          : 'bg-[#F5E6D3]'
        }`}>
          <div className="h-full">
            {/* Dashboard content */}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
