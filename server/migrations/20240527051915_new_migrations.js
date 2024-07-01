exports.up = function (knex) {
  return knex.schema
    .createTable('contacts', function (table) {
      table.increments('contactsID').primary();
      table.string('names', 50).notNullable();
      table.string('email', 50).notNullable();
      table.text('message').notNullable();
      table.timestamp('date').defaultTo(knex.fn.now());
    })
    .createTable('apartments', function (table) {
      table.increments('apartmentID').primary();
      table.string('name', 255).notNullable();
      table.string('location', 255).notNullable();
      table.integer('num_houses').notNullable();
    })
    .createTable('houses', function (table) {
      table.increments('houseID').primary();
      table.string('house_name').notNullable();
      table.integer('number_of_rooms').notNullable().defaultTo(1);
      table.decimal('rent_amount', 10, 2).notNullable();
      table.string('house_status', 50).notNullable().defaultTo('Vacant');
      table.integer('apartmentID').unsigned().notNullable();
      table.foreign('apartmentID').references('apartmentID').inTable('apartments').onDelete('CASCADE');
    })
    .createTable('periods', function (table) {
      table.increments('periodID').primary();
      table.string('month', 50).notNullable();
      table.integer('year').notNullable();
    })
    .createTable('invoices', function (table) {
      table.increments('invoiceID').primary();
      table.integer('tenantID').notNullable();
      table.integer('periodID').unsigned().notNullable();
      table.foreign('periodID').references('periodID').inTable('periods').onDelete('CASCADE');
      table.timestamp('dateOfInvoice').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('dateDue').notNullable();
      table.integer('amountDue').notNullable();
      table.string('status', 50).notNullable().defaultTo('unpaid');
      table.text('comment').notNullable();
    })
    .createTable('locations', function (table) {
      table.increments('locationsID').primary();
      table.string('location_name').notNullable();
      table.string('geo_id').notNullable();
    })
    .createTable('payments', function (table) {
      table.increments('paymentID').primary();
      table.integer('tenantID').unsigned().notNullable();
      table.integer('invoiceID').unsigned().notNullable();
      table.integer('periodID').unsigned().notNullable();
      table.integer('expectedAmount').notNullable();
      table.integer('amountPaid').notNullable();
      table.integer('balance').notNullable();
      table.string('mpesaCode', 30).notNullable().defaultTo('None');
      table.timestamp('dateofPayment').notNullable();
      table.text('comment').defaultTo(null);
      table.foreign('invoiceID').references('invoiceID').inTable('invoices').onDelete('CASCADE');
      table.foreign('tenantID').references('tenantID').inTable('tenants').onDelete('CASCADE');
      table.foreign('periodID').references('periodID').inTable('periods').onDelete('CASCADE');
    })
    .createTable('tenants', function(table) {
      table.increments('tenantID').primary();
      table.integer('houseNumber').notNullable();
      table.string('tenant_name').notNullable();
      table.string('email').notNullable();
      table.integer('ID_number').notNullable();
      table.string('profession').notNullable();
      table.string('phone_number', 13).notNullable();
      table.string('agreement_file').defaultTo(null);
      table.timestamp('dateAdmitted').defaultTo(null);
      table.integer('account').notNullable().defaultTo(0);
      table.integer('negotiatedRent').notNullable().defaultTo(0);
    })
    .createTable('transactions', function (table) {
      table.increments('transactionsID').primary();
      table.string('actor').defaultTo(null);
      table.timestamp('time').defaultTo(null);
      table.text('description').defaultTo(null);
      table.string('seen', 10).notNullable().defaultTo('NO');
    })
    .createTable('linkage', function (table) {
      table.increments('id').primary();
      table.integer('tenantID').unsigned().notNullable();
      table.integer('periodID').unsigned().notNullable();
      table.foreign('tenantID').references('tenantID').inTable('tenants').onDelete('CASCADE');
      table.foreign('periodID').references('periodID').inTable('periods').onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('linkage')
    .dropTableIfExists('periods')
    .dropTableIfExists('transactions')
    .dropTableIfExists('tenants')
    .dropTableIfExists('payments')
    .dropTableIfExists('locations')
    .dropTableIfExists('invoices')
    .dropTableIfExists('houses')
    .dropTableIfExists('apartments')
    .dropTableIfExists('contacts');
};
