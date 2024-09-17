import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Navigation from '../components/navigation';
import axios from 'axios';

const CreateNewInvoiceType = () => {
  const [invoiceType, setInvoiceType] = useState('');
 
  const apiUrl = process.env.REACT_APP_API_BASE_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newInvoiceType = {
      invoiceType: invoiceType,
      
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/invoice_types`, newInvoiceType);
      alert('Invoice type added successfully!');

      // Clear form
      setInvoiceType('')
    } catch (error) {
      console.error('Error adding invoice type:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' , marginTop: '-100px'}}>
      <Navigation />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Add New Invoice Type
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Invoice Type"
            value={invoiceType}
            onChange={(e) => setInvoiceType(e.target.value)}
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add invoice type
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateNewInvoiceType;
