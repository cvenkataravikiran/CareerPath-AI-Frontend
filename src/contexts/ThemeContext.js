// src/contexts/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Default to system preference, fallback to light
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(prefersDark ? 'dark' : 'light');

 useEffect(() => {
    // Apply the theme to the root element
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Expose setTheme to allow direct theme manipulation (e.g., on logout)
  const value = { theme, toggleTheme, setTheme };

   return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};