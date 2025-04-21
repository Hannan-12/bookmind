// src/pages/CategoryPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getBooksByCategory, searchBooks } from '../services/bookApi';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ThemeToggle from '../components/layout/ThemeToggle';
import SearchBar from '../components/books/SearchBar';
import BookGrid from '../components/books/BookGrid';
import '../styles/pages/Category.css';

const CategoryPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('fiction');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get category from URL hash if present
  useEffect(() => {
    if (location.hash && location.hash.length > 1) {
      const hashCategory = decodeURIComponent(location.hash.substring(1));
      setActiveCategory(hashCategory);
    }
  }, [location.hash]);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Load books when active category changes
  useEffect(() => {
    const loadCategoryBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const categoryBooks = await getBooksByCategory(activeCategory, 12);
        setBooks(categoryBooks);
      } catch (err) {
        console.error('Error loading category books:', err);
        setError('Failed to load books. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (isAuthenticated && activeCategory) {
      loadCategoryBooks();
    }
  }, [isAuthenticated, activeCategory]);
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Update URL hash
    window.location.hash = category;
  };
  
  // Handle search
  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const results = await searchBooks(query, 20);
      setBooks(results);
      
      // Clear active category when searching
      setActiveCategory('');
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const categories = [
    { id: 'fiction', name: 'Fiction' },
    { id: 'history', name: 'History' },
    { id: 'science', name: 'Science' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'programming', name: 'Programming' },
    { id: 'mystery', name: 'Mystery' },
    { id: 'romance', name: 'Romance' },
    { id: 'thriller', name: 'Thriller' }
  ];
  
  return (
    <>
      <ThemeToggle />
      <Header />
      
      <section className="hero">
        <div className="hero-content">
          <h1>Explore Book Categories</h1>
          <p>Dive into a world of diverse genres and discover your next literary adventure.</p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>
      
      <div className="main-content">
        <nav className="category-nav">
          <ul className="category-list">
            {categories.map(category => (
              <li key={category.id}>
                <a 
                  href={`#${category.id}`}
                  data-category={category.id}
                  className={`category-link ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <section id="category-results">
          <BookGrid books={books} loading={loading} error={error} />
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default CategoryPage;