// src/pages/ContactPage.js
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ThemeToggle from '../components/layout/ThemeToggle';
import '../styles/pages/Contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    message: '',
    type: '' // 'success' or 'error'
  });
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        message: 'Please fill in all required fields.',
        type: 'error'
      });
      return;
    }
    
    // In a real app, you would send this data to your backend or a service like Formspree
    // For this example, we'll just simulate a successful submission
    console.log('Form data submitted:', formData);
    
    // Show success message
    setFormStatus({
      message: 'Thank you for your message! We will get back to you soon.',
      type: 'success'
    });
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <>
      <ThemeToggle />
      <Header />
      
      <div className="main-content contact-container">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Whether you have a question, suggestion, or just want to say hello, feel free to reach out.</p>
        
        <div className="contact-methods">
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            
            {formStatus.message && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.message}
              </div>
            )}
            
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contactName">Name</label>
                <input 
                  type="text" 
                  id="contactName" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contactEmail">Email</label>
                <input 
                  type="email" 
                  id="contactEmail" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contactSubject">Subject</label>
                <input 
                  type="text" 
                  id="contactSubject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contactMessage">Message</label>
                <textarea 
                  id="contactMessage" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
          
          <div className="contact-info-section">
            <h2>Other Ways to Reach Us</h2>
            <p><strong>Email:</strong> <a href="mailto:mhannanhafeez@icloud.com">mhannanhafeez@icloud.com</a></p>
            <p><strong>Address:</strong> BookMind Headquarters, 123 Reading Lane, Literary City, BC 98765</p>
            <p><strong>Support Hours:</strong> Monday to Friday, 9 AM - 5 PM Eastern Time</p>
            <p><strong>Follow Us:</strong> You can also connect with us on our social media channels for the latest updates and book discussions.</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ContactPage;