const db = require('../db');

// Create a new invoice
const createInvoice = async (invoiceData) => {
  try {
    // Check if the period already exists, otherwise insert it
    let period = await db('periods')
      .where({ month: invoiceData.month, year: invoiceData.year })
      .first();

    if (!period) {
      [period] = await db('periods')
        .insert({ month: invoiceData.month, year: invoiceData.year })
        .returning('*');
    }

    const newInvoice = await db('invoices')
      .insert({
        tenantID: invoiceData.tenantID,
        periodID: period.periodID,
        dateDue: invoiceData.dateDue,
        amountDue: invoiceData.amountDue,
        status: invoiceData.status,
        comment: invoiceData.comment,
      })
      .returning('*');

    return newInvoice;
  } catch (error) {
    throw error;
  }
};


//get all invoices
const getAllInvoices = async (req, res) => {
  try {
    const { month, year } = req.query;
    let query = db('invoices')
      .join('tenants', 'invoices.tenantID', '=', 'tenants.tenantID')
      .join('linkage', 'tenants.tenantID', '=', 'linkage.tenantID')
      .join('periods', 'linkage.periodID', '=', 'periods.periodID')
      .select(
        'invoices.*',
        'tenants.tenant_name',
        'periods.month',
        'periods.year'
      );

    if (month && year) {
      query = query.where({ 'periods.month': month, 'periods.year': year });
    }

    const invoices = await query;
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
};


// Get invoice by ID
const getInvoiceById = async (id) => {
  try {
    const invoice = await db('invoices').where('invoiceID', id).first();
    return invoice;
  } catch (error) {
    throw error;
  }
};

// Update invoice status and create payment if marked as paid
const updateInvoice = async (id, updatedData) => {
  try {
    const invoice = await db('invoices').where({ invoiceID: id }).first();

    if (updatedData.status === 'paid' && invoice.status !== 'paid') {
      const tenant = await db('tenants').where({ tenantID: invoice.tenantID }).first();

      // Calculate the balance
      const balance = invoice.amountDue - tenant.negotiatedRent;

      const newPayment = {
        tenantID: invoice.tenantID,
        invoiceID: invoice.invoiceID,
        expectedAmount: invoice.amountDue,
        amountPaid: tenant.negotiatedRent,
        balance: balance,
        dateofPayment: new Date(),
        comment: 'Payment for invoice ' + invoice.invoiceID,
      };

      await db('payments').insert(newPayment);
    }

    await db('invoices').where({ invoiceID: id }).update(updatedData);
    const updatedInvoice = await db('invoices').where({ invoiceID: id }).first();
    return updatedInvoice;
  } catch (error) {
    console.error('Error updating invoice:', error);
    throw error;
  }
};

// Delete invoice
const deleteInvoice = async (id) => {
  try {
    const deletedInvoice = await getInvoiceById(id);
    await db('invoices').where({ invoiceID: id }).del();
    return deletedInvoice;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice
};
