// Navigation.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';



const Navigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} onClick={toggleCollapse}>
      <ul>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/apartments">Apartments</NavLink></li>
        <li><NavLink to="/tenants">Tenants</NavLink></li>
        <li><NavLink to="/houses">Houses</NavLink></li>
      </ul>
    </div>
  );
};

export default Navigation;
