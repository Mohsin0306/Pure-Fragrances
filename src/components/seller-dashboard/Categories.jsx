import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  RiHeartLine,
  RiLeafLine,
  RiFireLine,
  RiMoonLine,
  RiSunLine,
  RiFlowerLine,
  RiDropLine,
  RiStarLine,
  RiVipCrownLine,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { currentTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    {
      id: 1,
      name: "Floral Fragrances",
      icon: <RiFlowerLine size={24} />,
      items: 86,
      subcategories: ['Rose', 'Jasmine', 'Lily', 'Lavender', 'Cherry Blossom'],
      featured: ['Spring Collection', 'Wedding Specials', 'Romantic Bouquet'],
      image: "https://images.unsplash.com/photo-1615368144592-5d7f1f7c6ab5?q=80&w=1000",
      description: "Delicate floral scents that capture nature's essence",
      color: "from-pink-400 to-rose-500",
      bgPattern: "bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),transparent_70%)]"
    },
    {
      id: 2,
      name: "Oriental & Spicy",
      icon: <RiFireLine size={24} />,
      items: 64,
      subcategories: ['Vanilla', 'Amber', 'Musk', 'Oud', 'Spices'],
      featured: ['Arabian Nights', 'Exotic Collection', 'Winter Warmth'],
      image: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=1000",
      description: "Rich and warm fragrances for memorable moments",
      color: "from-amber-500 to-red-600",
      bgPattern: "bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-from),transparent_70%)]"
    },
    {
      id: 3,
      name: "Fresh & Citrus",
      icon: <RiDropLine size={24} />,
      items: 72,
      subcategories: ['Lemon', 'Bergamot', 'Ocean', 'Green Tea', 'Mint'],
      featured: ['Summer Breeze', 'Morning Dew', 'Citrus Burst'],
      image: "https://images.unsplash.com/photo-1527768175-41aa1771795f?q=80&w=1000",
      description: "Invigorating scents for a refreshing experience",
      color: "from-cyan-400 to-blue-500",
      bgPattern: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from),transparent_70%)]"
    },
    {
      id: 4,
      name: "Luxury Collection",
      icon: <RiVipCrownLine size={24} />,
      items: 45,
      subcategories: ['Premium', 'Limited Edition', 'Signature', 'Rare', 'Exclusive'],
      featured: ['Designer Series', "Collector's Edition", 'Artisan Crafted'],
      image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=1000",
      description: "Exclusive fragrances for the distinguished",
      color: "from-purple-500 to-indigo-600",
      bgPattern: "bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-from),transparent_70%)]"
    },
    {
      id: 5,
      name: "Night Collection",
      icon: <RiMoonLine size={24} />,
      items: 58,
      subcategories: ['Evening Wear', 'Seductive', 'Mysterious', 'Dark Amber'],
      featured: ['Midnight Magic', 'Starlit Evening', 'Nocturnal Bloom'],
      image: "https://images.unsplash.com/photo-1593743478057-f9fac59e06b6?q=80&w=1000",
      description: "Enchanting fragrances for the night",
      color: "from-gray-700 to-gray-900",
      bgPattern: "bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-from),transparent_70%)]"
    },
    {
      id: 6,
      name: "Natural & Organic",
      icon: <RiLeafLine size={24} />,
      items: 39,
      subcategories: ['Essential Oils', 'Vegan', 'Sustainable', 'Pure', 'Botanical'],
      featured: ['Eco Series', 'Pure Nature', 'Earth Collection'],
      image: "https://images.unsplash.com/photo-1616166330003-8e4b5338b9c7?q=80&w=1000",
      description: "Pure and sustainable fragrances from nature",
      color: "from-green-400 to-emerald-600",
      bgPattern: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from),transparent_70%)]"
    }
  ];

  return (
    <div className={`min-h-screen ${
      currentTheme === 'dark' ? 'bg-gray-900 text-white' 
      : currentTheme === 'eyeCare' ? 'bg-[#F5E6D3] text-[#433422]'
      : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header Section with Parallax Effect */}
      <div className="relative h-48 overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1583445095369-5cc4a5dae6e7?q=80&w=1000')",
            transform: "translateZ(0)",
          }}
        >
          <div className={`absolute inset-0 ${
            currentTheme === 'dark' ? 'bg-gray-900/70' 
            : currentTheme === 'eyeCare' ? 'bg-[#F5E6D3]/70'
            : 'bg-white/70'
          } backdrop-blur-sm`} />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Fragrance Collections</h1>
          <p className={`text-base md:text-lg ${
            currentTheme === 'dark' ? 'text-gray-300' 
            : currentTheme === 'eyeCare' ? 'text-[#433422]/90'
            : 'text-gray-700'
          }`}>
            Discover your signature scent from our curated collections
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              to={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={category.id}
              className={`group relative overflow-hidden rounded-3xl ${
                currentTheme === 'dark' 
                  ? 'bg-gray-800/80 hover:bg-gray-800' 
                  : currentTheme === 'eyeCare'
                  ? 'bg-[#E6D5BC] hover:bg-[#E6D5BC]/90'
                  : 'bg-white hover:bg-white/90'
              } shadow-lg ring-1 ring-black/5`}
            >
              <div className="relative h-56">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${category.bgPattern} ${category.color} opacity-70 mix-blend-multiply`} />
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-3"
                  >
                    <span className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md">
                      {category.icon}
                    </span>
                    <span className="text-sm font-medium bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
                      {category.items} Fragrances
                    </span>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{category.name}</h3>
                  <p className="text-white/90 text-sm">{category.description}</p>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.map((sub, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-1.5 text-xs rounded-full ${
                          currentTheme === 'dark' 
                            ? 'bg-gray-700/50 hover:bg-gray-700 text-white' 
                            : currentTheme === 'eyeCare'
                            ? 'bg-[#433422]/10 hover:bg-[#433422]/20 text-[#433422]'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        {sub}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200/10">
                  <RiStarLine className="text-yellow-500" size={18} />
                  <span className="text-sm font-medium">Featured Collection:</span>
                  <span className={`text-sm ${
                    currentTheme === 'dark' ? 'text-gray-400' 
                    : currentTheme === 'eyeCare' ? 'text-[#433422]/70'
                    : 'text-gray-600'
                  }`}>
                    {category.featured[0]}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;