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

// Get all tenants with associated house information from tenantView
const getAllTenants = async () => {
  try {
    const tenants = await db('tenantsView')
      .select('tenantsView.*', 'houses.house_name')
      .leftJoin('houses', 'tenantsView.house_number', 'houses.houseID');
    return tenants;
  } catch (error) {
    throw error;
  }
};

// Get tenant by ID with associated house information from tenantView
const getTenantById = async (id) => {
  try {
    const tenant = await db('tenantsView')
      .select('tenantsView.*', 'houses.house_name')
      .leftJoin('houses', 'tenantsView.house_number', 'houses.houseID')
      .where('tenantsView.tenantID', id)
      .first();
    return tenant;
  } catch (error) {
    throw error;
  }
};

// Update tenant
const updateTenant = async (id, updatedData) => {
  try {
    await db('tenants').where({ tenantID: id }).update(updatedData);
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
    await db('tenants').where({ tenantID: id }).del();
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
