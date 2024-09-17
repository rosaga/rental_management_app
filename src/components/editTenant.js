import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';

const EditTenant = () => {
  const { tenantID } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenant_name: '',
    email: '',
    ID_number: '',
    profession: '',
    phone_number: '',
    negotiatedRent: '',
    houseNumber: '',
  });
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tenants/${tenantID}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching tenant:', error);
      }
    };

    fetchTenant();
  }, [tenantID, apiUrl]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter formData to only include relevant tenant fields
    const filteredFormData = {
        tenant_name: formData.tenant_name,
        email: formData.email,
        ID_number: formData.ID_number,
        profession: formData.profession,
        phone_number: formData.phone_number,
        negotiatedRent: formData.negotiatedRent,
        houseNumber: formData.houseNumber,
        // If there's a need for dateAdmitted or agreement_file, you can include them as well
        // dateAdmitted: formData.dateAdmitted,
        // agreement_file: formData.agreement_file,
    };

    console.log('Filtered Request body:', filteredFormData); // Log the filtered request body

    try {
        await axios.put(`${apiUrl}/api/tenants/${tenantID}`, filteredFormData);
        navigate('/tenants');
    } catch (error) {
        console.error('Error updating tenant:', error);
    }
};


  return (
    <Box sx={{ display: 'flex', marginTop: '-100px' }}>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Edit Tenant
        </Typography>
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
                label="Negotiated Rent"
                name="negotiatedRent"
                fullWidth
                type="number"
                value={formData.negotiatedRent}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default EditTenant;
