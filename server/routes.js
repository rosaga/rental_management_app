const express = require('express');
const router = express.Router();
const db = require('./db'); 
const tenantsController = require('./controllers/tenantsController');
const housesController = require('./controllers/housesController');
const apartmentsController = require('./controllers/apartmentsController');
const authController = require('./controllers/authController');
const rentPaymentsController = require('./controllers/rentPaymentsController');
const contactsController = require('./controllers/contactsController');
const invoicesController = require('./controllers/invoicesController');
const paymentsController = require('./controllers/rentPaymentsController');
// const transactionsController = require('./controllers/transactionsController');
// const locationsController = require('./controllers/locationsController');

// Login Route
router.post('/login', authController.login);


//dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    const houses = await db('houses').count('houseID as count').first();
    const tenants = await db('tenants').count('tenantID as count').first();
    const invoices = await db('invoices').count('invoiceID as count').first();
    const payments = await db('payments').count('paymentID as count').first();
    const rentCollected = await db('payments').sum('amountPaid as total').first();
    const tenantBalances = await db('invoices').where('status', 'unpaid').sum('amountDue as total').first();
    const rentableUnits = await db('houses').where('house_status', 'Vacant').count('houseID as count').first();

    res.json({
      houses: houses.count,
      tenants: tenants.count,
      invoices: invoices.count,
      payments: payments.count,
      rentCollected: rentCollected.total || 0,
      tenantBalances: tenantBalances.total || 0,
      rentableUnits: rentableUnits.count,
      unpaidInvoices: invoices.count,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});


// Create User
router.post('/users', authController.createUser);

router.get('/users', authController.getAllUsers);



// Tenants routes
router.get('/tenants', async (req, res) => {
  try {
    const tenants = await tenantsController.getAllTenants();
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tenants' });
  }
});

router.post('/tenants', async (req, res) => {
  try {
    const newTenant = await tenantsController.createTenant(req.body);
    res.json(newTenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/tenants/:id', async (req, res) => {
  try {
    const tenant = await tenantsController.getTenantById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/tenants/:id', async (req, res) => {
  try {
    const updatedTenant = await tenantsController.updateTenant(req.params.id, req.body);
    res.json(updatedTenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/tenants/:id', async (req, res) => {
  try {
    const deletedTenant = await tenantsController.deleteTenant(req.params.id);
    res.json(deletedTenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Houses routes
router.post('/houses', async (req, res) => {
  try {
    const newHouse = await housesController.createHouse(req.body);
    res.json(newHouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/houses', async (req, res) => {
  try {
    const houses = await housesController.getAllHouses();
    res.json(houses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/houses/:id', async (req, res) => {
  try {
    const house = await housesController.getHouseById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.json(house);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/houses/:id', async (req, res) => {
  try {
    const updatedHouse = await housesController.updateHouse(req.params.id, req.body);
    res.json(updatedHouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/houses/:id', async (req, res) => {
  try {
    const deletedHouse = await housesController.deleteHouse(req.params.id);
    res.json(deletedHouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Apartments routes
router.post('/apartments', async (req, res) => {
  try {
    const newApartment = await apartmentsController.createApartment(req.body);
    res.json(newApartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/apartments', async (req, res) => {
  try {
    const apartments = await apartmentsController.getAllApartments();
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/apartments/:id', async (req, res) => {
  try {
    const apartment = await apartmentsController.getApartmentById(req.params.id);
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }
    res.json(apartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/apartments/:id', async (req, res) => {
  try {
    const updatedApartment = await apartmentsController.updateApartment(req.params.id, req.body);
    res.json(updatedApartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/apartments/:id', async (req, res) => {
  try {
    const deletedApartment = await apartmentsController.deleteApartment(req.params.id);
    res.json(deletedApartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contacts routes
router.post('/contacts', async (req, res) => {
  try {
    const newContact = await contactsController.createContact(req.body);
    res.json(newContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/contacts', async (req, res) => {
  try {
    const contacts = await contactsController.getAllContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/contacts/:id', async (req, res) => {
  try {
    const contact = await contactsController.getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/contacts/:id', async (req, res) => {
  try {
    const updatedContact = await contactsController.updateContact(req.params.id, req.body);
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/contacts/:id', async (req, res) => {
  try {
    const deletedContact = await contactsController.deleteContact(req.params.id);
    res.json(deletedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Invoices routes
router.post('/invoices', async (req, res) => {
  try {
    const newInvoice = await invoicesController.createInvoice(req.body);
    res.json(newInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/invoices', async (req, res) => {
  try {
    const { tenantID } = req.query;
    const query = db('invoicesView').select('*');
    if (tenantID) {
      query.where('tenantID', tenantID);
    }
    const invoices = await query;
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/invoices/:id', async (req, res) => {
  try {
    const invoice = await invoicesController.getInvoiceById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/invoices/:id', async (req, res) => {
  try {
    const updatedInvoice = await invoicesController.updateInvoice(req.params.id, req.body);
    res.json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update invoice status
router.put('/invoices/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db('invoices').where({ invoiceID: id }).update({ status });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/invoices/:id', async (req, res) => {
  try {
    const deletedInvoice = await invoicesController.deleteInvoice(req.params.id);
    res.json(deletedInvoice);
  }catch(error){
    res.status(500).json({ error: error.message });
    }
  });

  // Payments routes
  router.post('/payments', async (req, res) => {
    try {
      const newPayment = await paymentsController.createPayment(req.body);
      res.json(newPayment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/payments', async (req, res) => {
    try {
      const payments = await paymentsController.getAllPayments();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/payments/:id', async (req, res) => {
    try {
      const payment = await paymentsController.getPaymentById(req.params.id);
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      res.json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.put('/payments/:id', async (req, res) => {
    try {
      const updatedPayment = await paymentsController.updatePayment(req.params.id, req.body);
      res.json(updatedPayment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.delete('/payments/:id', async (req, res) => {
    try {
      const deletedPayment = await paymentsController.deletePayment(req.params.id);
      res.json(deletedPayment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Locations routes
// router.post('/locations', async (req, res) => {
//   try {
//     const newLocation = await locationsController.createLocation(req.body);
//     res.json(newLocation);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get('/locations', async (req, res) => {
//   try {
//     const locations = await locationsController.getAllLocations();
//     res.json(locations);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get('/locations/:id', async (req, res) => {
//   try {
//     const location = await locationsController.getLocationById(req.params.id);
//     if (!location) {
//       return res.status(404).json({ message: 'Location not found' });
//     }
//     res.json(location);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.put('/locations/:id', async (req, res) => {
//   try {
//     const updatedLocation = await locationsController.updateLocation(req.params.id, req.body);
//     res.json(updatedLocation);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.delete('/locations/:id', async (req, res) => {
//   try {
//     const deletedLocation = await locationsController.deleteLocation(req.params.id);
//     res.json(deletedLocation);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

  module.exports = router;
