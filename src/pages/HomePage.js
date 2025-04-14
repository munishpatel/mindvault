import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

// Image sources (download these from Unsplash):
// Journal: https://unsplash.com/photos/a-notebook-and-pen-on-a-table-6kajEqr84iQ
// Checklist: https://unsplash.com/photos/a-person-holding-a-passport-and-a-pen-8BkF0sTC6Uo
// Planner: https://unsplash.com/photos/a-person-holding-a-planner-and-a-pen-7okkFhxrxNw

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="logo-container">
          <h1>MindVault</h1>
          <div className="logo-accent"></div>
        </div>
        <p className="tagline">Your Offline Personal Knowledge Base</p>
        <div className="header-decoration">
          <div className="decoration-circle"></div>
          <div className="decoration-circle"></div>
          <div className="decoration-circle"></div>
        </div>
      </header>

      <main className="homepage-grid">
        <Link to="/journal" className="card">
          <div className="card-image journal-image"></div>
          <div className="card-content">
            <h2>Trip Journal</h2>
            <p>Write rich-text notes and reflections. Works fully offline.</p>
            <span className="card-cta">Start Writing →</span>
          </div>
        </Link>
        <Link to="/checklist" className="card">
          <div className="card-image checklist-image"></div>
          <div className="card-content">
            <h2>Packing Checklist</h2>
            <p>Organize your travel items with customizable categories.</p>
            <span className="card-cta">Get Organized →</span>
          </div>
        </Link>
        <Link to="/planner" className="card">
          <div className="card-image planner-image"></div>
          <div className="card-content">
            <h2>Daily Planner</h2>
            <p>Track tasks and habits with offline progress tracking.</p>
            <span className="card-cta">Plan Your Day →</span>
          </div>
        </Link>
      </main>

      <footer className="homepage-footer">
        <p>&copy; 2025 MindVault | Built for the offline world</p>
        <div className="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;