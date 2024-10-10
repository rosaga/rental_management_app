import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Houses = () => {
  const [houses, setHouses] = useState([]);
  const [apartments, setApartments] = useState([])

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/houses`);
        setHouses(response.data);

        const apartmentResponse = await axios.get(`${apiUrl}/api/apartments`)
        setApartments(apartmentResponse.data)

      } catch (error) {
        console.error('Error fetching houses or apartments:', error);
      }
    };

    fetchHouses();
  }, [apiUrl]);

  const columns = [
    { field: 'houseID', headerName: 'House ID', width: 100 },
    { field: 'house_name', headerName: 'House Name', width: 150 },
    { field: 'number_of_rooms', headerName: 'No. of rooms', width: 130 },
    { field: 'rent_amount', headerName: 'Rent Amount', width: 130 },
    { field: 'kiwasco_meter_no', headerName: 'Kiwasco Meter No', width: 150 },
    { field: 'kiwasco_account_no', headerName: 'Kiwasco Account No', width: 150 },
    { field: 'house_status', headerName: 'House Status', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            component={Link}
            to={`/edit-house/${params.row.houseID}`}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.houseID)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = async (houseID) => {
    try {
      await axios.delete(`${apiUrl}/api/houses/${houseID}`);
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
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default Houses;
