const db = require('../db');

const getDashboardData = async () => {
  try {
    const tenants = await db('tenants').count('tenants_id as count').first();
    const totalHouses = await db('houses').count('house_id as count').first();
    const apartments = await db('apartments').count('apartment_id as count').first();

    return {
      occupiedHouses: tenants.count,
      tenants: tenants.count,
      totalHouses: totalHouses.count,
      apartments: apartments.count,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error.message, error.stack);
    throw error;
  }
};
  
  module.exports = {
    getDashboardData,
  };
  