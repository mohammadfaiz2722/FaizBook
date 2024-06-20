// HomePage.js

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Home.css'
const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to My Awesome App!</h1>
        <p>Your gateway to amazing experiences.</p>
        <div className="cta-buttons">
          <Link to="/login" className="btn btn-primary">Log In</Link>
          <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
