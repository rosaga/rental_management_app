module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'postgres',
        password: '@Microsoft2010',
        database: 'rental',
        port: 5432
      },
      migrations: {
        directory: './server/migrations'
      },
      seeds: {
        directory: './server/seeds'
      }
    }
  };
  