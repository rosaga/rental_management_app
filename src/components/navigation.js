import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Toolbar, AppBar, Typography, IconButton, Collapse
} from '@mui/material';
import { Home, People, Receipt, Payment, LocationOn, Menu, ExpandLess, ExpandMore, Add, List as ListIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Navigation = () => {
  const [open, setOpen] = useState({
    apartments: false,
    houses: false,
    tenants: false
  });

  const handleClick = (menu) => {
    setOpen({ ...open, [menu]: !open[menu] });
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" style={{ zIndex: 1300, width: `calc(100% - ${drawerWidth}px)`, marginLeft: drawerWidth }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Rental Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <div style={{ overflow: 'auto' }}>
          <List>
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            
            <ListItem button onClick={() => handleClick('apartments')}>
              <ListItemIcon><Home /></ListItemIcon>
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
              <ListItemIcon><Home /></ListItemIcon>
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
              <ListItemIcon><People /></ListItemIcon>
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
              <ListItemIcon><People /></ListItemIcon>
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
              <ListItemIcon><People /></ListItemIcon>
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
              <ListItemIcon><LocationOn /></ListItemIcon>
              <ListItemText primary="Locations" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Navigation;
