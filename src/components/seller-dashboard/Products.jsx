import React, { useRef, useState, useEffect, useMemo } from 'react';
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

const Products = () => {
  const { currentTheme } = useTheme();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const isProductPage = location.pathname === '/products';
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      
      // Fetch from all APIs
      const [fakeStoreResponse, dummyJsonResponse, fakeStoreApiResponse] = await Promise.all([
        fetch('https://fakestoreapi.in/api/products'),
        fetch('https://dummyjson.com/products'),
        fetch('https://fakestoreapi.com/products')
      ]);

      const fakeStoreData = await fakeStoreResponse.json();
      const dummyJsonData = await dummyJsonResponse.json();
      const fakeStoreApiData = await fakeStoreApiResponse.json();

      // Normalize data from each API
      const fakeStoreProducts = (fakeStoreData?.products || []).map(p => ({
        id: `fakestore-${p.id}`,
        title: p.title || 'Untitled Product',
        description: p.description || 'No description available',
        price: parseFloat(p.price) || 0,
        image: p.image || 'https://via.placeholder.com/300x300?text=Product+Image',
        category: p.category || 'Uncategorized',
        rating: typeof p.rating === 'object' ? p.rating : { rate: 4.0, count: 100 },
        stock: parseInt(p.stock) || 100,
        brand: p.brand || 'Generic',
        source: 'fakestore'
      }));

      const dummyJsonProducts = (dummyJsonData?.products || []).map(p => ({
        id: `dummy-${p.id}`,
        title: p.title || 'Untitled Product',
        description: p.description || 'No description available',
        price: parseFloat(p.price) || 0,
        image: p.thumbnail || p.images?.[0] || 'https://via.placeholder.com/300x300?text=Product+Image',
        category: p.category || 'Uncategorized',
        rating: p.rating || { rate: 4.0, count: 100 },
        stock: parseInt(p.stock) || 100,
        brand: p.brand || 'Generic',
        source: 'dummyjson'
      }));

      const fakeStoreApiProducts = (fakeStoreApiData || []).map(p => ({
        id: `fakestoreapi-${p.id}`,
        title: p.title || 'Untitled Product',
        description: p.description || 'No description available',
        price: parseFloat(p.price) || 0,
        image: p.image || 'https://via.placeholder.com/300x300?text=Product+Image',
        category: p.category || 'Uncategorized',
        rating: typeof p.rating === 'object' ? p.rating : { rate: 4.0, count: 100 },
        stock: 100,
        brand: 'Generic',
        source: 'fakestoreapi'
      }));

      const allProducts = [...fakeStoreProducts, ...dummyJsonProducts, ...fakeStoreApiProducts];
      setProducts(allProducts);
      setProductsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProductsLoading(false);
    }
  };

  // Add useEffect to fetch products only once
  useEffect(() => {
    fetchProducts();
  }, []);

  // Update product sections to show all products in scrollable sections
  const productSections = useMemo(() => [
    { 
      id: 'fakestore', 
      name: 'Featured Products', 
      icon: <RiStarLine className="text-yellow-500" size={20} />,
      products: products.filter(p => p.source === 'fakestore')
    },
    { 
      id: 'dummyjson', 
      name: 'Trending Products', 
      icon: <RiFireLine className="text-orange-500" size={20} />,
      products: products.filter(p => p.source === 'dummyjson')
    },
    { 
      id: 'fakestoreapi', 
      name: 'New Arrivals', 
      icon: <RiLeafLine className="text-green-500" size={20} />,
      products: products.filter(p => p.source === 'fakestoreapi')
    }
  ], [products]);

  // Product Card Component
  const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);
    
    const fallbackImage = "https://via.placeholder.com/300x300?text=Product+Image";
    
    return (
      <motion.div
        whileHover={{ y: -5 }}
        onClick={() => navigate(`/products/${product.id}`)}
        className={`cursor-pointer w-[160px] sm:w-[180px] rounded-xl overflow-hidden ${
          currentTheme === 'dark' 
            ? 'bg-gray-800 hover:bg-gray-700' 
            : currentTheme === 'eyeCare'
            ? 'bg-[#E6D5BC] hover:bg-[#D4C3AA]'
            : 'bg-white hover:bg-gray-50'
        }`}
      >
        <div className="relative h-32 bg-white p-2">
          <img 
            src={imageError ? fallbackImage : product.image} 
            alt={product.title}
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
            loading="lazy"
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

        <div className="p-3 space-y-2">
          <h3 className="font-medium text-sm truncate" title={product.title}>
            {product.title}
          </h3>
          <div className="flex items-center gap-1">
            <RiPriceTag3Line size={12} className="opacity-60" />
            <span className="text-xs capitalize opacity-60 truncate">
              {product.category}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">${product.price}</span>
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
    return (
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          {section.icon}
          <h2 className="text-xl font-semibold">{section.name}</h2>
          <span className="text-sm opacity-60">({section.products.length} items)</span>
        </div>
        <div className="relative">
          <div className="overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex gap-3 min-w-full">
              {section.products.map(product => (
                <div key={product.id} className="flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
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

  // Add CSS for hiding scrollbar but keeping functionality
  const styles = `
    .hide-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;  /* Chrome, Safari and Opera */
    }
  `;

  // Add style tag to head
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

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