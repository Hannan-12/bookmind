// src/pages/PrivacyPage.js
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ThemeToggle from '../components/layout/ThemeToggle';
import '../styles/pages/Privacy.css';

const PrivacyPage = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
  
  return (
    <>
      <ThemeToggle />
      <Header />
      
      <div className="main-content privacy-container">
        <h1>Privacy Policy</h1>
        <p><em>Last Updated: {formattedDate}</em></p>
        
        <section className="privacy-section">
          <h2>Introduction</h2>
          <p>
            This Privacy Policy describes how BookMind ("we," "our," or "us") collects, uses, 
            and protects information obtained from users of our website and services. At BookMind, 
            we are committed to protecting your privacy and providing a safe online experience. 
            By using our services, you agree to the collection and use of information in 
            accordance with this policy.
          </p>
        </section>
        
        <section className="privacy-section">
          <h2>Information We Collect</h2>
          <p>
            We collect several types of information from and about users of our website, including:
          </p>
          <ul>
            <li>
              <strong>Account Information:</strong> Name, email address, password (securely hashed), 
              and optional profile details you choose to provide.
            </li>
            <li>
              <strong>Reading Preferences and Activity:</strong> Books you've read, ratings you've given, 
              genres you've explored, and your reading preferences.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type, operating system, device 
              information, and other technology identifiers from the devices you use to access our services.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact with our website, including 
              pages visited, features used, and time spent on the platform.
            </li>
            <li>
              <strong>Cookies and Similar Technologies:</strong> We use cookies to enhance your experience, 
              analyze usage patterns, and provide personalized recommendations.
            </li>
          </ul>
        </section>
        
        <section className="privacy-section">
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          <ul>
            <li>To provide personalized book recommendations tailored to your preferences and reading history.</li>
            <li>To create, maintain, and secure your account with us.</li>
            <li>To improve our website, services, and user experience.</li>
            <li>To analyze usage patterns and optimize our recommendation algorithms.</li>
            <li>To communicate with you about your account, updates to our services, and responses to your inquiries.</li>
            <li>To send you newsletters and marketing communications (if you've opted in).</li>
            <li>To comply with legal obligations and enforce our terms of service.</li>
          </ul>
        </section>
        
        <section className="privacy-section">
          <h2>Data Sharing</h2>
          <p>
            We take your privacy seriously and do not sell your personal information to third parties. 
            However, we may share your information in the following circumstances:
          </p>
          <ul>
            <li>With service providers who help us operate our platform (e.g., hosting, analytics, customer support).</li>
            <li>When required by law or to protect our rights and safety.</li>
            <li>With your consent or at your direction.</li>
            <li>In the event of a business transaction such as a merger or acquisition.</li>
          </ul>
          <p>
            Any third parties with whom we share your data are contractually obligated to use it only for 
            the specified services and to maintain appropriate security measures.
          </p>
        </section>
        
        <section className="privacy-section">
          <h2>Your Choices and Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>
          <ul>
            <li>Accessing, correcting, or deleting your personal information.</li>
            <li>Objecting to or restricting certain processing activities.</li>
            <li>Receiving a copy of your data in a portable format.</li>
            <li>Withdrawing consent for optional data processing activities.</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
          </p>
        </section>
        
        <section className="privacy-section">
          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal 
            information from unauthorized access, disclosure, alteration, or destruction. However, 
            no internet transmission or electronic storage method is 100% secure, and we cannot 
            guarantee absolute security.
          </p>
        </section>
        
        <section className="privacy-section">
          <h2>Cookies</h2>
          <p>
            Our website uses cookies and similar technologies to enhance user experience, analyze usage, 
            and enable personalized features. You can control cookies through your browser settings, but 
            disabling cookies may limit your ability to use some features of our site.
          </p>
        </section>
        
        <section className="privacy-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes to our practices or 
            for other operational, legal, or regulatory reasons. We will notify you of any material changes 
            by posting the new policy on this page and updating the "Last Updated" date. We encourage you 
            to review this policy periodically.
          </p>
        </section>
        
        <section className="privacy-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p><a href="mailto:privacy@bookmind-example.com">privacy@bookmind-example.com</a></p>
          <p>
            BookMind<br />
            Attn: Privacy Officer<br />
            123 Reading Lane<br />
            Literary City, BC 98765
          </p>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default PrivacyPage;