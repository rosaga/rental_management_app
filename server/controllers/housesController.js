const db = require('../db');

// Create a new house
const createHouse = async (houseData) => {
  try {
    const newHouse = await db('houses').insert(houseData).returning('*');
    return newHouse;
  } catch (error) {
    throw error;
  }
};

// Get all houses
const getAllHouses = async () => {
  try {
    const houses = await db('houses').select('*');
    return houses;
  } catch (error) {
    throw error;
  }
};

// Get house by ID
const getHouseById = async (id) => {
  try {
    const house = await db('houses').where({ id }).first();
    return house;
  } catch (error) {
    throw error;
  }
};

// Update house
const updateHouse = async (id, updatedData) => {
  try {
    await db('houses').where({ id }).update(updatedData);
    const updatedHouse = await getHouseById(id);
    return updatedHouse;
  } catch (error) {
    throw error;
  }
};

// Delete house
const deleteHouse = async (id) => {
  try {
    const deletedHouse = await getHouseById(id);
    await db('houses').where({ id }).del();
    return deletedHouse;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createHouse,
  getAllHouses,
  getHouseById,
  updateHouse,
  deleteHouse,
};
