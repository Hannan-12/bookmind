// src/components/books/SearchBar.js
import React, { useState, useEffect, useRef } from 'react';
import { getAutocompleteSuggestions } from '../../services/bookApi';
import '../../styles/components/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // Remove loading state as it's causing issues:
  // const [loading, setLoading] = useState(false);
  const suggestionsRef = useRef(null);
  const searchInputRef = useRef(null);
  const timeoutRef = useRef(null);
  
  // Fetch suggestions when query changes
  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Don't fetch if query is too short
    if (query.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    // Debounce the API call
    timeoutRef.current = setTimeout(async () => {
      // Remove references to loading state:
      // setLoading(true);
      try {
        const results = await getAutocompleteSuggestions(query);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } 
      // Remove loading state reference:
      // finally {
      //   setLoading(false);
      // }
    }, 300);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query]);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target) &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };
  
  // Select a suggestion
  const handleSelectSuggestion = (suggestion) => {
    const title = suggestion.title || '';
    setQuery(title);
    onSearch(title);
    setShowSuggestions(false);
  };
  
  return (
    <div className="search-container">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or genre"
          autoComplete="off"
        />
        <button type="submit">Search</button>
        
        {/* Autocomplete suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef} 
            className={`autocomplete-list ${showSuggestions ? 'active' : ''}`}
          >
            {suggestions.map((suggestion, index) => {
              const title = suggestion.title || 'Unknown Title';
              const authors = Array.isArray(suggestion.author_name) 
                ? suggestion.author_name.join(', ') 
                : (suggestion.author_name || 'Unknown Author');
              
              return (
                <div 
                  key={`suggestion-${index}`}
                  className="autocomplete-item"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <div className="suggestion-details">
                    <span className="suggestion-title" title={title}>
                      {title}
                    </span>
                    <span className="suggestion-author">
                      {authors}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;