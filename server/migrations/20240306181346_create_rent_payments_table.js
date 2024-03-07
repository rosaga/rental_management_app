exports.up = function(knex) {
    return knex.schema.createTable('rent_payments', function(table) {
      table.increments('id').primary();
      table.integer('tenant_id').unsigned().references('id').inTable('tenants').onDelete('CASCADE');
      table.date('date_rent_paid').notNullable(); // Date representing the month and year for which rent is paid
      table.boolean('is_paid').notNullable().defaultTo(false); // Flag indicating whether rent is paid for the month
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('rent_payments');
  };
  