// frontend/src/components/seller-dashboard/Orders.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  RiFileList3Line,
  RiSearchLine,
  RiFilterLine,
  RiSortAsc,
  RiCheckboxCircleLine,
  RiTimeLine,
  RiTruckLine,
  RiCloseLine,
  RiMoneyDollarCircleLine,
  RiCalendarEventLine,
  RiUserLine,
  RiMapPinLine,
  RiArrowRightLine,
  RiShoppingBag3Line
} from 'react-icons/ri';

const Orders = () => {
  const { currentTheme } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);

  // Smoother animation variants
  const filterPanelVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Mock orders data
  useEffect(() => {
    const mockOrders = [
      {
        id: '#ORD001',
        customer: 'John Doe',
        date: '2024-01-15',
        total: 299.99,
        status: 'completed',
        items: ['Premium Perfume', 'Body Spray'],
        paymentMethod: 'Credit Card',
        shippingAddress: '123 Main St, City, Country'
      },
      // Add more mock orders...
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-500/10';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'processing':
        return 'text-blue-500 bg-blue-500/10';
      case 'cancelled':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className={`min-h-screen p-3 md:p-6 lg:p-8 ${styles.background}`}>
      {/* Compact Header for Mobile */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 md:mb-8"
      >
        {/* Title Section */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`p-2 md:p-3 rounded-xl ${styles.card} ${styles.border}`}>
            <RiShoppingBag3Line className={`w-5 h-5 md:w-6 md:h-6 ${styles.text}`} />
          </div>
          <div>
            <h1 className={`text-xl md:text-2xl font-bold ${styles.text}`}>
              Orders
            </h1>
            <p className={`text-sm md:text-base ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your orders
            </p>
          </div>
        </div>

        {/* Combined Search and Filter for Mobile */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <motion.div 
              className="flex-1 relative"
              whileHover={{ scale: 1.01 }}
            >
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl border ${styles.border} ${styles.card}
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20
                  text-sm md:text-base transition-all duration-300`}
              />
            </motion.div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`px-3 py-2 rounded-xl border ${styles.border} ${styles.button}
                flex items-center gap-2 transition-all duration-300`}
            >
              <RiFilterLine className="w-5 h-5" />
              <span className="hidden md:inline">Filters</span>
            </motion.button>
          </div>

          {/* Compact Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                variants={filterPanelVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`overflow-hidden rounded-xl border ${styles.border} ${styles.card}`}
              >
                <div className="p-3 md:p-4 space-y-3">
                  {/* Status Filter */}
                  <div className="space-y-1">
                    <label className={`text-sm font-medium ${styles.text}`}>
                      <RiCheckboxCircleLine className="inline mr-2" />
                      Status
                    </label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className={`w-full p-2 rounded-lg text-sm border ${styles.border} ${styles.card}`}
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div className="space-y-1">
                    <label className={`text-sm font-medium ${styles.text}`}>
                      <RiSortAsc className="inline mr-2" />
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={`w-full p-2 rounded-lg text-sm border ${styles.border} ${styles.card}`}
                    >
                      <option value="date">Date</option>
                      <option value="total">Total Amount</option>
                      <option value="status">Status</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Optimized Orders List for Mobile */}
      <div className="grid gap-3 md:gap-4">
        {loading ? (
          // Compact Loading Skeleton
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-24 md:h-32 rounded-xl ${styles.card} ${styles.border}`}
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          // Compact Empty State
          <div className={`py-8 md:py-12 text-center ${styles.card} rounded-xl border ${styles.border}`}>
            <RiFileList3Line className="mx-auto h-10 w-10 text-gray-400" />
            <h3 className={`mt-2 text-base font-medium ${styles.text}`}>No Orders</h3>
            <p className={`mt-1 text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Orders will appear here
            </p>
          </div>
        ) : (
          // Compact Order Cards
          orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 md:p-4 rounded-xl border ${styles.border} ${styles.card}`}
            >
              <div className="space-y-2">
                {/* Order Header */}
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${styles.text}`}>{order.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1.5">
                    <RiUserLine className="text-gray-400 w-4 h-4" />
                    <span className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                      {order.customer}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RiMoneyDollarCircleLine className="text-gray-400 w-4 h-4" />
                    <span className={`font-medium ${styles.text}`}>
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end mt-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1.5 text-sm rounded-lg ${styles.button} 
                      flex items-center gap-1.5`}
                  >
                    Details
                    <RiArrowRightLine className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;