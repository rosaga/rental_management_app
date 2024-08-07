import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, Box, Grid, Button, Paper, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { House, People, Receipt, Payment } from '@mui/icons-material';

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
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardResponse = await axios.get(`${apiUrl}/api/dashboard`);
        setDashboardData(dashboardResponse.data);

        const userResponse = await axios.get(`${apiUrl}/api/users`);
        setUserData(userResponse.data);

        const invoicesResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/invoices`);
        setInvoices(invoicesResponse.data);
        
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
    <Box sx={{ padding: '10px', marginTop: '-80px' }}>
      <Typography variant="h5" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>

        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '10px' }}>
            <House fontSize="large" />
            <Typography variant="h6">Houses</Typography>
            <Typography variant="h4">{dashboardData.houses}</Typography>

            <Button component={Link}
            to="/houses"
            variant="outlined"
            sx={{
              width: '100px',
              marginBottom: '2px',
              backgroundColor: '#2C3539',
              color: 'white',
              '&:hover': {
                backgroundColor: 'black',
                borderColor: 'white',
              }
            }}
            >
            View
            </Button>            
           <Button component={Link} to="/createNewHouse" variant="outlined" color="primary" sx={{ width: '50px', left: '72px', color:'#2C3539', borderColor: 'black' }}>Add</Button>

          </Paper>
        </Grid>


        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '10px' }}>
            <People fontSize="large" />
            <Typography variant="h6">Tenants</Typography>
            <Typography variant="h4">{dashboardData.tenants}</Typography>
            <Button component={Link}
            to="/tenants"
            variant="outlined"
            sx={{
              width: '100px',
              marginBottom: '2px',
              backgroundColor: '#2C3539',
              color: 'white',
              '&:hover': {
                backgroundColor: 'black',
                borderColor: 'white',
              }
            }}
            >
            View
            </Button>            
           <Button component={Link} to="/createNewTenant" variant="outlined" color="primary" sx={{ width: '50px', left: '72px', color:'#2C3539', borderColor: 'black' }}>Add</Button>
          </Paper>
        </Grid>


        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '10px' }}>
            <Receipt fontSize="large" />
            <Typography variant="h6">Invoices</Typography>
            <Typography variant="h4">{dashboardData.invoices}</Typography>
            <Button component={Link}
            to="/invoices"
            variant="outlined"
            sx={{
              width: '100px',
              marginBottom: '2px',
              backgroundColor: '#2C3539',
              color: 'white',
              '&:hover': {
                backgroundColor: 'black',
                borderColor: 'white',
              }
            }}
            >
            View
            </Button>            
           <Button component={Link} to="/createNewInvoice" variant="outlined" color="primary" sx={{ width: '50px', left: '72px', color:'#2C3539', borderColor: 'black' }}>Add</Button>

          </Paper>
        </Grid>


        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '10px' }}>
            <Payment fontSize="large" />
            <Typography variant="h6">Payments</Typography>
            <Typography variant="h4">{dashboardData.payments}</Typography>
            <Button component={Link}
            to="/rent-payments"
            variant="outlined"
            sx={{
              width: '100px',
              marginBottom: '2px',
              backgroundColor: '#2C3539',
              color: 'white',
              '&:hover': {
                backgroundColor: 'black',
                borderColor: 'white',
              }
            }}
            >
            View
            </Button>            
           <Button component={Link} to="/createNewPayment" variant="outlined" color="primary" sx={{ width: '50px', left: '72px', color:'#2C3539', borderColor: 'black' }}>Add</Button>

          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: '10px' }}>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Total Collections</Typography>
            <Typography variant="h4">{dashboardData.rentCollected || 0}</Typography>
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
            <Typography variant="h4">{dashboardData.tenantBalances || 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Rentable Units</Typography>
            <Typography variant="h4">{dashboardData.rentableUnits}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>Invoices</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tenant Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Amount Due</TableCell>
                <TableCell>Date Of Invoice</TableCell>
                <TableCell>Date Due</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoiceID}>
                  <TableCell>{invoice.tenant_name}</TableCell>
                  <TableCell>{invoice.phone_number}</TableCell>
                  <TableCell>{invoice.amountDue}</TableCell>
                  <TableCell>{invoice.dateOfInvoice}</TableCell>
                  <TableCell>{invoice.dateDue}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>{invoice.comment}</TableCell>
                  <TableCell>{invoice.month}</TableCell>
                  <TableCell>{invoice.year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
