const cron = require('node-cron');
const db = require('../../server/db'); // Make sure this points to your database configuration

// Function to create invoices
const createMonthlyInvoices = async () => {
  try {
    const tenants = await db('tenants').select('*');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    let period = await db('periods').where({ month: currentMonth, year: currentYear }).first();

    if (!period) {
      [period] = await db('periods').insert({ month: currentMonth, year: currentYear }).returning('*');
    }

    for (const tenant of tenants) {
      const invoiceData = {
        tenantID: tenant.tenantID,
        periodID: period.periodID,
        dateDue: new Date(currentYear, new Date().getMonth() + 1, 1).toISOString().slice(0, 10),
        amountDue: tenant.negotiatedRent,
        status: 'unpaid',
        comment: `Rent for ${currentMonth} ${currentYear}`,
      };

      await db('invoices').insert(invoiceData);
    }

    console.log('Invoices created successfully');
  } catch (error) {
    console.error('Error creating invoices:', error);
  }
};

// Schedule the cron job to run at midnight on the 1st of every month
cron.schedule('0 0 1 * *', createMonthlyInvoices);