exports.up = async function(knex) {
  await knex.raw(`
    CREATE VIEW paymentsView AS
    SELECT 
      payments.paymentID,
      payments.tenantID,
      tenants.tenant_name,
      houses.house_name,
      invoices.invoiceID,
      payments.expectedAmount,
      payments.amountPaid,
      payments.balance,
      payments.mpesaCode,
      payments.dateofPayment,
      payments.comment,
      periods.month,
      periods.year
    FROM payments
    LEFT JOIN tenants ON payments.tenantID = tenants.tenantID
    LEFT JOIN houses ON tenants.houseNumber = houses.houseID
    LEFT JOIN invoices ON payments.invoiceID = invoices.invoiceID
    LEFT JOIN linkage ON tenants.tenantID = linkage.tenantID
    LEFT JOIN periods ON linkage.periodID = periods.periodID
  `);
};

exports.down = async function(knex) {
  await knex.raw(`
    DROP VIEW IF EXISTS paymentsView;
  `);
};
