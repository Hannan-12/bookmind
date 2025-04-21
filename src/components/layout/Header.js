// src/components/layout/Header.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logoutUser } from '../../services/firebase';
import '../../styles/components/Header.css';

const Header = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close user dropdown if clicking outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      
      // Close mobile menu if clicking outside
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          !event.target.classList.contains('mobile-toggle')) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  const handleLogout = async () => {
    try {
      await logoutUser();
      // Clear stored data
      localStorage.removeItem('userEmail');
      localStorage.removeItem('username');
      localStorage.removeItem('userData');
      
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Get user's first initial for avatar
  const getInitial = () => {
    if (!currentUser) return 'U';
    
    const username = currentUser.displayName || 
                    localStorage.getItem('username') || 
                    currentUser.email?.split('@')[0] || 
                    'User';
    
    return username.charAt(0).toUpperCase();
  };
  
  return (
    <header>
      <div className="navbar">
        <Link to="/" className="logo">
          <span className="logo-icon">📚</span>
          BookMind
        </Link>
        
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
        
        <ul ref={menuRef} className={`menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/categories" 
              className={location.pathname === '/categories' ? 'active' : ''}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link 
              to="/privacy" 
              className={location.pathname === '/privacy' ? 'active' : ''}
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={location.pathname === '/contact' ? 'active' : ''}
            >
              Contact
            </Link>
          </li>
        </ul>
        
        {isAuthenticated ? (
          <div 
            className="user-profile" 
            id="userProfileMenu"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            ref={dropdownRef}
          >
            <div className="user-avatar">{getInitial()}</div>
            <span id="username">
              {currentUser?.displayName || 
               localStorage.getItem('username') || 
               currentUser?.email?.split('@')[0] || 
               'User'}
            </span>
            
            <div className={`dropdown ${userDropdownOpen ? 'active' : ''}`} id="userDropdown">
              <Link to="/profile" className="dropdown-item">Profile</Link>
              <Link to="/my-books" className="dropdown-item">My Books</Link>
              <Link to="/settings" className="dropdown-item">Settings</Link>
              <button onClick={handleLogout} className="dropdown-item logout">Logout</button>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn-login">Login</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;