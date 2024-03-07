const db = require('../db');

// Create a new apartment
const createApartment = async (apartmentData) => {
  try {
    const newApartment = await db('apartments').insert(apartmentData).returning('*');
    return newApartment;
  } catch (error) {
    throw error;
  }
};

// Get all apartments
const getAllApartments = async () => {
  try {
    const apartments = await db('apartments').select('*');
    return apartments;
  } catch (error) {
    throw error;
  }
};

// Get apartment by ID
const getApartmentById = async (id) => {
  try {
    const apartment = await db('apartments').where({ id }).first();
    return apartment;
  } catch (error) {
    throw error;
  }
};

// Update apartment
const updateApartment = async (id, updatedData) => {
  try {
    await db('apartments').where({ id }).update(updatedData);
    const updatedApartment = await getApartmentById(id);
    return updatedApartment;
  } catch (error) {
    throw error;
  }
};

// Delete apartment
const deleteApartment = async (id) => {
  try {
    const deletedApartment = await getApartmentById(id);
    await db('apartments').where({ id }).del();
    return deletedApartment;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createApartment,
  getAllApartments,
  getApartmentById,
  updateApartment,
  deleteApartment,
};
