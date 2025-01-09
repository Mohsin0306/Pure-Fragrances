import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  RiSearchLine,
  RiFilterLine,
  RiStarLine,
  RiFireLine,
  RiLeafLine,
  RiHeartLine,
  RiShoppingCart2Line,
  RiPriceTag3Line
} from 'react-icons/ri';

const Products = ({ products, productsLoading, fetchProducts }) => {
  const { currentTheme } = useTheme();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const isProductPage = location.pathname === '/products';

  // Use effect to fetch data only if needed
  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Product sections for organization
  const productSections = [
    { 
      id: 'featured', 
      name: 'Featured Collection', 
      icon: <RiStarLine className="text-yellow-500" size={20} />,
      products: products.filter(p => p.rating?.rate >= 4).slice(0, 8)
    },
    { 
      id: 'trending', 
      name: 'Trending Now', 
      icon: <RiFireLine className="text-orange-500" size={20} />,
      products: products.filter(p => p.rating?.count >= 200).slice(0, 8)
    },
    { 
      id: 'new', 
      name: 'New Arrivals', 
      icon: <RiLeafLine className="text-green-500" size={20} />,
      products: [...products].reverse().slice(0, 8)
    }
  ];

  // Product Card Component
  const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    
    return (
      <motion.div
        whileHover={{ y: -5 }}
        onClick={() => navigate(`/products/${product.id}`)}
        className={`cursor-pointer min-w-[160px] sm:min-w-[200px] rounded-xl overflow-hidden ${
          currentTheme === 'dark' 
            ? 'bg-gray-800 hover:bg-gray-700' 
            : currentTheme === 'eyeCare'
            ? 'bg-[#E6D5BC] hover:bg-[#D4C3AA]'
            : 'bg-white hover:bg-gray-50'
        }`}
      >
        <div className="relative h-36 bg-white p-2">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-contain"
          />
          <button className={`absolute top-2 right-2 p-1.5 rounded-full ${
            currentTheme === 'dark' 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : currentTheme === 'eyeCare'
              ? 'bg-[#433422]/10 hover:bg-[#433422]/20'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}>
            <RiHeartLine size={14} />
          </button>
        </div>

        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-1 mb-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            <RiPriceTag3Line size={12} className="opacity-60" />
            <span className="text-xs capitalize opacity-60">
              {product.category}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">${product.price}</span>
            <button className={`p-1.5 rounded-full ${
              currentTheme === 'dark' 
                ? 'bg-white text-gray-900' 
                : currentTheme === 'eyeCare'
                ? 'bg-[#433422] text-[#F5E6D3]'
                : 'bg-gray-900 text-white'
            }`}>
              <RiShoppingCart2Line size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Product Section Component
  const ProductSection = ({ section }) => {
    const scrollRef = useRef(null);

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {section.icon}
            <h2 className="text-lg font-semibold">{section.name}</h2>
          </div>
          {isProductPage && (
            <button className="text-sm opacity-60 hover:opacity-100">
              View All
            </button>
          )}
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4"
          style={{
            // Mobile styles (hidden scrollbar)
            [`@media (max-width: 768px)`]: {
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            },
            // Desktop styles (modern transparent scrollbar)
            scrollbarWidth: 'thin',
            scrollbarColor: currentTheme === 'dark' 
              ? 'rgba(75, 85, 99, 0.3) transparent'
              : currentTheme === 'eyeCare' 
              ? 'rgba(67, 52, 34, 0.2) transparent'
              : 'rgba(107, 114, 128, 0.2) transparent',
            '&::-webkit-scrollbar': {
              height: '6px', // Slightly smaller for modern look
              width: '6px'
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
              margin: '0 4px' // Add some space around the scrollbar
            },
            '&::-webkit-scrollbar-thumb': {
              background: currentTheme === 'dark' 
                ? 'rgba(75, 85, 99, 0.3)'
                : currentTheme === 'eyeCare' 
                ? 'rgba(67, 52, 34, 0.2)'
                : 'rgba(107, 114, 128, 0.2)',
              borderRadius: '10px',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
              '&:hover': {
                background: currentTheme === 'dark' 
                  ? 'rgba(75, 85, 99, 0.5)'
                  : currentTheme === 'eyeCare' 
                  ? 'rgba(67, 52, 34, 0.4)'
                  : 'rgba(107, 114, 128, 0.4)'
              },
              '&:active': {
                background: currentTheme === 'dark' 
                  ? 'rgba(75, 85, 99, 0.6)'
                  : currentTheme === 'eyeCare' 
                  ? 'rgba(67, 52, 34, 0.5)'
                  : 'rgba(107, 114, 128, 0.5)'
              }
            },
            // Add smooth scroll behavior
            scrollBehavior: 'smooth',
            // Prevent horizontal scroll snap
            scrollSnapType: 'none',
            // Better touch scrolling on mobile
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {section.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  };

  // Search and filter modal
  const SearchFilterModal = () => (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed inset-x-0 bottom-0 p-4 rounded-t-3xl shadow-xl z-50 ${
        currentTheme === 'dark' ? 'bg-gray-800' 
        : currentTheme === 'eyeCare' ? 'bg-[#E6D5BC]'
        : 'bg-white'
      }`}
    >
      <div className="space-y-4">
        <div className={`flex items-center gap-3 p-3 rounded-xl ${
          currentTheme === 'dark' ? 'bg-gray-700' 
          : currentTheme === 'eyeCare' ? 'bg-[#D4C3AA]'
          : 'bg-gray-100'
        }`}>
          <RiSearchLine size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
          <RiFilterLine 
            size={20} 
            className={`${searchQuery ? 'opacity-0' : 'opacity-100'}`}
          />
        </div>

        {/* Add your filter options here */}
        <div className="space-y-2">
          {/* Filter options will go here */}
        </div>
      </div>
    </motion.div>
  );

  // Loading Skeleton Component
  const ProductSkeleton = () => (
    <div className={`min-w-[160px] sm:min-w-[200px] rounded-xl overflow-hidden animate-pulse ${
      currentTheme === 'dark' 
        ? 'bg-gray-800' 
        : currentTheme === 'eyeCare'
        ? 'bg-[#E6D5BC]'
        : 'bg-white'
    }`}>
      <div className={`h-36 ${
        currentTheme === 'dark' 
          ? 'bg-gray-700' 
          : currentTheme === 'eyeCare'
          ? 'bg-[#D4C3AA]'
          : 'bg-gray-100'
      }`} />
      <div className="p-3 space-y-2">
        <div className={`h-4 rounded ${
          currentTheme === 'dark' 
            ? 'bg-gray-700' 
            : currentTheme === 'eyeCare'
            ? 'bg-[#D4C3AA]'
            : 'bg-gray-100'
        }`} />
        <div className={`h-3 w-2/3 rounded ${
          currentTheme === 'dark' 
            ? 'bg-gray-700' 
            : currentTheme === 'eyeCare'
            ? 'bg-[#D4C3AA]'
            : 'bg-gray-100'
        }`} />
        <div className="flex justify-between items-center pt-2">
          <div className={`h-4 w-1/3 rounded ${
            currentTheme === 'dark' 
              ? 'bg-gray-700' 
              : currentTheme === 'eyeCare'
              ? 'bg-[#D4C3AA]'
              : 'bg-gray-100'
          }`} />
          <div className={`h-8 w-8 rounded-full ${
            currentTheme === 'dark' 
              ? 'bg-gray-700' 
              : currentTheme === 'eyeCare'
              ? 'bg-[#D4C3AA]'
              : 'bg-gray-100'
          }`} />
        </div>
      </div>
    </div>
  );

  // Loading Section Component
  const LoadingSection = () => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className={`h-5 w-5 rounded ${
          currentTheme === 'dark' 
            ? 'bg-gray-800' 
            : currentTheme === 'eyeCare'
            ? 'bg-[#E6D5BC]'
            : 'bg-gray-200'
        }`} />
        <div className={`h-6 w-32 rounded ${
          currentTheme === 'dark' 
            ? 'bg-gray-800' 
            : currentTheme === 'eyeCare'
            ? 'bg-[#E6D5BC]'
            : 'bg-gray-200'
        }`} />
      </div>
      <div className="flex gap-4 overflow-x-hidden">
        {[1, 2, 3, 4].map((i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  );

  if (productsLoading) {
    return (
      <div className={`p-4 sm:p-6 ${
        currentTheme === 'dark' ? 'bg-gray-900 text-white' 
        : currentTheme === 'eyeCare' ? 'bg-[#F5E6D3] text-[#433422]'
        : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto">
          {isProductPage && (
            <div className={`w-full h-12 mb-6 rounded-xl animate-pulse ${
              currentTheme === 'dark' ? 'bg-gray-800' 
              : currentTheme === 'eyeCare' ? 'bg-[#E6D5BC]'
              : 'bg-white'
            }`} />
          )}
          {[1, 2, 3].map((i) => (
            <LoadingSection key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${
      currentTheme === 'dark' ? 'bg-gray-900 text-white' 
      : currentTheme === 'eyeCare' ? 'bg-[#F5E6D3] text-[#433422]'
      : 'bg-gray-50 text-gray-900'
    }`}>
      {isProductPage && (
        <div className="relative h-[35vh] mb-8">
          {/* Modern Hero Banner */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-[1.02] filter blur-[2px]"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop')`,
            }}
          >
            <div className={`absolute inset-0 ${
              currentTheme === 'dark' 
                ? 'bg-gradient-to-b from-gray-900/90 to-gray-900/70' 
                : currentTheme === 'eyeCare'
                ? 'bg-gradient-to-b from-[#F5E6D3]/90 to-[#F5E6D3]/70'
                : 'bg-gradient-to-b from-white/90 to-white/70'
            }`} />
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center items-center pt-8">
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 whitespace-nowrap ${
              currentTheme === 'dark'
                ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                : currentTheme === 'eyeCare'
                ? 'bg-gradient-to-r from-[#433422] to-[#8B4513]'
                : 'bg-gradient-to-r from-purple-600 to-pink-600'
            } bg-clip-text text-transparent`}>
              Discover Our Collection
            </h1>
            <p className={`max-w-2xl text-center mb-4 md:mb-6 text-base md:text-lg px-4 ${
              currentTheme === 'dark' ? 'text-gray-300' 
              : currentTheme === 'eyeCare' ? 'text-[#433422]/90'
              : 'text-gray-700'
            }`}>
              Explore our curated selection of premium products
            </p>

            {/* Modern Floating Search Bar */}
            <div className="w-full max-w-xl px-4">
              <div className={`flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg backdrop-blur-xl ${
                currentTheme === 'dark' 
                  ? 'bg-white/10 hover:bg-white/15 border border-white/10' 
                  : currentTheme === 'eyeCare'
                  ? 'bg-[#433422]/5 hover:bg-[#433422]/10 border border-[#433422]/10'
                  : 'bg-white/70 hover:bg-white/90 border border-gray-200'
              } transition-all duration-300`}>
                <RiSearchLine size={20} className="flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full bg-transparent outline-none text-base md:text-lg ${
                    currentTheme === 'dark' 
                      ? 'placeholder-gray-400' 
                      : currentTheme === 'eyeCare'
                      ? 'placeholder-[#433422]/70'
                      : 'placeholder-gray-600'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Product Sections */}
        {productsLoading ? (
          [1, 2, 3].map((i) => <LoadingSection key={i} />)
        ) : (
          productSections.map(section => (
            <ProductSection key={section.id} section={section} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products; 