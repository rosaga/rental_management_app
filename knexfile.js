require('dotenv').config(); 

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: './migrations', 
    tableName: 'knex_migrations'
  },
  seeds: {
  directory: './seeds'
  },
  pool: {
    min: 2,
    max: 10
  }
};
export const staging = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './migrations', 
    tableName: 'knex_migrations'
  }
};
export const production = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './migrations', 
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './seeds'
    },

};