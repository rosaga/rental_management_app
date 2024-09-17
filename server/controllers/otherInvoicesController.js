const db = require('../db');

const createOtherInvoice = async (otherInvoiceData) => {
  try {
    // Check if the period already exists, otherwise insert it
    let period = await db('periods')
      .where({ month: otherInvoiceData.month, year: otherInvoiceData.year })
      .first();

    if (!period) {
      [period] = await db('periods')
        .insert({ month: otherInvoiceData.month, year: otherInvoiceData.year })
        .returning('*');
    }

    const newOtherInvoice = await db('other_invoices')
      .insert({
        tenantID: otherInvoiceData.tenantID,
        periodID: period.periodID,
        invoiceTypeID: otherInvoiceData.invoiceTypeID, 
        dateDue: otherInvoiceData.dateDue,
        amountDue: otherInvoiceData.amountDue,
        status: otherInvoiceData.status || 'unpaid', 
        comment: otherInvoiceData.comment,
      })
      .returning('*');

    return newOtherInvoice;
  } catch (error) {
    throw error;
  }
};


const getAllOtherInvoices = async (req, res) => {
  try {
    const { month, year } = req.query;

    let query = db('other_invoices')
      .join('tenants', 'other_invoices.tenantID', '=', 'tenants.tenantID')
      .join('linkage', 'tenants.tenantID', '=', 'linkage.tenantID')
      .join('periods', 'linkage.periodID', '=', 'periods.periodID')
      .join('invoice_types', 'other_invoices.invoiceTypeID', '=', 'invoice_types.invoiceTypeID') 
      .select(
        'other_invoices.*',
        'tenants.tenant_name',
        'periods.month',
        'periods.year',
        'invoice_types.invoiceType as invoiceTypeName' 
      );

    if (month && year) {
      query = query.where({ 'periods.month': month, 'periods.year': year });
    }

    const otherInvoices = await query;
    res.json(otherInvoices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch other invoices' });
  }
};


// Get invoice by ID
const getOtherInvoiceById = async (id) => {
  try {
    const otherInvoice = await db('other_invoices')
      .where('otherInvoiceID', id)
      .join('invoice_types', 'other_invoices.invoiceTypeID', '=', 'invoice_types.invoiceTypeID') 
      .select('other_invoices.*', 'invoice_types.invoiceType as invoiceTypeName') 
      .first();

    return otherInvoice;
  } catch (error) {
    throw error;
  }
};


// Update invoice status and create payment if marked as paid
const updateOtherInvoice = async (id, updatedData) => {
  try {
    const otherInvoice = await db('other_invoices').where({ otherInvoiceID: id }).first();

    if (updatedData.status === 'paid' && otherInvoice.status !== 'paid') {
      const tenant = await db('tenants').where({ tenantID: otherInvoice.tenantID }).first();

      // Fetch the periodID from the invoice
      const periodID = otherInvoice.periodID;

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
        periodID: periodID,
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
  createOtherInvoice,
  getAllOtherInvoices,
  getOtherInvoiceById,
  updateInvoice,
  deleteInvoice
};
