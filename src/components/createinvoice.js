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
  });

  const [tenants, setTenants] = useState([]);
  const [error, setError] = useState('');

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tenants`);
        setTenants(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'An error occurred');
      }
    };

    fetchTenants();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/invoices`, formData);
      alert('Invoice created successfully');
      setFormData({
        tenantID: '',
        dateDue: '',
        amountDue: '',
        comment: '',
        month: '',
        year: '',
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
