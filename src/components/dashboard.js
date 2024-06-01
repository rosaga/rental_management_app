import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, Box, Grid, Button, Paper, CircularProgress } from '@mui/material';
import { Home, People, Receipt, Payment } from '@mui/icons-material';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    houses: 0,
    tenants: 0,
    invoices: 0,
    payments: 0,
    rentCollected: 0,
    tenantBalances: 0,
    unpaidInvoices: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/dashboard');
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Hello</Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Home fontSize="large" />
            <Typography variant="h6">Houses</Typography>
            <Typography variant="h4">{dashboardData.houses}</Typography>
            <Button component={Link} to="/houses" variant="outlined" color="primary">View details</Button>
            <Button component={Link} to="/createNewHouse" variant="outlined" color="primary">Add</Button>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <People fontSize="large" />
            <Typography variant="h6">Tenants</Typography>
            <Typography variant="h4">{dashboardData.tenants}</Typography>
            <Button component={Link} to="/tenants" variant="outlined" color="primary">View details</Button>
            <Button component={Link} to="/createNewTenant" variant="outlined" color="primary">Add</Button>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Receipt fontSize="large" />
            <Typography variant="h6">Invoices</Typography>
            <Typography variant="h4">{dashboardData.invoices}</Typography>
            <Button component={Link} to="/invoices" variant="outlined" color="primary">View details</Button>
            <Button component={Link} to="/createNewInvoice" variant="outlined" color="primary">Add</Button>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Payment fontSize="large" />
            <Typography variant="h6">Payments</Typography>
            <Typography variant="h4">{dashboardData.payments}</Typography>
            <Button component={Link} to="/rent-payments" variant="outlined" color="primary">View details</Button>
            <Button component={Link} to="/createNewPayment" variant="outlined" color="primary">Add</Button>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: '20px' }}>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Month Collections</Typography>
            <Typography variant="h4">{dashboardData.rentCollected}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Pending Invoices</Typography>
            <Typography variant="h4">{dashboardData.unpaidInvoices}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Tenant Balances</Typography>
            <Typography variant="h4">{dashboardData.tenantBalances}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Rentable Units</Typography>
            <Typography variant="h4">{dashboardData.houses}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
