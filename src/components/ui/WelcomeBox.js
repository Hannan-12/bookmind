// src/components/ui/WelcomeBox.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/components/WelcomeBox.css';

const WelcomeBox = () => {
  const { currentUser } = useAuth();
  
  // Get username from currentUser or localStorage
  const username = currentUser?.displayName || 
                  localStorage.getItem('username') || 
                  currentUser?.email?.split('@')[0] || 
                  'User';
  
  return (
    <div className="welcome-box">
      <div className="welcome-text">
        <h2>Welcome back, <span id="welcomeUsername">{username}</span>!</h2>
        <p>Ready to discover your next favorite book? We have new recommendations based on your reading history.</p>
      </div>
      <div className="welcome-actions">
        <Link to="/#recommendations" className="btn">View Recommendations</Link>
        <Link to="/profile" className="btn btn-outline">Update Preferences</Link>
      </div>
    </div>
  );
};

export default WelcomeBox;