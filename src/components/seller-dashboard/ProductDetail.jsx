import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { 
  RiArrowLeftLine,
  RiHeartLine,
  RiHeartFill,
  RiShoppingCart2Line,
  RiStarFill,
  RiShareLine,
  RiTruckLine,
  RiShieldCheckLine,
  RiExchangeLine,
  RiAddLine,
  RiSubtractLine,
  RiCheckLine
} from 'react-icons/ri';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  if (loading || !product) {
    return (
      <div className={`min-h-screen p-4 ${
        currentTheme === 'dark' ? 'bg-gray-900' 
        : currentTheme === 'eyeCare' ? 'bg-[#F5E6D3]'
        : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-[400px] rounded-2xl bg-gray-200 dark:bg-gray-800" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-24 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
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
      {/* Navigation Bar */}
      <div className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
        currentTheme === 'dark' ? 'bg-gray-900/80 border-gray-800' 
        : currentTheme === 'eyeCare' ? 'bg-[#F5E6D3]/80 border-[#E6D5BC]'
        : 'bg-white/80 border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className={`p-2 rounded-full transition-all ${
              currentTheme === 'dark' ? 'hover:bg-gray-800' 
              : currentTheme === 'eyeCare' ? 'hover:bg-[#E6D5BC]'
              : 'hover:bg-gray-100'
            }`}
          >
            <RiArrowLeftLine size={24} />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full transition-all ${
                currentTheme === 'dark' ? 'hover:bg-gray-800' 
                : currentTheme === 'eyeCare' ? 'hover:bg-[#E6D5BC]'
                : 'hover:bg-gray-100'
              }`}
            >
              {isFavorite ? 
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <RiHeartFill size={24} className="text-red-500" />
                </motion.div> : 
                <RiHeartLine size={24} />
              }
            </button>
            <button className={`p-2 rounded-full transition-all ${
              currentTheme === 'dark' ? 'hover:bg-gray-800' 
              : currentTheme === 'eyeCare' ? 'hover:bg-[#E6D5BC]'
              : 'hover:bg-gray-100'
            }`}>
              <RiShareLine size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 pb-32 sm:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div 
              className={`aspect-square rounded-2xl overflow-hidden ${
                currentTheme === 'dark' ? 'bg-gray-800' 
                : currentTheme === 'eyeCare' ? 'bg-[#E6D5BC]'
                : 'bg-white'
              }`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-contain p-8 hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm mb-3 ${
                currentTheme === 'dark' ? 'bg-gray-800' 
                : currentTheme === 'eyeCare' ? 'bg-[#E6D5BC]'
                : 'bg-gray-100'
              }`}>
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <RiStarFill 
                      key={i}
                      size={18}
                      className={i < Math.round(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm opacity-60">({product.rating.count} reviews)</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold">${product.price}</p>
                <p className="text-sm line-through opacity-50 mb-1">${(product.price * 1.2).toFixed(2)}</p>
              </div>
              <p className="text-sm leading-relaxed opacity-80">{product.description}</p>
            </div>

            {/* Features Cards - 2 per row on mobile, 3 on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { 
                  icon: <RiTruckLine size={24} className={
                    currentTheme === 'dark' ? 'text-purple-400' 
                    : currentTheme === 'eyeCare' ? 'text-[#433422]' 
                    : 'text-purple-600'
                  } />, 
                  text: 'Free Shipping', 
                  subtext: '2-3 business days' 
                },
                { 
                  icon: <RiShieldCheckLine size={24} className={
                    currentTheme === 'dark' ? 'text-blue-400' 
                    : currentTheme === 'eyeCare' ? 'text-[#433422]' 
                    : 'text-blue-600'
                  } />, 
                  text: 'Money Back', 
                  subtext: '30 days guarantee' 
                },
                { 
                  icon: <RiExchangeLine size={24} className={
                    currentTheme === 'dark' ? 'text-green-400' 
                    : currentTheme === 'eyeCare' ? 'text-[#433422]' 
                    : 'text-green-600'
                  } />, 
                  text: 'Easy Returns', 
                  subtext: 'Hassle free' 
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className={`p-3 sm:p-4 rounded-xl ${
                    currentTheme === 'dark' 
                      ? 'bg-gray-800/50 backdrop-blur-xl border border-gray-700' 
                      : currentTheme === 'eyeCare' 
                      ? 'bg-[#E6D5BC]/50 backdrop-blur-xl border border-[#D4C3AA]'
                      : 'bg-white/50 backdrop-blur-xl border border-gray-100'
                  } transition-all duration-300 ${
                    // Center the last card when there's an odd number on mobile
                    index === 2 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-2 p-2 rounded-full bg-opacity-10 bg-current">
                      {feature.icon}
                    </div>
                    <p className="font-medium mb-1 text-sm sm:text-base">{feature.text}</p>
                    <p className="text-xs opacity-60">{feature.subtext}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add to Cart Section - Adjusted for mobile navigation */}
            <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto sm:left-auto sm:right-auto w-full">
              <div className={`p-4 sm:p-0 mb-14 sm:mb-0 ${
                currentTheme === 'dark' 
                  ? 'bg-gray-900/80 backdrop-blur-xl border-t border-gray-800' 
                  : currentTheme === 'eyeCare'
                  ? 'bg-[#F5E6D3]/80 backdrop-blur-xl border-t border-[#E6D5BC]'
                  : 'bg-white/80 backdrop-blur-xl border-t border-gray-100'
              } sm:bg-transparent sm:backdrop-blur-none sm:border-0`}>
                <div className="max-w-7xl mx-auto flex items-center gap-3">
                  {/* Quantity Selector */}
                  <div className={`flex items-center rounded-xl ${
                    currentTheme === 'dark' ? 'bg-gray-800' 
                    : currentTheme === 'eyeCare' ? 'bg-[#E6D5BC]'
                    : 'bg-white'
                  }`}>
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 sm:p-3 hover:opacity-70 transition-opacity"
                    >
                      <RiSubtractLine size={18} />
                    </button>
                    <span className="w-8 sm:w-12 text-center font-medium">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 sm:p-3 hover:opacity-70 transition-opacity"
                    >
                      <RiAddLine size={18} />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-4 sm:px-6 rounded-xl font-semibold transition-all relative overflow-hidden ${
                      currentTheme === 'dark' 
                        ? 'bg-white text-gray-900 hover:bg-gray-100' 
                        : currentTheme === 'eyeCare'
                        ? 'bg-[#433422] text-[#F5E6D3] hover:bg-[#433422]/90'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {showAddedToCart ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <RiCheckLine size={18} />
                          <span className="text-base sm:text-lg whitespace-nowrap">Added to Cart</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <RiShoppingCart2Line size={18} />
                          <span className="text-base sm:text-lg whitespace-nowrap">
                            Add • ${(product.price * quantity).toFixed(2)}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 