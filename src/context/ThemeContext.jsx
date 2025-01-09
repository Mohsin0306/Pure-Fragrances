import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  light: {
    name: 'light',
    background: 'bg-gray-50',
    sidebar: 'bg-white',
    text: 'text-gray-800',
    border: 'border-gray-200',
    card: 'bg-white',
    hover: 'hover:bg-gray-100',
    activeLink: 'bg-indigo-500 text-white',
    transition: 'transition-colors duration-200',
  },
  dark: {
    name: 'dark',
    background: 'bg-gray-900',
    sidebar: 'bg-gray-900',
    text: 'text-gray-100',
    border: 'border-gray-800',
    card: 'bg-gray-800',
    hover: 'hover:bg-gray-800',
    activeLink: 'bg-indigo-600 text-white',
    transition: 'transition-colors duration-200',
  },
  eyeCare: {
    name: 'eyeCare',
    background: 'bg-[#F5E6D3]',
    sidebar: 'bg-[#F5E6C8]',
    text: 'text-[#433422]',
    border: 'border-[#E6D5B8]',
    card: 'bg-[#E6D5BC]',
    hover: 'hover:bg-[#D4C3AA]',
    activeLink: 'bg-[#A89078] text-white',
    transition: 'transition-colors duration-200',
  }
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const theme = themes[currentTheme];

  const toggleTheme = (themeName) => {
    setCurrentTheme(themeName);
  };

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const getThemeClass = (theme, element) => {
  return themes[theme]?.[element] || themes.light[element];
}; 