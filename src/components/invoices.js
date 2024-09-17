import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, MenuItem, Box, Typography, Button } from '@mui/material';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState({ month: '', year: '' });
  const apiUrl = process.env.REACT_APP_API_BASE_URL;


  const months = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    // ... other months ...
    { value: 'December', label: 'December' },
  ];

  const years = Array.from({ length: new Date().getFullYear() - 2021 }, (_, i) => (2022 + i).toString());

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/invoices`);
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/invoices`, {
        params: {
          month: filter.month,
          year: filter.year,
        },
      });
      setInvoices(response.data);
    } catch (error) {
      console.error('Error filtering invoices:', error);
    }
  };

  const handleStatusChange = async (invoiceID, newStatus) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/invoices/${invoiceID}`, { status: newStatus });
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
      {/* <Box sx={{ display: 'flex', marginBottom: '20px' }}>
        <TextField
          select
          label="Month"
          name="month"
          value={filter.month}
          onChange={handleFilterChange}
          sx={{ marginRight: '20px' }}
        >
          {months.map((month) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Year"
          name="year"
          value={filter.year}
          onChange={handleFilterChange}
          sx={{ marginRight: '20px' }}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filter
        </Button>
      </Box> */}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={invoices}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          getRowId={(row) => row.invoiceID}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
