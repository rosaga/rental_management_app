import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, MenuItem, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Navigation from '../components/navigation';
import { useLocation } from 'react-router-dom';


const CreateNewTenant = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const houseID = searchParams.get('houseID');

  const [formData, setFormData] = useState({
    tenant_name: '',
    email: '',
    ID_number: '',
    phone_number: '',
    houseNumber: houseID || '',
    dateAdmitted: null,
    negotiatedRent: '',
  });
  const apiUrl = process.env.REACT_APP_API_BASE_URL;


  const [houses, setHouses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/houses`);
        setHouses(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'An error occurred');
      }
    };
  
    fetchHouses();
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
      // Format the dateAdmitted to 'YYYY-MM-DD HH:mm:ss' before sending it
      const formattedData = {
        ...formData,
        dateAdmitted: formData.dateAdmitted ? dayjs(formData.dateAdmitted).format('YYYY-MM-DD HH:mm:ss') : null,
      };
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/tenants`, formattedData);
      alert('Tenant created successfully');
      setFormData({
        tenant_name: '',
        email: '',
        ID_number: '',
        phone_number: '',
        houseNumber: '',
        dateAdmitted: null,
        negotiatedRent: '',
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
