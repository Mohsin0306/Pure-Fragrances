import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiLockLine, RiMailLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { currentTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: emailOrUsername,
          password
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.user.isAdmin) {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=2070')",
          filter: "brightness(0.7)"
        }}
      />
      
      {/* Glassmorphism Effect */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30" />

      {/* Login Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full sm:w-[400px] md:w-[440px] h-screen sm:h-auto"
      >
        <div className={`
          h-full sm:h-auto p-6 sm:p-8
          flex flex-col justify-center sm:justify-start
          rounded-none sm:rounded-2xl shadow-2xl backdrop-blur-md
          ${currentTheme === 'dark' 
            ? 'bg-gray-900/70 text-white' 
            : 'bg-white/70 text-gray-900'
          }
        `}>
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl sm:text-4xl font-serif italic mb-1 sm:mb-2"
            >
              Essence
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xs sm:text-sm tracking-wider uppercase text-gray-400"
            >
              Luxury Fragrances
            </motion.p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center bg-red-100/10 py-2 rounded"
              >
                {error}
              </motion.div>
            )}

            {/* Email/Username Input */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="Email address or username"
                className={`
                  w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-lg outline-none transition-all
                  ${currentTheme === 'dark'
                    ? 'bg-gray-800/50 focus:bg-gray-800 text-white'
                    : 'bg-white/50 focus:bg-white text-gray-900'
                  }
                  border border-transparent focus:border-purple-500
                `}
                required
              />
            </motion.div>

            {/* Password Input */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative"
            >
              <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`
                  w-full pl-10 pr-12 py-3 sm:py-3.5 rounded-lg outline-none transition-all
                  ${currentTheme === 'dark'
                    ? 'bg-gray-800/50 focus:bg-gray-800 text-white'
                    : 'bg-white/50 focus:bg-white text-gray-900'
                  }
                  border border-transparent focus:border-purple-500
                `}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </motion.div>

            {/* Remember Me */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center"
            >
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-xs sm:text-sm text-gray-400">Remember me</span>
              </label>
            </motion.div>

            {/* Login Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className={`
                w-full py-3 sm:py-3.5 rounded-lg text-white font-medium text-sm
                bg-gradient-to-r from-purple-600 to-pink-500
                hover:from-purple-700 hover:to-pink-600
                transition-all duration-300 transform
                shadow-lg hover:shadow-xl
              `}
            >
              Sign In
            </motion.button>

            {/* Sign Up Link */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center text-gray-400 text-xs sm:text-sm mt-4"
            >
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-500 hover:text-purple-600 font-medium">
                Sign up
              </Link>
            </motion.p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login; 