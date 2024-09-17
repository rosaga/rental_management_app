// controllers/housesController.js
const db = require('../db');

// Create a house
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

// Get a house by ID
const getHouseById = async (houseID) => {
  try {
    const house = await db('houses').where({ houseID: houseID }).first();
    return house;
  } catch (error) {
    throw error;
  }
};

// Update a house
const updateHouse = async (houseID, updatedData) => {
  try {
    await db('houses').where({ houseID }).update(updatedData);
    const updatedHouse = await getHouseById(houseID);
    return updatedHouse;
  } catch (error) {
    throw error;
  }
};

// Delete a house
const deleteHouse = async (houseID) => {
  try {
    const deletedHouse = await getHouseById(houseID);
    await db('houses').where({ houseID: houseID }).del();
    return deletedHouse;
  } catch (error) {
    throw error;
  }
};

// get vacant houses
const getVacantHouses = async () => {
  try {
    const vacantHouses = await db('houses').where({ house_status: 'Vacant' });
    return vacantHouses;
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
  getVacantHouses

};
