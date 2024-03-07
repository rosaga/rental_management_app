// Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user', // Default role is set to 'user'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', formData);
      console.log('User created successfully!', response.data);
      // Redirect or perform actions after user creation
    } catch (error) {
      console.error('Failed to create user!', error.response.data);
      setError('Failed to create user');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">Register</h2>
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
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input-control"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="mt-3">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;