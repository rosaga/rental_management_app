// src/components/apartmentDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Container, List, ListItem, ListItemText, Paper } from '@mui/material';

const ApartmentDetails = () => {
  const { id } = useParams();
  const [apartmentDetails, setApartmentDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApartmentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/apartments/${id}`);
        setApartmentDetails(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'An error occurred');
      }
    };

    fetchApartmentDetails();
  }, [id]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Apartment Details
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {apartmentDetails && (
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">{apartmentDetails.apartment.name}</Typography>
          <Typography variant="body1">Location: {apartmentDetails.apartment.location}</Typography>
          <Typography variant="body1">Number of Houses: {apartmentDetails.apartment.num_houses}</Typography>
          <Typography variant="h6" gutterBottom>Houses</Typography>
          <List>
            {apartmentDetails.houses.map((house) => (
              <ListItem key={house.house_id}>
                <ListItemText primary={`House Number: ${house.house_number}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default ApartmentDetails;
