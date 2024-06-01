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

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/tenants');
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
      const response = await axios.get(`http://localhost:5001/api/invoices?tenantID=${tenantID}`);
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
      await axios.post('http://localhost:5001/api/payments', formData);
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
    <Box sx={{ display: 'flex' }}>
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
