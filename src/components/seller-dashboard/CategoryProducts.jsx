import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useParams, Link } from 'react-router-dom';
import {
  RiHeartLine,
  RiShoppingCart2Line,
  RiArrowLeftLine,
  RiFilterLine,
  RiArrowUpDownLine,
  RiSearchLine,
  RiPriceTag3Line
} from 'react-icons/ri';

const CategoryProducts = ({ products, productsLoading, setProductsLoading }) => {
  const { currentTheme } = useTheme();
  const { categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    if (products.length > 0) {
      const categoryProducts = products.filter(
        p => p.category.toLowerCase() === categoryId.replace(/-/g, ' ').toLowerCase()
      );
      setFilteredProducts(categoryProducts);
      setLoading(false);
    }
  }, [products, categoryId]);

  // Filter and search products
  useEffect(() => {
    let result = [...filteredProducts];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price filter
    result = result.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [searchQuery, filteredProducts, priceRange, sortBy]);

  if (loading) {
    return (
      <div className={`min-h-screen ${
        currentTheme === 'dark' ? 'bg-gray-900 text-white' 
        : currentTheme === 'eyeCare' ? 'bg-[#F5E6D3] text-[#433422]'
        : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-40 bg-gray-300 rounded-lg mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="bg-gray-300 h-60 rounded-lg"></div>
              ))}
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
      {/* Modern Category Hero Section */}
      <div className="relative h-[35vh] mb-8 overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-110"
          style={{ 
            backgroundImage: `url(${category?.image})`,
            transform: 'translateZ(0)',
          }}
        >
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 ${
            currentTheme === 'dark' 
              ? 'bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-transparent' 
              : currentTheme === 'eyeCare'
              ? 'bg-gradient-to-r from-[#F5E6D3]/95 via-[#F5E6D3]/80 to-transparent'
              : 'bg-gradient-to-r from-white/95 via-white/80 to-transparent'
          }`} />
        </div>

        {/* Content Container */}
        <div className="relative h-full max-w-7xl mx-auto px-4">
          {/* Category Info */}
          <div className="absolute bottom-8 max-w-2xl">
            {/* Category Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
                currentTheme === 'dark'
                  ? 'bg-gradient-to-r from-white via-gray-200 to-gray-400'
                  : currentTheme === 'eyeCare'
                  ? 'bg-gradient-to-r from-[#433422] via-[#5D4A35] to-[#8B4513]'
                  : 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500'
              } bg-clip-text text-transparent`}
            >
              {category?.name}
            </motion.h1>

            {/* Category Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl opacity-80 max-w-xl mb-3"
            >
              {category?.description}
            </motion.p>

            {/* Products Available Count */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                currentTheme === 'dark' 
                  ? 'bg-white/10 backdrop-blur-md' 
                  : currentTheme === 'eyeCare'
                  ? 'bg-[#433422]/10 backdrop-blur-md'
                  : 'bg-black/10 backdrop-blur-md'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-sm font-medium">
                {filteredProducts.length} Products Available
              </span>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -right-20 bottom-0 w-40 h-40 rounded-full blur-3xl -z-10"
              style={{
                background: currentTheme === 'dark' 
                  ? 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))' 
                  : currentTheme === 'eyeCare'
                  ? 'linear-gradient(45deg, rgba(67, 52, 34, 0.2), rgba(139, 69, 19, 0.2))'
                  : 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))'
              }}
            />
          </div>
        </div>

        {/* Decorative Shapes */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-current opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-t from-transparent to-current opacity-10" />
      </div>

      {/* Fixed Search and Filter Bar */}
      <div className={`sticky top-0 z-20 py-4 ${
        currentTheme === 'dark' 
          ? 'bg-gray-900/80 backdrop-blur-xl' 
          : currentTheme === 'eyeCare'
          ? 'bg-[#F5E6D3]/80 backdrop-blur-xl'
          : 'bg-white/80 backdrop-blur-xl'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className={`flex flex-col gap-4 md:flex-row md:items-center md:gap-6 ${
            currentTheme === 'dark' 
              ? 'bg-gray-800' 
              : currentTheme === 'eyeCare'
              ? 'bg-[#E6D5BC]'
              : 'bg-white'
          } p-4 rounded-xl`}>
            {/* Search Input */}
            <div className="flex-1 relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg outline-none ${
                  currentTheme === 'dark'
                    ? 'bg-gray-700 focus:bg-gray-600'
                    : currentTheme === 'eyeCare'
                    ? 'bg-[#F5E6D3] focus:bg-[#F5E6D3]/90'
                    : 'bg-gray-100 focus:bg-gray-200'
                }`}
              />
            </div>

            {/* Filter and Sort Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  currentTheme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : currentTheme === 'eyeCare'
                    ? 'bg-[#433422]/10 hover:bg-[#433422]/20'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <RiFilterLine />
                <span>Filters</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 rounded-lg appearance-none ${
                  currentTheme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : currentTheme === 'eyeCare'
                    ? 'bg-[#433422]/10 hover:bg-[#433422]/20'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <option value="default">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`mt-4 p-4 rounded-xl overflow-hidden ${
                  currentTheme === 'dark'
                    ? 'bg-gray-800'
                    : currentTheme === 'eyeCare'
                    ? 'bg-[#E6D5BC]'
                    : 'bg-white'
                }`}
              >
                <div className="space-y-4">
                  <h3 className="font-medium">Price Range</h3>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="flex-1"
                    />
                    <span>${priceRange[0]}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="flex-1"
                    />
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p>No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className={`rounded-xl overflow-hidden ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : currentTheme === 'eyeCare'
                    ? 'bg-[#E6D5BC] hover:bg-[#D4C3AA]'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="relative h-48 bg-white p-4">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                  <button className={`absolute top-2 right-2 p-2 rounded-full ${
                    currentTheme === 'dark' 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : currentTheme === 'eyeCare'
                      ? 'bg-[#433422]/10 hover:bg-[#433422]/20'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}>
                    <RiHeartLine size={16} />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-sm line-clamp-2 mb-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <RiPriceTag3Line size={16} className="opacity-60" />
                    <span className="text-sm opacity-60">{product.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">${product.price}</span>
                    <button className={`p-2 rounded-full ${
                      currentTheme === 'dark' 
                        ? 'bg-white text-gray-900' 
                        : currentTheme === 'eyeCare'
                        ? 'bg-[#433422] text-[#F5E6D3]'
                        : 'bg-gray-900 text-white'
                    }`}>
                      <RiShoppingCart2Line size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts; 