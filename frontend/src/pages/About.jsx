import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About DevBoard</h1>
        <ThemeToggle />
      </header>
      
      <main className="about-content">
        <section className="about-section">
          <h2>What is DevBoard?</h2>
          <p>
            DevBoard is a personal dashboard designed specifically for developers.
            It provides a clean, focused interface for managing your developer profile
            and status updates.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Features</h2>
          <ul>
            <li>Secure authentication system</li>
            <li>Dark/light theme toggle with preference saving</li>
            <li>Developer status updates</li>
            <li>Profile management</li>
            <li>Responsive design that works on all devices</li>
          </ul>
        </section>
        
        <section className="about-section">
          <h2>Technology Stack</h2>
          <p>
            DevBoard is built with React, using modern features like Context API,
            React Hooks (useState, useEffect, useRef, useContext), and React Router
            for navigation.
          </p>
        </section>
      </main>
      
      <footer className="about-footer">
        <Link to="/" className="home-link">Back to Home</Link>
      </footer>
    </div>
  );
};

export default About;
