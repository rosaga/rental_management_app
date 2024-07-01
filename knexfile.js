/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost', // Use appropriate host if different
      user: 'root',
      password: 'Tedaringo628!',
      database: 'Rental'
    },
    migrations: {
      directory: './migrations', // Ensure this path is correct
      tableName: 'knex_migrations'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  staging: {
    client: 'mysql2',
    connection: {
      host: 'localhost', // Use appropriate host if different
      user: 'root',
      password: 'Tedaringo628!',
      database: 'Rental'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations', // Ensure this path is correct
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host: 'localhost', // Use appropriate host if different
      user: 'root',
      password: 'Tedaringo628!',
      database: 'Rental'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations', // Ensure this path is correct
      tableName: 'knex_migrations'
    }
  }

};
