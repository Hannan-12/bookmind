// src/components/layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms of Service</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <p className="copyright">&copy; {new Date().getFullYear()} BookMind - AI Book Recommendation System</p>
      </div>
    </footer>
  );
};

export default Footer;