// src/components/apartments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Container } from '@mui/material';

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_BASE_URL;


  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/apartments`);
        setApartments(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'An error occurred');
      }
    };

    fetchApartments();
  }, []);

  const handleApartmentClick = (apartment_id) => {
    navigate(`/apartmentDetails/${apartment_id}`);
  };

  return (
    <Container style = {{marginTop: '-100px'}}>
      <Typography variant="h4" gutterBottom>
        Apartments
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {apartments.map((apartment) => (
          <ListItem 
            button 
            key={apartment.id} 
            onClick={() => handleApartmentClick(apartment.apartment_id)}
          >
            <ListItemText primary={apartment.name} secondary={apartment.location} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Apartments;
