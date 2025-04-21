// src/components/auth/SignupForm.js
import React, { useState } from 'react';
import { createUser } from '../../services/firebase';
// *** FIXED IMPORT PATH ***
import '../../styles/components/AuthForm.css'; // Use singular 'AuthForm.css'

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
      await createUser(email, password);
      setSuccessMessage('Account created successfully! You can now log in.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(); // Call onSuccess to potentially close the modal/switch view
        }
      }, 2000);
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

  return (
    // The main overlay div
    <div className="overlay" id="signup-form">

      {/* The FORM element now acts as the modal content box */}
      <form id="signup" onSubmit={handleSignup}>
        {/* Close button positioned relative to the form box */}
        <span className="close-overlay" onClick={onShowLogin}>✕</span>

        {/* Header is NOW INSIDE the form box */}
        <div className="form-header">
          <h1>Create Account</h1>
          <p>Join BookMind for personalized book recommendations</p>
        </div>

        {/* Alerts are NOW INSIDE the form box */}
        {error && <div className="alert error">{error}</div>}
        {successMessage && <div className="alert success">{successMessage}</div>}

        {/* Input groups remain inside the form */}
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
          className="btn" // Removed id="submit" as it's not needed
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

         {/* Toggle link is NOW INSIDE the form box */}
         <div className="toggle-form">
            <span>Already have an account? </span>
            {/* Use button for accessibility */}
            <button type="button" className="link-button" onClick={onShowLogin}>
              Sign In
            </button>
         </div>

      </form> {/* End of the form element */}

    </div> // End of the overlay div
  );
};

export default SignupForm;