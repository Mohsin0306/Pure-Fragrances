import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  RiHeartLine,
  RiSearchLine,
  RiFilterLine,
  RiShoppingCartLine,
  RiDeleteBinLine,
  RiPriceTag3Line,
  RiStarLine,
  RiHeartFill,
  RiInboxUnarchiveLine
} from 'react-icons/ri';

const Wishlist = () => {
  const { currentTheme } = useTheme();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState('all');

  const getThemeStyles = () => ({
    background: currentTheme === 'dark' ? 'bg-gray-900' 
      : currentTheme === 'eyeCare' ? 'bg-[#F5E6D3]' 
      : 'bg-gray-50',
    text: currentTheme === 'dark' ? 'text-white' 
      : currentTheme === 'eyeCare' ? 'text-[#433422]' 
      : 'text-gray-900',
    card: currentTheme === 'dark' ? 'bg-gray-800' 
      : currentTheme === 'eyeCare' ? 'bg-[#E6D5BC]' 
      : 'bg-white',
    border: currentTheme === 'dark' ? 'border-gray-700' 
      : currentTheme === 'eyeCare' ? 'border-[#D4C3AA]' 
      : 'border-gray-200',
    button: currentTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' 
      : currentTheme === 'eyeCare' ? 'bg-[#C1A173] hover:bg-[#B39164]' 
      : 'bg-white hover:bg-gray-50',
  });

  const styles = getThemeStyles();

  // Mock wishlist data
  useEffect(() => {
    const mockWishlist = [
      {
        id: 1,
        name: 'Premium Leather Wallet',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        rating: 4.5,
        inStock: true,
        category: 'Accessories'
      },
      {
        id: 2,
        name: 'Wireless Headphones',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        rating: 4.8,
        inStock: true,
        category: 'Electronics'
      },
      {
        id: 3,
        name: 'Smart Watch Series 5',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        rating: 4.7,
        inStock: false,
        category: 'Electronics'
      }
    ];

    setTimeout(() => {
      setWishlistItems(mockWishlist);
      setLoading(false);
    }, 1000);
  }, []);

  const getTextColor = (type = 'primary') => {
    switch(type) {
      case 'primary':
        return currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900';
      case 'secondary':
        return currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700';
      case 'tertiary':
        return currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500';
      default:
        return currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen p-3 md:p-6 ${styles.background}`}
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2.5 rounded-xl ${styles.card} ${styles.border} shadow-sm`}>
            <RiHeartLine className={`w-5 h-5 ${getTextColor('primary')}`} />
          </div>
          <div>
            <h1 className={`text-xl md:text-2xl font-bold ${getTextColor('primary')}`}>
              My Wishlist
            </h1>
            <p className={`text-xs md:text-sm ${getTextColor('tertiary')}`}>
              Keep track of items you want to purchase later
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="flex gap-2 w-full">
            <div className="relative flex-1">
              <RiSearchLine className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${getTextColor('tertiary')}`} />
              <input
                type="text"
                placeholder="Search wishlist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border ${styles.border} ${styles.card}
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${getTextColor('primary')}`}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`px-3 py-2 rounded-xl border ${styles.border} ${styles.button}
                flex items-center justify-center gap-1.5 min-w-[90px]`}
            >
              <RiFilterLine className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </motion.button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`w-full rounded-xl border ${styles.border} ${styles.card} overflow-hidden`}
              >
                <div className="p-3">
                  <div className="flex flex-wrap gap-2">
                    {['All', 'In Stock', 'Electronics', 'Accessories'].map((type) => (
                      <motion.button
                        key={type}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFilter(type.toLowerCase())}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-colors duration-200
                          ${filter === type.toLowerCase() 
                            ? 'bg-blue-500 text-white' 
                            : `${styles.button} border ${styles.border} ${getTextColor('secondary')}`
                          }`}
                      >
                        {type}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Updated Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          // Loading Skeletons
          [...Array(6)].map((_, i) => (
            <div key={i} className={`animate-pulse rounded-xl ${styles.card} ${styles.border} p-4`}>
              <div className="w-full h-48 bg-gray-300 rounded-lg mb-4" />
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
          ))
        ) : wishlistItems.length === 0 ? (
          // Empty State
          <div className={`col-span-full py-12 text-center ${styles.card} rounded-xl border ${styles.border}`}>
            <RiHeartLine className={`mx-auto h-12 w-12 ${getTextColor('tertiary')}`} />
            <h3 className={`mt-4 text-lg font-medium ${getTextColor('primary')}`}>
              Your wishlist is empty
            </h3>
            <p className={`mt-2 ${getTextColor('tertiary')}`}>
              Start adding items you'd like to purchase later
            </p>
          </div>
        ) : (
          // Updated Wishlist Items
          wishlistItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl ${styles.card} ${styles.border}
                hover:shadow-lg transition-all duration-300`}
            >
              {/* Card Header with Actions */}
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                {/* Persistent Action Buttons */}
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-full ${styles.card} shadow-md
                      border ${styles.border} text-red-500 hover:bg-red-50
                      ${currentTheme === 'dark' ? 'hover:bg-red-500/10' : ''}`}
                  >
                    <RiDeleteBinLine className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-full ${styles.card} shadow-md
                      border ${styles.border} text-blue-500 hover:bg-blue-50
                      ${currentTheme === 'dark' ? 'hover:bg-blue-500/10' : ''}`}
                  >
                    <RiShoppingCartLine className="w-4 h-4" />
                  </motion.button>
                </div>
                {/* Stock Status Badge */}
                <div className="absolute bottom-2 left-2">
                  <span className={`text-xs px-2 py-1 rounded-full 
                    ${item.inStock 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'}
                    ${currentTheme === 'dark' 
                      ? item.inStock 
                        ? 'bg-green-500/20' 
                        : 'bg-red-500/20'
                      : ''}`}
                  >
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className={`font-medium ${getTextColor('primary')} line-clamp-1`}>
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <RiStarLine className="w-4 h-4 text-yellow-400" />
                    <span className={`text-sm ${getTextColor('secondary')}`}>
                      {item.rating}
                    </span>
                  </div>
                </div>

                {/* Price and Category */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RiPriceTag3Line className={`w-4 h-4 ${getTextColor('tertiary')}`} />
                    <span className={`font-medium ${getTextColor('primary')}`}>
                      ${item.price}
                    </span>
                  </div>
                  <span className={`text-xs ${getTextColor('tertiary')}`}>
                    {item.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add some bottom spacing for mobile */}
      <div className="h-16 md:h-0" />
    </motion.div>
  );
};

export default Wishlist; 