const db = require('../db');

// Create a new payment
const createPayment = async (paymentData) => {
  try {
    const invoice = await db('invoices').where({ invoiceID: paymentData.invoiceID }).first();
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    const periodID = invoice.periodID;

    const newPayment = await db('payments').insert({
      ...paymentData,
      periodID,
      balance: invoice.amountDue - paymentData.amountPaid,
    }).returning('*');

    await db('invoices').where({ invoiceID: paymentData.invoiceID }).update({ status: 'paid' });

    return newPayment;
  } catch (error) {
    throw error;
  }
};

// Get all payments
const getAllPayments = async () => {
  try {
    const payments = await db('payments').select('*');
    return payments;
  } catch (error) {
    throw error;
  }
};

// Get payment by ID
const getPaymentById = async (id) => {
  try {
    const payment = await db('payments').where('paymentID', id).first();
    return payment;
  } catch (error) {
    throw error;
  }
};

// Update payment
const updatePayment = async (id, updatedData) => {
  try {
    // Fetch the invoice to get the amount due
    const invoice = await db('invoices').where('invoiceID', updatedData.invoiceID).first();

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    // Calculate the balance
    const balance = invoice.amountDue - updatedData.amountPaid;

    await db('payments').where({ paymentID: id }).update({
      ...updatedData,
      balance,
    });
    const updatedPayment = await getPaymentById(id);
    return updatedPayment;
  } catch (error) {
    throw error;
  }
};

// Delete payment
const deletePayment = async (id) => {
  try {
    const deletedPayment = await getPaymentById(id);
    await db('payments').where({ paymentID: id }).del();
    return deletedPayment;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment
};
