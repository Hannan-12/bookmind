// src/pages/ProfilePage.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ThemeToggle from '../components/layout/ThemeToggle';
import '../styles/pages/Profile.css';

const ProfilePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    bio: '',
    favoriteGenres: []
  });
  const [successMessage, setSuccessMessage] = useState('');
  const avatarUploadRef = useRef(null);
  const [avatarSrc, setAvatarSrc] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Load user data from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const storedData = JSON.parse(localStorage.getItem('userData') || '{}');
      const email = localStorage.getItem('userEmail') || '';
      const fullName = storedData.fullName || localStorage.getItem('username') || ''; // Also check username as fallback
      const bio = storedData.bio || '';
      const favoriteGenres = storedData.favoriteGenres || [];
      const savedAvatarSrc = storedData.avatarSrc || null;

      setUserData({ fullName, email, bio, favoriteGenres });
      setAvatarSrc(savedAvatarSrc);
    }
  }, [isAuthenticated]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'favoriteGenres') {
      // Handle multi-select
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      setUserData(prev => ({ ...prev, [name]: selectedOptions }));
    } else {
      setUserData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle avatar upload click
  const handleAvatarClick = () => {
    avatarUploadRef.current.click();
  };

  // Handle new avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- New Function to Remove Avatar ---
  const handleRemoveAvatar = (e) => {
    e.stopPropagation(); // Prevent triggering the file upload input
    setAvatarSrc(null); // Clear the avatar source state
     // Optional: Immediately update localStorage if desired,
     // otherwise handleSubmit will handle the final save.
     // const currentData = JSON.parse(localStorage.getItem('userData') || '{}');
     // currentData.avatarSrc = null;
     // localStorage.setItem('userData', JSON.stringify(currentData));
  };
  // --- End New Function ---

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to save, ensuring avatarSrc reflects current state
    const dataToSave = {
      ...userData,
      avatarSrc: avatarSrc // Use the current state value
    };

    localStorage.setItem('userData', JSON.stringify(dataToSave));
    // Also update the stored username if the fullName changed
    if (userData.fullName) {
        localStorage.setItem('username', userData.fullName);
    }
    setSuccessMessage('Profile saved successfully!');

    // Clear message after a delay
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Get initial for avatar if no avatar image
  const getInitial = () => {
    // Prioritize fullName from state if available
    if (userData.fullName) {
      return userData.fullName.charAt(0).toUpperCase();
    }
    // Fallback to username from localStorage
    const username = localStorage.getItem('username') || 'User'; // Default to 'User'
    return username.charAt(0).toUpperCase();
  };

  return (
    <>
      <ThemeToggle />
      <Header />

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-container">
            <input
              type="file"
              id="avatarUpload"
              ref={avatarUploadRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
            <div className="profile-avatar" id="profileAvatar" onClick={handleAvatarClick}>
              {avatarSrc ? (
                <img src={avatarSrc} alt="Profile" />
              ) : (
                <span className="avatar-initial">{getInitial()}</span>
              )}
              <div className="avatar-overlay">
                <span>Change Photo</span>
              </div>
            </div>
             {/* --- Conditionally Render Remove Button --- */}
             {avatarSrc && (
                <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="remove-avatar-button"
                    title="Remove profile photo"
                >
                    ✕
                </button>
             )}
             {/* --- End Remove Button --- */}
          </div>
          <h1 id="profileName">
            {/* Display fullName from state, fallback to localStorage username */}
            {userData.fullName || localStorage.getItem('username') || 'User'}
          </h1>
        </div>

        <div className="profile-details">
          {successMessage && (
            <div className="alert success">{successMessage}</div>
          )}

          <form id="profileForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={userData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                // Email should ideally not be changed here if it's the login identifier
                // onChange={handleChange}
                placeholder="Enter your email"
                readOnly // Keep email read-only as it's tied to auth
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="favoriteGenres">Favorite Genres</label>
              <select
                id="favoriteGenres"
                name="favoriteGenres"
                value={userData.favoriteGenres}
                onChange={handleChange}
                multiple
              >
                <option value="fiction">Fiction</option>
                <option value="scifi">Science Fiction</option>
                <option value="mystery">Mystery</option>
                <option value="fantasy">Fantasy</option>
                <option value="nonfiction">Non-Fiction</option>
                <option value="history">History</option>
                <option value="biography">Biography</option>
                <option value="romance">Romance</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn">Save Profile</button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfilePage;