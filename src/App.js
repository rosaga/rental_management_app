// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import Apartments from './components/apartments';
import ApartmentDetails from './components/apartmentDetails';
import CreateNewTenant from './components/createNewTenant';
import CreateNewHouse from './components/createNewHouse';
import CreateNewApartment from './components/createNewApartment';
import Tenants from './components/tenants';
import Houses from './components/houses';
import RentPayments from './components/RentPayments';
import CreateNewInvoice from './components/createinvoice';
import Navigation from "./components/navigation";
import Invoices from './components/invoices'
import store from './store';
import { Container, CssBaseline } from '@mui/material';
import { Box, Toolbar } from '@mui/material'; 
import CreateNewPayment from './components/createNewPayment';


const App = () => {
  return (
    <Router>
      <Navigation />
      <Box sx={{ flexGrow: 1, ml: 30, mt: 8 }}>
        <Toolbar />
        <Routes>
        <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apartments" element={<Apartments />} />
            <Route path="/apartments/:id" element={<ApartmentDetails />} />
            <Route path="/createNewTenant" element={<CreateNewTenant />} />
            <Route path="/createNewHouse" element={<CreateNewHouse />} />
            <Route path="/createNewApartment" element={<CreateNewApartment />} />
            <Route path="/createNewInvoice" element={<CreateNewInvoice />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/houses" element={<Houses />} />
            <Route path="/rent-payments" element={<RentPayments />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/createNewPayment" element={<CreateNewPayment />} />



          {/* Add other routes here */}
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
