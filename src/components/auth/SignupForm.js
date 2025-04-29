// src/components/auth/SignupForm.js
import React, { useState } from 'react';
import { createUser } from '../../services/firebase';
// Ensure correct import path for styles
import '../../styles/components/AuthForm.css';

const SignupForm = ({ onSuccess, onShowLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage(''); // Clear previous success message

    try {
      // NOTE: You might want to update the user's profile with the 'name' here
      // using updateProfile from firebase/auth after user creation.
      // For now, it just creates the user with email/password.
      await createUser(email, password);
      setSuccessMessage('Account created successfully! You can now log in.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        if (onSuccess) {
          // onSuccess might be used to close the modal or switch view
          // In LoginPage, it's set to setShowSignup(false)
          onSuccess();
        }
        // Optionally call onShowLogin directly if you want to switch
        // to the login view immediately after success message.
        // if (onShowLogin) onShowLogin();
      }, 2000); // Show success message for 2 seconds
    } catch (error) {
      console.error('Signup error:', error);
      switch(error.code) {
        case 'auth/email-already-in-use':
          setError('This email address is already registered.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak (minimum 6 characters).');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check connection.');
          break;
        default:
          setError(`Signup failed: ${error.message}`);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  // This component renders the overlay div, which is then
  // conditionally rendered by the parent (LoginPage)
  return (
    <div className="overlay" id="signup-form">

      {/* The FORM element acts as the modal content box */}
      <form id="signup" onSubmit={handleSignup}>
        {/* Close button positioned relative to the form box */}
        {/* Calls onShowLogin which should set showSignup to false in parent */}
        <span className="close-overlay" onClick={onShowLogin}>✕</span>

        <div className="form-header">
          <h1>Create Account</h1>
          <p>Join BookMind for personalized book recommendations</p>
        </div>

        {error && <div className="alert error">{error}</div>}
        {successMessage && <div className="alert success">{successMessage}</div>}

        <div className="input-group">
          <label htmlFor="signup-name">Full Name</label>
          <input
            type="text"
            id="signup-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="signup-email">Email</label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="signup-password">Password</label>
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="signup-confirm">Confirm Password</label>
          <input
            type="password"
            id="signup-confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          className="btn"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

         <div className="toggle-form">
            <span>Already have an account? </span>
            {/* Calls onShowLogin which should set showSignup to false in parent */}
            <button type="button" className="link-button" onClick={onShowLogin}>
              Sign In
            </button>
         </div>

      </form> {/* End of the form element */}

    </div> // End of the overlay div
  );
};

export default SignupForm;