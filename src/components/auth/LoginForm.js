// src/components/auth/LoginForm.js
import React, { useState } from 'react';
import { signInUser, signInWithGoogle } from '../../services/firebase';
import '../../styles/components/AuthForm.css';

const LoginForm = ({ onSuccess, onShowSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userCredential = await signInUser(email, password);
      setSuccessMessage('Login successful! Redirecting...');

      // Store user info
      const user = userCredential.user;
      localStorage.setItem('userEmail', user.email || '');
      const username = user.displayName || user.email?.split('@')[0] || 'User';
      localStorage.setItem('username', username);

      // Notify parent component
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(user);
        }
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);

      // Handle different error codes
      switch(error.code) {
        case 'auth/user-not-found':
        case 'auth/invalid-email':
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please check your credentials.');
          break;
        case 'auth/wrong-password':
          setError('Wrong password. Please try again.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed login attempts. Please try again later or reset your password.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your connection and try again.');
          break;
        default:
          setError(`Login failed: ${error.message}`);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithGoogle();
      setSuccessMessage('Login successful! Redirecting...');

      // Store user info
      const user = result.user;
      localStorage.setItem('userEmail', user.email || '');
      const username = user.displayName || user.email?.split('@')[0] || 'User';
      localStorage.setItem('username', username);

      // Notify parent component
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(user);
        }
      }, 1500);

    } catch (error) {
      console.error('Google login error:', error);

      if (error.code === 'auth/popup-closed-by-user') {
        setError('Google Sign-In cancelled.');
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        setError('An account already exists with this email address using a different sign-in method.');
      } else if (error.code === 'auth/network-request-failed') {
        setError('Network error during Google Sign-In. Please check your connection.');
      } else {
        setError('Google Sign-In failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" id="login-form">
      <div className="form-header">
        <h1>Welcome Back</h1>
        <p>Sign in to access your AI book recommendations</p>
      </div>

      <div className="social-login">
        <div
          className="social-btn"
          id="google-signin-btn"
          title="Sign in with Google"
          onClick={handleGoogleLogin}
        >
          <i>G</i>
        </div>
      </div>

      <div className="divider">
        <span>or sign in with email</span>
      </div>

      {error && <div className="alert error">{error}</div>}
      {successMessage && <div className="alert success">{successMessage}</div>}

      <form id="login" onSubmit={handleEmailLogin}>
        <div className="input-group">
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="forgot-password">
          <button type="button" className="forgot-password-link">Forgot Password?</button>
        </div>

        <button
          type="submit"
          className="btn"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="toggle-form">
        <span>Don't have an account? </span>
        {/* Ensured type is button and onClick uses the prop */}
        <button type="button" className="link-button" onClick={onShowSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default LoginForm;