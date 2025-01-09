import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  RiShoppingBag3Line,
  RiDeleteBinLine,
  RiAddLine,
  RiSubtractLine,
  RiArrowRightLine,
  RiSecurePaymentLine,
  RiTruckLine,
  RiShieldCheckLine,
  RiArrowLeftLine,
  RiGiftLine
} from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = ({ cartItems, setCartItems, cartLoading, fetchCartData }) => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  // Use effect to fetch data only if needed
  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 12.00;
  const total = subtotal + shipping;

  if (cartLoading) {
    return (
      <div className={`min-h-screen p-4 ${
        currentTheme === 'dark' ? 'bg-gray-900 text-white' 
        : currentTheme === 'eyeCare' ? 'bg-[#F5E6D3] text-[#433422]'
        : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`p-4 rounded-xl ${
                currentTheme === 'dark' 
                  ? 'bg-gray-800/50' 
                  : currentTheme === 'eyeCare' 
                  ? 'bg-[#E6D5BC]/50'
                  : 'bg-white/50'
              }`}>
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      currentTheme === 'dark' ? 'bg-gray-900 text-white' 
      : currentTheme === 'eyeCare' ? 'bg-[#F5E6D3] text-[#433422]'
      : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className={`p-2 rounded-full transition-all ${
            currentTheme === 'dark' ? 'hover:bg-gray-800' 
            : currentTheme === 'eyeCare' ? 'hover:bg-[#E6D5BC]'
            : 'hover:bg-gray-100'
          }`}>
            <RiArrowLeftLine size={24} />
          </Link>
          <div className="flex items-center gap-3">
            <RiShoppingBag3Line size={32} className="text-purple-500" />
            <h1 className="text-3xl font-serif">Shopping Cart</h1>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <RiShoppingBag3Line size={64} className="mx-auto mb-4 opacity-20" />
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="opacity-60 mb-8">Add some items to start shopping</p>
            <Link to="/" className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              currentTheme === 'dark' 
                ? 'bg-white text-gray-900 hover:bg-gray-100' 
                : currentTheme === 'eyeCare'
                ? 'bg-[#433422] text-[#F5E6D3] hover:bg-[#433422]/90'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}>
              <span>Continue Shopping</span>
              <RiArrowRightLine size={20} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className={`p-4 rounded-xl ${
                      currentTheme === 'dark' 
                        ? 'bg-gray-800/50 backdrop-blur-xl border border-gray-700' 
                        : currentTheme === 'eyeCare' 
                        ? 'bg-[#E6D5BC]/50 backdrop-blur-xl border border-[#D4C3AA]'
                        : 'bg-white/50 backdrop-blur-xl border border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="w-24 h-24 rounded-lg overflow-hidden bg-white p-2 cursor-pointer"
                        onClick={() => navigate(`/products/${item.id}?from=cart`)}
                      >
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 
                          className="font-medium mb-1 truncate cursor-pointer hover:opacity-80"
                          onClick={() => navigate(`/products/${item.id}?from=cart`)}
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm opacity-60 mb-2">{item.category}</p>
                        <div className="flex items-center gap-4">
                          <div className={`flex items-center rounded-lg ${
                            currentTheme === 'dark' ? 'bg-gray-700' 
                            : currentTheme === 'eyeCare' ? 'bg-[#D4C3AA]'
                            : 'bg-gray-100'
                          }`}>
                            <motion.button 
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:opacity-70"
                            >
                              <RiSubtractLine size={18} />
                            </motion.button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <motion.button 
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:opacity-70"
                            >
                              <RiAddLine size={18} />
                            </motion.button>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="p-2 rounded-full hover:bg-red-500/10 text-red-500"
                      >
                        <RiDeleteBinLine size={20} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Gift Message */}
              <motion.div
                whileHover={{ y: -2 }}
                className={`p-4 rounded-xl ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-800/50 backdrop-blur-xl border border-gray-700' 
                    : currentTheme === 'eyeCare' 
                    ? 'bg-[#E6D5BC]/50 backdrop-blur-xl border border-[#D4C3AA]'
                    : 'bg-white/50 backdrop-blur-xl border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <RiGiftLine size={24} className="text-purple-500" />
                  <div>
                    <p className="font-medium">Add a Gift Message?</p>
                    <p className="text-sm opacity-60">Make it special with a personal note</p>
                  </div>
                </div>
              </motion.div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {[
                  { icon: <RiTruckLine size={24} />, text: "Free Shipping", subtext: "On orders over $150" },
                  { icon: <RiSecurePaymentLine size={24} />, text: "Secure Payment", subtext: "Protected by Stripe" },
                  { icon: <RiShieldCheckLine size={24} />, text: "Money-Back", subtext: "30 day guarantee" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className={`p-4 rounded-xl text-center ${
                      currentTheme === 'dark' 
                        ? 'bg-gray-800/50 backdrop-blur-xl border border-gray-700' 
                        : currentTheme === 'eyeCare' 
                        ? 'bg-[#E6D5BC]/50 backdrop-blur-xl border border-[#D4C3AA]'
                        : 'bg-white/50 backdrop-blur-xl border border-gray-100'
                    }`}
                  >
                    <div className="flex justify-center mb-2">{feature.icon}</div>
                    <p className="font-medium mb-1">{feature.text}</p>
                    <p className="text-sm opacity-60">{feature.subtext}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-xl sticky top-24 ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-800/50 backdrop-blur-xl border border-gray-700' 
                    : currentTheme === 'eyeCare' 
                    ? 'bg-[#E6D5BC]/50 backdrop-blur-xl border border-[#D4C3AA]'
                    : 'bg-white/50 backdrop-blur-xl border border-gray-100'
                }`}
              >
                <h2 className="text-xl font-serif mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="opacity-60">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="h-px bg-current opacity-10" />
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
                    currentTheme === 'dark' 
                      ? 'bg-white text-gray-900 hover:bg-gray-100' 
                      : currentTheme === 'eyeCare'
                      ? 'bg-[#433422] text-[#F5E6D3] hover:bg-[#433422]/90'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  <span>Proceed to Checkout</span>
                  <RiArrowRightLine size={20} />
                </motion.button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage; 