exports.up = function(knex) {
    return knex.schema
      .createTable('apartments', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('location').notNullable();
        table.integer('num_houses').notNullable();
      })
      .createTable('houses', function(table) {
        table.increments('id').primary();
        table.string('house_number').notNullable();
        table.integer('apartment_id').unsigned().references('id').inTable('apartments');
      })
      .alterTable('tenants', function(table) {
        table.dropColumn('house_number');
        table.integer('house_id').unsigned().references('id').inTable('houses');
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .alterTable('tenants', function(table) {
        table.dropColumn('house_id');
        table.string('house_number').notNullable();
      })
      .dropTableIfExists('houses')
      .dropTableIfExists('apartments');
  };
  