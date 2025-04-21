// src/components/ui/LoadingMessage.js
import React from 'react';
import '../../styles/components/LoadingMessage.css';

const LoadingMessage = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-message">
      {message}
    </div>
  );
};

export default LoadingMessage;