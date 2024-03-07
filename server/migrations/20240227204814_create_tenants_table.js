exports.up = function(knex) {
    return knex.schema.createTable('tenants', function(table) {
      table.increments('id').primary();
      table.string('tenant_name').notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('tenant_id_number').notNullable();
      table.date('moving_in_date').notNullable();
      table.string('phone_number').notNullable();
      table.string('house_number').notNullable();
      table.string('apartment_number').notNullable();
      table.decimal('rent_per_month').notNullable();
      // Add any other columns you need
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tenants');
  };
  