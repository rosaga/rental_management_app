const express = require('express');
const router = express.Router();
const tenantsController = require('./controllers/tenantsController');
const housesController = require('./controllers/housesController');
const apartmentsController = require('./controllers/apartmentsController');
const authController = require('./controllers/authController');

//login Route
router.post('/login', authController.login);

//create User
router.post('/users', authController.createUser);
// Tenants routes
router.post('/tenants', async (req, res) => {
  try {
    const newTenant = await tenantsController.createTenant(req.body);
    res.json(newTenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/tenants', async (req, res) => {
  try {
    const tenants = await tenantsController.getAllTenants();
    res.json(tenants);
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

module.exports = router;
