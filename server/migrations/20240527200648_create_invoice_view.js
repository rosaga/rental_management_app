exports.up = function (knex) {
  return knex.schema.raw(`
    CREATE VIEW invoicesView AS
    SELECT 
      invoices.invoiceID,
      tenants.tenant_name,
      invoices.tenantID,
      tenants.phone_number,
      invoices.amountDue,
      invoices.dateOfInvoice,
      invoices.dateDue,
      invoices.status,
      invoices.comment,
      periods.month,
      periods.year
    FROM 
      invoices
    LEFT JOIN 
      tenants ON invoices.tenantID = tenants.tenantID
    LEFT JOIN
      periods ON invoices.periodID = periods.periodID
  `);
};

exports.down = function (knex) {
  return knex.schema.raw(`DROP VIEW IF EXISTS invoicesView`);
};
