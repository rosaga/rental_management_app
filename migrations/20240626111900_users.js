exports.up = function(knex) {
    return knex.schema.hasTable('users').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('users', function(table) {
          table.increments('users_id').primary();
          table.string('username', 255).notNullable();
          table.string('password', 255).notNullable();
          table.string('role', 255).notNullable();
        });
      }
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  