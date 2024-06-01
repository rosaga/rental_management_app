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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/invoices', formData);
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

  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear + 1, currentYear + 2];
  const months = [
    { value: 'January', label: 'Jan' },
    { value: 'February', label: 'Feb' },
    { value: 'March', label: 'Mar' },
    { value: 'April', label: 'Apr' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'Jun' },
    { value: 'July', label: 'Jul' },
    { value: 'August', label: 'Aug' },
    { value: 'September', label: 'Sep' },
    { value: 'October', label: 'Oct' },
    { value: 'November', label: 'Nov' },
    { value: 'December', label: 'Dec' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
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
            <Grid item xs={6}>
              <TextField
                required
                select
                label="Month"
                name="month"
                fullWidth
                value={formData.month}
                onChange={handleChange}
              >
                {months.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                select
                label="Year"
                name="year"
                fullWidth
                value={formData.year}
                onChange={handleChange}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
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
