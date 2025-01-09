import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  RiLockLine, 
  RiMailLine, 
  RiEyeLine, 
  RiEyeOffLine,
  RiUser3Line,
  RiPhoneLine,
  RiMapPinLine,
  RiCalendarLine,
  RiUserSmileLine
} from 'react-icons/ri';
import { useTheme } from '../context/ThemeContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // Add steps for form progression
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    country: '',
    city: '',
    address: '',
    gender: '',
    dateOfBirth: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register/buyer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          dateOfBirth: new Date(formData.dateOfBirth).toISOString()
        })
      });

      const data = await response.json();

      if (data.success) {
        // Show success message or toast notification
        navigate('/login');
      } else {
        // Show error message
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration');
    }
  };

  const renderFormStep = () => {
    switch(step) {
      case 1:
        return (
          <>
            {/* Basic Information */}
            <InputField
              icon={<RiUserSmileLine />}
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              theme={currentTheme}
            />

            <InputField
              icon={<RiUser3Line />}
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              theme={currentTheme}
            />

            <InputField
              icon={<RiMailLine />}
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              theme={currentTheme}
            />

            <div className="relative">
              <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`
                  w-full pl-10 pr-12 py-3 rounded-lg outline-none transition-all
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
            </div>
          </>
        );
      case 2:
        return (
          <>
            {/* Contact Information */}
            <InputField
              icon={<RiPhoneLine />}
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              theme={currentTheme}
            />

            <InputField
              icon={<RiMapPinLine />}
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              theme={currentTheme}
            />

            <InputField
              icon={<RiMapPinLine />}
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              theme={currentTheme}
            />

            <InputField
              icon={<RiMapPinLine />}
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              theme={currentTheme}
            />
          </>
        );
      case 3:
        return (
          <>
            {/* Personal Details */}
            <div className="relative">
              <RiUserSmileLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`
                  w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all
                  ${currentTheme === 'dark'
                    ? 'bg-gray-800/50 focus:bg-gray-800 text-white'
                    : 'bg-white/50 focus:bg-white text-gray-900'
                  }
                  border border-transparent focus:border-purple-500
                `}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="relative">
              <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`
                  w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all
                  ${currentTheme === 'dark'
                    ? 'bg-gray-800/50 focus:bg-gray-800 text-white'
                    : 'bg-white/50 focus:bg-white text-gray-900'
                  }
                  border border-transparent focus:border-purple-500
                `}
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  // Enhanced animation variants for form steps with slide effect
  const formVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=2076')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black/50 to-black/60 backdrop-blur-sm" />

      {/* Main container - Updated for full screen mobile */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full h-full min-h-screen sm:min-h-0 sm:h-auto sm:max-w-xl sm:mx-4"
      >
        <div className={`
          w-full h-full min-h-screen sm:min-h-0 sm:h-auto
          px-6 py-8 sm:p-8 md:p-12 
          sm:rounded-2xl shadow-2xl
          flex flex-col justify-center
          ${currentTheme === 'dark' 
            ? 'bg-gray-900/80 backdrop-blur-xl' 
            : 'bg-white/90 backdrop-blur-xl'}
        `}>
          {/* Logo/Brand - New Addition */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-8 left-6 sm:static sm:mb-6"
          >
            <h2 className="text-2xl font-serif italic bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Essence
            </h2>
          </motion.div>

          {/* Progress Header */}
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              {step === 1 ? 'Create Account' : step === 2 ? 'Contact Details' : 'Personal Info'}
            </motion.h1>
            <motion.div className="flex justify-center space-x-3 mb-4">
              {[1, 2, 3].map((s) => (
                <motion.div
                  key={s}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    backgroundColor: s <= step ? 'rgb(168, 85, 247)' : 'rgb(156, 163, 175)'
                  }}
                  transition={{ duration: 0.2, delay: s * 0.1 }}
                  className="h-1.5 w-12 rounded-full"
                />
              ))}
            </motion.div>
          </div>

          {/* Form Container */}
          <AnimatePresence initial={false} mode="wait" custom={step}>
            <motion.form 
              key={step}
              onSubmit={handleSubmit}
              className="space-y-5 w-full max-w-md mx-auto"
              custom={step}
              variants={formVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              {renderFormStep()}

              {/* Navigation Buttons */}
              <div className="flex space-x-4 mt-8">
                {step > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 py-4 sm:py-3.5 rounded-xl text-purple-500 font-semibold border-2 border-purple-500 
                      hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all duration-300"
                  >
                    Back
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 py-4 sm:py-3.5 rounded-xl text-white font-semibold
                    bg-gradient-to-r from-purple-600 to-pink-500
                    hover:from-purple-700 hover:to-pink-600
                    transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  {step === 3 ? 'Create Account' : 'Continue'}
                </motion.button>
              </div>

              {/* Login Link */}
              {step === 1 && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center text-gray-500 text-sm mt-6"
                >
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-purple-500 hover:text-purple-600 font-semibold transition-colors"
                  >
                    Sign in
                  </button>
                </motion.p>
              )}
            </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// Update InputField component
const InputField = ({ icon, type, name, placeholder, value, onChange, theme }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="relative"
  >
    {React.cloneElement(icon, { 
      className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" 
    })}
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full pl-11 pr-4 py-3.5 rounded-xl outline-none transition-all
        ${theme === 'dark'
          ? 'bg-gray-800/50 focus:bg-gray-800/80 text-white'
          : 'bg-white/50 focus:bg-white text-gray-900'
        }
        border-2 border-transparent focus:border-purple-500
        placeholder-gray-400 text-sm
      `}
      required
    />
  </motion.div>
);

export default SignUp;