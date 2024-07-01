import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Toolbar, AppBar, Typography, Button, Box, Collapse
} from '@mui/material';
import {
  Home, People, Receipt, Payment, LocationOn, ExpandLess, ExpandMore, Add, List as ListIcon,
  ExitToApp, Apartment, House
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Navigation = () => {
  const [open, setOpen] = useState({
    apartments: false,
    houses: false,
    tenants: false,
    invoices: false,
    payments: false
  });

  const handleClick = (menu) => {
    setOpen({ ...open, [menu]: !open[menu] });
  };

  const location = useLocation();
  const noSidebarPaths = ['/login', '/signup'];

  if (noSidebarPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <div style={{ display: 'flex' }}>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#2C3539', 
            color: 'white', 
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <div style={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Typography added here */}
          <Typography variant="h5" align="center" sx={{ mt: 2, mb: 2, color: 'white' }}>
            Rubedo Rental Management
          </Typography>
          <List style={{ flex: 1 }}>
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon sx={{ color: 'white' }}><Home /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button onClick={() => handleClick('apartments')}>
              <ListItemIcon sx={{ color: 'white' }}><Apartment /></ListItemIcon>
              <ListItemText primary="Apartments" />
              {open.apartments ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open.apartments} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/apartments">
                  <ListItemIcon><ListIcon /></ListItemIcon>
                  <ListItemText primary="View All" />
                </ListItem>
                <ListItem button component={Link} to="/createNewApartment">
                  <ListItemIcon><Add /></ListItemIcon>
                  <ListItemText primary="Add Apartment" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={() => handleClick('houses')}>
              <ListItemIcon sx={{ color: 'white' }}><House /></ListItemIcon>
              <ListItemText primary="Houses" />
              {open.houses ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open.houses} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/houses">
                  <ListItemIcon><ListIcon /></ListItemIcon>
                  <ListItemText primary="View All" />
                </ListItem>
                <ListItem button component={Link} to="/createNewHouse">
                  <ListItemIcon><Add /></ListItemIcon>
                  <ListItemText primary="Add House" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={() => handleClick('tenants')}>
              <ListItemIcon sx={{ color: 'white' }}><People /></ListItemIcon>
              <ListItemText primary="Tenants" />
              {open.tenants ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open.tenants} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/tenants">
                  <ListItemIcon><ListIcon /></ListItemIcon>
                  <ListItemText primary="View All" />
                </ListItem>
                <ListItem button component={Link} to="/createNewTenant">
                  <ListItemIcon><Add /></ListItemIcon>
                  <ListItemText primary="Add Tenant" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={() => handleClick('invoices')}>
              <ListItemIcon sx={{ color: 'white' }}><Receipt /></ListItemIcon>
              <ListItemText primary="Invoices" />
              {open.invoices ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open.invoices} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/invoices">
                  <ListItemIcon><ListIcon /></ListItemIcon>
                  <ListItemText primary="View All" />
                </ListItem>
                <ListItem button component={Link} to="/createNewInvoice">
                  <ListItemIcon><Add /></ListItemIcon>
                  <ListItemText primary="Add Invoice" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={() => handleClick('payments')}>
              <ListItemIcon sx={{ color: 'white' }}><Payment /></ListItemIcon>
              <ListItemText primary="Payments" />
              {open.payments ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open.payments} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/rent-payments">
                  <ListItemIcon><ListIcon /></ListItemIcon>
                  <ListItemText primary="View All" />
                </ListItem>
                <ListItem button component={Link} to="/createNewPayment">
                  <ListItemIcon><Add /></ListItemIcon>
                  <ListItemText primary="Add Payment" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button component={Link} to="/locations">
              <ListItemIcon sx={{ color: 'white' }}> <LocationOn /></ListItemIcon>
              <ListItemText primary="Locations" />
            </ListItem>
          </List>
          <Box sx={{ padding: '20px' }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ExitToApp />}
              component={Link}
              to="/logout"
            >
              Sign Out
            </Button>
          </Box>
        </div>
      </Drawer>
    </div>
  );
};

export default Navigation;
