
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from '../components/layout/ThemeToggle';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import '../styles/pages/Login.css';

const LoginPage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Toggle between login and signup forms - used by LoginForm
  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  // Handle successful login/signup
  const handleAuthSuccess = (user) => {
    // Redirect to home page after successful login
    navigate('/');
  };

  return (
    <div className="login-page">
      <ThemeToggle />
      
      <div className="container">
        <LoginForm 
          onSuccess={handleAuthSuccess} 
          onShowSignup={toggleSignup} 
        />
        
        {showSignup && (
          <SignupForm 
            onSuccess={() => setShowSignup(false)} 
            onShowLogin={() => setShowSignup(false)} 
          />
        )}
        
        <div className="image-container">
          <div className="image-content">
            <h2>BookMind</h2>
            <p>Discover books that match your unique taste with our AI-powered recommendation system.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;