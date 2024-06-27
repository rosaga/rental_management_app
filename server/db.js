const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'Tedaringo628!',
    database: 'Rental'
  },
  migrations: {
    directory: './server/migrations'
  },
  seeds: {
    directory: './server/seeds'
  }
});

module.exports = db;
