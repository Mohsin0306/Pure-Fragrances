import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useSidebar } from '../../context/SidebarContext';
import {
  RiShoppingCartLine,
  RiShoppingCartFill,
  RiNotification3Line,
  RiNotification3Fill,
  RiMapPinLine,
  RiMapPinFill,
  RiWallet3Line,
  RiWallet3Fill,
  RiUser3Line,
  RiUser3Fill,
  RiHeartLine,
  RiHeartFill,
  RiArrowDownSLine,
  RiStore2Line,
  RiStore2Fill,
  RiSettings4Line,
  RiLogoutBoxRLine,
} from 'react-icons/ri';

const Header = () => {
  const { currentTheme } = useTheme();
  const { isExpanded } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [lastAlertsRoute, setLastAlertsRoute] = useState('/alerts');
  const [lastVisitedRoute, setLastVisitedRoute] = useState('/alerts');

  // Track route changes
  useEffect(() => {
    if (location.pathname.startsWith('/alerts')) {
      setLastVisitedRoute(location.pathname);
    }
  }, [location.pathname]);

  const profileMenuItems = [
    { name: 'Profile', icon: RiUser3Line, path: '/profile' },
    { name: 'Settings', icon: RiSettings4Line, path: '/settings' },
    { name: 'Logout', icon: RiLogoutBoxRLine, onClick: () => console.log('logout') },
  ];

  const isNotificationRoute = (path) => {
    return path.startsWith('/alerts');
  };

  const isProductRoute = (path) => {
    return path.startsWith('/product') || path.startsWith('/products');
  };

  const isHomeActive = (currentPath) => {
    // Check if the URL has a 'from=cart' parameter
    const searchParams = new URLSearchParams(window.location.search);
    const fromCart = searchParams.get('from') === 'cart';

    // Only return true for home and product routes if we didn't come from cart
    return (currentPath === '/' || (isProductRoute(currentPath) && !fromCart));
  };

  const isCartActive = (currentPath) => {
    // Check if the URL has a 'from=cart' parameter
    const searchParams = new URLSearchParams(window.location.search);
    const fromCart = searchParams.get('from') === 'cart';

    // Return true for cart page and product routes that came from cart
    return currentPath === '/cart' || (isProductRoute(currentPath) && fromCart);
  };

  const handleNavigation = (path) => {
    const currentPath = location.pathname;

    if (path === currentPath) {
      // If clicking the same route, reload the page
      navigate(path, { replace: true });
      window.location.reload();
    } else if (path === '/alerts') {
      // For alerts navigation
      if (currentPath.startsWith('/alerts/')) {
        // If we're in a sub-route, store it
        setLastAlertsRoute(currentPath);
      }
      // Navigate to the last visited alerts route
      navigate(lastVisitedRoute, { 
        replace: true,
        state: { preserveScroll: true }
      });
    } else {
      // For other routes
      if (currentPath.startsWith('/alerts/')) {
        setLastAlertsRoute(currentPath);
      }
      navigate(path, { 
        replace: true,
        state: { preserveScroll: true }
      });
    }
  };

  const isAlertRoute = (path) => {
    return path.startsWith('/alerts');
  };

  // Update the mobile navigation array
  const mobileNavItems = [
    { 
      path: '/', 
      icon: RiStore2Line, 
      activeIcon: RiStore2Fill, 
      label: 'Home',
      isActive: (path) => isHomeActive(path)
    },
    { 
      path: '/cart', 
      icon: RiShoppingCartLine, 
      activeIcon: RiShoppingCartFill, 
      label: 'Cart',
      isActive: (path) => isCartActive(path)
    },
    { 
      path: '/alerts', 
      icon: RiNotification3Line, 
      activeIcon: RiNotification3Fill, 
      label: 'Alerts',
      isActive: (path) => isAlertRoute(path)
    },
    { 
      path: '/profile', 
      icon: RiUser3Line, 
      activeIcon: RiUser3Fill, 
      label: 'Profile',
      isActive: (path) => path === '/profile'
    },
  ];

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className={`fixed top-0 left-0 right-0 z-30 border-b transition-all duration-300 ${
          currentTheme === 'dark' 
            ? 'bg-gray-900/80 backdrop-blur-xl border-gray-800' 
            : currentTheme === 'eyeCare' 
            ? 'bg-[#F5E6D3]/80 backdrop-blur-xl border-[#E6D5BC]'
            : 'bg-white/80 backdrop-blur-xl border-gray-100'
        }`}>
          <div className={`transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-20'}`}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="h-16 flex items-center justify-between gap-8">
                {/* Logo */}
                <AnimatePresence>
                  {!isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <RiStore2Line size={24} className="text-purple-500" />
                      <span className="text-xl font-serif italic">Essence</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Center Title */}
                <div className={`flex-1 flex items-center justify-center transition-all duration-300 ${
                  isExpanded ? '-ml-20' : 'ml-0'
                }`}>
                  <div className={`px-12 py-2 relative ${
                    currentTheme === 'dark' 
                      ? 'text-gray-300' 
                      : currentTheme === 'eyeCare'
                      ? 'text-[#433422]'
                      : 'text-gray-600'
                  }`}>
                    <div className="absolute left-0 top-1/2 w-8 h-[1px] bg-current transform -translate-y-1/2" />
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="font-serif italic text-lg">Luxury Fragrances</span>
                      <span className="text-[10px] tracking-[0.3em] uppercase font-light">
                        Exclusive Collection
                      </span>
                    </div>
                    <div className="absolute right-0 top-1/2 w-8 h-[1px] bg-current transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                  {/* Action buttons with hover effects */}
                  {[
                    { icon: RiMapPinLine, activeIcon: RiMapPinFill, path: '/locations' },
                    { icon: RiWallet3Line, activeIcon: RiWallet3Fill, path: '/wallet' },
                    { icon: RiHeartLine, activeIcon: RiHeartFill, path: '/wishlist' },
                    { icon: RiNotification3Line, activeIcon: RiNotification3Fill, path: '/alerts' },
                    { icon: RiShoppingCartLine, activeIcon: RiShoppingCartFill, path: '/cart' },
                  ].map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className={`p-2 rounded-full transition-all ${
                        currentTheme === 'dark' 
                          ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                          : currentTheme === 'eyeCare' 
                          ? 'text-[#433422] hover:text-[#433422] hover:bg-[#E6D5BC]'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {isNotificationRoute(location.pathname) && item.path === '/alerts'
                        ? <item.activeIcon size={20} />
                        : location.pathname === item.path 
                        ? <item.activeIcon size={20} />
                        : <item.icon size={20} />}
                    </Link>
                  ))}

                  <div className="h-5 w-px bg-gray-200 dark:bg-gray-700 mx-1" />

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                      className={`flex items-center gap-2 p-2 rounded-full transition-all ${
                        currentTheme === 'dark' 
                          ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                          : currentTheme === 'eyeCare' 
                          ? 'text-[#433422] hover:text-[#433422] hover:bg-[#E6D5BC]'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {location.pathname === '/profile' ? <RiUser3Fill size={20} /> : <RiUser3Line size={20} />}
                      <RiArrowDownSLine size={16} className={`transform transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {showProfileDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-1 z-50
                            ${currentTheme === 'dark' 
                              ? 'bg-gray-800 border-gray-700' 
                              : currentTheme === 'eyeCare' 
                              ? 'bg-[#F5E6C8] border-[#E6D5B8]'
                              : 'bg-white border-gray-200'
                            } border`}
                        >
                          <div className={`px-4 py-2 border-b ${
                            currentTheme === 'dark' 
                              ? 'border-gray-700' 
                              : currentTheme === 'eyeCare' 
                              ? 'border-[#E6D5B8]'
                              : 'border-gray-200'
                          }`}>
                            <p className={`text-sm font-medium ${
                              currentTheme === 'dark' 
                                ? 'text-white' 
                                : currentTheme === 'eyeCare' 
                                ? 'text-[#433422]'
                                : 'text-gray-900'
                            }`}>Admin User</p>
                            <p className={`text-xs ${
                              currentTheme === 'dark' 
                                ? 'text-gray-400' 
                                : currentTheme === 'eyeCare' 
                                ? 'text-[#433422]/70'
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="block md:hidden">
        <div className={`fixed bottom-0 left-0 right-0 z-50 border-t ${
          currentTheme === 'dark' 
            ? 'bg-gray-900/80 backdrop-blur-xl border-gray-800' 
            : currentTheme === 'eyeCare' 
            ? 'bg-[#F5E6D3]/80 backdrop-blur-xl border-[#E6D5BC]'
            : 'bg-white/80 backdrop-blur-xl border-gray-100'
        }`}>
          <div className="flex items-center justify-around h-16">
            {mobileNavItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center p-2 ${
                  currentTheme === 'dark' 
                    ? 'text-gray-400 hover:text-white' 
                    : currentTheme === 'eyeCare'
                    ? 'text-[#433422] hover:text-[#433422]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.isActive(location.pathname)
                  ? <item.activeIcon size={24} className={
                      currentTheme === 'dark' 
                        ? 'text-white' 
                        : currentTheme === 'eyeCare'
                        ? 'text-[#433422]'
                        : 'text-gray-900'
                    } />
                  : <item.icon size={24} />}
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header; 