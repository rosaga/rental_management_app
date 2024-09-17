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
      table.bigInteger('kiwasco_meter_no').notNullable().defaultTo(null);
      table.bigInteger('kiwasco_account_no').notNullable().defaultTo(null);
      table.string('remarks').notNullable().defaultTo(null);


      table.foreign('apartmentID').references('apartmentID').inTable('apartments').onDelete('CASCADE');
    })
    .createTable('periods', function (table) {
      table.increments('periodID').primary();
      table.string('month', 50).notNullable();
      table.integer('year').notNullable();
    })
    .createTable('tenants', function(table) {
      table.increments('tenantID').primary();
      table.integer('houseNumber').notNullable();
      table.string('tenant_name').notNullable();
      table.string('email').notNullable();
      table.integer('ID_number').notNullable();
      table.string('phone_number').notNullable();
      table.string('agreement_file').defaultTo(null);
      table.string('remarks').defaultTo(null);
      table.timestamp('dateAdmitted').defaultTo(null);
      table.timestamp('date_of_relocation').nullable();
      table.timestamp('date_of_removal').nullable();
      table.integer('negotiatedRent').notNullable().defaultTo(0);
      table.boolean('status').notNullable().defaultTo(true);
    })
    .createTable('invoice_types', function(table) {
      table.increments('invoiceTypeID').primary();
      table.string('invoiceType', 255).notNullable();
    })
    .createTable('invoices', function (table) {
      table.increments('invoiceID').primary();
      table.integer('tenantID').notNullable();
      table.integer('periodID').unsigned().notNullable();
      table.foreign('periodID').references('periodID').inTable('periods').onDelete('CASCADE');
      table.timestamp('dateOfInvoice').defaultTo(knex.fn.now()).notNullable();
      table.integer('invoiceTypeID').unsigned().notNullable()
      table.foreign('invoiceTypeID').references('invoiceTypeID').inTable('invoice_types').onDelete('CASCADE');
      table.timestamp('dateDue').notNullable();
      table.integer('amountDue').notNullable();
      table.string('status', 50).notNullable().defaultTo('unpaid');
      table.text('comment').notNullable();
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
    .createTable('locations', function (table) {
      table.increments('locationsID').primary();
      table.string('location_name').notNullable();
      table.string('geo_id').notNullable();
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
    .dropTableIfExists('transactions')
    .dropTableIfExists('payments')
    .dropTableIfExists('locations')
    .dropTableIfExists('invoice_types')
    .dropTableIfExists('invoices')
    .dropTableIfExists('houses')
    .dropTableIfExists('tenants')
    .dropTableIfExists('periods')
    .dropTableIfExists('apartments')
    .dropTableIfExists('contacts');
};

