// src/pages/AboutPage.js
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ThemeToggle from '../components/layout/ThemeToggle';
import '../styles/pages/About.css';

const AboutPage = () => {
  return (
    <>
      <ThemeToggle />
      <Header />
      
      <div className="main-content about-container">
        <h1>About BookMind</h1>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At BookMind, our mission is to connect readers with books they'll truly love 
            through personalized, intelligent recommendations. We believe that the perfect 
            book can change your life, inspire new ideas, and transport you to worlds you've 
            never imagined. Our goal is to make finding that perfect book as effortless and 
            enjoyable as reading it.
          </p>
        </section>
        
        <section className="about-section">
          <h2>How It Works</h2>
          <p>
            BookMind's sophisticated AI analyzes your reading history, ratings, and preferences 
            to suggest titles tailored specifically to your taste. Our recommendation algorithm 
            goes beyond simple genre matching, considering writing style, themes, complexity, 
            and emotional resonance to find books that truly align with your unique reading 
            personality. The more you interact with BookMind, the more accurate our suggestions 
            become, creating a virtuous cycle of discovery.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2025 by a team of avid readers and technology enthusiasts, BookMind 
            started with a simple idea: make book discovery effortless and exciting. Our founders 
            were frustrated by recommendation systems that kept suggesting the same popular titles 
            rather than helping readers explore the vast world of literature. By combining their 
            passion for books with expertise in artificial intelligence, they created BookMind—a 
            platform that understands not just what books you've enjoyed, but why you enjoyed them.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Meet the Team</h2>
          <p>
            Our diverse team brings together expertise in machine learning, literature, library 
            science, and user experience design. United by our love of reading, we're dedicated 
            to creating the most intelligent and personalized book recommendation platform 
            available. BookMind is developed by a passionate group of individuals who believe 
            that the right book finding the right reader is a form of magic worth pursuing.
          </p>
          
          {/* If you want to add actual team members here */}
          {/* 
          <div className="team-members">
            <div className="team-member">
              <img src="/images/team-member1.jpg" alt="Team Member Name" />
              <h3>Name</h3>
              <p>Position</p>
            </div>
          </div>
          */}
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default AboutPage;