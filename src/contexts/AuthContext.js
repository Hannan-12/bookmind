// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      
      // Store user info in localStorage for persistence
      if (user) {
        localStorage.setItem('userEmail', user.email || '');
        // Use displayName from Google if available, otherwise use email prefix
        const username = user.displayName || user.email?.split('@')[0] || 'User';
        localStorage.setItem('username', username);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Check if we have user info in localStorage (for persistence)
  useEffect(() => {
    if (!currentUser) {
      const email = localStorage.getItem('userEmail');
      const username = localStorage.getItem('username');
      
      if (email && username) {
        setCurrentUser({ email, displayName: username });
      }
    }
  }, [currentUser]);

  const value = {
    currentUser,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};