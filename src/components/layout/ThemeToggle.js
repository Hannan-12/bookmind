// src/components/layout/ThemeToggle.js
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/components/ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <button 
        id="light-mode" 
        className={!darkMode ? 'active' : ''} 
        onClick={() => toggleTheme(false)}
      >
        ☀️
      </button>
      <button 
        id="dark-mode" 
        className={darkMode ? 'active' : ''} 
        onClick={() => toggleTheme(true)}
      >
        🌙
      </button>
    </div>
  );
};

export default ThemeToggle;