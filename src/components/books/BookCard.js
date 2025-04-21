// src/components/books/BookCard.js
import React, { useState } from 'react';
import { getBookCoverUrl, getBookDetailsUrl } from '../../services/bookApi';
import '../../styles/components/BookCard.css';

const BookCard = ({ book }) => {
  const [imageError, setImageError] = useState(false);
  
  // Extract book data with defaults
  const title = book.title || 'Title not available';
  const authors = book.author_name ? book.author_name.join(', ') : 'Author not available';
  const coverId = book.cover_i;
  const rating = book.ratings_average ? book.ratings_average.toFixed(1) : 'N/A';
  const genre = book.subject ? book.subject[0] : 'Unknown';
  
  // Generate URLs
  const bookUrl = getBookDetailsUrl(book.key);
  
  // Create placeholder URL with title for missing covers
  const getPlaceholderUrl = () => {
    return `https://via.placeholder.com/180x250.png?text=${encodeURIComponent(title.substring(0, 15))}`;
  };
  
  // Get the appropriate cover URL
  const coverUrl = coverId && !imageError 
    ? getBookCoverUrl(coverId) 
    : getPlaceholderUrl();
  
  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div className="book-card">
      <div 
        className="book-cover" 
        style={{ backgroundImage: `url('${coverUrl}')` }}
      >
        <img 
          src={coverUrl} 
          alt={`Cover for ${title}`} 
          style={{ display: 'none' }} 
          onError={handleImageError}
        />
        <div className="book-rating">
          ★ <span>{rating}</span>
        </div>
      </div>
      
      <div className="book-details">
        <div>
          <h3 className="book-title" title={title}>{title}</h3>
          <p className="book-author">By {authors}</p>
        </div>
        <div>
          <span className="book-genre">{genre}</span>
          <a 
            href={bookUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="read-button"
          >
            Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;