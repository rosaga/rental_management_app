exports.up = function(knex) {
    return knex.schema.table('tenants', function(table) {
      table.timestamp('date_of_relocation').nullable();
      table.timestamp('date_of_removal').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('tenants', function(table) {
      table.dropColumn('date_of_relocation');
      table.dropColumn('date_of_removal');
    });
  };
  