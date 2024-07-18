import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const Houses = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/houses`);
        setHouses(response.data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    fetchHouses();
  }, []);

  const columns = [
    { field: 'houseID', headerName: 'House ID', width: 100 },
    { field: 'house_name', headerName: 'House Name', width: 150 },
    { field: 'number_of_rooms', headerName: 'No. of rooms', width: 130 },
    { field: 'rent_amount', headerName: 'Rent Amount', width: 130 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'house_status', headerName: 'House Status', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.row.houseID)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = async (houseID) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/houses/${houseID}`);
      setHouses(houses.filter((house) => house.houseID !== houseID));
    } catch (error) {
      console.error('Error deleting house:', error);
    }
  };

  return (
    <div style={{ height: 600, width: '100%', marginTop: '-100px' }}>
      <h2>Current House Listings</h2>
      <DataGrid
        rows={houses}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        getRowId={(row) => row.houseID}
      />
    </div>
  );
};

export default Houses;
