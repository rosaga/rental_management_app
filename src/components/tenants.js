import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const Tenants = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/tenants');
        setTenants(response.data);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchTenants();
  }, []);

  const columns = [
    { field: 'tenant_name', headerName: 'Name', width: 150 },
    { field: 'house_name', headerName: 'House', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'ID_number', headerName: 'ID No.', width: 130 },
    { field: 'profession', headerName: 'Profession', width: 150 },
    { field: 'phone_number', headerName: 'Phone Number', width: 150 },
    { field: 'rent_amount', headerName: 'Rent', width: 100 },
    { field: 'dateAdmitted', headerName: 'Admission Date', width: 150 },
    { field: 'negotiatedRent', headerName: 'Negotiated Rent', width: 150 },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.row.tenantID)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = async (tenantID) => {
    try {
      await axios.delete(`http://localhost:5001/api/tenants/${tenantID}`);
      setTenants(tenants.filter((tenant) => tenant.tenantID !== tenantID));
    } catch (error) {
      console.error('Error deleting tenant:', error);
    }
  };

  return (
    <div style={{ height: 600, width: '100%' }}>
      <h2>Current Tenants Listing</h2>
      <DataGrid
        rows={tenants}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        getRowId={(row) => row.tenantID}
      />
    </div>
  );
};

export default Tenants;
