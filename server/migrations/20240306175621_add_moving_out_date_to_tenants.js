exports.up = function(knex) {
    return knex.schema.table('tenants', function(table) {
      table.date('moving_out_date').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('tenants', function(table) {
      table.dropColumn('moving_out_date');
    });
  };
  