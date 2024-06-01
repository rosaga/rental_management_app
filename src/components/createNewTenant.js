import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, MenuItem, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Navigation from '../components/navigation';

const CreateNewTenant = () => {
  const [formData, setFormData] = useState({
    tenant_name: '',
    email: '',
    ID_number: '',
    phone_number: '',
    profession: '',
    houseNumber: '',
    dateAdmitted: null,
    negotiatedRent: '',
  });

  const [houses, setHouses] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/houses');
        setHouses(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'An error occurred');
      }
    };

    const fetchApartments = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/apartments');
        setApartments(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'An error occurred');
      }
    };

    fetchHouses();
    fetchApartments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dateAdmitted: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/tenants', formData);
      alert('Tenant created successfully');
      setFormData({
        tenant_name: '',
        email: '',
        ID_number: '',
        phone_number: '',
        profession: '',
        houseNumber: '',
        dateAdmitted: null,
        negotiatedRent: '',
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
          Admit a New Tenant
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                label="Tenant Name"
                name="tenant_name"
                fullWidth
                value={formData.tenant_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="ID Number"
                name="ID_number"
                fullWidth
                value={formData.ID_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Phone Number"
                name="phone_number"
                fullWidth
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Profession"
                name="profession"
                fullWidth
                value={formData.profession}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                select
                label="House"
                name="houseNumber"
                fullWidth
                value={formData.houseNumber}
                onChange={handleChange}
              >
                {houses.map((house) => (
                  <MenuItem key={house.houseID} value={house.houseID}>
                    {house.house_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Negotiated Rent"
                name="negotiatedRent"
                fullWidth
                value={formData.negotiatedRent}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Admitted"
                  value={formData.dateAdmitted}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Admit Tenant
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default CreateNewTenant;
