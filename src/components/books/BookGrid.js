// src/components/books/BookGrid.js
import React from 'react';
import BookCard from './BookCard';
import '../../styles/components/BookGrid.css';

const BookGrid = ({ books, loading, error }) => {
  // Show loading message
  if (loading) {
    return (
      <div className="book-grid">
        <p className="loading-message">Loading books...</p>
      </div>
    );
  }
  
  // Show error message
  if (error) {
    return (
      <div className="book-grid">
        <p className="error-message">
          Could not load books. Please try again later.
        </p>
      </div>
    );
  }
  
  // Show "no results" message if no books found
  if (!books || books.length === 0) {
    return (
      <div className="book-grid">
        <p className="no-results-message">No books found.</p>
      </div>
    );
  }
  
  // Render the book grid
  return (
    <div className="book-grid">
      {books.map((book, index) => (
        <BookCard key={`${book.key || index}`} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;