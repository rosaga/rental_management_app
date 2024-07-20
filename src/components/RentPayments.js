import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, MenuItem, Container, Typography, Grid, Box } from '@mui/material';
import Navigation from '../components/navigation';

const RentPayments = () => {
  const [payments, setPayments] = useState([]);
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);

  const apiUrl = process.env.REACT_APP_API_BASE_URL;


  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/payments`);
        const dataWithUniqueKeys = response.data.map((item, index) => ({
          ...item,
          uniqueKey: `${item.paymentID}-${index}`,
        }));
        setPayments(dataWithUniqueKeys);
        setFilteredPayments(dataWithUniqueKeys);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  useEffect(() => {
    if (filterMonth || filterYear) {
      setFilteredPayments(
        payments.filter(payment => 
          (!filterMonth || payment.month === filterMonth) &&
          (!filterYear || payment.year.toString() === filterYear)
        )
      );
    } else {
      setFilteredPayments(payments);
    }
  }, [filterMonth, filterYear, payments]);

  const columns = [
    { field: 'tenant_name', headerName: 'Tenant Name', width: 150 },
    { field: 'comment', headerName: 'Invoice Comment', width: 200 },
    { field: 'month', headerName: 'Month', width: 100 },
    { field: 'year', headerName: 'Year', width: 100 },
    { field: 'amountPaid', headerName: 'Amount Paid', width: 150 }
  ];

  return (
    <Box sx={{ display: 'flex', marginTop: '-100px', marginLeft:'-400px' }}>
      <Navigation />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Payments List
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              select
              label="Filter by Month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              fullWidth
            >
              <MenuItem value="">All Months</MenuItem>
              <MenuItem value="January">January</MenuItem>
              <MenuItem value="February">February</MenuItem>
              <MenuItem value="March">March</MenuItem>
              <MenuItem value="April">April</MenuItem>
              <MenuItem value="May">May</MenuItem>
              <MenuItem value="June">June</MenuItem>
              <MenuItem value="July">July</MenuItem>
              <MenuItem value="August">August</MenuItem>
              <MenuItem value="September">September</MenuItem>
              <MenuItem value="October">October</MenuItem>
              <MenuItem value="November">November</MenuItem>
              <MenuItem value="December">December</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Filter by Year"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              fullWidth
            >
              <MenuItem value="">All Years</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredPayments}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.uniqueKey}
          />
        </div>
      </Container>
    </Box>
  );
};

export default RentPayments;
