import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Toolbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [open, setOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tenants`);
        setTenants(response.data);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchTenants();
  }, [apiUrl]);

  const columns = [
    { field: 'tenant_name', headerName: 'Name', width: 150 },
    { field: 'house_name', headerName: 'House', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'ID_number', headerName: 'ID No.', width: 130 },
    { field: 'phone_number', headerName: 'Phone Number', width: 150 },
    { field: 'rent_amount', headerName: 'Rent', width: 100 },
    { field: 'dateAdmitted', headerName: 'Admission Date', width: 150 },
    { field: 'negotiatedRent', headerName: 'Negotiated Rent', width: 150 },
    { field: 'date_of_relocation', headerName: 'Relocation Date', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            component={Link}
            to={`/edit-tenant/${params.row.tenantID}`}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleOpenDialog(params.row.tenantID)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleOpenDialog = (tenantID) => {
    setTenantToDelete(tenantID);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setTenantToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/api/tenants/${tenantToDelete}`);
      setTenants(tenants.filter((tenant) => tenant.tenantID !== tenantToDelete));
      handleCloseDialog();
    } catch (error) {
      console.error('Error deleting tenant:', error);
      handleCloseDialog();
    }
  };

  return (
    <div style={{ height: 600, width: '100%', marginTop: '-100px' }}>
      <h2>Current Tenants Listing</h2>
      <DataGrid
        rows={tenants}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        getRowId={(row) => row.tenantID}
        components={{ Toolbar: GridToolbar }}
      />
      <Dialog
        open={open}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this tenant? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Tenants;
