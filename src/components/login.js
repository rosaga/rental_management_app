// Login.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful!', data);
      // Redirect or perform actions after successful login
    } catch (error) {
      console.error('Login failed!', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
    <div className="card">
      <h2 className="card-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="mt-3">Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  </div>
);
};

export default Login;