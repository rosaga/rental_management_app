import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Button, Paper, CircularProgress } from '@mui/material';
import { House, People, Receipt, Payment } from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    houses: 0,
    tenants: 0,
    invoices: 0,
    payments: 0,
    rentCollected: 0,
    tenantBalances: 0,
    unpaidInvoices: 0,
    rentableUnits: 0,
  });

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardResponse = await axios.get(`${apiUrl}/api/dashboard`);
        setDashboardData(dashboardResponse.data);

        const invoicesResponse = await axios.get(`${apiUrl}/api/invoices`);
        setInvoices(invoicesResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [apiUrl]);

  if (loading) {
    return <CircularProgress />;
  }

  const columns = [
    { field: 'tenant_name', headerName: 'Tenant Name', width: 200 },
    { field: 'phone_number', headerName: 'Phone Number', width: 150 },
    { field: 'amountDue', headerName: 'Amount Due', width: 150 },
    { field: 'dateOfInvoice', headerName: 'Date Of Invoice', width: 180 },
    { field: 'dateDue', headerName: 'Date Due', width: 180 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'comment', headerName: 'Comment', width: 250 },
    { field: 'month', headerName: 'Month', width: 150 },
    { field: 'year', headerName: 'Year', width: 150 },
  ];

  return (
    <Box sx={{ padding: '10px', marginTop: '-80px' }}>
      <Typography variant="h5" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '10px' }}>
            <House fontSize="large" />
            <Typography variant="h6">Houses</Typography>
            <Typography variant="h4">{dashboardData.houses || 0}</Typography>
            <Button component={Link} to="/houses" variant="outlined" sx={{ width: '100px', marginBottom: '2px', backgroundColor: '#2C3539', color: 'white', '&:hover': { backgroundColor: 'black', borderColor: 'white' } }}>View</Button>
            <Button component={Link} to="/createNewHouse" variant="outlined" color="primary" sx={{ width: '50px', left: '72px', color: '#2C3539', borderColor: 'black' }}>Add</Button>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '10px' }}>
            <People fontSize="large" />
            <Typography variant="h6">Tenants</Typography>
            <Typography variant="h4">{dashboardData.tenants || 0}</Typography>
            <Button component={Link} to="/tenants" variant="outlined" sx={{ width: '100px', marginBottom: '2px', backgroundColor: '#2C3539', color: 'white', '&:hover': { backgroundColor: 'black', borderColor: 'white' } }}>View</Button>
            <Button component={Link} to="/createNewTenant" variant="outlined" color="primary" sx={{ width: '50px', left: '72px', color: '#2C3539', borderColor: 'black' }}>Add</Button>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '10px' }}>
            <Receipt fontSize="large" />
            <Typography variant="h6">Invoices</Typography>
            <Typography variant="h4">{dashboardData.invoices || 0}</Typography>
            <Button component={Link} to="/invoices" variant="outlined" sx={{ width: '100px', marginBottom: '2px', backgroundColor: '#2C3539', color: 'white', '&:hover': { backgroundColor: 'black', borderColor: 'white' } }}>View</Button>
            <Button component={Link} to="/createNewInvoice" variant="outlined" color="primary" sx={{ width: '50px', left: '72px', color: '#2C3539', borderColor: 'black' }}>Add</Button>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '10px' }}>
            <Payment fontSize="large" />
            <Typography variant="h6">Payments</Typography>
            <Typography variant="h4">{dashboardData.payments || 0}</Typography>
            <Button component={Link} to="/rent-payments" variant="outlined" sx={{ width: '100px', marginBottom: '2px', backgroundColor: '#2C3539', color: 'white', '&:hover': { backgroundColor: 'black', borderColor: 'white' } }}>View</Button>
            <Button component={Link} to="/createNewPayment" variant="outlined" color="primary" sx={{ width: '50px', left: '72px', color: '#2C3539', borderColor: 'black' }}>Add</Button>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: '10px' }}>
        <Grid item xs={3} onClick={() => navigate('/total-collections')}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Total Collections</Typography>
            <Typography variant="h4">{dashboardData.rentCollected || 0}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={3} onClick={() => navigate('/pending-invoices')}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Pending Invoices</Typography>
            <Typography variant="h4">{dashboardData.unpaidInvoices || 0}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={3} onClick={() => navigate('/balances')}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Tenant Balances</Typography>
            <Typography variant="h4">{dashboardData.tenantBalances || 0}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={3} onClick={() => navigate('/rentable-units')}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Rentable Units</Typography>
            <Typography variant="h4">{dashboardData.rentableUnits}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>Invoices</Typography>
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={invoices}
            columns={columns}
            pageSize={30}
            rowsPerPageOptions={[30, 50, 100]}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row.invoiceID}
            checkboxSelection
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
