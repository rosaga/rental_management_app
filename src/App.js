import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import EditHouse from './components/editHouse';
import EditTenant from './components/editTenant';
import CreateNewInvoiceType from './components/createNewInvoiceType';
import InvoiceTypes from './components/invoiceTypes';
import EditInvoiceType from './components/editInvoiceType';
import Reports from './components/reports';
import TotalCollections from './components/totalCollections';
import PendingInvoices from './components/pendingInvoices';
import TenantBalances from './components/tenantBalances';
import RentableUnits from './components/rentableUnits';

const AppContent = () => {
  const location = useLocation();
  const noSidebarPaths = ['/', '/register'];

  return (
    <>
      {!noSidebarPaths.includes(location.pathname) && <Navigation />}
      <Box sx={{ flexGrow: 1, ml: !noSidebarPaths.includes(location.pathname) ? 30 : 0, mt: 8 }}>
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
          <Route path="/edit-house/:houseID" element={<EditHouse />} />
          <Route path="/edit-tenant/:tenantID" element={<EditTenant />} />
          <Route path="/createNewInvoiceType" element={<CreateNewInvoiceType />} />
          <Route path="/invoiceTypes" element={<InvoiceTypes />} />
          <Route path="/edit-invoice-type/:invoiceTypeID" element={<EditInvoiceType />} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/total-collections" element={<TotalCollections/>}  />
          <Route path="/pending-invoices" element={<PendingInvoices/>} />
          <Route path="/balances" element={<TenantBalances/>} />
          <Route path="/rentable-units" element={<RentableUnits/>} 




          


          />





          {/* Add other routes here */}
        </Routes>
      </Box>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;
