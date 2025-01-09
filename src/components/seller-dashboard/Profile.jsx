import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  RiUser3Line,
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiEditLine,
  RiImageEditLine,
  RiShoppingBag3Line,
  RiHeartLine,
  RiSettings4Line,
  RiShareCircleLine,
  RiWallet3Line,
  RiShieldLine,
  RiTimeLine
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main St, New York, NY 10001',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    memberSince: '2023',
    orders: 24,
    wishlist: 12,
    referralCode: 'JOHN2024',
    totalSaved: '$1,250'
  });

  const stats = [
    { 
      icon: RiShoppingBag3Line, 
      label: 'Total Orders', 
      value: userData.orders,
      color: 'bg-blue-500/10 text-blue-500'
    },
    { 
      icon: RiWallet3Line, 
      label: 'Total Saved', 
      value: userData.totalSaved,
      color: 'bg-green-500/10 text-green-500'
    },
    { 
      icon: RiHeartLine, 
      label: 'Wishlist', 
      value: userData.wishlist,
      color: 'bg-red-500/10 text-red-500'
    },
  ];

  const menuItems = [
    { 
      icon: RiShareCircleLine, 
      label: 'Referral Program', 
      subtext: 'Invite friends & earn rewards',
      path: '/referral',
      highlight: true,
      gradientColors: currentTheme === 'eyeCare' 
        ? 'from-[#A89078]/20 to-[#8B7355]/20' 
        : 'from-purple-500/10 to-blue-500/10',
      iconBg: currentTheme === 'eyeCare'
        ? 'bg-[#A89078]/20 text-[#8B7355]'
        : 'bg-purple-500/20 text-purple-500'
    },
    { 
      icon: RiShieldLine, 
      label: 'Security Settings', 
      subtext: 'Manage your account security',
      path: '/settings?section=privacy',
      gradientColors: currentTheme === 'eyeCare'
        ? 'from-[#B59B6D]/10 to-[#8B7355]/10'
        : 'from-blue-500/10 to-indigo-500/10',
      iconBg: currentTheme === 'eyeCare'
        ? 'bg-[#B59B6D]/20 text-[#8B7355]'
        : 'bg-blue-500/20 text-blue-500'
    },
    { 
      icon: RiSettings4Line, 
      label: 'Preferences', 
      subtext: 'Customize your experience',
      path: '/settings?section=account',
      gradientColors: currentTheme === 'eyeCare'
        ? 'from-[#C1A173]/10 to-[#8B7355]/10'
        : 'from-green-500/10 to-emerald-500/10',
      iconBg: currentTheme === 'eyeCare'
        ? 'bg-[#C1A173]/20 text-[#8B7355]'
        : 'bg-green-500/20 text-green-500'
    },
  ];

  const getThemeStyles = () => ({
    background: currentTheme === 'dark' ? 'bg-gray-800' 
      : currentTheme === 'eyeCare' ? 'bg-[#E6D5BC]'
      : 'bg-white',
    text: currentTheme === 'dark' ? 'text-white' 
      : currentTheme === 'eyeCare' ? 'text-[#433422]'
      : 'text-gray-900',
    subtext: currentTheme === 'dark' ? 'text-gray-400' 
      : currentTheme === 'eyeCare' ? 'text-[#433422]/70'
      : 'text-gray-500',
  });

  const styles = getThemeStyles();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Profile Header Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`${styles.background} rounded-2xl overflow-hidden shadow-lg`}
      >
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-purple-500 to-blue-500 relative">
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4 flex justify-between items-end">
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
              />
              <button 
                className="absolute bottom-2 right-2 p-2 rounded-full bg-white/90 shadow-lg
                hover:bg-white transition-colors"
              >
                <RiImageEditLine size={18} className="text-gray-700" />
              </button>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 shadow-lg
              hover:bg-white transition-colors text-gray-700"
            >
              <RiEditLine size={18} />
              <span>Edit Profile</span>
            </motion.button>
          </div>

          <div className="space-y-1">
            <h1 className={`text-2xl font-bold ${styles.text}`}>{userData.name}</h1>
            <div className="flex items-center gap-2 text-sm">
              <RiTimeLine className={styles.subtext} />
              <span className={styles.subtext}>Member since {userData.memberSince}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 md:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -2, scale: 1.02 }}
            className={`${styles.background} rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg
              h-[100px] md:h-[140px] flex flex-col justify-between`}
          >
            <div className={`inline-flex p-2 md:p-3 rounded-lg md:rounded-xl ${stat.color}`}>
              <stat.icon size={16} className="md:w-6 md:h-6" />
            </div>
            <div>
              <p className={`${styles.subtext} text-xs md:text-sm`}>{stat.label}</p>
              <p className={`${styles.text} text-base md:text-xl font-bold mt-0.5`}>
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Profile Details */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`${styles.background} rounded-2xl p-6 shadow-lg`}
      >
        <h2 className={`${styles.text} text-xl font-bold mb-6`}>Profile Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: RiUser3Line, label: 'Full Name', value: userData.name },
            { icon: RiMailLine, label: 'Email Address', value: userData.email },
            { icon: RiPhoneLine, label: 'Phone Number', value: userData.phone },
            { icon: RiMapPinLine, label: 'Address', value: userData.address },
          ].map((detail, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <detail.icon size={18} className={styles.subtext} />
                <p className={`${styles.subtext} text-sm`}>{detail.label}</p>
              </div>
              <p className={`${styles.text} pl-7`}>{detail.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Menu */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`${styles.background} rounded-2xl p-6 shadow-lg`}
      >
        <h2 className={`${styles.text} text-xl font-bold mb-6`}>Quick Actions</h2>
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200
                ${item.highlight 
                  ? `bg-gradient-to-r ${item.gradientColors}` 
                  : currentTheme === 'dark'
                    ? 'hover:bg-gray-700/50'
                    : currentTheme === 'eyeCare'
                    ? 'hover:bg-[#D4C3AA]/50'
                    : 'hover:bg-gray-100'
                }
                transform hover:shadow-lg hover:-translate-y-0.5
                ${currentTheme === 'dark' 
                  ? 'hover:bg-opacity-50 hover:ring-1 hover:ring-gray-700' 
                  : currentTheme === 'eyeCare'
                  ? 'hover:ring-1 hover:ring-[#A89078]/30'
                  : 'hover:ring-1 hover:ring-gray-200'
                }`}
            >
              <div className={`p-3 rounded-xl ${item.iconBg}`}>
                <item.icon size={20} />
              </div>
              <div className="text-left">
                <p className={`${styles.text} font-medium`}>{item.label}</p>
                <p className={`${styles.subtext} text-sm`}>{item.subtext}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile; 