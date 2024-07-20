import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, MenuItem, Box } from '@mui/material';
import Navigation from '../components/navigation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateNewPayment = () => {
  const [formData, setFormData] = useState({
    tenantID: '',
    invoiceID: '',
    expectedAmount: '',
    amountPaid: '',
    mpesaCode: '',
    comment: '',
    dateofPayment: null,
  });

  const [tenants, setTenants] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState('');

  const apiUrl = process.env.REACT_APP_API_BASE_URL;


  useEffect(() => {
    const fetchTenants = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`${apiUrl}/api/tenants`);
=======
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/tenants`);
>>>>>>> 683a4985c7be0cd19513650eaf2ef101f53e22a6
        setTenants(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'An error occurred');
      }
    };

    fetchTenants();
  }, []);

  const handleTenantChange = async (e) => {
    const tenantID = e.target.value;
    setFormData({ ...formData, tenantID, invoiceID: '' });

    try {
<<<<<<< HEAD
      const response = await axios.get(`${apiUrl}/api/invoices?tenantID=${tenantID}`);
=======
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/invoices?tenantID=${tenantID}`);
>>>>>>> 683a4985c7be0cd19513650eaf2ef101f53e22a6
      setInvoices(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dateofPayment: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      await axios.post(`${apiUrl}/api/payments`, formData);
=======
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/payments`, formData);
>>>>>>> 683a4985c7be0cd19513650eaf2ef101f53e22a6
      alert('Payment created successfully');
      setFormData({
        tenantID: '',
        invoiceID: '',
        expectedAmount: '',
        amountPaid: '',
        mpesaCode: '',
        comment: '',
        dateofPayment: null,
      });
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
    }
  };

  return (
    <Box sx={{ display: 'flex', marginTop: '-100px' }}>
      <Navigation />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Add a New Rent Payment
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                select
                label="Choose a Tenant"
                name="tenantID"
                fullWidth
                value={formData.tenantID}
                onChange={handleTenantChange}
              >
                {tenants.map((tenant) => (
                  <MenuItem key={tenant.tenantID} value={tenant.tenantID}>
                    {tenant.tenant_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                select
                label="Select Invoice"
                name="invoiceID"
                fullWidth
                value={formData.invoiceID}
                onChange={handleChange}
                disabled={!formData.tenantID}
              >
                {invoices.map((invoice) => (
                  <MenuItem key={invoice.invoiceID} value={invoice.invoiceID}>
                    {invoice.comment}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Expected Amount"
                name="expectedAmount"
                type="number"
                fullWidth
                value={formData.expectedAmount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Amount Paid"
                name="amountPaid"
                type="number"
                fullWidth
                value={formData.amountPaid}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Payment"
                  value={formData.dateofPayment}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="MPESA Code (Optional)"
                name="mpesaCode"
                fullWidth
                value={formData.mpesaCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Comment"
                name="comment"
                fullWidth
                multiline
                rows={4}
                value={formData.comment}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update this Payment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default CreateNewPayment;
