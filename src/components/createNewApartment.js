import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const CreateNewApartment = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [numHouses, setNumHouses] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/apartments', {
        name,
        location,
        num_houses: numHouses,
      });
      alert('Apartment added successfully!');
      setName('');
      setLocation('');
      setNumHouses('');
    } catch (error) {
      console.error('Error adding apartment:', error);
      alert('Failed to add apartment.');
    }
  };

  return (
    <Container style = {{marginTop: '-100px'}}>
      <Typography variant="h4" gutterBottom>
        Add a New Apartment
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Apartment Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Number of Houses"
            variant="outlined"
            fullWidth
            type="number"
            value={numHouses}
            onChange={(e) => setNumHouses(e.target.value)}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Add Apartment
        </Button>
      </form>
    </Container>
  );
};

export default CreateNewApartment;
