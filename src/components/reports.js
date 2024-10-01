import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const Reports = () => {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 8, padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Grid container spacing={4}>
        {/* Report 1 - Budget Overview */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Payments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View payments in this report.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                variant="contained" 
                color="success" 
                component={Link} 
                to="/report/payments-report">
                View Report
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Report 2 - Monthly Spending */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Monthly Spending
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View your month-over-month expenses.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                variant="contained" 
                color="success" 
                component={Link} 
                to="/report/monthly-spending">
                View Report
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Report 3 - Spending Categories */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Spending Categories
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View your year-to-date spending by category.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                variant="contained" 
                color="success" 
                component={Link} 
                to="/report/spending-categories">
                View Report
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Report 4 - Payer */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Payer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View how spending is managed between payers.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                variant="contained" 
                color="success" 
                component={Link} 
                to="/report/payer">
                View Report
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    
    </Box>
  );
};

export default Reports;
