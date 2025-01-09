import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  RiNotification3Line,
  RiMessage2Line,
  RiShoppingBagLine,
  RiHeartLine,
  RiMailLine,
  RiSecurePaymentLine,
  RiUserFollowLine,
  RiArrowLeftLine,
} from 'react-icons/ri';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const Alerts = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const { type } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(type || 'all');
  const [localNotifications, setLocalNotifications] = useState([]);

  // Update active tab when route changes
  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type]);

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      if (location.pathname === '/alerts') {
        setActiveTab('all');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location]);

  // Quick access categories
  const categories = [
    {
      id: 'chat',
      label: 'Chat',
      description: 'View messages',
      icon: RiMessage2Line,
      count: 3,
      path: '/alerts/chat',
      color: currentTheme === 'eyeCare' ? 'bg-[#A89078]' : 'bg-blue-500'
    },
    {
      id: 'orders',
      label: 'Orders',
      description: 'Track orders',
      icon: RiShoppingBagLine,
      count: 2,
      path: '/alerts/orders',
      color: currentTheme === 'eyeCare' ? 'bg-[#B59B6D]' : 'bg-purple-500'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      description: 'Updates',
      icon: RiNotification3Line,
      count: 5,
      path: '/alerts/notifications',
      color: currentTheme === 'eyeCare' ? 'bg-[#C1A173]' : 'bg-green-500'
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      description: 'Saved items',
      icon: RiHeartLine,
      count: 4,
      path: '/alerts/wishlist',
      color: currentTheme === 'eyeCare' ? 'bg-[#C17373]' : 'bg-red-500'
    }
  ];

  useEffect(() => {
    // Set sample notifications
    setLocalNotifications([
      {
        id: 1,
        type: 'message',
        title: 'New Message from John',
        message: 'Hey, I have a question about the product...',
        time: '2 minutes ago',
        icon: RiMessage2Line,
        color: currentTheme === 'eyeCare' ? 'bg-[#A89078]' : 'bg-blue-500'
      },
      {
        id: 2,
        type: 'order',
        title: 'Order #12345 Shipped',
        message: 'Your order has been shipped via DHL',
        time: '1 hour ago',
        icon: RiShoppingBagLine,
        color: currentTheme === 'eyeCare' ? 'bg-[#B59B6D]' : 'bg-purple-500'
      },
      {
        id: 3,
        type: 'notification',
        title: 'Price Drop Alert',
        message: 'Items in your wishlist are on sale!',
        time: '2 hours ago',
        icon: RiNotification3Line,
        color: currentTheme === 'eyeCare' ? 'bg-[#C1A173]' : 'bg-green-500'
      },
      {
        id: 4,
        type: 'wishlist',
        title: 'Item Back in Stock',
        message: 'The Nike Air Max is now available',
        time: '3 hours ago',
        icon: RiHeartLine,
        color: currentTheme === 'eyeCare' ? 'bg-[#C17373]' : 'bg-red-500'
      }
    ]);
  }, [currentTheme]);

  // Handle category click
  const handleCategoryClick = (path) => {
    navigate(path);
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    navigate(`/alerts/notifications/${notification.id}`);
  };

  const handleBack = () => {
    navigate('/alerts', { 
      replace: true,
      state: { preserveScroll: true }
    });
  };

  return (
    <div className={`min-h-screen ${
      currentTheme === 'dark' ? 'bg-gray-900 text-white' 
      : currentTheme === 'eyeCare' ? 'bg-[#F5E6D3] text-[#433422]'
      : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button for sub-routes */}
        {location.pathname.split('/').length > 2 && (
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 mb-6 px-3 py-2 rounded-lg transition-all ${
              currentTheme === 'dark' 
                ? 'hover:bg-gray-800' 
                : currentTheme === 'eyeCare'
                ? 'hover:bg-[#D4C3AA]'
                : 'hover:bg-gray-100'
            }`}
          >
            <RiArrowLeftLine size={20} />
            <span>Back to Alerts</span>
          </button>
        )}

        {/* Quick Access Categories */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category.path)}
              className={`relative p-3 md:p-4 rounded-xl transition-all ${
                category.id === type ? (
                  currentTheme === 'dark'
                    ? 'bg-gray-700'
                    : currentTheme === 'eyeCare'
                    ? 'bg-[#D4C3AA]'
                    : 'bg-gray-100'
                ) : (
                  currentTheme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : currentTheme === 'eyeCare'
                    ? 'bg-[#E6D5BC] hover:bg-[#D4C3AA]'
                    : 'bg-white hover:bg-gray-50'
                )
              } shadow-sm`}
            >
              {category.count > 0 && (
                <span className={`absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs font-bold rounded-full text-white ${category.color}`}>
                  {category.count}
                </span>
              )}
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <category.icon size={20} className="md:text-2xl" />
                <div className="text-center">
                  <span className="text-xs md:text-sm font-medium block">{category.label}</span>
                  <span className="hidden md:block text-xs opacity-75">{category.description}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Recent Activities Section */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold">Recent Activities</h2>
            <button 
              onClick={() => setLocalNotifications([])}
              className={`px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm rounded-lg transition-all ${
                currentTheme === 'dark' 
                  ? 'hover:bg-gray-800' 
                  : currentTheme === 'eyeCare'
                  ? 'hover:bg-[#D4C3AA]'
                  : 'hover:bg-gray-100'
              }`}
            >
              Clear All
            </button>
          </div>

          <AnimatePresence>
            {localNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                onClick={() => handleNotificationClick(notification)}
                className={`p-3 md:p-4 rounded-xl cursor-pointer transition-all ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : currentTheme === 'eyeCare'
                    ? 'bg-[#E6D5BC] hover:bg-[#D4C3AA]'
                    : 'bg-white hover:bg-gray-50'
                } shadow-sm`}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`p-2 rounded-lg ${notification.color}`}>
                    <notification.icon size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-medium">{notification.title}</h3>
                    <p className="text-xs md:text-sm opacity-75 line-clamp-2">{notification.message}</p>
                    <span className="text-xs opacity-60">{notification.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Alerts; 