import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, TextField, MenuItem } from '@mui/material';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/invoices`);
      setInvoices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (invoiceID, newStatus) => {
    try {
      const response = await axios.put(`${apiUrl}/api/invoices/${invoiceID}`, { status: newStatus });
      console.log('Update response:', response.data);
      fetchInvoices(); 
    } catch (error) {
      console.error('Error updating invoice status:', error);
    }
  };

  const columns = [
    { field: 'invoiceID', headerName: 'Invoice ID', width: 150 },
    { field: 'tenant_name', headerName: 'Tenant', width: 200 },
    { field: 'invoiceType', headerName: 'Invoice Type', width: 200 },
    { field: 'amountDue', headerName: 'Amount Due', width: 150 },
    { field: 'dateOfInvoice', headerName: 'Date of Invoice', width: 200 },
    { field: 'dateDue', headerName: 'Date Due', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
      renderCell: (params) => (
        <TextField
          select
          value={params.value}
          onChange={(e) => handleStatusChange(params.row.invoiceID, e.target.value)}
        >
          <MenuItem value="unpaid">Unpaid</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
        </TextField>
      ),
    },
    { field: 'comment', headerName: 'Comment', width: 200 },
    { field: 'month', headerName: 'Month', width: 150 },
    { field: 'year', headerName: 'Year', width: 150 },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px', marginTop: '-100px'}}>
      <Typography variant="h4" gutterBottom>
        Invoices
      </Typography>

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={invoices}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          checkboxSelection
          getRowId={(row) => row.invoiceID}
          components={{ Toolbar: GridToolbar }}
          loading={loading} 
        />
      </Box>
    </Box>
  );
};

export default Invoices;
