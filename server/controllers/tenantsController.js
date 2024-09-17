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
const updateTenant = async (tenantID, updatedData) => {
  try {
    // Only update the fields that are provided in updatedData
    await db('tenants').where({ tenantID }).update(updatedData);
    const updatedTenant = await getTenantById(tenantID);
    return updatedTenant;
  } catch (error) {
    throw error;
  }
};



// const updateHouse = async (houseID, updatedData) => {
//   try {
//     await db('houses').where({ houseID }).update(updatedData);
//     const updatedHouse = await getHouseById(houseID);
//     return updatedHouse;
//   } catch (error) {
//     throw error;
//   }
// };

const removeTenantFromHouse = async (tenantID) => {
  try {
    const currentDate = new Date();

    // Update tenant status to 0 (soft delete) and set date of removal
    await db('tenants')
      .where({ tenantID: id })
      .update({
        status: 0,
        date_of_removal: currentDate,
      });

    // Update house status to 'Vacant'
    const tenant = await db('tenants').where({ tenantID: id }).first();
    await db('houses').where({ houseID: tenant.houseNumber }).update({ house_status: 'Vacant' });

    return tenant;
  } catch (error) {
    throw error;
  }
};

const relocateTenant = async (tenantID, newHouseID) => {
  try {
    const currentDate = new Date();

    // Update the tenant's house number and relocation date
    await db('tenants')
      .where({ tenantID: tenantID })
      .update({
        houseNumber: newHouseID,
        date_of_relocation: currentDate,
      });

    // Set the old house to 'Vacant' and the new house to 'Occupied'
    const oldHouseID = await db('tenants').where({ tenantID: tenantID }).select('houseNumber').first();
    await db('houses').where({ houseID: oldHouseID.houseNumber }).update({ house_status: 'Vacant' });
    await db('houses').where({ houseID: newHouseID }).update({ house_status: 'Occupied' });

    return { success: true };
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
  removeTenantFromHouse,
  relocateTenant
  
};
