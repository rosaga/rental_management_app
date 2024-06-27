// migrations/20240527052015_create_tenants_view.js

exports.up = function(knex) {
  return knex.raw(`
    CREATE VIEW tenantsView AS
    SELECT 
      tenants.tenantID,
      tenants.houseNumber,
      tenants.tenant_name,
      tenants.email,
      tenants.ID_number,
      tenants.profession,
      tenants.phone_number,
      tenants.dateAdmitted,
      tenants.agreement_file,
      houses.house_name,
      houses.number_of_rooms,
      houses.house_status,
      houses.rent_amount,
      houses.houseID
    FROM 
      tenants
    LEFT JOIN 
      houses ON tenants.houseNumber = houses.houseID;
  `);
};

exports.down = function(knex) {
  return knex.raw('DROP VIEW IF EXISTS tenantsView');
};
