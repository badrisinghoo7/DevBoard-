import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('devboard-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      
      // Save theme preference to localStorage
      localStorage.setItem('devboard-theme', newMode ? 'dark' : 'light');
      
      // Toggle body class for global theme styles
      if (newMode) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
      
      return newMode;
    });
  };

  const value = {
    isDarkMode,
    toggleTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
