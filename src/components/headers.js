// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user }) => {
  return (
    <header className="header">
      <div className="user-profile">
        <span>Welcome, {user.username}</span>
        <Link to="/logout">Logout</Link>
      </div>
    </header>
  );
};

export default Header;
