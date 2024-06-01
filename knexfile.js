module.exports = {
  development: {
    client: 'mssql',
    connection: {
      server: 'localhost',
      user: 'sa',
      password: '12345678',
      database: 'rental',
      port: 1433,
      options: {
        enableArithAbort: true
      }
    },
    migrations: {
      directory: './server/migrations'
    },
    seeds: {
      directory: './server/seeds'
    }
  }
};
