import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Box, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const EditHouse = () => {
  const { houseID } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    house_name: '',
    number_of_rooms: '',
    rent_amount: '',
    house_status: '',
  });
  const [tenant, setTenant] = useState(null);
  const [vacantHouses, setVacantHouses] = useState([]);
  const [relocateDialogOpen, setRelocateDialogOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState('');
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/houses/${houseID}`);
        setFormData(response.data);

        const tenantResponse = await axios.get(`${apiUrl}/api/tenants/house/${houseID}`);
        setTenant(tenantResponse.data);

        const vacantHousesResponse = await axios.get(`${apiUrl}/api/houses`);
        const vacantHousesData = vacantHousesResponse.data.filter(house => house.house_status === 'Vacant');
        setVacantHouses(vacantHousesData);

        console.log("Vacant houses: ", vacantHousesData);

      } catch (error) {
        console.error('Error fetching house:', error);
      }
    };

    fetchHouse();
  }, [houseID, apiUrl]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/api/houses/${houseID}`, formData);
      navigate('/houses');
    } catch (error) {
      console.error('Error updating house:', error);
    }
  };

  const handleRemoveTenant = async () => {
    try {
      await axios.delete(`${apiUrl}/api/tenants/${tenant.tenantID}`);
      setTenant(null);
      setFormData((prevData) => ({
        ...prevData,
        house_status: 'Vacant',
      }));
    } catch (error) {
      console.error('Error removing tenant:', error);
    }
  };

  const handleRelocateTenant = async () => {
    try {
      await axios.put(`${apiUrl}/api/relocateTenant`, {
        tenantID: tenant.tenantID,
        newHouseID: selectedHouse,
      });
      setRelocateDialogOpen(false);
      navigate('/houses');
    } catch (error) {
      console.error('Error relocating tenant:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', marginTop: '-100px' }}>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Edit House
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                label="House Name"
                name="house_name"
                fullWidth
                value={formData.house_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Number of Rooms"
                name="number_of_rooms"
                fullWidth
                type="number"
                value={formData.number_of_rooms}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Rent Amount"
                name="rent_amount"
                fullWidth
                type="number"
                value={formData.rent_amount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="House Status"
                name="house_status"
                fullWidth
                value={formData.house_status}
                onChange={handleChange}
                disabled
              />
            </Grid>
            {tenant && (
              <Grid item xs={12}>
                <Typography variant="h6">Tenant: {tenant.tenant_name}</Typography>
                <Button variant="contained" color="secondary" onClick={handleRemoveTenant}>
                  Remove Tenant
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setRelocateDialogOpen(true)}
                  sx={{ ml: 2 }}
                >
                  Relocate Tenant
                </Button>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

      <Dialog open={relocateDialogOpen} onClose={() => setRelocateDialogOpen(false)}>
        <DialogTitle>Relocate Tenant</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Select a New House"
            fullWidth
            value={selectedHouse}
            onChange={(e) => setSelectedHouse(e.target.value)}
          >
            {vacantHouses.map((house) => (
              <MenuItem key={house.houseID} value={house.houseID}>
                {house.house_name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRelocateDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRelocateTenant} color="primary">
            Confirm Relocation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditHouse;
