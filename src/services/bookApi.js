// src/services/bookApi.js
const API_BASE_URL = 'https://openlibrary.org';

// Fetch books based on search query
export const searchBooks = async (query, maxResults = 10, page = 1, sort = null) => {
  try {
    let url = `${API_BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=${maxResults}&page=${page}&fields=key,title,author_name,cover_i,ratings_average,subject,first_publish_year`;
    
    if (sort) {
      url += `&sort=${sort}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching books:', query, error);
    return [];
  }
};

// Fetch books by category/subject
export const getBooksByCategory = async (category, maxResults = 12, page = 1) => {
  try {
    return await searchBooks(`subject:"${category}" AND language:eng`, maxResults, page);
  } catch (error) {
    console.error('Error fetching category books:', category, error);
    return [];
  }
};

// Fetch recommended books (mix of fiction and mystery with high ratings)
export const getRecommendedBooks = async () => {
  try {
    const fiction = await searchBooks('subject:fiction AND language:eng', 3, Math.floor(Math.random() * 5) + 1, 'rating');
    const mystery = await searchBooks('subject:mystery AND language:eng', 3, Math.floor(Math.random() * 5) + 1, 'rating');
    
    // Combine, shuffle, and limit
    const recommendations = [...fiction, ...mystery]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    
    return recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};

// Fetch trending/newest books
export const getTrendingBooks = async () => {
  try {
    return await searchBooks('language:eng', 6, 1, 'new');
  } catch (error) {
    console.error('Error fetching trending books:', error);
    return [];
  }
};

// Fetch autocomplete suggestions
export const getAutocompleteSuggestions = async (query) => {
  try {
    const url = `${API_BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=7&fields=key,title,author_name`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    return [];
  }
};

// Get a book cover URL
export const getBookCoverUrl = (coverId, size = 'M') => {
  if (!coverId) {
    return null;
  }
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

// Get a book details URL
export const getBookDetailsUrl = (key) => {
  if (!key) {
    return '#';
  }
  return `https://openlibrary.org${key}`;
};