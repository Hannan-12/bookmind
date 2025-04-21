// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getRecommendedBooks, getTrendingBooks, searchBooks } from '../services/bookApi';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ThemeToggle from '../components/layout/ThemeToggle';
import SearchBar from '../components/books/SearchBar';
import BookGrid from '../components/books/BookGrid';
import WelcomeBox from '../components/ui/WelcomeBox';
import '../styles/pages/Home.css';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState({
    recommendations: true,
    trending: true,
    search: false
  });
  const [error, setError] = useState({
    recommendations: null,
    trending: null,
    search: null
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Load initial book data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Fetch recommendations
        setLoading(prev => ({ ...prev, recommendations: true }));
        const recBooks = await getRecommendedBooks();
        setRecommendations(recBooks);
        setError(prev => ({ ...prev, recommendations: null }));
      } catch (err) {
        console.error('Error loading recommendations:', err);
        setError(prev => ({ ...prev, recommendations: 'Failed to load recommendations' }));
      } finally {
        setLoading(prev => ({ ...prev, recommendations: false }));
      }

      try {
        // Fetch trending books
        setLoading(prev => ({ ...prev, trending: true }));
        const trending = await getTrendingBooks();
        setTrendingBooks(trending);
        setError(prev => ({ ...prev, trending: null }));
      } catch (err) {
        console.error('Error loading trending books:', err);
        setError(prev => ({ ...prev, trending: 'Failed to load trending books' }));
      } finally {
        setLoading(prev => ({ ...prev, trending: false }));
      }
    };

    if (isAuthenticated) {
      loadInitialData();
    }
  }, [isAuthenticated]);

  // Handle search
  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      setLoading(prev => ({ ...prev, search: true }));
      setShowSearchResults(true);
      setError(prev => ({ ...prev, search: null }));

      const results = await searchBooks(query, 20);
      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
      setError(prev => ({ ...prev, search: 'Search failed. Please try again.' }));
    } finally {
      setLoading(prev => ({ ...prev, search: false }));
    }
  };

  return (
    <>
      <ThemeToggle />
      <Header />
      
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Books You'll Love</h1>
          <p>Our AI analyzes your reading preferences to recommend books tailored just for you. Start your personalized reading journey today.</p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <div className="main-content">
        {isAuthenticated && <WelcomeBox />}

        {showSearchResults && (
          <section id="search-results">
            <h2 className="section-title">Search Results</h2>
            <BookGrid 
              books={searchResults} 
              loading={loading.search} 
              error={error.search} 
            />
          </section>
        )}

        {!showSearchResults && (
          <>
            <section id="recommendations" className="section-header">
              <h2 className="section-title">Your Recommendations</h2>
              <button className="view-all">View All <span>→</span></button>
            </section>
            
            <BookGrid 
              books={recommendations} 
              loading={loading.recommendations} 
              error={error.recommendations} 
            />

            <hr className="section-divider" />

            <section id="trending" className="section-header">
              <h2 className="section-title">Trending Now</h2>
              <button className="view-all">View All <span>→</span></button>
            </section>
            
            <BookGrid 
              books={trendingBooks} 
              loading={loading.trending} 
              error={error.trending} 
            />
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default HomePage;