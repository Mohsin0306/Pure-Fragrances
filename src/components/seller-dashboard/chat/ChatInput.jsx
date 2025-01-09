import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { 
  HiPaperAirplane, 
  HiPaperClip, 
  HiEmojiHappy,
  HiMicrophone,
  HiPhotograph
} from 'react-icons/hi';
import EmojiPicker from 'emoji-picker-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInput = () => {
  const { currentTheme } = useTheme();
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const isMobile = window.innerWidth <= 640;

  const getThemeStyles = () => ({
    container: currentTheme === 'dark' ? 'border-gray-700/50 bg-gray-800/95' : 
               currentTheme === 'eyeCare' ? 'border-[#D4C3AA] bg-[#F5E6D3]/95' : 'border-gray-100 bg-white/95',
    input: currentTheme === 'dark' ? 'bg-gray-700/50 ring-gray-600/30' : 
           currentTheme === 'eyeCare' ? 'bg-[#E8D5BC]/90 ring-[#D4C3AA]/20' : 'bg-gray-50 ring-gray-200/10',
    text: currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900',
    placeholder: currentTheme === 'dark' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-400'
  });

  const themeStyles = getThemeStyles();

  const getEmojiPickerStyles = () => {
    if (isMobile) {
      return `
        fixed left-0 right-0 
        bottom-[76px]
        mx-auto px-4
        z-[100] w-full
        max-h-[45vh]
      `;
    }
    return `
      absolute bottom-[76px] left-1/2 -translate-x-1/2
      w-[500px] min-w-[320px]
      z-50
    `;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      console.log('Sending message:', message);
      setMessage('');
      setShowEmojiPicker(false);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setMessage(prev => prev + emojiObject.emoji);
  };

  const buttonClasses = `
    p-1.5 sm:p-2 rounded-lg sm:rounded-xl 
    transition-all duration-200
    hover:shadow-lg active:scale-95
    ${currentTheme === 'dark'
      ? 'hover:bg-gray-600/70 text-gray-300 hover:text-gray-200' 
      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
    }
  `;

  const handleEmojiButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEmojiPicker(!showEmojiPicker);
    if (!isMobile && textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className={`
      p-2 sm:p-3 border-t backdrop-blur-lg
      ${themeStyles.container}
    `}>
      <div className={`
        flex items-center gap-1.5 sm:gap-2 
        rounded-full p-1 sm:p-1.5
        ${themeStyles.input}
        transition-all duration-200 ease-in-out
        ring-1 
        ${message.trim() ? 'ring-blue-500/30' : ''}
        max-w-screen-xl mx-auto
      `}>
        <div className="flex gap-0.5 sm:gap-1 px-1 sm:px-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={buttonClasses}
          >
            <HiPaperClip className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
          </motion.button>
          
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={buttonClasses}
          >
            <HiPhotograph className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
          </motion.button>

          <div className="relative" ref={emojiPickerRef}>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEmojiButtonClick}
              className={`${buttonClasses} ${showEmojiPicker && (currentTheme === 'dark' ? 'bg-gray-600/70' : 'bg-gray-100')}`}
            >
              <HiEmojiHappy className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </motion.button>

            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={getEmojiPickerStyles()}
                >
                  <div className={`
                    shadow-xl rounded-2xl overflow-hidden
                    ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                    backdrop-blur-lg
                    border ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
                    w-full
                  `}>
                    <EmojiPicker
                      theme={currentTheme === 'dark' ? 'dark' : 'light'}
                      width="100%"
                      height={isMobile ? "35vh" : 400}
                      searchDisabled={isMobile}
                      previewConfig={{
                        showPreview: !isMobile
                      }}
                      lazyLoadEmojis={true}
                      onEmojiClick={(emojiObject) => {
                        onEmojiClick(emojiObject);
                        if (!isMobile) {
                          textareaRef.current?.focus();
                        }
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <input
          ref={textareaRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className={`
            flex-1 bg-transparent outline-none 
            min-w-0 text-sm sm:text-base px-2
            ${themeStyles.text}
            ${themeStyles.placeholder}
          `}
        />
        
        <div className="flex items-center gap-1 px-1">
          {!message.trim() && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRecording(!isRecording)}
              className={`
                p-1.5 sm:p-2 rounded-lg sm:rounded-xl
                transition-all duration-200
                hover:shadow-lg active:scale-95
                ${isRecording 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : buttonClasses
                }
              `}
            >
              <HiMicrophone className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </motion.button>
          )}
          
          {message.trim() && (
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-1.5 sm:p-2 rounded-lg sm:rounded-xl
                transition-all duration-200
                hover:shadow-lg active:scale-95
                bg-blue-500 text-white hover:bg-blue-600
              `}
            >
              <HiPaperAirplane className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput; 