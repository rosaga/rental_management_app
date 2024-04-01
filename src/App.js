// App.js

import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';



const App = () => {
  return (
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      </div>
    </Router>
  );
};

export default App;
