import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  RiArrowLeftLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiInformationLine,
  RiShoppingBagLine,
  RiMailLine,
  RiSecurePaymentLine,
  RiUserFollowLine,
  RiTimeLine,
  RiCalendarLine,
  RiFileTextLine,
  RiMapPinLine,
} from 'react-icons/ri';

const NotificationDetail = () => {
  const { currentTheme } = useTheme();
  const { notificationId } = useParams();
  const navigate = useNavigate();

  // Mock notification data (in real app, fetch from API)
  const notification = {
    id: notificationId,
    type: 'success',
    title: 'Order Confirmed',
    message: 'Your order #12345 has been confirmed and is being processed. We will notify you once your order has been shipped.',
    time: '2 minutes ago',
    date: '2024-03-15',
    icon: RiShoppingBagLine,
    details: [
      { label: 'Order ID', value: '#12345', icon: RiFileTextLine },
      { label: 'Status', value: 'Processing', icon: RiTimeLine },
      { label: 'Date', value: 'March 15, 2024', icon: RiCalendarLine },
      { label: 'Delivery', value: 'Express Shipping', icon: RiMapPinLine },
    ],
    additionalInfo: 'Your order will be delivered within 3-5 business days. You can track your order status anytime from your orders page.',
    actions: [
      { label: 'View Order', path: '/orders/12345', primary: true },
      { label: 'Track Shipment', path: '/track/12345', primary: false },
    ]
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case 'success':
        return currentTheme === 'dark' 
          ? 'bg-green-500/10 text-green-400 ring-green-400/30' 
          : 'bg-green-50 text-green-700 ring-green-600/20';
      case 'warning':
        return currentTheme === 'dark'
          ? 'bg-yellow-500/10 text-yellow-400 ring-yellow-400/30'
          : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
      case 'info':
        return currentTheme === 'dark'
          ? 'bg-blue-500/10 text-blue-400 ring-blue-400/30'
          : 'bg-blue-50 text-blue-700 ring-blue-600/20';
      default:
        return currentTheme === 'dark'
          ? 'bg-gray-500/10 text-gray-400 ring-gray-400/30'
          : 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
  };

  return (
    <div className={`min-h-screen pb-20 md:pb-0 ${
      currentTheme === 'dark' ? 'bg-gray-900 text-white' 
      : currentTheme === 'eyeCare' ? 'bg-[#F5E6D3] text-[#433422]'
      : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-xl transition-all ${
            currentTheme === 'dark' 
              ? 'bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-xl' 
              : currentTheme === 'eyeCare'
              ? 'bg-[#E6D5BC]/50 hover:bg-[#D4C3AA]/50 backdrop-blur-xl'
              : 'bg-white/50 hover:bg-gray-100/50 backdrop-blur-xl'
          }`}
        >
          <RiArrowLeftLine size={20} />
          <span>Back</span>
        </motion.button>

        {/* Notification Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl overflow-hidden shadow-lg ${
            currentTheme === 'dark' 
              ? 'bg-gray-800/50 backdrop-blur-xl' 
              : currentTheme === 'eyeCare'
              ? 'bg-[#E6D5BC]/50 backdrop-blur-xl'
              : 'bg-white/50 backdrop-blur-xl'
          }`}
        >
          {/* Header with Gradient */}
          <div className={`p-6 relative overflow-hidden ${
            currentTheme === 'dark' 
              ? 'bg-gradient-to-br from-green-500/20 to-blue-500/20' 
              : currentTheme === 'eyeCare'
              ? 'bg-gradient-to-br from-[#D4C3AA]/20 to-[#E6D5BC]/20'
              : 'bg-gradient-to-br from-green-50 to-blue-50'
          }`}>
            <div className="space-y-3">
              <h1 className="text-2xl font-bold">{notification.title}</h1>
              <p className="text-base opacity-80 leading-relaxed">{notification.message}</p>
              <div className="flex items-center gap-4 text-sm opacity-60">
                <div className="flex items-center gap-1">
                  <RiTimeLine size={14} />
                  <span>{notification.time}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-current opacity-30" />
                <div className="flex items-center gap-1">
                  <RiCalendarLine size={14} />
                  <span>{notification.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notification.details.map((detail, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  key={index}
                  className={`p-4 rounded-xl transition-all hover:scale-[1.02] ${
                    currentTheme === 'dark' 
                      ? 'bg-gray-700/30 hover:bg-gray-700/50' 
                      : currentTheme === 'eyeCare'
                      ? 'bg-[#D4C3AA]/30 hover:bg-[#D4C3AA]/50'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <detail.icon size={20} className="opacity-70" />
                    <div>
                      <p className="text-sm opacity-60">{detail.label}</p>
                      <p className="font-medium">{detail.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-xl ${
                currentTheme === 'dark' 
                  ? 'bg-gray-700/30' 
                  : currentTheme === 'eyeCare'
                  ? 'bg-[#D4C3AA]/30'
                  : 'bg-gray-50'
              }`}
            >
              <h3 className="font-medium mb-2">Additional Information</h3>
              <p className="text-sm opacity-70 leading-relaxed">{notification.additionalInfo}</p>
            </motion.div>

            {/* Action Buttons - Updated for mobile */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              {notification.actions.map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.2 + index * 0.1 }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(action.path)}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-medium transition-all ${
                    action.primary
                      ? currentTheme === 'dark'
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : currentTheme === 'eyeCare'
                        ? 'bg-[#433422] hover:bg-[#433422]/90 text-[#F5E6D3]'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                      : currentTheme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : currentTheme === 'eyeCare'
                      ? 'bg-[#D4C3AA] hover:bg-[#C3B299] text-[#433422]'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {action.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotificationDetail; 