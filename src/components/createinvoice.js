import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, MenuItem, Box } from '@mui/material';
import Navigation from '../components/navigation';

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    tenantID: '',
    dateDue: '',
    amountDue: '',
    comment: '',
    month: '',
    year: '',
    invoiceTypeID: ''
  });

  const [tenants, setTenants] = useState([]);
  const [invoiceTypes, setInvoiceTypes] = useState([]);
  const [error, setError] = useState('');

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  // Fetch tenants and invoice types when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tenantsResponse = await axios.get(`${apiUrl}/api/tenants`);
        setTenants(tenantsResponse.data);

        const invoiceTypesResponse = await axios.get(`${apiUrl}/api/invoice_types`);
        setInvoiceTypes(invoiceTypesResponse.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'An error occurred');
      }
    };

    fetchData();
  }, [apiUrl]);

  // Handle form input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dateDue') {
      const date = new Date(value);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear().toString();
      setFormData((prevData) => ({
        ...prevData,
        dateDue: value,
        month,
        year,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit form data
      await axios.post(`${apiUrl}/api/invoices`, formData);
      alert('Invoice created successfully');
      
      // Reset form
      setFormData({
        tenantID: '',
        dateDue: '',
        amountDue: '',
        comment: '',
        month: '',
        year: '',
        invoiceTypeID: ''
      });
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
    }
  };

  return (
    <Box sx={{ display: 'flex', marginTop: '-100px'}}>
      <Navigation />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Add a New Invoice
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Select Tenant */}
            <Grid item xs={12}>
              <TextField
                required
                select
                label="Choose a Tenant"
                name="tenantID"
                fullWidth
                value={formData.tenantID}
                onChange={handleChange}
              >
                {tenants.map((tenant) => (
                  <MenuItem key={tenant.tenantID} value={tenant.tenantID}>
                    {tenant.tenant_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Select Invoice Type */}
            <Grid item xs={12}>
              <TextField
                required
                select
                label="Choose Invoice Type"
                name="invoiceTypeID"
                fullWidth
                value={formData.invoiceTypeID}
                onChange={handleChange}
              >
                {invoiceTypes.map((invoiceType) => (
                  <MenuItem key={invoiceType.invoiceTypeID} value={invoiceType.invoiceTypeID}>
                    {invoiceType.invoiceType}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Amount Due */}
            <Grid item xs={12}>
              <TextField
                required
                label="Amount Due"
                name="amountDue"
                type="number"
                fullWidth
                value={formData.amountDue}
                onChange={handleChange}
              />
            </Grid>

            {/* Date Due */}
            <Grid item xs={12}>
              <TextField
                required
                label="Date Due"
                name="dateDue"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.dateDue}
                onChange={handleChange}
              />
            </Grid>

            {/* Comment */}
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

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Invoice
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default CreateInvoice;
