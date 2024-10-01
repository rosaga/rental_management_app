const cron = require('node-cron');
const db = require('./server/db'); 

// Function to create invoices
const createMonthlyInvoices = async () => {
  try {
    // Get the invoice type for rent
    const rentInvoiceType = await db('invoice_types').where({ invoiceType: 'Rent' }).first();
    
    if (!rentInvoiceType) {
      console.error('Rent invoice type not found');
      return;
    }

    // Select only tenants with status 1 (active)
    const tenants = await db('tenants').where({ status: 1 });
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    let period = await db('periods').where({ month: currentMonth, year: currentYear }).first();

    if (!period) {
      [period] = await db('periods').insert({ month: currentMonth, year: currentYear }).returning('*');
    }

    for (const tenant of tenants) {
      // Check if a rent invoice already exists for this tenant and period
      const existingInvoice = await db('invoices')
        .where({
          tenantID: tenant.tenantID,
          periodID: period.periodID,
          invoiceTypeID: rentInvoiceType.invoiceTypeID
        })
        .first();

      if (!existingInvoice) {
        const invoiceData = {
          tenantID: tenant.tenantID,
          periodID: period.periodID,
          invoiceTypeID: rentInvoiceType.invoiceTypeID,
          dateOfInvoice: new Date().toISOString().slice(0, 10),
          dateDue: new Date(currentYear, new Date().getMonth() + 1, 1).toISOString().slice(0, 10),
          amountDue: tenant.negotiatedRent,
          status: 'unpaid',
          comment: `Rent for ${currentMonth} ${currentYear}`,
        };

        await db('invoices').insert(invoiceData);
        console.log(`Rent invoice created for tenant ${tenant.tenantID}`);
      } else {
        console.log(`Rent invoice already exists for tenant ${tenant.tenantID} for this period`);
      }
    }

    console.log('Rent invoices creation process completed'); 
  } catch (error) {
    console.error('Error creating rent invoices:', error);
  }
};

createMonthlyInvoices()


// Scheduled to run at midnight on the 5th of every month

//cron.schedule('0 0 1 * *', createMonthlyInvoices);
