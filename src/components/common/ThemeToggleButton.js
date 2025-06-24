// src/components/common/ThemeToggleButton.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { useTheme } from '../../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="link"
      onClick={toggleTheme}
      className="p-0 text-decoration-none"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <FaMoon size={20} className="text-secondary" /> : <FaSun size={20} className="text-warning" />}
    </Button>
  );
};

export default ThemeToggleButton;