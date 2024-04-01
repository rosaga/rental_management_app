// Navigation.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><NavLink to="/apartments">Apartments</NavLink></li>
        <li><NavLink to="/tenants">Tenants</NavLink></li>
        <li><NavLink to="/houses">Houses</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      </ul>
    </div>
  );
};

export default Navigation;
