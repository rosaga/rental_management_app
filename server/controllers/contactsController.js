// controllers/contactsController.js
const db = require('../db');

// Create a new contact
const createContact = async (contactData) => {
  try {
    const newContact = await db('contacts').insert(contactData).returning('*');
    return newContact;
  } catch (error) {
    throw error;
  }
};

// Get all contacts
const getAllContacts = async () => {
  try {
    const contacts = await db('contacts').select('*');
    return contacts;
  } catch (error) {
    throw error;
  }
};

// Get contact by ID
const getContactById = async (id) => {
  try {
    const contact = await db('contacts').where({ contactsID: id }).first();
    return contact;
  } catch (error) {
    throw error;
  }
};

// Update contact
const updateContact = async (id, updatedData) => {
  try {
    await db('contacts').where({ contactsID: id }).update(updatedData);
    const updatedContact = await getContactById(id);
    return updatedContact;
  } catch (error) {
    throw error;
  }
};

// Delete contact
const deleteContact = async (id) => {
  try {
    const deletedContact = await getContactById(id);
    await db('contacts').where({ contactsID: id }).del();
    return deletedContact;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
