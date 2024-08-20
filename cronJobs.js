const cron = require('node-cron');
const db = require('./server/db'); 

// Function to create invoices
const createMonthlyInvoices = async () => {
  try {
    // Select only tenants with status 1 (active)
    const tenants = await db('tenants').where({ status: 1 });
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

// Scheduled so that they run at midnight on the 5th of every month
cron.schedule('0 0 5 * *', createMonthlyInvoices);