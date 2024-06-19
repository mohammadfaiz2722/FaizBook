// src/components/ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Reset Password</button>
      </form>
      <div className="mt-3">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
