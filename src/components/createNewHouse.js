import React, { useState, useEffect } from 'react';
import { Box, Button, Container, MenuItem, Select, TextField, Typography } from '@mui/material';
import Navigation from '../components/navigation';
import axios from 'axios';

const CreateNewHouse = () => {
  const [houseName, setHouseName] = useState('');
  const [numberOfRooms, setNumberOfRooms] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [apartmentID, setApartmentID] = useState('');
  const [houseStatus, setHouseStatus] = useState('Vacant');
  const [apartments, setApartments] = useState([]);

  const apiUrl = process.env.REACT_APP_API_BASE_URL;


  useEffect(() => {
    // Fetch apartments from the API
<<<<<<< HEAD
    axios.get(`${apiUrl}/api/apartments`)
=======
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/apartments`)
>>>>>>> 683a4985c7be0cd19513650eaf2ef101f53e22a6
      .then(response => {
        setApartments(response.data);
      })
      .catch(error => {
        console.error('Error fetching apartments:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHouse = {
      house_name: houseName,
      number_of_rooms: numberOfRooms,
      rent_amount: rentAmount,
      apartmentID,
      house_status: houseStatus,
    };

    try {
<<<<<<< HEAD
      await axios.post(`${apiUrl}/api/houses`, newHouse);
=======
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/houses`, newHouse);
>>>>>>> 683a4985c7be0cd19513650eaf2ef101f53e22a6
      alert('House added successfully!');

      // Clear form
      setHouseName('');
      setNumberOfRooms('');
      setRentAmount('');
      setApartmentID('');
      setHouseStatus('Vacant');
    } catch (error) {
      console.error('Error adding house:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' , marginTop: '-100px'}}>
      <Navigation />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Add a New House
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="House Name"
            value={houseName}
            onChange={(e) => setHouseName(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Number of rooms (rentable units)"
            value={numberOfRooms}
            onChange={(e) => setNumberOfRooms(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Rent amount (PM)"
            value={rentAmount}
            onChange={(e) => setRentAmount(e.target.value)}
            required
            margin="normal"
          />
          <Select
            fullWidth
            value={apartmentID}
            onChange={(e) => setApartmentID(e.target.value)}
            displayEmpty
            required
            margin="normal"
          >
            <MenuItem value="" disabled>
              **Select an apartment**
            </MenuItem>
            {apartments.map(apt => (
              <MenuItem key={apt.apartmentID} value={apt.apartmentID}>
                {apt.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            fullWidth
            value={houseStatus}
            onChange={(e) => setHouseStatus(e.target.value)}
            displayEmpty
            required
            margin="normal"
          >
            <MenuItem value="Vacant">Vacant</MenuItem>
            <MenuItem value="Occupied">Occupied</MenuItem>
          </Select>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add this House
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateNewHouse;
