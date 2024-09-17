import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';

const EditInvoiceType = () => {
  const { invoiceTypeID } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    invoice_type: '',

  });
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchInvoiceTypes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/invoice_type/${invoiceTypeID}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching invoice type:', error);
      }
    };

    fetchInvoiceTypes();
  }, [invoiceTypeID, apiUrl]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const filteredFormData = {
        invoice_type: formData.invoice_type,
   
    };

    console.log('Filtered Request body:', filteredFormData); 

    try {
        await axios.put(`${apiUrl}/api/invoice_type/${invoiceTypeID}`, filteredFormData);
        navigate('/invoiceTypes');
    } catch (error) {
        console.error('Error updating Invoice Type:', error);
    }
};


  return (
    <Box sx={{ display: 'flex', marginTop: '-100px' }}>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Edit Invoice Type
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                label="Invoice Type"
                name="invoice_type"
                fullWidth
                value={formData.invoice_type}
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

export default EditInvoiceType;
