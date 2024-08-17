const db = require('../db');

// Create a new tenant
const createTenant = async (tenantData) => {
  try {
    const newTenant = await db('tenants').insert(tenantData).returning('*');

    // Update house status to 'Occupied'
    await db('houses')
      .where({ houseID: tenantData.houseNumber })
      .update({ house_status: 'Occupied' });

    return newTenant;
  } catch (error) {
    throw error;
  }
};

// Delete tenant (soft delete)
const deleteTenant = async (id) => {
  try {
    // Fetch the houseNumber of the tenant
    const tenant = await db('tenants').where({ tenantID: id }).first();
    
    if (!tenant) {
      throw new Error('Tenant not found');
    }

    const houseNumber = tenant.houseNumber;

    // Update tenant status to 0 (soft delete)
    await db('tenants').where({ tenantID: id }).update({ status: 0 });

    // Update house status to 'Vacant'
    await db('houses').where({ houseID: houseNumber }).update({ house_status: 'Vacant' });

    return tenant;
  } catch (error) {
    throw error;
  }
};
// Get all tenants with associated house information
const getAllTenants = async () => {
  try {
    const tenants = await db('tenantsView').where({ status: 1 });
    return tenants;
  } catch (error) {
    console.error('Error fetching tenants:', error); 

    throw error;
  }
};

// Get tenant by ID with associated house information
const getTenantById = async (id) => {
  try {
    const tenant = await db('tenantsView')
      .select('*')
      .where('tenantID', id)
      .andWhere('status', true)
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

module.exports = {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
};
