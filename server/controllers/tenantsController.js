// Update tenant controller

const db = require('../db');

// Create a new tenant
const createTenant = async (tenantData) => {
  try {
    const newTenant = await db('tenants').insert(tenantData).returning('*');
    return newTenant;
  } catch (error) {
    throw error;
  }
};

// Get all tenants with associated house and apartment information
const getAllTenants = async () => {
  try {
    const tenants = await db('tenants')
      .select('tenants.*', 'houses.house_number', 'apartments.name as apartment_name')
      .leftJoin('houses', 'tenants.house_id', 'houses.id')
      .leftJoin('apartments', 'houses.apartment_id', 'apartments.id');
    return tenants;
  } catch (error) {
    throw error;
  }
};

// Get tenant by ID with associated house and apartment information
const getTenantById = async (id) => {
  try {
    const tenant = await db('tenants')
      .select('tenants.*', 'houses.house_number', 'apartments.name as apartment_name')
      .leftJoin('houses', 'tenants.house_id', 'houses.id')
      .leftJoin('apartments', 'houses.apartment_id', 'apartments.id')
      .where('tenants.id', id)
      .first();
    return tenant;
  } catch (error) {
    throw error;
  }
};

// Update tenant
const updateTenant = async (id, updatedData) => {
  try {
    await db('tenants').where({ id }).update(updatedData);
    const updatedTenant = await getTenantById(id);
    return updatedTenant;
  } catch (error) {
    throw error;
  }
};

// Delete tenant
const deleteTenant = async (id) => {
  try {
    const deletedTenant = await getTenantById(id);
    await db('tenants').where({ id }).del();
    return deletedTenant;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
};
